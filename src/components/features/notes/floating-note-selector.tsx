'use client'

import { useTranslations } from 'next-intl'
import { Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Note {
  id: string
  title: string
  updatedAt: Date
}

interface FloatingNoteSelectorProps {
  notes: Note[]
  selectedNoteId: string | null
  onSelectNote: (noteId: string) => void
  onCreateNew: () => void
}

const CREATE_NEW_VALUE = '__create_new__'

export function FloatingNoteSelector({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNew,
}: FloatingNoteSelectorProps) {
  const t = useTranslations('notes')

  const handleValueChange = (value: string) => {
    if (value === CREATE_NEW_VALUE) {
      onCreateNew()
      return
    }
    onSelectNote(value)
  }

  return (
    <Select
      value={selectedNoteId ?? undefined}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="h-8 text-xs">
        <SelectValue placeholder={t('selectNote')} />
      </SelectTrigger>
      <SelectContent className="z-[10000]">
        <SelectItem value={CREATE_NEW_VALUE}>
          <span className="flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            {t('createNewNote')}
          </span>
        </SelectItem>
        {notes.length > 0 && <SelectSeparator />}
        {notes.map((note) => (
          <SelectItem key={note.id} value={note.id}>
            <span className="flex items-center justify-between gap-2">
              <span className="truncate">{note.title}</span>
              <span className="shrink-0 text-[10px] text-muted-foreground">
                {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
