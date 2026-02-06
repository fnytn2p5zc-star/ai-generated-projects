'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateVocabWord, deleteVocabWord } from '@/actions/vocab-words'
import { cn } from '@/lib/utils'

const levelColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  LEARNING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  REVIEWING: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  MASTERED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
}

interface CategoryOption {
  id: string
  name: string
  nameZh: string
}

interface WordData {
  id: string
  word: string
  reading?: string | null
  meaning: string
  phonetic?: string | null
  exampleSentence?: string | null
  language: string
  categoryId: string
  studyProgress?: {
    level: string
    correctCount: number
    incorrectCount: number
    streak: number
  } | null
}

interface WordDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  word: WordData
  categories: CategoryOption[]
  onSuccess: () => void
}

export function WordDetailDialog({
  open,
  onOpenChange,
  word,
  categories,
  onSuccess,
}: WordDetailDialogProps) {
  const t = useTranslations('vocabulary')
  const tCommon = useTranslations('common')
  const tLevels = useTranslations('vocabulary.levels')
  const [isEditing, setIsEditing] = useState(false)
  const [editWord, setEditWord] = useState(word.word)
  const [editReading, setEditReading] = useState(word.reading ?? '')
  const [editMeaning, setEditMeaning] = useState(word.meaning)
  const [editPhonetic, setEditPhonetic] = useState(word.phonetic ?? '')
  const [editExample, setEditExample] = useState(word.exampleSentence ?? '')
  const [editCategoryId, setEditCategoryId] = useState(word.categoryId)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setEditWord(word.word)
    setEditReading(word.reading ?? '')
    setEditMeaning(word.meaning)
    setEditPhonetic(word.phonetic ?? '')
    setEditExample(word.exampleSentence ?? '')
    setEditCategoryId(word.categoryId)
    setIsEditing(false)
  }, [word])

  const handleSave = async () => {
    if (!editWord.trim() || !editMeaning.trim()) return

    setIsSubmitting(true)
    try {
      const result = await updateVocabWord({
        id: word.id,
        word: editWord.trim(),
        reading: editReading.trim() || null,
        meaning: editMeaning.trim(),
        phonetic: editPhonetic.trim() || null,
        exampleSentence: editExample.trim() || null,
        categoryId: editCategoryId,
      })

      if (result.success) {
        setIsEditing(false)
        onSuccess()
      }
    } catch (error) {
      // Error handled by server action
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(t('deleteWordConfirm'))) return

    setIsSubmitting(true)
    try {
      await deleteVocabWord(word.id)
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      // Error handled by server action
    } finally {
      setIsSubmitting(false)
    }
  }

  const level = word.studyProgress?.level ?? 'NEW'
  const colorClass = levelColors[level] ?? levelColors.NEW

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? t('editWord') : word.word}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {!isEditing ? (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', colorClass)}>
                  {tLevels(level)}
                </span>
                {word.studyProgress && (
                  <span className="text-xs text-muted-foreground">
                    {word.studyProgress.correctCount}✓ {word.studyProgress.incorrectCount}✗ | streak: {word.studyProgress.streak}
                  </span>
                )}
              </div>
              {word.reading && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground">{t('reading')}</span>
                  <p className="text-sm">{word.reading}</p>
                </div>
              )}
              <div>
                <span className="text-xs font-medium text-muted-foreground">{t('meaning')}</span>
                <p className="text-sm">{word.meaning}</p>
              </div>
              {word.phonetic && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground">{t('phonetic')}</span>
                  <p className="text-sm">{word.phonetic}</p>
                </div>
              )}
              {word.exampleSentence && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground">{t('example')}</span>
                  <p className="text-sm italic">{word.exampleSentence}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isSubmitting}>
                {tCommon('delete')}
              </Button>
              <div className="flex-1" />
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                {tCommon('edit')}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>{t('word')}</Label>
              <Input value={editWord} onChange={(e) => setEditWord(e.target.value)} />
            </div>
            {word.language === 'ja' && (
              <div className="space-y-2">
                <Label>{t('reading')}</Label>
                <Input value={editReading} onChange={(e) => setEditReading(e.target.value)} />
              </div>
            )}
            <div className="space-y-2">
              <Label>{t('meaning')}</Label>
              <Input value={editMeaning} onChange={(e) => setEditMeaning(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('phonetic')}</Label>
              <Input value={editPhonetic} onChange={(e) => setEditPhonetic(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('example')}</Label>
              <Input value={editExample} onChange={(e) => setEditExample(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('category')}</Label>
              <Select value={editCategoryId} onValueChange={setEditCategoryId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                {tCommon('cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting || !editWord.trim() || !editMeaning.trim()}>
                {tCommon('save')}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
