'use client'

import { useTranslations } from 'next-intl'
import { WordCard } from './word-card'
import { BookOpen, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WordWithProgress {
  id: string
  word: string
  reading?: string | null
  meaning: string
  phonetic?: string | null
  language: string
  studyProgress?: { level: string } | null
  category: { id: string; name: string; nameZh: string; color: string }
}

interface WordListProps {
  words: WordWithProgress[]
  onWordClick: (wordId: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isSearching: boolean
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 0) return []
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = [1]

  if (current > 3) {
    pages.push('ellipsis')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('ellipsis')
  }

  pages.push(total)

  return pages
}

export function WordList({
  words,
  onWordClick,
  currentPage,
  totalPages,
  onPageChange,
  isSearching,
}: WordListProps) {
  const t = useTranslations('vocabulary')

  if (words.length === 0) {
    if (isSearching) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-lg font-medium">{t('noSearchResults')}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t('noSearchResultsDescription')}</p>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground/40" />
        <h3 className="mt-4 text-lg font-medium">{t('noWords')}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t('noWordsDescription')}</p>
      </div>
    )
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {words.map((word) => (
          <WordCard
            key={word.id}
            word={word.word}
            reading={word.reading}
            meaning={word.meaning}
            phonetic={word.phonetic}
            language={word.language}
            level={word.studyProgress?.level ?? null}
            categoryColor={word.category.color}
            onClick={() => onWordClick(word.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('pagination.previous')}
          </Button>

          <div className="flex items-center gap-1 px-2">
            {pageNumbers.map((page, idx) =>
              page === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'ghost'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              ),
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="gap-1"
          >
            {t('pagination.next')}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
