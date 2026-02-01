'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import {
  createNoteSchema,
  updateNoteSchema,
  type CreateNoteInput,
  type UpdateNoteInput,
} from '@/lib/types'

export async function getNotes(taskId: string) {
  try {
    const notes = await prisma.note.findMany({
      where: { taskId },
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, data: notes }
  } catch (error) {
    return { success: false, error: 'Failed to fetch notes' }
  }
}

export async function getNote(id: string) {
  try {
    const note = await prisma.note.findUnique({
      where: { id },
      include: { task: true },
    })

    if (!note) {
      return { success: false, error: 'Note not found' }
    }

    return { success: true, data: note }
  } catch (error) {
    return { success: false, error: 'Failed to fetch note' }
  }
}

export async function createNote(input: CreateNoteInput) {
  try {
    const validated = createNoteSchema.parse(input)

    const task = await prisma.task.findUnique({
      where: { id: validated.taskId },
    })

    if (!task) {
      return { success: false, error: 'Task not found' }
    }

    const note = await prisma.note.create({
      data: validated,
    })

    revalidatePath(`/[locale]/tasks/${validated.taskId}`, 'page')
    return { success: true, data: note }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to create note' }
  }
}

export async function updateNote(input: UpdateNoteInput) {
  try {
    const validated = updateNoteSchema.parse(input)
    const { id, ...data } = validated

    const existingNote = await prisma.note.findUnique({ where: { id } })
    if (!existingNote) {
      return { success: false, error: 'Note not found' }
    }

    const note = await prisma.note.update({
      where: { id },
      data,
    })

    revalidatePath(`/[locale]/tasks/${existingNote.taskId}`, 'page')
    return { success: true, data: note }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Failed to update note' }
  }
}

export async function deleteNote(id: string) {
  try {
    const note = await prisma.note.findUnique({ where: { id } })
    if (!note) {
      return { success: false, error: 'Note not found' }
    }

    await prisma.note.delete({ where: { id } })

    revalidatePath(`/[locale]/tasks/${note.taskId}`, 'page')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete note' }
  }
}
