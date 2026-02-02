'use client'

import { useTranslations } from 'next-intl'
import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MarkdownRenderer } from './markdown-renderer'

interface Note {
  id: string
  taskId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface NotePreviewDialogProps {
  note: Note | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: () => void
}

export function NotePreviewDialog({
  note,
  open,
  onOpenChange,
  onEdit,
}: NotePreviewDialogProps) {
  const t = useTranslations('notes')

  if (!note) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden">
        <DialogHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="flex-1 pr-8">
            <DialogTitle className="text-xl">{note.title}</DialogTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Updated: {new Date(note.updatedAt).toLocaleString()}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onOpenChange(false)
              onEdit()
            }}
            className="shrink-0"
          >
            <Pencil className="mr-2 h-4 w-4" />
            {t('editNote')}
          </Button>
        </DialogHeader>
        <div className="max-h-[calc(85vh-120px)] overflow-y-auto rounded-lg border bg-muted/30 p-4">
          <MarkdownRenderer content={note.content} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
