'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import {
  createTaskSchema,
  updateTaskSchema,
  type CreateTaskInput,
  type UpdateTaskInput,
  type TaskStatusType,
} from '@/lib/types'

export async function getTasks(categoryId?: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: categoryId
        ? { categories: { some: { id: categoryId } } }
        : undefined,
      orderBy: [{ status: 'asc' }, { position: 'asc' }, { createdAt: 'desc' }],
      include: {
        learningPlan: true,
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
        categories: true,
      },
    })
    return { success: true, data: tasks }
  } catch (error) {
    return { success: false, error: 'Failed to fetch tasks' }
  }
}

export async function getTask(id: string) {
  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        learningPlan: true,
        notes: {
          orderBy: { createdAt: 'desc' },
        },
        categories: true,
      },
    })

    if (!task) {
      return { success: false, error: 'Task not found' }
    }

    return { success: true, data: task }
  } catch (error) {
    return { success: false, error: 'Failed to fetch task' }
  }
}

export async function createTask(input: CreateTaskInput) {
  try {
    const validated = createTaskSchema.parse(input)

    const maxPosition = await prisma.task.aggregate({
      where: { status: validated.status },
      _max: { position: true },
    })

    const task = await prisma.task.create({
      data: {
        ...validated,
        dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        position: (maxPosition._max.position ?? -1) + 1,
      },
    })

    revalidatePath('/[locale]', 'page')
    return { success: true, data: task }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to create task' }
  }
}

export async function updateTask(input: UpdateTaskInput) {
  try {
    const validated = updateTaskSchema.parse(input)
    const { id, ...data } = validated

    const existingTask = await prisma.task.findUnique({ where: { id } })
    if (!existingTask) {
      return { success: false, error: 'Task not found' }
    }

    const updateData: Record<string, unknown> = { ...data }
    if (data.dueDate !== undefined) {
      updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    })

    revalidatePath('/[locale]', 'page')
    revalidatePath(`/[locale]/tasks/${id}`, 'page')
    return { success: true, data: task }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to update task' }
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({ where: { id } })

    revalidatePath('/[locale]', 'page')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete task' }
  }
}

export async function moveTask(
  id: string,
  newStatus: TaskStatusType,
  newPosition: number
) {
  try {
    const task = await prisma.task.findUnique({ where: { id } })
    if (!task) {
      return { success: false, error: 'Task not found' }
    }

    const oldStatus = task.status
    const oldPosition = task.position

    await prisma.$transaction(async (tx) => {
      if (oldStatus === newStatus) {
        if (newPosition > oldPosition) {
          await tx.task.updateMany({
            where: {
              status: newStatus,
              position: { gt: oldPosition, lte: newPosition },
            },
            data: { position: { decrement: 1 } },
          })
        } else if (newPosition < oldPosition) {
          await tx.task.updateMany({
            where: {
              status: newStatus,
              position: { gte: newPosition, lt: oldPosition },
            },
            data: { position: { increment: 1 } },
          })
        }
      } else {
        await tx.task.updateMany({
          where: {
            status: oldStatus,
            position: { gt: oldPosition },
          },
          data: { position: { decrement: 1 } },
        })

        await tx.task.updateMany({
          where: {
            status: newStatus,
            position: { gte: newPosition },
          },
          data: { position: { increment: 1 } },
        })
      }

      await tx.task.update({
        where: { id },
        data: { status: newStatus, position: newPosition },
      })
    })

    revalidatePath('/[locale]', 'page')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to move task' }
  }
}
