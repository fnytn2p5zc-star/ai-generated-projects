'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { deleteNote } from '@/actions/notes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NoteEditor } from './note-editor'

interface Note {
  id: string
  taskId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface NotesSectionProps {
  taskId: string
  initialNotes: Note[]
}

export function NotesSection({ taskId, initialNotes }: NotesSectionProps) {
  const t = useTranslations('notes')
  const tCommon = useTranslations('common')
  const router = useRouter()

  const [notes, setNotes] = useState(initialNotes)
  const [isCreating, setIsCreating] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const handleDelete = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return

    const result = await deleteNote(noteId)
    if (result.success) {
      setNotes(notes.filter((n) => n.id !== noteId))
      router.refresh()
    }
  }

  const handleCreateSuccess = () => {
    setIsCreating(false)
    router.refresh()
  }

  const handleEditSuccess = () => {
    setEditingNote(null)
    router.refresh()
  }

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('createNote')}</CardTitle>
        </CardHeader>
        <CardContent>
          <NoteEditor
            taskId={taskId}
            onCancel={() => setIsCreating(false)}
            onSuccess={handleCreateSuccess}
          />
        </CardContent>
      </Card>
    )
  }

  if (editingNote) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('editNote')}</CardTitle>
        </CardHeader>
        <CardContent>
          <NoteEditor
            taskId={taskId}
            note={editingNote}
            onCancel={() => setEditingNote(null)}
            onSuccess={handleEditSuccess}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('title')}</CardTitle>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('createNote')}
        </Button>
      </CardHeader>
      <CardContent>
        {notes.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">{t('noNotes')}</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-medium">{note.title}</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingNote(note)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {note.content || 'No content'}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Updated: {new Date(note.updatedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
