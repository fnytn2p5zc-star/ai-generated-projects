'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { getReviewWords } from '@/actions/vocab-review'
import { submitReview } from '@/actions/vocab-review'
import { Flashcard } from './flashcard'
import { ReviewSummary } from './review-summary'
import { BookOpen, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WordForReview {
  id: string
  word: string
  reading?: string | null
  meaning: string
  phonetic?: string | null
  exampleSentence?: string | null
  language: string
}

interface ReviewSessionProps {
  language: string
  categoryId: string | null
  level: string
  limit: number
}

export function ReviewSession({ language, categoryId, level, limit }: ReviewSessionProps) {
  const t = useTranslations('vocabulary.review')
  const router = useRouter()
  const [words, setWords] = useState<WordForReview[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [incorrectWords, setIncorrectWords] = useState<WordForReview[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isReviewingIncorrect, setIsReviewingIncorrect] = useState(false)

  const fetchWords = useCallback(async () => {
    setIsLoading(true)
    const result = await getReviewWords({
      language: language as 'en' | 'ja',
      categoryId,
      level: level as 'NEW' | 'LEARNING' | 'REVIEWING' | 'MASTERED' | 'ALL',
      limit,
    })

    if (result.success && result.data) {
      setWords(result.data)
    }
    setIsLoading(false)
  }, [language, categoryId, level, limit])

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  const handleAnswer = async (correct: boolean) => {
    const currentWord = words[currentIndex]
    if (!currentWord) return

    await submitReview({ wordId: currentWord.id, correct })

    if (correct) {
      setCorrectCount((prev) => prev + 1)
    } else {
      setIncorrectCount((prev) => prev + 1)
      setIncorrectWords((prev) => [...prev, currentWord])
    }

    if (currentIndex + 1 >= words.length) {
      setIsComplete(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleReviewAgain = () => {
    setWords(incorrectWords)
    setCurrentIndex(0)
    setCorrectCount(0)
    setIncorrectCount(0)
    setIncorrectWords([])
    setIsComplete(false)
    setIsReviewingIncorrect(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-muted-foreground">{t('reviewTitle')}...</p>
      </div>
    )
  }

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground/40" />
        <h3 className="mt-4 text-lg font-medium">{t('noWordsToReview')}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t('noWordsDescription')}</p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => router.push('/vocabulary')}
        >
          {t('backToVocab')}
        </Button>
      </div>
    )
  }

  if (isComplete) {
    return (
      <ReviewSummary
        correct={correctCount}
        incorrect={incorrectCount}
        onReviewAgain={handleReviewAgain}
        hasIncorrect={incorrectWords.length > 0 && !isReviewingIncorrect}
      />
    )
  }

  const currentWord = words[currentIndex]
  if (!currentWord) return null

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/vocabulary')}
          className="gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToVocab')}
        </Button>
        <span className="text-sm font-medium text-muted-foreground">
          {t('progress', { current: currentIndex + 1, total: words.length })}
        </span>
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIndex) / words.length) * 100}%` }}
        />
      </div>

      <Flashcard
        key={currentWord.id + currentIndex}
        word={currentWord.word}
        reading={currentWord.reading}
        meaning={currentWord.meaning}
        phonetic={currentWord.phonetic}
        exampleSentence={currentWord.exampleSentence}
        language={currentWord.language}
        onKnow={() => handleAnswer(true)}
        onDontKnow={() => handleAnswer(false)}
      />
    </div>
  )
}
