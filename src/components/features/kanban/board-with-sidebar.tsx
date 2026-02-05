'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { PanelLeftClose, PanelLeft } from 'lucide-react'
import { getCategoriesWithGroups } from '@/actions/category-groups'
import { CategorySidebar } from '../category/category-sidebar'
import { KanbanBoard } from './kanban-board'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CategoryWithCount {
  id: string
  name: string
  color: string
  position: number
  groupId: string | null
  _count: { tasks: number }
}

interface GroupWithCategories {
  id: string
  name: string
  position: number
  categories: CategoryWithCount[]
}

export function BoardWithSidebar() {
  const t = useTranslations('category')
  const [groups, setGroups] = useState<GroupWithCategories[]>([])
  const [ungroupedCategories, setUngroupedCategories] = useState<CategoryWithCount[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const loadCategories = useCallback(async () => {
    const result = await getCategoriesWithGroups()
    if (result.success && result.data) {
      setGroups(result.data.groups)
      setUngroupedCategories(result.data.ungrouped)
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return (
    <div className="flex gap-6">
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed left-2 top-16 z-30 md:hidden"
        onClick={() => setSidebarOpen((prev) => !prev)}
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          'shrink-0 transition-all duration-200',
          sidebarOpen ? 'w-48' : 'w-0 overflow-hidden',
          'max-md:fixed max-md:left-0 max-md:top-12 max-md:z-20 max-md:h-[calc(100vh-3rem)] max-md:bg-background max-md:border-r max-md:p-3 max-md:shadow-lg',
          !sidebarOpen && 'max-md:invisible'
        )}
      >
        <div className="sticky top-6">
          <div className="flex items-center justify-between mb-2 md:hidden">
            <span className="text-sm font-semibold">{t('title')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setSidebarOpen(false)}
            >
              <PanelLeftClose className="h-3.5 w-3.5" />
            </Button>
          </div>
          <CategorySidebar
            groups={groups}
            ungroupedCategories={ungroupedCategories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={(id) => {
              setSelectedCategoryId(id)
              setSidebarOpen((prev) => (window.innerWidth < 768 ? false : prev))
            }}
            onCategoriesChanged={loadCategories}
          />
        </div>
      </aside>

      {/* Board */}
      <div className="min-w-0 flex-1">
        <KanbanBoard
          categoryId={selectedCategoryId ?? undefined}
          onTasksChanged={loadCategories}
        />
      </div>
    </div>
  )
}
