'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Trophy } from 'lucide-react'
import {
  getReviewEntries,
  type ReviewEntry,
  type ReviewEntryType,
  type ReviewPeriod,
} from '@/actions/milestones'
import { getCategories } from '@/actions/categories'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { ReviewEntryCard } from './review-entry-card'

interface CategoryOption {
  id: string
  name: string
  color: string
}

interface DateGroup {
  label: string
  date: string
  entries: ReviewEntry[]
}

function groupEntriesByDate(entries: ReviewEntry[], today: Date): DateGroup[] {
  const groups = new Map<string, ReviewEntry[]>()

  for (const entry of entries) {
    const date = new Date(entry.completedAt)
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const existing = groups.get(dateKey) ?? []
    groups.set(dateKey, [...existing, entry])
  }

  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`

  return Array.from(groups.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([dateKey, groupEntries]) => {
      let label: string
      if (dateKey === todayKey) {
        label = 'TODAY'
      } else if (dateKey === yesterdayKey) {
        label = 'YESTERDAY'
      } else {
        label = new Date(dateKey + 'T00:00:00').toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      }

      return {
        label,
        date: dateKey,
        entries: groupEntries,
      }
    })
}

const PERIODS: ReviewPeriod[] = ['today', 'week', 'month', 'all']

type FilterType = ReviewEntryType | 'all'

export function ReviewPage() {
  const t = useTranslations('review')
  const [period, setPeriod] = useState<ReviewPeriod>('week')
  const [categoryId, setCategoryId] = useState<string>('all')
  const [type, setType] = useState<FilterType>('all')
  const [entries, setEntries] = useState<ReviewEntry[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getReviewEntries({
        period,
        categoryId: categoryId === 'all' ? undefined : categoryId,
        type,
      })
      if (result.success && result.data) {
        setEntries(result.data)
      }
    } catch {
      setEntries([])
    } finally {
      setLoading(false)
    }
  }, [period, categoryId, type])

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategories()
      if (result.success && result.data) {
        setCategories(
          result.data.map((c) => ({ id: c.id, name: c.name, color: c.color }))
        )
      }
    } catch {
      setCategories([])
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const periodLabels: Record<ReviewPeriod, string> = {
    today: t('periodToday'),
    week: t('periodWeek'),
    month: t('periodMonth'),
    all: t('periodAll'),
  }

  const dateGroups = groupEntriesByDate(entries, new Date())

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={period}
          onValueChange={(value) => setPeriod(value as ReviewPeriod)}
        >
          <TabsList>
            {PERIODS.map((p) => (
              <TabsTrigger key={p} value={p}>
                {periodLabels[p]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t('allCategories')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allCategories')}</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={(v) => setType(v as FilterType)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('allTypes')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allTypes')}</SelectItem>
              <SelectItem value="milestone">{t('typeMilestone')}</SelectItem>
              <SelectItem value="task">{t('typeTask')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : dateGroups.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Trophy className="h-12 w-12 text-muted-foreground/40" />
            <h2 className="mt-4 text-lg font-semibold text-muted-foreground">
              {t('emptyTitle')}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground/70">
              {t('emptyDescription')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {dateGroups.map((group) => (
            <Card key={group.date}>
              <CardContent className="pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {t('achievements', { count: group.entries.length })}
                  </span>
                </div>
                <div className="divide-y">
                  {group.entries.map((entry) => (
                    <ReviewEntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
