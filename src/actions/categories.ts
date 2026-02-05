'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import {
  createCategorySchema,
  updateCategorySchema,
  updateTaskCategoriesSchema,
  type CreateCategoryInput,
  type UpdateCategoryInput,
  type UpdateTaskCategoriesInput,
} from '@/lib/types'

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { position: 'asc' },
      include: {
        _count: { select: { tasks: true } },
      },
    })
    return { success: true, data: categories }
  } catch (error) {
    return { success: false, error: 'Failed to fetch categories' }
  }
}

export async function createCategory(input: CreateCategoryInput) {
  try {
    const validated = createCategorySchema.parse(input)

    const maxPosition = await prisma.category.aggregate({
      _max: { position: true },
    })

    const category = await prisma.category.create({
      data: {
        ...validated,
        position: (maxPosition._max.position ?? -1) + 1,
      },
    })

    revalidatePath('/[locale]', 'page')
    return { success: true, data: category }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to create category' }
  }
}

export async function updateCategory(input: UpdateCategoryInput) {
  try {
    const validated = updateCategorySchema.parse(input)
    const { id, ...data } = validated

    const existing = await prisma.category.findUnique({ where: { id } })
    if (!existing) {
      return { success: false, error: 'Category not found' }
    }

    const { groupId, ...rest } = data
    const updateData = groupId !== undefined
      ? { ...rest, groupId: groupId ?? null }
      : rest

    const category = await prisma.category.update({
      where: { id },
      data: updateData,
    })

    revalidatePath('/[locale]', 'page')
    return { success: true, data: category }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to update category' }
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } })

    revalidatePath('/[locale]', 'page')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete category' }
  }
}

export async function updateTaskCategories(input: UpdateTaskCategoriesInput) {
  try {
    const validated = updateTaskCategoriesSchema.parse(input)

    const task = await prisma.task.update({
      where: { id: validated.taskId },
      data: {
        categories: {
          set: validated.categoryIds.map((id) => ({ id })),
        },
      },
      include: { categories: true },
    })

    revalidatePath('/[locale]', 'page')
    revalidatePath(`/[locale]/tasks/${validated.taskId}`, 'page')
    return { success: true, data: task }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to update task categories' }
  }
}
