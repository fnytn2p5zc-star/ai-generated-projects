export type VideoPlatform = 'youtube' | 'bilibili' | null

export interface ParsedVideo {
  platform: VideoPlatform
  videoId: string
  timestamp?: number
  page?: number
}

const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
]

const BILIBILI_PATTERNS = [
  /bilibili\.com\/video\/(BV[a-zA-Z0-9]{10,12})/i,
  /bilibili\.com\/video\/av(\d{1,12})/i,
]

function extractTimestamp(url: string): number | undefined {
  const match = url.match(/[?&]t=(\d+)/)
  return match ? parseInt(match[1], 10) : undefined
}

function extractBilibiliPage(url: string): number | undefined {
  const match = url.match(/[?&]p=(\d+)/)
  return match ? parseInt(match[1], 10) : undefined
}

export function parseVideoUrl(url: string): ParsedVideo | null {
  if (!url || typeof url !== 'string') {
    return null
  }

  const trimmedUrl = url.trim()

  for (const pattern of YOUTUBE_PATTERNS) {
    const match = trimmedUrl.match(pattern)
    if (match) {
      return {
        platform: 'youtube',
        videoId: match[1],
        timestamp: extractTimestamp(trimmedUrl),
      }
    }
  }

  for (const pattern of BILIBILI_PATTERNS) {
    const match = trimmedUrl.match(pattern)
    if (match) {
      const isBV = match[1].startsWith('BV')
      return {
        platform: 'bilibili',
        videoId: isBV ? match[1] : `av${match[1]}`,
        page: extractBilibiliPage(trimmedUrl),
      }
    }
  }

  return null
}

export function getEmbedUrl(parsed: ParsedVideo): string {
  if (parsed.platform === 'youtube') {
    const baseUrl = `https://www.youtube.com/embed/${parsed.videoId}`
    const params = new URLSearchParams()
    if (parsed.timestamp) {
      params.set('start', parsed.timestamp.toString())
    }
    const queryString = params.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }

  if (parsed.platform === 'bilibili') {
    const isBV = parsed.videoId.startsWith('BV')
    const idParam = isBV ? `bvid=${parsed.videoId}` : `aid=${parsed.videoId.slice(2)}`
    const baseUrl = `https://player.bilibili.com/player.html?${idParam}`
    const pageParam = parsed.page ? `&p=${parsed.page}` : ''
    return `${baseUrl}${pageParam}&high_quality=1&autoplay=0`
  }

  return ''
}

export function isVideoUrl(url: string): boolean {
  return parseVideoUrl(url) !== null
}

export function getVideoEmbedUrl(url: string): string | null {
  const parsed = parseVideoUrl(url)
  if (!parsed) {
    return null
  }
  return getEmbedUrl(parsed)
}
