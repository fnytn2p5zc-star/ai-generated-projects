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
import { createVocabCategory } from '@/actions/vocab-categories'

const PRESET_COLORS = [
  '#6B7280', '#EF4444', '#F59E0B', '#10B981',
  '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6',
]

interface CreateVocabCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  language: string
  onSuccess: () => void
}

export function CreateVocabCategoryDialog({
  open,
  onOpenChange,
  language,
  onSuccess,
}: CreateVocabCategoryDialogProps) {
  const t = useTranslations('vocabulary')
  const tCommon = useTranslations('common')
  const [name, setName] = useState('')
  const [nameZh, setNameZh] = useState('')
  const [color, setColor] = useState('#6B7280')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)
    try {
      const result = await createVocabCategory({
        name: name.trim(),
        nameZh: nameZh.trim(),
        language,
        color,
      })

      if (result.success) {
        setName('')
        setNameZh('')
        setColor('#6B7280')
        onOpenChange(false)
        onSuccess()
      }
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
          <DialogTitle>{t('createCategory')}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name">{t('categoryName')}</Label>
            <Input
              id="cat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={language === 'ja' ? '食べ物' : 'Food'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-name-zh">{t('categoryNameZh')}</Label>
            <Input
              id="cat-name-zh"
              value={nameZh}
              onChange={(e) => setNameZh(e.target.value)}
              placeholder="食物"
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {tCommon('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting || !name.trim()}>
              {tCommon('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
