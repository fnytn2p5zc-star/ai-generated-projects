'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTranslations } from 'next-intl'
import { Calendar, GripVertical } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  dueDate: Date | null
  position: number
}

interface TaskCardProps {
  task: Task
  isDragging?: boolean
}

const priorityColors = {
  LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  HIGH: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export function TaskCard({ task, isDragging }: TaskCardProps) {
  const t = useTranslations('task')

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const formatDate = (date: Date | null) => {
    if (!date) return null
    return new Date(date).toLocaleDateString()
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'cursor-grab transition-shadow hover:shadow-md',
        (isDragging || isSortableDragging) && 'opacity-50 shadow-lg'
      )}
    >
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start gap-2">
          <button
            {...attributes}
            {...listeners}
            className="mt-0.5 cursor-grab touch-none text-muted-foreground hover:text-foreground"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <Link href={`/tasks/${task.id}`} className="flex-1">
            <CardTitle className="text-sm font-medium hover:underline">
              {task.title}
            </CardTitle>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {task.description && (
          <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
            {task.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium',
              priorityColors[task.priority as keyof typeof priorityColors]
            )}
          >
            {t(`priorities.${task.priority}`)}
          </span>
          {task.dueDate && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
