'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { updateNote } from '@/actions/notes'
import { useDebounce } from './use-debounce'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface UseAutoSaveOptions {
  noteId: string
  title: string
  content: string
  enabled?: boolean
  delay?: number
}

interface UseAutoSaveReturn {
  saveStatus: SaveStatus
  flush: () => Promise<void>
}

export function useAutoSave({
  noteId,
  title,
  content,
  enabled = true,
  delay = 1500,
}: UseAutoSaveOptions): UseAutoSaveReturn {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const lastSavedRef = useRef({ title, content })
  const isMountedRef = useRef(true)

  const debouncedTitle = useDebounce(title, delay)
  const debouncedContent = useDebounce(content, delay)

  const save = useCallback(
    async (titleToSave: string, contentToSave: string) => {
      if (!noteId || !enabled) return
      if (
        titleToSave === lastSavedRef.current.title &&
        contentToSave === lastSavedRef.current.content
      ) {
        return
      }
      if (!titleToSave.trim()) return

      setSaveStatus('saving')

      try {
        const result = await updateNote({
          id: noteId,
          title: titleToSave.trim(),
          content: contentToSave,
        })

        if (!isMountedRef.current) return

        if (result.success) {
          lastSavedRef.current = {
            title: titleToSave,
            content: contentToSave,
          }
          setSaveStatus('saved')
        } else {
          setSaveStatus('error')
        }
      } catch {
        if (isMountedRef.current) {
          setSaveStatus('error')
        }
      }
    },
    [noteId, enabled]
  )

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    save(debouncedTitle, debouncedContent)
  }, [debouncedTitle, debouncedContent, save, enabled])

  const flush = useCallback(async () => {
    await save(title, content)
  }, [save, title, content])

  return { saveStatus, flush }
}
