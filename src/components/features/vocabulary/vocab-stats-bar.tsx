'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

interface VocabStatsBarProps {
  stats: {
    total: number
    new: number
    learning: number
    reviewing: number
    mastered: number
    due: number
  }
  onStartReview: () => void
}

export function VocabStatsBar({ stats, onStartReview }: VocabStatsBarProps) {
  const t = useTranslations('vocabulary')
  const tLevels = useTranslations('vocabulary.levels')
  const tStats = useTranslations('vocabulary.stats')
  const tReview = useTranslations('vocabulary.review')

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <StatBadge label={tLevels('NEW')} count={stats.new} colorClass="bg-blue-500" />
        <StatBadge label={tLevels('LEARNING')} count={stats.learning} colorClass="bg-amber-500" />
        <StatBadge label={tLevels('REVIEWING')} count={stats.reviewing} colorClass="bg-purple-500" />
        <StatBadge label={tLevels('MASTERED')} count={stats.mastered} colorClass="bg-emerald-500" />
        {stats.due > 0 && (
          <span className="ml-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
            {tStats('due')}: {stats.due}
          </span>
        )}
      </div>
      <Button
        size="sm"
        onClick={onStartReview}
        className="ml-auto gap-1.5"
      >
        <Play className="h-3.5 w-3.5" />
        {tReview('startReview')}
      </Button>
    </div>
  )
}

function StatBadge({ label, count, colorClass }: { label: string; count: number; colorClass: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={`h-2 w-2 rounded-full ${colorClass}`} />
      {count} {label}
    </span>
  )
}
