'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { cn } from '@/lib/utils'
import { VideoEmbed } from '@/components/ui/video-embed'
import { isVideoUrl } from '@/lib/video-parser'

interface MarkdownRendererProps {
  content: string
  truncate?: boolean
  maxLines?: number
  className?: string
}

export function MarkdownRenderer({
  content,
  truncate = false,
  maxLines = 3,
  className,
}: MarkdownRendererProps) {
  if (!content) {
    return (
      <span className="text-muted-foreground italic">No content</span>
    )
  }

  if (truncate) {
    return (
      <div
        className={cn('prose-content text-sm', className)}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <span className="font-bold">{children}</span>
            ),
            h2: ({ children }) => (
              <span className="font-semibold">{children}</span>
            ),
            h3: ({ children }) => (
              <span className="font-semibold">{children}</span>
            ),
            p: ({ children }) => <span>{children} </span>,
            ul: ({ children }) => <span>{children}</span>,
            ol: ({ children }) => <span>{children}</span>,
            li: ({ children }) => <span>- {children} </span>,
            code: ({ children }) => (
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <span className="rounded bg-muted px-1 text-xs">{children}</span>
            ),
            a: ({ children }) => (
              <span className="text-primary underline">{children}</span>
            ),
            blockquote: ({ children }) => (
              <span className="italic text-muted-foreground">{children}</span>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    )
  }

  return (
    <div className={cn('prose-content', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ href, children }) => {
            if (href && isVideoUrl(href)) {
              return (
                <div className="my-4">
                  <VideoEmbed url={href} />
                </div>
              )
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
