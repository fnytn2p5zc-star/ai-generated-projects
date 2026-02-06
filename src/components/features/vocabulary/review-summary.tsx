'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, BarChart3 } from 'lucide-react'

interface ReviewSummaryProps {
  correct: number
  incorrect: number
  onReviewAgain: () => void
  hasIncorrect: boolean
}

export function ReviewSummary({
  correct,
  incorrect,
  onReviewAgain,
  hasIncorrect,
}: ReviewSummaryProps) {
  const t = useTranslations('vocabulary.review')
  const router = useRouter()

  const total = correct + incorrect
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-8">
      <h2 className="text-2xl font-bold">{t('summaryTitle')}</h2>

      <div className="flex w-full gap-4">
        <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border bg-emerald-500/10 p-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{correct}</span>
          <span className="text-xs text-muted-foreground">{t('correct')}</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border bg-destructive/10 p-4">
          <XCircle className="h-8 w-8 text-destructive" />
          <span className="text-2xl font-bold text-destructive">{incorrect}</span>
          <span className="text-xs text-muted-foreground">{t('incorrect')}</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border bg-primary/10 p-4">
          <BarChart3 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">{accuracy}%</span>
          <span className="text-xs text-muted-foreground">{t('accuracy')}</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        {hasIncorrect && (
          <Button variant="outline" onClick={onReviewAgain}>
            {t('reviewAgain')}
          </Button>
        )}
        <Button onClick={() => router.push('/vocabulary')}>
          {t('backToVocab')}
        </Button>
      </div>
    </div>
  )
}
