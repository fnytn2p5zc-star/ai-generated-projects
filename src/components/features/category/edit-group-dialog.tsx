'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { updateCategoryGroup, deleteCategoryGroup } from '@/actions/category-groups'
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
import { Trash2 } from 'lucide-react'

interface GroupData {
  id: string
  name: string
}

interface EditGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: GroupData
  onSuccess: () => void
}

export function EditGroupDialog({
  open,
  onOpenChange,
  group,
  onSuccess,
}: EditGroupDialogProps) {
  const t = useTranslations('categoryGroup')
  const tCommon = useTranslations('common')
  const [name, setName] = useState(group.name)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setName(group.name)
    setError(null)
  }, [group.id, group.name])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await updateCategoryGroup({ id: group.id, name })
      if (result.success) {
        onOpenChange(false)
        onSuccess()
      } else {
        setError(result.error ?? 'Failed to update group')
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
      const result = await deleteCategoryGroup(group.id)
      if (result.success) {
        onOpenChange(false)
        onSuccess()
      } else {
        setError(result.error ?? 'Failed to delete group')
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
              <Label htmlFor="edit-group-name">{t('name')}</Label>
              <Input
                id="edit-group-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder')}
                required
              />
            </div>
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
