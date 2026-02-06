'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Plus, Pencil, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateVocabCategoryDialog } from './create-vocab-category-dialog'
import { EditVocabCategoryDialog } from './edit-vocab-category-dialog'
import { cn } from '@/lib/utils'

interface VocabCategoryWithCount {
  id: string
  name: string
  nameZh: string
  language: string
  color: string
  position: number
  _count: { words: number }
}

interface VocabCategorySidebarProps {
  categories: VocabCategoryWithCount[]
  language: string
  selectedCategoryId: string | null
  onSelectCategory: (categoryId: string | null) => void
  onCategoriesChanged: () => void
}

export function VocabCategorySidebar({
  categories,
  language,
  selectedCategoryId,
  onSelectCategory,
  onCategoriesChanged,
}: VocabCategorySidebarProps) {
  const t = useTranslations('vocabulary')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<VocabCategoryWithCount | null>(null)

  const totalWords = categories.reduce((sum, c) => sum + c._count.words, 0)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-2 pb-2">
        <h2 className="text-sm font-semibold text-muted-foreground">
          {t('category')}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setIsCreateOpen(true)}
          aria-label={t('createCategory')}
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
        <span className="flex-1 text-left">{t('allWords')}</span>
        <span className="text-xs tabular-nums">{totalWords}</span>
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
            <span className="text-xs tabular-nums">{category._count.words}</span>
          </button>
          <button
            onClick={() => setEditingCategory(category)}
            className="ml-0.5 rounded p-1 text-muted-foreground/0 transition-colors hover:bg-muted hover:text-foreground group-hover:text-muted-foreground/60"
            aria-label={t('editCategory')}
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

      <CreateVocabCategoryDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        language={language}
        onSuccess={onCategoriesChanged}
      />

      {editingCategory && (
        <EditVocabCategoryDialog
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
