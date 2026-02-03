'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { parseVideoUrl, getEmbedUrl } from '@/lib/video-parser'
import { ExternalLink } from 'lucide-react'

interface VideoEmbedProps {
  url: string
  className?: string
  title?: string
}

function isSafeUrl(url: string): boolean {
  return url.startsWith('https://') || url.startsWith('http://')
}

export function VideoEmbed({ url, className, title }: VideoEmbedProps) {
  const parsed = parseVideoUrl(url)

  if (!parsed) {
    const safeUrl = isSafeUrl(url) ? url : '#'
    return (
      <a
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
      >
        <ExternalLink className="h-3 w-3" />
        {title || url}
      </a>
    )
  }

  const embedUrl = getEmbedUrl(parsed)
  const platformLabel = parsed.platform === 'youtube' ? 'YouTube' : 'Bilibili'

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={title || `${platformLabel} video player`}
          className="absolute inset-0 h-full w-full"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  )
}
