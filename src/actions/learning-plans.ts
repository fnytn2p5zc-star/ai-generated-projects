'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { learningPlanSchema, type LearningPlanInput } from '@/lib/types'

export async function getLearningPlan(taskId: string) {
  try {
    const plan = await prisma.learningPlan.findUnique({
      where: { taskId },
    })

    if (!plan) {
      return { success: true, data: null }
    }

    return {
      success: true,
      data: {
        ...plan,
        objectives: JSON.parse(plan.objectives),
        resources: JSON.parse(plan.resources),
        milestones: JSON.parse(plan.milestones),
      },
    }
  } catch (error) {
    return { success: false, error: 'Failed to fetch learning plan' }
  }
}

export async function upsertLearningPlan(input: LearningPlanInput) {
  try {
    const validated = learningPlanSchema.parse(input)

    const task = await prisma.task.findUnique({
      where: { id: validated.taskId },
    })

    if (!task) {
      return { success: false, error: 'Task not found' }
    }

    const plan = await prisma.learningPlan.upsert({
      where: { taskId: validated.taskId },
      update: {
        objectives: JSON.stringify(validated.objectives),
        resources: JSON.stringify(validated.resources),
        milestones: JSON.stringify(validated.milestones),
      },
      create: {
        taskId: validated.taskId,
        objectives: JSON.stringify(validated.objectives),
        resources: JSON.stringify(validated.resources),
        milestones: JSON.stringify(validated.milestones),
      },
    })

    revalidatePath(`/[locale]/tasks/${validated.taskId}`, 'page')
    return {
      success: true,
      data: {
        ...plan,
        objectives: validated.objectives,
        resources: validated.resources,
        milestones: validated.milestones,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to save learning plan' }
  }
}

export async function deleteLearningPlan(taskId: string) {
  try {
    await prisma.learningPlan.delete({ where: { taskId } })

    revalidatePath(`/[locale]/tasks/${taskId}`, 'page')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete learning plan' }
  }
}
