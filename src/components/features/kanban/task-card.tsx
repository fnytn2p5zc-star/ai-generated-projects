'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTranslations } from 'next-intl'
import { Calendar, GripVertical } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CategoryOnTask {
  id: string
  name: string
  color: string
}

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  dueDate: Date | null
  position: number
  categories?: CategoryOnTask[]
}

interface TaskCardProps {
  task: Task
  isDragging?: boolean
}

const priorityColors = {
  LOW: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  MEDIUM:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
  HIGH: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
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

  const isActiveDragging = isDragging || isSortableDragging

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <Link href={`/tasks/${task.id}`} className="block">
        <Card
          className={cn(
            'min-h-[120px] transition-all duration-200',
            'hover:-translate-y-0.5 hover:shadow-card-hover',
            isActiveDragging &&
              'rotate-2 scale-105 opacity-90 shadow-drag'
          )}
        >
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm font-medium leading-tight pr-6">
              {task.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {task.description && (
              <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {task.description}
              </p>
            )}
            <div className="flex items-center justify-between gap-2">
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
            {task.categories && task.categories.length > 0 && (
              <div className="mt-2 flex items-center gap-1">
                {task.categories.slice(0, 3).map((cat) => (
                  <span
                    key={cat.id}
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                    title={cat.name}
                  />
                ))}
                {task.categories.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{task.categories.length - 3}
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>

      {/* Drag handle in bottom-right corner */}
      <button
        {...attributes}
        {...listeners}
        className={cn(
          'absolute bottom-2 right-2 z-10 cursor-grab touch-none rounded p-1 text-muted-foreground/50 transition-all',
          'hover:bg-muted hover:text-foreground',
          'group-hover:text-muted-foreground',
          isActiveDragging && 'cursor-grabbing text-primary'
        )}
        onClick={(e) => e.preventDefault()}
      >
        <GripVertical className="h-4 w-4" />
      </button>
    </div>
  )
}
