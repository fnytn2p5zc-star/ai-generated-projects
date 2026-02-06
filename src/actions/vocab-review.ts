'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import {
  startReviewSessionSchema,
  submitReviewSchema,
  type StartReviewSessionInput,
  type SubmitReviewInput,
} from '@/lib/vocab-types'

export async function getReviewWords(input: StartReviewSessionInput) {
  try {
    const validated = startReviewSessionSchema.parse(input)
    const now = new Date()

    const wordWhere: Record<string, unknown> = {
      language: validated.language,
    }
    if (validated.categoryId) {
      wordWhere.categoryId = validated.categoryId
    }

    const levelFilter = validated.level !== 'ALL' ? validated.level : undefined

    const words = await prisma.vocabWord.findMany({
      where: {
        ...wordWhere,
        OR: [
          { studyProgress: null },
          {
            studyProgress: {
              nextReviewAt: { lte: now },
              ...(levelFilter ? { level: levelFilter } : {}),
            },
          },
        ],
      },
      take: validated.limit,
      orderBy: { createdAt: 'asc' },
      include: {
        studyProgress: true,
        category: { select: { id: true, name: true, nameZh: true, color: true } },
      },
    })

    return { success: true, data: words }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to fetch review words' }
  }
}

function computeNextLevel(interval: number, streak: number): string {
  if (interval >= 21 && streak >= 5) return 'MASTERED'
  if (interval >= 3) return 'REVIEWING'
  if (streak >= 1) return 'LEARNING'
  return 'NEW'
}

export async function submitReview(input: SubmitReviewInput) {
  try {
    const validated = submitReviewSchema.parse(input)

    const existing = await prisma.vocabStudyProgress.findUnique({
      where: { wordId: validated.wordId },
    })

    const now = new Date()

    if (!existing) {
      const newStreak = validated.correct ? 1 : 0
      const newInterval = validated.correct ? 1 : 0
      const newEase = validated.correct ? 2.6 : 2.3
      const nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000)

      const progress = await prisma.vocabStudyProgress.create({
        data: {
          wordId: validated.wordId,
          level: computeNextLevel(newInterval, newStreak),
          correctCount: validated.correct ? 1 : 0,
          incorrectCount: validated.correct ? 0 : 1,
          streak: newStreak,
          easeFactor: newEase,
          interval: newInterval,
          nextReviewAt: nextReview,
          lastReviewedAt: now,
        },
      })

      revalidatePath('/[locale]/vocabulary', 'page')
      return { success: true, data: progress }
    }

    let newStreak: number
    let newInterval: number
    let newEase: number

    if (validated.correct) {
      newStreak = existing.streak + 1
      newEase = Math.min(existing.easeFactor + 0.1, 3.0)

      if (existing.interval === 0) {
        newInterval = 1
      } else if (existing.interval === 1) {
        newInterval = 3
      } else {
        newInterval = Math.round(existing.interval * newEase)
      }
    } else {
      newStreak = 0
      newInterval = 0
      newEase = Math.max(existing.easeFactor - 0.2, 1.3)
    }

    const nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000)

    const progress = await prisma.vocabStudyProgress.update({
      where: { wordId: validated.wordId },
      data: {
        level: computeNextLevel(newInterval, newStreak),
        correctCount: validated.correct ? existing.correctCount + 1 : existing.correctCount,
        incorrectCount: validated.correct ? existing.incorrectCount : existing.incorrectCount + 1,
        streak: newStreak,
        easeFactor: newEase,
        interval: newInterval,
        nextReviewAt: nextReview,
        lastReviewedAt: now,
      },
    })

    revalidatePath('/[locale]/vocabulary', 'page')
    return { success: true, data: progress }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to submit review' }
  }
}

export async function getVocabStats(language: string, categoryId?: string | null) {
  try {
    const wordWhere: Record<string, unknown> = { language }
    if (categoryId) {
      wordWhere.categoryId = categoryId
    }

    const totalWords = await prisma.vocabWord.count({ where: wordWhere })

    const wordsWithProgress = await prisma.vocabWord.findMany({
      where: wordWhere,
      select: {
        id: true,
        studyProgress: {
          select: { level: true, nextReviewAt: true },
        },
      },
    })

    const now = new Date()
    let newCount = 0
    let learningCount = 0
    let reviewingCount = 0
    let masteredCount = 0
    let dueCount = 0

    for (const word of wordsWithProgress) {
      if (!word.studyProgress) {
        newCount++
        dueCount++
        continue
      }

      switch (word.studyProgress.level) {
        case 'NEW':
          newCount++
          break
        case 'LEARNING':
          learningCount++
          break
        case 'REVIEWING':
          reviewingCount++
          break
        case 'MASTERED':
          masteredCount++
          break
      }

      if (word.studyProgress.nextReviewAt <= now) {
        dueCount++
      }
    }

    return {
      success: true,
      data: {
        total: totalWords,
        new: newCount,
        learning: learningCount,
        reviewing: reviewingCount,
        mastered: masteredCount,
        due: dueCount,
      },
    }
  } catch (error) {
    return { success: false, error: 'Failed to fetch vocab stats' }
  }
}
