'use server'

import { prisma } from '@/lib/prisma'

export type ReviewEntryType = 'milestone' | 'task'

export type ReviewPeriod = 'today' | 'week' | 'month' | 'all'

export interface ReviewEntry {
  id: string
  type: ReviewEntryType
  title: string
  completedAt: string
  taskId: string
  taskTitle: string
  categories: Array<{ id: string; name: string; color: string }>
}

interface GetReviewEntriesParams {
  period?: ReviewPeriod
  categoryId?: string
  type?: ReviewEntryType | 'all'
  limit?: number
}

const MAX_ENTRIES = 50

function getPeriodStartDate(period: ReviewPeriod): Date | null {
  if (period === 'all') return null

  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (period === 'today') {
    return start
  }

  if (period === 'week') {
    const day = start.getDay()
    start.setDate(start.getDate() - day)
    return start
  }

  if (period === 'month') {
    start.setDate(1)
    return start
  }

  return null
}

export async function getReviewEntries(params: GetReviewEntriesParams = {}) {
  const {
    period = 'week',
    categoryId,
    type = 'all',
    limit = MAX_ENTRIES,
  } = params

  try {
    const periodStart = getPeriodStartDate(period)
    const entries: ReviewEntry[] = []

    if (type === 'all' || type === 'milestone') {
      const planWhere: Record<string, unknown> = {}

      if (categoryId) {
        planWhere.task = { categories: { some: { id: categoryId } } }
      }

      if (periodStart) {
        planWhere.updatedAt = { gte: periodStart }
      }

      const plans = await prisma.learningPlan.findMany({
        where: Object.keys(planWhere).length > 0 ? planWhere : undefined,
        include: {
          task: {
            include: { categories: true },
          },
        },
      })

      for (const plan of plans) {
        const milestones = JSON.parse(plan.milestones) as Array<{
          title: string
          completed: boolean
          completedAt?: string | null
        }>

        const completedMilestones = milestones
          .filter((m) => m.completed && m.completedAt)
          .filter((m) => {
            if (!periodStart) return true
            const completedDate = new Date(m.completedAt!)
            return completedDate >= periodStart
          })

        for (const milestone of completedMilestones) {
          entries.push({
            id: `${plan.id}-${milestone.title}`,
            type: 'milestone',
            title: milestone.title,
            completedAt: milestone.completedAt!,
            taskId: plan.task.id,
            taskTitle: plan.task.title,
            categories: plan.task.categories.map((c) => ({
              id: c.id,
              name: c.name,
              color: c.color,
            })),
          })
        }
      }
    }

    if (type === 'all' || type === 'task') {
      const whereClause: Record<string, unknown> = { status: 'DONE' }

      if (periodStart) {
        whereClause.updatedAt = { gte: periodStart }
      }

      if (categoryId) {
        whereClause.categories = { some: { id: categoryId } }
      }

      const doneTasks = await prisma.task.findMany({
        where: whereClause,
        orderBy: { updatedAt: 'desc' },
        take: limit,
        include: { categories: true },
      })

      for (const task of doneTasks) {
        entries.push({
          id: task.id,
          type: 'task',
          title: task.title,
          completedAt: task.updatedAt.toISOString(),
          taskId: task.id,
          taskTitle: task.title,
          categories: task.categories.map((c) => ({
            id: c.id,
            name: c.name,
            color: c.color,
          })),
        })
      }
    }

    const sorted = [...entries].sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    )

    return { success: true, data: sorted.slice(0, limit) }
  } catch (error) {
    return { success: false, error: 'Failed to fetch review entries' }
  }
}
