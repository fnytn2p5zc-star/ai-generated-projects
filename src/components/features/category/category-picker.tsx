'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Tags } from 'lucide-react'
import { getCategories, updateTaskCategories } from '@/actions/categories'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface CategoryOnTask {
  id: string
  name: string
  color: string
}

interface CategoryPickerProps {
  taskId: string
  selectedCategories: CategoryOnTask[]
  onCategoriesChanged: (categories: CategoryOnTask[]) => void
}

interface CategoryOption {
  id: string
  name: string
  color: string
  position: number
  _count: { tasks: number }
}

export function CategoryPicker({
  taskId,
  selectedCategories,
  onCategoriesChanged,
}: CategoryPickerProps) {
  const t = useTranslations('category')
  const [allCategories, setAllCategories] = useState<CategoryOption[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const loadCategories = useCallback(async () => {
    const result = await getCategories()
    if (result.success && result.data) {
      setAllCategories(result.data)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      loadCategories()
    }
  }, [isOpen, loadCategories])

  const selectedIds = new Set(selectedCategories.map((c) => c.id))

  const handleToggle = async (category: CategoryOption) => {
    const newIds = selectedIds.has(category.id)
      ? [...selectedIds].filter((id) => id !== category.id)
      : [...selectedIds, category.id]

    const result = await updateTaskCategories({
      taskId,
      categoryIds: newIds,
    })

    if (result.success && result.data) {
      onCategoriesChanged(result.data.categories)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs">
          <Tags className="h-3 w-3" />
          {t('assignCategories')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <div className="space-y-1">
          {allCategories.length === 0 && (
            <p className="px-2 py-3 text-center text-xs text-muted-foreground">
              {t('noCategories')}
            </p>
          )}
          {allCategories.map((category) => {
            const isSelected = selectedIds.has(category.id)
            return (
              <button
                key={category.id}
                onClick={() => handleToggle(category)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                  'hover:bg-accent',
                  isSelected && 'bg-accent/50'
                )}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-full border-2"
                  style={{
                    backgroundColor: isSelected ? category.color : 'transparent',
                    borderColor: category.color,
                  }}
                />
                <span className="flex-1 truncate text-left">{category.name}</span>
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
