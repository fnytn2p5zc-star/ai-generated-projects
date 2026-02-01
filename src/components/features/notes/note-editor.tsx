'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { createNote, updateNote } from '@/actions/notes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

interface Note {
  id: string
  taskId: string
  title: string
  content: string
}

interface NoteEditorProps {
  taskId: string
  note?: Note
  onCancel: () => void
  onSuccess: () => void
}

export function NoteEditor({ taskId, note, onCancel, onSuccess }: NoteEditorProps) {
  const t = useTranslations('notes')
  const tCommon = useTranslations('common')

  const [title, setTitle] = useState(note?.title ?? '')
  const [content, setContent] = useState(note?.content ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      let result

      if (note) {
        result = await updateNote({
          id: note.id,
          title: title.trim(),
          content,
        })
      } else {
        result = await createNote({
          taskId,
          title: title.trim(),
          content,
        })
      }

      if (result.success) {
        onSuccess()
      } else {
        setError(result.error ?? 'Failed to save note')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="note-title">{t('noteTitle')}</Label>
        <Input
          id="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
        />
      </div>

      <div className="space-y-2">
        <Label>{t('content')}</Label>
        <div data-color-mode="light">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val ?? '')}
            height={400}
            preview="edit"
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          {tCommon('cancel')}
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? tCommon('loading') : tCommon('save')}
        </Button>
      </div>
    </div>
  )
}
