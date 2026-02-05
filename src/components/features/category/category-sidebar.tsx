'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Plus, Pencil, LayoutGrid, ChevronRight, FolderPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateCategoryDialog } from './create-category-dialog'
import { EditCategoryDialog } from './edit-category-dialog'
import { CreateGroupDialog } from './create-group-dialog'
import { EditGroupDialog } from './edit-group-dialog'
import { cn } from '@/lib/utils'

interface CategoryWithCount {
  id: string
  name: string
  color: string
  position: number
  groupId?: string | null
  _count: { tasks: number }
}

interface GroupWithCategories {
  id: string
  name: string
  position: number
  categories: CategoryWithCount[]
}

interface GroupOption {
  id: string
  name: string
}

interface CategorySidebarProps {
  groups: GroupWithCategories[]
  ungroupedCategories: CategoryWithCount[]
  selectedCategoryId: string | null
  onSelectCategory: (categoryId: string | null) => void
  onCategoriesChanged: () => void
}

export function CategorySidebar({
  groups,
  ungroupedCategories,
  selectedCategoryId,
  onSelectCategory,
  onCategoriesChanged,
}: CategorySidebarProps) {
  const t = useTranslations('category')
  const tGroup = useTranslations('categoryGroup')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryWithCount | null>(null)
  const [editingGroup, setEditingGroup] = useState<GroupWithCategories | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())

  const allCategories = [
    ...groups.flatMap((g) => g.categories),
    ...ungroupedCategories,
  ]
  const totalTasks = allCategories.reduce((sum, c) => sum + c._count.tasks, 0)

  const groupOptions: GroupOption[] = groups.map((g) => ({
    id: g.id,
    name: g.name,
  }))

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) {
        next.delete(groupId)
      } else {
        next.add(groupId)
      }
      return next
    })
  }

  const renderCategoryItem = (category: CategoryWithCount, indented = false) => (
    <div key={category.id} className="group flex items-center">
      <button
        onClick={() => onSelectCategory(category.id)}
        className={cn(
          'flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
          'hover:bg-accent',
          indented && 'pl-4',
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
  )

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-2 pb-2">
        <h2 className="text-sm font-semibold text-muted-foreground">
          {t('title')}
        </h2>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsCreateGroupOpen(true)}
            aria-label={tGroup('create')}
            title={tGroup('create')}
          >
            <FolderPlus className="h-3.5 w-3.5" />
          </Button>
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
      </div>

      {/* All tasks */}
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

      {/* Groups */}
      {groups.map((group) => {
        const isCollapsed = collapsedGroups.has(group.id)
        const groupTaskCount = group.categories.reduce(
          (sum, c) => sum + c._count.tasks,
          0
        )

        return (
          <div key={group.id}>
            <div className="group flex items-center">
              <button
                onClick={() => toggleGroup(group.id)}
                aria-expanded={!isCollapsed}
                className="flex flex-1 items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ChevronRight
                  className={cn(
                    'h-3.5 w-3.5 shrink-0 transition-transform',
                    !isCollapsed && 'rotate-90'
                  )}
                />
                <span className="flex-1 truncate text-left">{group.name}</span>
                <span className="text-xs tabular-nums font-normal">
                  {groupTaskCount}
                </span>
              </button>
              <button
                onClick={() => setEditingGroup(group)}
                className="ml-0.5 rounded p-1 text-muted-foreground/0 transition-colors hover:bg-muted hover:text-foreground group-hover:text-muted-foreground/60"
                aria-label={tGroup('edit')}
              >
                <Pencil className="h-3 w-3" />
              </button>
            </div>
            {!isCollapsed &&
              group.categories.map((category) =>
                renderCategoryItem(category, true)
              )}
          </div>
        )
      })}

      {/* Ungrouped categories */}
      {ungroupedCategories.length > 0 && groups.length > 0 && (
        <div className="mx-2 my-1 border-t border-border" />
      )}
      {ungroupedCategories.map((category) => renderCategoryItem(category))}

      {allCategories.length === 0 && (
        <p className="px-2 py-4 text-center text-xs text-muted-foreground">
          {t('noCategories')}
        </p>
      )}

      <CreateCategoryDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={onCategoriesChanged}
      />

      <CreateGroupDialog
        open={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
        onSuccess={onCategoriesChanged}
      />

      {editingCategory && (
        <EditCategoryDialog
          open={!!editingCategory}
          onOpenChange={(open) => {
            if (!open) setEditingCategory(null)
          }}
          category={editingCategory}
          groups={groupOptions}
          onSuccess={() => {
            setEditingCategory(null)
            if (selectedCategoryId === editingCategory.id) {
              onSelectCategory(null)
            }
            onCategoriesChanged()
          }}
        />
      )}

      {editingGroup && (
        <EditGroupDialog
          open={!!editingGroup}
          onOpenChange={(open) => {
            if (!open) setEditingGroup(null)
          }}
          group={editingGroup}
          onSuccess={() => {
            setEditingGroup(null)
            onCategoriesChanged()
          }}
        />
      )}
    </div>
  )
}
