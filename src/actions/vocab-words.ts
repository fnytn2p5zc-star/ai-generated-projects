'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import {
  createVocabWordSchema,
  updateVocabWordSchema,
  type CreateVocabWordInput,
  type UpdateVocabWordInput,
} from '@/lib/vocab-types'

export async function getVocabWords(language: string, categoryId?: string | null) {
  try {
    const where: Record<string, unknown> = { language }
    if (categoryId) {
      where.categoryId = categoryId
    }

    const words = await prisma.vocabWord.findMany({
      where,
      orderBy: { position: 'asc' },
      include: {
        studyProgress: true,
        category: { select: { id: true, name: true, nameZh: true, color: true } },
      },
    })
    return { success: true, data: words }
  } catch (error) {
    return { success: false, error: 'Failed to fetch vocab words' }
  }
}

export async function createVocabWord(input: CreateVocabWordInput) {
  try {
    const validated = createVocabWordSchema.parse(input)

    const maxPosition = await prisma.vocabWord.aggregate({
      where: { categoryId: validated.categoryId },
      _max: { position: true },
    })

    const word = await prisma.vocabWord.create({
      data: {
        ...validated,
        reading: validated.reading ?? null,
        phonetic: validated.phonetic ?? null,
        exampleSentence: validated.exampleSentence ?? null,
        position: (maxPosition._max.position ?? -1) + 1,
      },
      include: {
        studyProgress: true,
        category: { select: { id: true, name: true, nameZh: true, color: true } },
      },
    })

    revalidatePath('/[locale]/vocabulary', 'page')
    return { success: true, data: word }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to create vocab word' }
  }
}

export async function updateVocabWord(input: UpdateVocabWordInput) {
  try {
    const validated = updateVocabWordSchema.parse(input)
    const { id, ...data } = validated

    const existing = await prisma.vocabWord.findUnique({ where: { id } })
    if (!existing) {
      return { success: false, error: 'Word not found' }
    }

    const word = await prisma.vocabWord.update({
      where: { id },
      data,
      include: {
        studyProgress: true,
        category: { select: { id: true, name: true, nameZh: true, color: true } },
      },
    })

    revalidatePath('/[locale]/vocabulary', 'page')
    return { success: true, data: word }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to update vocab word' }
  }
}

export async function deleteVocabWord(id: string) {
  try {
    await prisma.vocabWord.delete({ where: { id } })

    revalidatePath('/[locale]/vocabulary', 'page')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete vocab word' }
  }
}
