'use client'

import { useState, useEffect, useCallback } from 'react'
import { ExternalLink, Globe, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LinkPreviewData {
  title: string
  description: string
  image?: string
  url: string
  domain: string
  favicon?: string
  allowIframe: boolean
}

interface LinkPreviewProps {
  url: string
  className?: string
}

type PreviewState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: LinkPreviewData }

export function LinkPreview({ url, className }: LinkPreviewProps) {
  const [state, setState] = useState<PreviewState>({ status: 'loading' })
  const [iframeError, setIframeError] = useState(false)
  const [imageError, setImageError] = useState(false)

  const fetchPreview = useCallback(async () => {
    setState({ status: 'loading' })
    setIframeError(false)
    setImageError(false)

    try {
      const response = await fetch(
        `/api/link-preview?url=${encodeURIComponent(url)}`
      )
      const result = await response.json()

      if (result.success && result.data) {
        setState({ status: 'success', data: result.data })
      } else {
        setState({ status: 'error', message: result.error || 'Failed to load preview' })
      }
    } catch {
      setState({ status: 'error', message: 'Failed to fetch preview' })
    }
  }, [url])

  useEffect(() => {
    fetchPreview()
  }, [fetchPreview])

  const handleIframeError = () => {
    setIframeError(true)
  }

  if (state.status === 'loading') {
    return (
      <div className={cn('animate-pulse rounded-lg border bg-muted p-4', className)}>
        <div className="flex gap-4">
          <div className="h-16 w-16 rounded bg-muted-foreground/20" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted-foreground/20" />
            <div className="h-3 w-full rounded bg-muted-foreground/20" />
            <div className="h-3 w-1/2 rounded bg-muted-foreground/20" />
          </div>
        </div>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className={cn('flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive', className)}>
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>{state.message}</span>
      </div>
    )
  }

  const { data } = state
  const showIframe = data.allowIframe && !iframeError

  if (showIframe) {
    return (
      <div className={cn('overflow-hidden rounded-lg border', className)}>
        <iframe
          src={url}
          title={data.title}
          className="h-[400px] w-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups"
          onError={handleIframeError}
          loading="lazy"
        />
        <div className="flex items-center justify-between border-t bg-muted/50 px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {data.favicon ? (
              <img
                src={data.favicon}
                alt=""
                className="h-4 w-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <Globe className="h-4 w-4" />
            )}
            <span>{data.domain}</span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Open in new tab
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group block overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent',
        className
      )}
    >
      <div className="flex gap-4 p-4">
        {data.image && !imageError ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
            <img
              src={data.image}
              alt=""
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-muted">
            <Globe className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h4 className="line-clamp-1 font-medium group-hover:text-primary">
            {data.title}
          </h4>
          {data.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {data.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            {data.favicon ? (
              <img
                src={data.favicon}
                alt=""
                className="h-4 w-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <Globe className="h-3 w-3" />
            )}
            <span>{data.domain}</span>
            <ExternalLink className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </a>
  )
}
