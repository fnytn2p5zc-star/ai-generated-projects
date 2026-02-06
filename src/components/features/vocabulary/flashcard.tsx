'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface FlashcardProps {
  word: string
  reading?: string | null
  meaning: string
  phonetic?: string | null
  exampleSentence?: string | null
  language: string
  onKnow: () => void
  onDontKnow: () => void
}

export function Flashcard({
  word,
  reading,
  meaning,
  phonetic,
  exampleSentence,
  language,
  onKnow,
  onDontKnow,
}: FlashcardProps) {
  const t = useTranslations('vocabulary.review')
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="flashcard-container w-full max-w-md cursor-pointer"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div className={cn('flashcard relative h-64 w-full', isFlipped && 'flipped')}>
          {/* Front */}
          <div className="flashcard-front absolute inset-0 flex flex-col items-center justify-center rounded-2xl border bg-card p-8 shadow-lg">
            <p className={cn(
              'font-bold leading-tight text-center',
              language === 'ja' ? 'text-4xl' : 'text-3xl'
            )}>
              {word}
            </p>
            {language === 'ja' && phonetic && (
              <p className="mt-2 text-sm text-muted-foreground">{phonetic}</p>
            )}
            <p className="mt-6 text-xs text-muted-foreground">{t('flipCard')}</p>
          </div>

          {/* Back */}
          <div className="flashcard-back absolute inset-0 flex flex-col items-center justify-center rounded-2xl border bg-card p-8 shadow-lg">
            {language === 'ja' && reading && (
              <p className="mb-2 text-lg text-muted-foreground">{reading}</p>
            )}
            {language === 'en' && phonetic && (
              <p className="mb-2 text-sm text-muted-foreground">{phonetic}</p>
            )}
            <p className="text-2xl font-bold text-center">{meaning}</p>
            {exampleSentence && (
              <p className="mt-4 text-center text-sm italic text-muted-foreground">
                {exampleSentence}
              </p>
            )}
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="flex gap-4">
          <button
            onClick={onDontKnow}
            className="rounded-xl border-2 border-destructive/30 bg-destructive/10 px-8 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            {t('dontKnow')}
          </button>
          <button
            onClick={onKnow}
            className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 px-8 py-3 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
          >
            {t('knowIt')}
          </button>
        </div>
      )}
    </div>
  )
}
