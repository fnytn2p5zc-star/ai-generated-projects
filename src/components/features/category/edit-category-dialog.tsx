'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { updateCategory, deleteCategory } from '@/actions/categories'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const PRESET_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#22C55E',
  '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
  '#6B7280', '#78716C',
]

const NO_GROUP_VALUE = '__none__'

interface CategoryData {
  id: string
  name: string
  color: string
  groupId?: string | null
}

interface GroupOption {
  id: string
  name: string
}

interface EditCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: CategoryData
  groups: GroupOption[]
  onSuccess: () => void
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  category,
  groups,
  onSuccess,
}: EditCategoryDialogProps) {
  const t = useTranslations('category')
  const tGroup = useTranslations('categoryGroup')
  const tCommon = useTranslations('common')
  const [name, setName] = useState(category.name)
  const [color, setColor] = useState(category.color)
  const [groupId, setGroupId] = useState<string | null>(category.groupId ?? null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setName(category.name)
    setColor(category.color)
    setGroupId(category.groupId ?? null)
    setError(null)
  }, [category.id, category.name, category.color, category.groupId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await updateCategory({
        id: category.id,
        name,
        color,
        groupId,
      })
      if (result.success) {
        onOpenChange(false)
        onSuccess()
      } else {
        setError(result.error ?? 'Failed to update category')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(t('deleteConfirm'))) return

    setIsDeleting(true)
    try {
      const result = await deleteCategory(category.id)
      if (result.success) {
        onOpenChange(false)
        onSuccess()
      } else {
        setError(result.error ?? 'Failed to delete category')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <DialogTitle>{t('edit')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-category-name">{t('name')}</Label>
              <Input
                id="edit-category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>{t('color')}</Label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={cn(
                      'h-7 w-7 rounded-full transition-all',
                      color === c
                        ? 'ring-2 ring-ring ring-offset-2 ring-offset-background scale-110'
                        : 'hover:scale-105'
                    )}
                    style={{ backgroundColor: c }}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>
            {groups.length > 0 && (
              <div className="grid gap-2">
                <Label>{tGroup('name')}</Label>
                <Select
                  value={groupId ?? NO_GROUP_VALUE}
                  onValueChange={(v) => setGroupId(v === NO_GROUP_VALUE ? null : v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NO_GROUP_VALUE}>
                      {tGroup('noGroup')}
                    </SelectItem>
                    {groups.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter className="flex !justify-between">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              {t('delete')}
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {tCommon('cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? tCommon('loading') : tCommon('save')}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
