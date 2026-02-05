'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  rectIntersection,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  type CollisionDetection,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { getTasks, moveTask } from '@/actions/tasks'
import { TaskStatus, type TaskStatusType } from '@/lib/types'
import { KanbanColumn } from './kanban-column'
import { TaskCard } from './task-card'
import { CreateTaskDialog } from '../task/create-task-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface CategoryOnTask {
  id: string
  name: string
  color: string
}

interface LearningPlanData {
  milestones: string
}

type TaskWithRelations = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  dueDate: Date | null
  position: number
  createdAt: Date
  updatedAt: Date
  learningPlan: LearningPlanData | null
  notes: unknown[]
  categories: CategoryOnTask[]
}

function parseMilestoneProgress(learningPlan: LearningPlanData | null): { completed: number; total: number } | undefined {
  if (!learningPlan?.milestones) return undefined
  try {
    const milestones = JSON.parse(learningPlan.milestones) as Array<{ completed: boolean }>
    if (milestones.length === 0) return undefined
    const completed = milestones.filter((m) => m.completed).length
    return { completed, total: milestones.length }
  } catch {
    return undefined
  }
}

interface KanbanBoardProps {
  categoryId?: string
  onTasksChanged?: () => void
}

const customCollisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args)
  if (pointerCollisions.length > 0) {
    return pointerCollisions
  }

  const rectCollisions = rectIntersection(args)
  if (rectCollisions.length > 0) {
    return rectCollisions
  }

  return closestCenter(args)
}

export function KanbanBoard({ categoryId, onTasksChanged }: KanbanBoardProps) {
  const t = useTranslations('task')
  const [tasks, setTasks] = useState<TaskWithRelations[]>([])
  const [activeTask, setActiveTask] = useState<TaskWithRelations | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const loadTasks = useCallback(async () => {
    const result = await getTasks(categoryId)
    if (result.success && result.data) {
      setTasks(result.data)
    }
    setIsLoading(false)
  }, [categoryId])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = tasks.find((t) => t.id === active.id)
    if (task) {
      setActiveTask(task)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeTask = tasks.find((t) => t.id === active.id)
    if (!activeTask) return

    const overId = over.id as string
    const isOverColumn = Object.values(TaskStatus).includes(
      overId as TaskStatusType
    )

    if (isOverColumn && activeTask.status !== overId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === active.id ? { ...t, status: overId } : t))
      )
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const task = tasks.find((t) => t.id === activeId)
    if (!task) return

    const isOverColumn = Object.values(TaskStatus).includes(
      overId as TaskStatusType
    )
    const newStatus = isOverColumn
      ? (overId as TaskStatusType)
      : ((tasks.find((t) => t.id === overId)?.status as TaskStatusType) ??
        task.status)

    const tasksInColumn = tasks.filter((t) => t.status === newStatus)
    let newPosition: number

    if (isOverColumn) {
      newPosition = tasksInColumn.length
    } else {
      const overIndex = tasksInColumn.findIndex((t) => t.id === overId)
      newPosition = overIndex >= 0 ? overIndex : tasksInColumn.length
    }

    await moveTask(activeId, newStatus, newPosition)
    await loadTasks()
    onTasksChanged?.()
  }

  const getTasksByStatus = (status: TaskStatusType) => {
    return tasks
      .filter((task) => task.status === status)
      .sort((a, b) => a.position - b.position)
      .map((task) => ({
        ...task,
        milestoneProgress: parseMilestoneProgress(task.learningPlan),
      }))
  }

  const columns = [
    { id: TaskStatus.TODO, title: t('statuses.TODO') },
    { id: TaskStatus.IN_PROGRESS, title: t('statuses.IN_PROGRESS') },
    { id: TaskStatus.REVIEW, title: t('statuses.REVIEW') },
    { id: TaskStatus.DONE, title: t('statuses.DONE') },
  ]

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateOpen(true)} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          {t('createTask')}
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={customCollisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={getTasksByStatus(column.id)}
            />
          ))}
        </div>

        <DragOverlay
          dropAnimation={{
            duration: 200,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
        >
          {activeTask ? (
            <TaskCard
              task={{
                ...activeTask,
                milestoneProgress: parseMilestoneProgress(activeTask.learningPlan),
              }}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <CreateTaskDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={() => {
          loadTasks()
          onTasksChanged?.()
        }}
      />
    </div>
  )
}
