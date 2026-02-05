'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Rnd } from 'react-rnd'
import { useTranslations } from 'next-intl'
import { Minus, X, StickyNote, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingNoteSelector } from './floating-note-selector'
import { FloatingNoteEditor } from './floating-note-editor'

interface Note {
  id: string
  taskId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface FloatingNoteWindowProps {
  taskId: string
  notes: Note[]
  onClose: () => void
  onNoteCreated: (note: Note) => void
  onNoteUpdated: (note: Note) => void
}

const DEFAULT_WIDTH = 500
const DEFAULT_HEIGHT = 500
const MIN_WIDTH = 380
const MIN_HEIGHT = 350
const TITLE_BAR_HEIGHT = 40
const SELECTOR_HEIGHT = 40
const FOOTER_HEIGHT = 8

export function FloatingNoteWindow({
  taskId,
  notes,
  onClose,
  onNoteCreated,
  onNoteUpdated,
}: FloatingNoteWindowProps) {
  const t = useTranslations('notes')

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const sizeBeforeMinimize = useRef(size)
  const boundsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setPosition({
      x: window.innerWidth - DEFAULT_WIDTH - 20,
      y: window.innerHeight - DEFAULT_HEIGHT - 20,
    })
  }, [])

  const selectedNote = notes.find((n) => n.id === selectedNoteId) ?? null

  useEffect(() => {
    if (selectedNoteId && !notes.find((n) => n.id === selectedNoteId)) {
      setSelectedNoteId(null)
    }
  }, [selectedNoteId, notes])

  const handleSelectNote = useCallback((noteId: string) => {
    setIsCreating(false)
    setSelectedNoteId(noteId)
  }, [])

  const handleCreateNew = useCallback(() => {
    setSelectedNoteId(null)
    setIsCreating(true)
  }, [])

  const handleNoteCreated = useCallback(
    (note: Note) => {
      onNoteCreated(note)
      setIsCreating(false)
      setSelectedNoteId(note.id)
    },
    [onNoteCreated]
  )

  const handleMinimize = useCallback(() => {
    if (!isMinimized) {
      sizeBeforeMinimize.current = size
      setSize({ width: size.width, height: TITLE_BAR_HEIGHT })
    } else {
      setSize(sizeBeforeMinimize.current)
    }
    setIsMinimized((prev) => !prev)
  }, [isMinimized, size])

  const editorHeight = Math.max(
    100,
    size.height - TITLE_BAR_HEIGHT - SELECTOR_HEIGHT - FOOTER_HEIGHT - 100
  )

  if (!mounted) return null

  const windowContent = (
    <div className="pointer-events-none fixed inset-0 z-[9999]" ref={boundsRef}>
      <Rnd
        size={{ width: size.width, height: isMinimized ? TITLE_BAR_HEIGHT : size.height }}
        position={position}
        minWidth={MIN_WIDTH}
        minHeight={isMinimized ? TITLE_BAR_HEIGHT : MIN_HEIGHT}
        bounds="parent"
        dragHandleClassName="floating-note-drag-handle"
        enableResizing={!isMinimized}
        onDragStop={(_e, d) => {
          setPosition({ x: d.x, y: d.y })
        }}
        onResizeStop={(_e, _dir, ref, _delta, pos) => {
          const newSize = {
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
          }
          setSize(newSize)
          setPosition(pos)
        }}
        className="pointer-events-auto"
      >
        <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background shadow-xl">
          {/* Title Bar */}
          <div className="floating-note-drag-handle flex shrink-0 cursor-move items-center justify-between border-b bg-muted/50 px-3 py-2">
            <div className="flex items-center gap-2">
              <StickyNote className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t('quickNotes')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleMinimize}
              >
                {isMinimized ? (
                  <Maximize2 className="h-3.5 w-3.5" />
                ) : (
                  <Minus className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive"
                onClick={onClose}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          {!isMinimized && (
            <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
              {/* Note Selector */}
              <div className="shrink-0">
                <FloatingNoteSelector
                  notes={notes}
                  selectedNoteId={selectedNoteId}
                  onSelectNote={handleSelectNote}
                  onCreateNew={handleCreateNew}
                />
              </div>

              {/* Editor */}
              <FloatingNoteEditor
                taskId={taskId}
                note={selectedNote}
                isCreating={isCreating}
                editorHeight={editorHeight}
                onNoteCreated={handleNoteCreated}
                onNoteUpdated={onNoteUpdated}
                onExitCreate={() => setIsCreating(false)}
              />
            </div>
          )}
        </div>
      </Rnd>
    </div>
  )

  return createPortal(windowContent, document.body)
}
