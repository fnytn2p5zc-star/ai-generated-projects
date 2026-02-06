'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Search, FileText, CheckSquare } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SearchResult {
  type: 'task' | 'note'
  id: string
  taskId: string
  title: string
  content: string | null
  taskTitle?: string
  snippet: string
  updatedAt: string
}

export function SearchPage() {
  const t = useTranslations('search')
  const tCommon = useTranslations('common')

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      )
      const data = await response.json()

      if (data.success) {
        setResults(data.data)
      }
    } catch {
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      search(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, search])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t('placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
          autoFocus
        />
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-muted-foreground">
          {tCommon('loading')}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {t('results')} ({results.length})
          </h2>
          <div className="space-y-3">
            {results.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={`/tasks/${result.taskId}`}
              >
                <Card className="transition-colors hover:bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'mt-1 rounded p-1.5',
                          result.type === 'task'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-purple-100 text-purple-600'
                        )}
                      >
                        {result.type === 'task' ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">{result.title}</h3>
                        {result.type === 'note' && result.taskTitle && (
                          <p className="text-xs text-muted-foreground">
                            {t('inTask')}: {result.taskTitle}
                          </p>
                        )}
                        {result.snippet && (
                          <p
                            className="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={{
                              __html: highlightQuery(result.snippet, query),
                            }}
                          />
                        )}
                        <p className="text-xs text-muted-foreground">
                          {new Date(result.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : query.trim() ? (
        <div className="py-8 text-center text-muted-foreground">
          {tCommon('noResults')}
        </div>
      ) : null}
    </div>
  )
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function highlightQuery(text: string, query: string): string {
  const safeText = escapeHtml(text)
  if (!query.trim()) return safeText

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const safeEscapedQuery = escapeHtml(escapedQuery)
  const regex = new RegExp(`(${safeEscapedQuery})`, 'gi')
  return safeText.replace(regex, '<mark class="bg-yellow-200 rounded">$1</mark>')
}
