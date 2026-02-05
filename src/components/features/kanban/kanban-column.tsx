'use client'

import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { TaskCard } from './task-card'
import { cn } from '@/lib/utils'
import { TaskStatus } from '@/lib/types'

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  dueDate: Date | null
  position: number
  categories?: { id: string; name: string; color: string }[]
  milestoneProgress?: {
    completed: number
    total: number
  }
}

interface KanbanColumnProps {
  id: string
  title: string
  tasks: Task[]
}

const statusColors: Record<string, string> = {
  [TaskStatus.TODO]: 'bg-gray-400',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-500',
  [TaskStatus.REVIEW]: 'bg-purple-500',
  [TaskStatus.DONE]: 'bg-green-500',
}

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col rounded-xl bg-muted/40 p-4 transition-all duration-200',
        isOver && 'scale-[1.01] border-2 border-primary bg-accent/50'
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <span
          className={cn('h-2.5 w-2.5 rounded-full', statusColors[id])}
          aria-hidden="true"
        />
        <h2 className="flex-1 font-semibold">{title}</h2>
        <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium shadow-sm">
          {tasks.length}
        </span>
      </div>

      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="flex max-h-[calc(100vh-14rem)] flex-1 flex-col gap-3 overflow-y-auto">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div
              className={cn(
                'flex h-28 items-center justify-center rounded-xl border-2 border-dashed text-sm text-muted-foreground transition-colors',
                isOver && 'border-primary bg-primary/5 text-primary'
              )}
            >
              Drop here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
