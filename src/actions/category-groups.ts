'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import {
  createCategoryGroupSchema,
  updateCategoryGroupSchema,
  type CreateCategoryGroupInput,
  type UpdateCategoryGroupInput,
} from '@/lib/types'

export async function getCategoriesWithGroups() {
  try {
    const groups = await prisma.categoryGroup.findMany({
      orderBy: { position: 'asc' },
      include: {
        categories: {
          orderBy: { position: 'asc' },
          include: {
            _count: { select: { tasks: true } },
          },
        },
      },
    })

    const ungrouped = await prisma.category.findMany({
      where: { groupId: null },
      orderBy: { position: 'asc' },
      include: {
        _count: { select: { tasks: true } },
      },
    })

    return { success: true, data: { groups, ungrouped } }
  } catch (error) {
    return { success: false, error: 'Failed to fetch categories with groups' }
  }
}

export async function getCategoryGroups() {
  try {
    const groups = await prisma.categoryGroup.findMany({
      orderBy: { position: 'asc' },
    })
    return { success: true, data: groups }
  } catch (error) {
    return { success: false, error: 'Failed to fetch category groups' }
  }
}

export async function createCategoryGroup(input: CreateCategoryGroupInput) {
  try {
    const validated = createCategoryGroupSchema.parse(input)

    const maxPosition = await prisma.categoryGroup.aggregate({
      _max: { position: true },
    })

    const group = await prisma.categoryGroup.create({
      data: {
        ...validated,
        position: (maxPosition._max.position ?? -1) + 1,
      },
    })

    revalidatePath('/[locale]', 'page')
    return { success: true, data: group }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to create category group' }
  }
}

export async function updateCategoryGroup(input: UpdateCategoryGroupInput) {
  try {
    const validated = updateCategoryGroupSchema.parse(input)
    const { id, ...data } = validated

    const existing = await prisma.categoryGroup.findUnique({ where: { id } })
    if (!existing) {
      return { success: false, error: 'Category group not found' }
    }

    const group = await prisma.categoryGroup.update({
      where: { id },
      data,
    })

    revalidatePath('/[locale]', 'page')
    return { success: true, data: group }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to update category group' }
  }
}

export async function deleteCategoryGroup(id: string) {
  try {
    await prisma.categoryGroup.delete({ where: { id } })

    revalidatePath('/[locale]', 'page')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete category group' }
  }
}
