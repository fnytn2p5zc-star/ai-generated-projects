'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import type { LanguageCodeType } from '@/lib/vocab-types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CategoryOption {
  id: string
  name: string
  nameZh: string
}

interface ReviewStartDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  language: string
  categories: CategoryOption[]
  selectedCategoryId: string | null
}

export function ReviewStartDialog({
  open,
  onOpenChange,
  language,
  categories,
  selectedCategoryId,
}: ReviewStartDialogProps) {
  const t = useTranslations('vocabulary.review')
  const tCommon = useTranslations('common')
  const tLevels = useTranslations('vocabulary.levels')
  const router = useRouter()
  const [categoryId, setCategoryId] = useState(selectedCategoryId ?? 'all')
  const [level, setLevel] = useState('ALL')
  const [limit, setLimit] = useState('20')

  const handleStart = () => {
    const params = new URLSearchParams({ lang: language })
    if (categoryId && categoryId !== 'all') {
      params.set('cat', categoryId)
    }
    if (level !== 'ALL') {
      params.set('level', level)
    }
    params.set('limit', limit)

    router.push(`/vocabulary/review?${params.toString()}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('configTitle')}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('selectCategory')}</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t('selectLevel')}</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">{tLevels('ALL')}</SelectItem>
                <SelectItem value="NEW">{tLevels('NEW')}</SelectItem>
                <SelectItem value="LEARNING">{tLevels('LEARNING')}</SelectItem>
                <SelectItem value="REVIEWING">{tLevels('REVIEWING')}</SelectItem>
                <SelectItem value="MASTERED">{tLevels('MASTERED')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t('wordCount')}</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tCommon('cancel')}
          </Button>
          <Button onClick={handleStart}>
            {t('startSession')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
