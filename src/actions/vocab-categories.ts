'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import {
  createVocabCategorySchema,
  updateVocabCategorySchema,
  type CreateVocabCategoryInput,
  type UpdateVocabCategoryInput,
} from '@/lib/vocab-types'

export async function getVocabCategories(language: string) {
  try {
    const categories = await prisma.vocabCategory.findMany({
      where: { language },
      orderBy: { position: 'asc' },
      include: {
        _count: { select: { words: true } },
      },
    })
    return { success: true, data: categories }
  } catch (error) {
    return { success: false, error: 'Failed to fetch vocab categories' }
  }
}

export async function createVocabCategory(input: CreateVocabCategoryInput) {
  try {
    const validated = createVocabCategorySchema.parse(input)

    const maxPosition = await prisma.vocabCategory.aggregate({
      where: { language: validated.language },
      _max: { position: true },
    })

    const category = await prisma.vocabCategory.create({
      data: {
        ...validated,
        position: (maxPosition._max.position ?? -1) + 1,
      },
    })

    revalidatePath('/[locale]/vocabulary', 'page')
    return { success: true, data: category }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to create vocab category' }
  }
}

export async function updateVocabCategory(input: UpdateVocabCategoryInput) {
  try {
    const validated = updateVocabCategorySchema.parse(input)
    const { id, ...data } = validated

    const existing = await prisma.vocabCategory.findUnique({ where: { id } })
    if (!existing) {
      return { success: false, error: 'Category not found' }
    }

    const category = await prisma.vocabCategory.update({
      where: { id },
      data,
    })

    revalidatePath('/[locale]/vocabulary', 'page')
    return { success: true, data: category }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to update vocab category' }
  }
}

export async function deleteVocabCategory(id: string) {
  try {
    await prisma.vocabCategory.delete({ where: { id } })

    revalidatePath('/[locale]/vocabulary', 'page')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete vocab category' }
  }
}
