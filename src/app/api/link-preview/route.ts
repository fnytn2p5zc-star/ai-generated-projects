import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

interface LinkPreviewData {
  title: string
  description: string
  image?: string
  url: string
  domain: string
  favicon?: string
  allowIframe: boolean
}

interface ApiResponse {
  success: boolean
  data?: LinkPreviewData
  error?: string
}

const FETCH_TIMEOUT = 5000
const CACHE_TTL = 60 * 60 * 1000 // 1 hour
const MAX_RESPONSE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_CACHE_SIZE = 500

interface CacheEntry {
  data: LinkPreviewData
  timestamp: number
}

const cache = new Map<string, CacheEntry>()

function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isPrivateOrReservedIP(hostname: string): boolean {
  const privatePatterns = [
    /^localhost$/i,
    /^127\./,
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^169\.254\./,
    /^0\./,
    /^::1$/,
    /^fc00:/i,
    /^fe80:/i,
    /^fd/i,
    // IPv6-mapped IPv4 private addresses
    /^::ffff:(127\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.|0\.)/i,
    // Decimal IP notation (e.g. 2130706433 = 127.0.0.1)
    /^\d{8,10}$/,
    // Hex IP notation (e.g. 0x7f000001 = 127.0.0.1)
    /^0x[0-9a-f]+$/i,
    // Octal notation
    /^0[0-7]+\./,
  ]

  return privatePatterns.some((pattern) => pattern.test(hostname))
}

function isAllowedUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)

    if (isPrivateOrReservedIP(url.hostname)) {
      return false
    }

    const blockedPorts = [22, 23, 25, 3306, 5432, 6379, 27017]
    if (url.port && blockedPorts.includes(parseInt(url.port, 10))) {
      return false
    }

    return true
  } catch {
    return false
  }
}

function extractDomain(urlString: string): string {
  try {
    const url = new URL(urlString)
    return url.hostname
  } catch {
    return ''
  }
}

function checkIframeAllowed(headers: Headers): boolean {
  const xFrameOptions = headers.get('x-frame-options')
  if (xFrameOptions) {
    const value = xFrameOptions.toLowerCase()
    if (value === 'deny' || value === 'sameorigin') {
      return false
    }
  }

  const csp = headers.get('content-security-policy')
  if (csp) {
    const frameAncestorsMatch = csp.match(/frame-ancestors\s+([^;]+)/i)
    if (frameAncestorsMatch) {
      const value = frameAncestorsMatch[1].toLowerCase().trim()
      if (value === "'none'" || value === "'self'") {
        return false
      }
    }
  }

  return true
}

function extractMetadata(html: string, url: string): Omit<LinkPreviewData, 'allowIframe'> {
  const $ = cheerio.load(html)
  const domain = extractDomain(url)

  const title =
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    $('title').text() ||
    domain

  const description =
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="twitter:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    ''

  const image =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    undefined

  let favicon =
    $('link[rel="icon"]').attr('href') ||
    $('link[rel="shortcut icon"]').attr('href') ||
    $('link[rel="apple-touch-icon"]').attr('href') ||
    undefined

  if (favicon && !favicon.startsWith('http')) {
    try {
      const baseUrl = new URL(url)
      favicon = new URL(favicon, baseUrl.origin).href
    } catch {
      favicon = undefined
    }
  }

  return {
    title: title.trim(),
    description: description.trim(),
    image,
    url,
    domain,
    favicon,
  }
}

function pruneCache() {
  if (cache.size <= MAX_CACHE_SIZE) return

  const now = Date.now()
  for (const [key, entry] of cache) {
    if (now - entry.timestamp > CACHE_TTL) {
      cache.delete(key)
    }
  }

  if (cache.size > MAX_CACHE_SIZE) {
    const entries = [...cache.entries()]
      .sort((a, b) => a[1].timestamp - b[1].timestamp)
    const toDelete = entries.slice(0, entries.length - MAX_CACHE_SIZE)
    for (const [key] of toDelete) {
      cache.delete(key)
    }
  }
}

function resolveRedirectUrl(redirectUrl: string, baseUrl: string): string | null {
  try {
    // Handle relative redirect URLs
    if (redirectUrl.startsWith('/')) {
      const base = new URL(baseUrl)
      return new URL(redirectUrl, base.origin).href
    }
    return redirectUrl
  } catch {
    return null
  }
}

async function handleFetchResponse(
  response: Response,
  resolvedUrl: string,
  cacheKey: string,
): Promise<NextResponse<ApiResponse>> {
  const contentLength = response.headers.get('content-length')
  if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_SIZE) {
    return NextResponse.json(
      { success: false, error: 'Response too large' },
      { status: 413 }
    )
  }

  const allowIframe = checkIframeAllowed(response.headers)
  const html = await response.text()

  if (html.length > MAX_RESPONSE_SIZE) {
    return NextResponse.json(
      { success: false, error: 'Response too large' },
      { status: 413 }
    )
  }

  const metadata = extractMetadata(html, resolvedUrl)
  const previewData: LinkPreviewData = {
    ...metadata,
    allowIframe,
  }

  pruneCache()
  cache.set(cacheKey, {
    data: previewData,
    timestamp: Date.now(),
  })

  return NextResponse.json({
    success: true,
    data: previewData,
  })
}

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json(
      { success: false, error: 'URL parameter is required' },
      { status: 400 }
    )
  }

  if (!isValidUrl(url)) {
    return NextResponse.json(
      { success: false, error: 'Invalid URL. Only http and https protocols are allowed.' },
      { status: 400 }
    )
  }

  if (!isAllowedUrl(url)) {
    return NextResponse.json(
      { success: false, error: 'URL not allowed' },
      { status: 403 }
    )
  }

  const cached = cache.get(url)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({
      success: true,
      data: cached.data,
    })
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT)

    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'manual',
      headers: FETCH_HEADERS,
    })

    clearTimeout(timeoutId)

    // Follow redirects manually to validate each target
    if ([301, 302, 307, 308].includes(response.status)) {
      const rawRedirectUrl = response.headers.get('location')
      const redirectUrl = rawRedirectUrl ? resolveRedirectUrl(rawRedirectUrl, url) : null

      if (!redirectUrl || !isValidUrl(redirectUrl) || !isAllowedUrl(redirectUrl)) {
        return NextResponse.json(
          { success: false, error: 'Redirect to disallowed URL' },
          { status: 403 }
        )
      }

      const redirectController = new AbortController()
      const redirectTimeoutId = setTimeout(() => redirectController.abort(), FETCH_TIMEOUT)

      const redirectResponse = await fetch(redirectUrl, {
        signal: redirectController.signal,
        redirect: 'manual',
        headers: FETCH_HEADERS,
      })

      clearTimeout(redirectTimeoutId)

      if (!redirectResponse.ok) {
        return NextResponse.json(
          { success: false, error: 'Failed to fetch the URL' },
          { status: 502 }
        )
      }

      return handleFetchResponse(redirectResponse, redirectUrl, url)
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch the URL' },
        { status: 502 }
      )
    }

    return handleFetchResponse(response, url, url)
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: 'Request timeout' },
        { status: 504 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch link preview' },
      { status: 500 }
    )
  }
}
