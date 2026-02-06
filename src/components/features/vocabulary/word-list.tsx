'use client'

import { useTranslations } from 'next-intl'
import { WordCard } from './word-card'
import { BookOpen } from 'lucide-react'

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
}

export function WordList({ words, onWordClick }: WordListProps) {
  const t = useTranslations('vocabulary')

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground/40" />
        <h3 className="mt-4 text-lg font-medium">{t('noWords')}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t('noWordsDescription')}</p>
      </div>
    )
  }

  return (
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
  )
}
