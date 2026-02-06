'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface WordCardProps {
  word: string
  reading?: string | null
  meaning: string
  phonetic?: string | null
  language: string
  level: string | null
  categoryColor: string
  onClick: () => void
}

const levelColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  LEARNING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  REVIEWING: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  MASTERED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
}

export function WordCard({
  word,
  reading,
  meaning,
  phonetic,
  language,
  level,
  categoryColor,
  onClick,
}: WordCardProps) {
  const t = useTranslations('vocabulary.levels')

  const displayLevel = level ?? 'NEW'
  const colorClass = levelColors[displayLevel] ?? levelColors.NEW

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-1.5 rounded-xl border bg-card p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex w-full items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className={cn(
            'font-semibold leading-tight',
            language === 'ja' ? 'text-xl' : 'text-lg'
          )}>
            {word}
          </p>
          {language === 'ja' && reading && (
            <p className="mt-0.5 text-xs text-muted-foreground">{reading}</p>
          )}
          {language === 'en' && phonetic && (
            <p className="mt-0.5 text-xs text-muted-foreground">{phonetic}</p>
          )}
        </div>
        <span
          className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: categoryColor }}
        />
      </div>
      <p className="text-sm text-muted-foreground line-clamp-1">{meaning}</p>
      <span className={cn('mt-auto rounded-full px-2 py-0.5 text-[10px] font-medium', colorClass)}>
        {t(displayLevel)}
      </span>
    </button>
  )
}
