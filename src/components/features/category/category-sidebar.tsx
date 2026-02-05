'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Plus, Pencil, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateCategoryDialog } from './create-category-dialog'
import { EditCategoryDialog } from './edit-category-dialog'
import { cn } from '@/lib/utils'

interface CategoryWithCount {
  id: string
  name: string
  color: string
  position: number
  _count: { tasks: number }
}

interface CategorySidebarProps {
  categories: CategoryWithCount[]
  selectedCategoryId: string | null
  onSelectCategory: (categoryId: string | null) => void
  onCategoriesChanged: () => void
}

export function CategorySidebar({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onCategoriesChanged,
}: CategorySidebarProps) {
  const t = useTranslations('category')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryWithCount | null>(null)

  const totalTasks = categories.reduce((sum, c) => sum + c._count.tasks, 0)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-2 pb-2">
        <h2 className="text-sm font-semibold text-muted-foreground">
          {t('title')}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setIsCreateOpen(true)}
          aria-label={t('create')}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          'flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
          'hover:bg-accent',
          selectedCategoryId === null
            ? 'bg-accent font-medium text-accent-foreground'
            : 'text-muted-foreground'
        )}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">{t('all')}</span>
        <span className="text-xs tabular-nums">{totalTasks}</span>
      </button>

      {categories.map((category) => (
        <div key={category.id} className="group flex items-center">
          <button
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              'flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
              'hover:bg-accent',
              selectedCategoryId === category.id
                ? 'bg-accent font-medium text-accent-foreground'
                : 'text-muted-foreground'
            )}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="flex-1 truncate text-left">{category.name}</span>
            <span className="text-xs tabular-nums">{category._count.tasks}</span>
          </button>
          <button
            onClick={() => setEditingCategory(category)}
            className="ml-0.5 rounded p-1 text-muted-foreground/0 transition-colors hover:bg-muted hover:text-foreground group-hover:text-muted-foreground/60"
            aria-label={t('edit')}
          >
            <Pencil className="h-3 w-3" />
          </button>
        </div>
      ))}

      {categories.length === 0 && (
        <p className="px-2 py-4 text-center text-xs text-muted-foreground">
          {t('noCategories')}
        </p>
      )}

      <CreateCategoryDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={onCategoriesChanged}
      />

      {editingCategory && (
        <EditCategoryDialog
          open={!!editingCategory}
          onOpenChange={(open) => {
            if (!open) setEditingCategory(null)
          }}
          category={editingCategory}
          onSuccess={() => {
            setEditingCategory(null)
            if (selectedCategoryId === editingCategory.id) {
              onSelectCategory(null)
            }
            onCategoriesChanged()
          }}
        />
      )}
    </div>
  )
}
