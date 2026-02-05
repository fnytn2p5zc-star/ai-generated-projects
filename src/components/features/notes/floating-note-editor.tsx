'use client'

import { useState, useCallback, useRef } from 'react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { createNote } from '@/actions/notes'
import { useAutoSave } from '@/hooks/use-auto-save'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

interface Note {
  id: string
  taskId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface FloatingNoteEditorProps {
  taskId: string
  note: Note | null
  isCreating: boolean
  editorHeight: number
  onNoteCreated: (note: Note) => void
  onNoteUpdated: (note: Note) => void
  onExitCreate: () => void
}

function SaveStatusIndicator({ status }: { status: string }) {
  const t = useTranslations('notes')

  const config: Record<string, { text: string; className: string }> = {
    saving: { text: t('saving'), className: 'text-muted-foreground' },
    saved: { text: t('autoSaved'), className: 'text-green-600' },
    error: { text: t('saveError'), className: 'text-destructive' },
  }

  const current = config[status]
  if (!current) return null

  return (
    <span className={cn('text-xs', current.className)}>{current.text}</span>
  )
}

function ExistingNoteEditor({
  note,
  editorHeight,
  onNoteUpdated,
}: {
  note: Note
  editorHeight: number
  onNoteUpdated: (note: Note) => void
}) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const titleRef = useRef(title)
  const contentRef = useRef(content)
  const t = useTranslations('notes')

  titleRef.current = title
  contentRef.current = content

  const { saveStatus } = useAutoSave({
    noteId: note.id,
    title,
    content,
    enabled: true,
  })

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value
      setTitle(newTitle)
      if (newTitle.trim()) {
        onNoteUpdated({ ...note, title: newTitle, content: contentRef.current })
      }
    },
    [note, onNoteUpdated]
  )

  const handleContentChange = useCallback(
    (val: string | undefined) => {
      const newContent = val ?? ''
      setContent(newContent)
      onNoteUpdated({ ...note, title: titleRef.current, content: newContent })
    },
    [note, onNoteUpdated]
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <Input
        value={title}
        onChange={handleTitleChange}
        placeholder={t('noteTitle')}
        className="h-8 text-sm"
      />
      <div className="min-h-0 flex-1" data-color-mode="light">
        <MDEditor
          value={content}
          onChange={handleContentChange}
          height={editorHeight}
          preview="edit"
          visibleDragbar={false}
        />
      </div>
      <div className="flex justify-end">
        <SaveStatusIndicator status={saveStatus} />
      </div>
    </div>
  )
}

function NewNoteEditor({
  taskId,
  editorHeight,
  onNoteCreated,
  onCancel,
}: {
  taskId: string
  editorHeight: number
  onNoteCreated: (note: Note) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useTranslations('notes')
  const tCommon = useTranslations('common')

  const handleCreate = async () => {
    if (!title.trim()) {
      setError(t('titleRequired'))
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      const result = await createNote({
        taskId,
        title: title.trim(),
        content,
      })

      if (result.success && result.data) {
        onNoteCreated(result.data as Note)
      } else {
        setError(result.error ?? t('saveError'))
      }
    } catch {
      setError(t('saveError'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <Input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          if (error) setError(null)
        }}
        placeholder={t('noteTitle')}
        className="h-8 text-sm"
        autoFocus
      />
      <div className="min-h-0 flex-1" data-color-mode="light">
        <MDEditor
          value={content}
          onChange={(val) => setContent(val ?? '')}
          height={editorHeight}
          preview="edit"
          visibleDragbar={false}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          {tCommon('cancel')}
        </Button>
        <Button size="sm" onClick={handleCreate} disabled={isSaving}>
          {isSaving ? tCommon('loading') : tCommon('save')}
        </Button>
      </div>
    </div>
  )
}

export function FloatingNoteEditor({
  taskId,
  note,
  isCreating,
  editorHeight,
  onNoteCreated,
  onNoteUpdated,
  onExitCreate,
}: FloatingNoteEditorProps) {
  const t = useTranslations('notes')

  if (isCreating) {
    return (
      <NewNoteEditor
        taskId={taskId}
        editorHeight={editorHeight}
        onNoteCreated={onNoteCreated}
        onCancel={onExitCreate}
      />
    )
  }

  if (note) {
    return (
      <ExistingNoteEditor
        key={note.id}
        note={note}
        editorHeight={editorHeight}
        onNoteUpdated={onNoteUpdated}
      />
    )
  }

  return (
    <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
      {t('selectNote')}
    </div>
  )
}
