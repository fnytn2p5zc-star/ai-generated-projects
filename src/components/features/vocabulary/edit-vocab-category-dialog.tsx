'use client'

import { useState } from 'react'
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
import { updateVocabCategory, deleteVocabCategory } from '@/actions/vocab-categories'

const PRESET_COLORS = [
  '#6B7280', '#EF4444', '#F59E0B', '#10B981',
  '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6',
]

interface EditVocabCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: {
    id: string
    name: string
    nameZh: string
    color: string
  }
  onSuccess: () => void
}

export function EditVocabCategoryDialog({
  open,
  onOpenChange,
  category,
  onSuccess,
}: EditVocabCategoryDialogProps) {
  const t = useTranslations('vocabulary')
  const tCommon = useTranslations('common')
  const [name, setName] = useState(category.name)
  const [nameZh, setNameZh] = useState(category.nameZh)
  const [color, setColor] = useState(category.color)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)
    try {
      const result = await updateVocabCategory({
        id: category.id,
        name: name.trim(),
        nameZh: nameZh.trim(),
        color,
      })

      if (result.success) {
        onSuccess()
      }
    } catch (error) {
      // Error handled by server action
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(t('deleteCategoryConfirm'))) return

    setIsSubmitting(true)
    try {
      await deleteVocabCategory(category.id)
      onSuccess()
    } catch (error) {
      // Error handled by server action
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('editCategory')}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-cat-name">{t('categoryName')}</Label>
            <Input
              id="edit-cat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-cat-name-zh">{t('categoryNameZh')}</Label>
            <Input
              id="edit-cat-name-zh"
              value={nameZh}
              onChange={(e) => setNameZh(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('categoryColor')}</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-7 w-7 rounded-full border-2 transition-transform ${
                    color === c ? 'scale-110 border-foreground' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {tCommon('delete')}
            </Button>
            <div className="flex-1" />
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {tCommon('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting || !name.trim()}>
              {tCommon('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
