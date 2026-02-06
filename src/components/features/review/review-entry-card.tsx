'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { ReviewEntry } from '@/actions/milestones'

interface ReviewEntryCardProps {
  entry: ReviewEntry
}

export function ReviewEntryCard({ entry }: ReviewEntryCardProps) {
  const t = useTranslations('review')

  const time = new Date(entry.completedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const isMilestone = entry.type === 'milestone'

  return (
    <div className="flex gap-4 py-3">
      <div className="flex flex-col items-center pt-1">
        <div
          className={cn(
            'h-3 w-3 rounded-full',
            isMilestone ? 'bg-primary' : 'bg-green-500'
          )}
        />
        <div className="mt-1 w-px flex-1 bg-border" />
      </div>

      <div className="flex-1 min-w-0 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground">
              {isMilestone ? t('milestoneReached') : t('taskCompleted')}
            </p>
            <Link
              href={`/tasks/${entry.taskId}`}
              className="block group"
            >
              <p className="mt-0.5 font-medium truncate group-hover:text-primary transition-colors">
                {entry.title}
              </p>
              {isMilestone && (
                <p className="mt-0.5 text-sm text-muted-foreground truncate">
                  {t('inTask')}{' '}
                  <span className="text-foreground/80">{entry.taskTitle}</span>
                </p>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1">
              {entry.categories.map((category) => (
                <span
                  key={category.id}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                  title={category.name}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {time}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
