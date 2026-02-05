'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import { deleteNote } from '@/actions/notes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NoteEditor } from './note-editor'
import { MarkdownRenderer } from './markdown-renderer'
import { NotePreviewDialog } from './note-preview-dialog'

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
  notes: Note[]
  onNoteCreated: (note: Note) => void
  onNoteUpdated: (note: Note) => void
  onNoteDeleted: (noteId: string) => void
}

export function NotesSection({
  taskId,
  notes,
  onNoteCreated,
  onNoteUpdated,
  onNoteDeleted,
}: NotesSectionProps) {
  const t = useTranslations('notes')
  const router = useRouter()

  const [isCreating, setIsCreating] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [previewNote, setPreviewNote] = useState<Note | null>(null)

  const handleDelete = async (noteId: string) => {
    if (!confirm(t('deleteConfirm'))) return

    const result = await deleteNote(noteId)
    if (result.success) {
      onNoteDeleted(noteId)
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
    <>
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
            <p className="py-8 text-center text-muted-foreground">
              {t('noNotes')}
            </p>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="group cursor-pointer rounded-xl border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                  onClick={() => setPreviewNote(note)}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="font-medium group-hover:text-primary">
                      {note.title}
                    </h3>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewNote(note)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingNote(note)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(note.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    <MarkdownRenderer
                      content={note.content}
                      truncate
                      maxLines={3}
                    />
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Updated: {new Date(note.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <NotePreviewDialog
        note={previewNote}
        open={previewNote !== null}
        onOpenChange={(open) => {
          if (!open) setPreviewNote(null)
        }}
        onEdit={() => {
          if (previewNote) {
            setEditingNote(previewNote)
            setPreviewNote(null)
          }
        }}
      />
    </>
  )
}
