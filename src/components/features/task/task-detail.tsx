'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ArrowLeft, Pencil, Trash2, StickyNote } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { deleteTask, updateTask } from '@/actions/tasks'
import { TaskStatus, Priority, type TaskStatusType, type PriorityType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LearningPlanEditor } from './learning-plan-editor'
import { NotesSection } from '../notes/notes-section'
import { FloatingNoteWindow } from '../notes/floating-note-window'
import { cn } from '@/lib/utils'

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  dueDate: Date | null
  position: number
  createdAt: Date
  updatedAt: Date
  learningPlan: {
    id: string
    taskId: string
    objectives: string
    resources: string
    milestones: string
  } | null
  notes: {
    id: string
    taskId: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
  }[]
}

interface TaskDetailProps {
  task: Task
}

const priorityColors = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
}

const statusColors = {
  TODO: 'bg-slate-100 text-slate-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  REVIEW: 'bg-purple-100 text-purple-800',
  DONE: 'bg-green-100 text-green-800',
}

export function TaskDetail({ task }: TaskDetailProps) {
  const t = useTranslations('task')
  const tCommon = useTranslations('common')
  const tLearningPlan = useTranslations('learningPlan')
  const tNotes = useTranslations('notes')
  const router = useRouter()

  const [notes, setNotes] = useState(task.notes)
  const [isFloatingNoteOpen, setIsFloatingNoteOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState<{
    title: string
    description: string
    status: TaskStatusType
    priority: PriorityType
    dueDate: string
  }>({
    title: task.title,
    description: task.description ?? '',
    status: task.status as TaskStatusType,
    priority: task.priority as PriorityType,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
  })

  const handleSave = async () => {
    const result = await updateTask({
      id: task.id,
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    })

    if (result.success) {
      setIsEditing(false)
      router.refresh()
    }
  }

  const handleStatusChange = async (newStatus: TaskStatusType) => {
    setFormData({ ...formData, status: newStatus })

    await updateTask({
      id: task.id,
      title: task.title,
      description: task.description ?? '',
      status: newStatus,
      priority: task.priority as PriorityType,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
    })

    router.refresh()
  }

  const handleDelete = async () => {
    if (!confirm(t('deleteConfirm'))) return

    setIsDeleting(true)
    const result = await deleteTask(task.id)

    if (result.success) {
      router.push('/')
    } else {
      setIsDeleting(false)
    }
  }

  const handleNoteCreated = useCallback((note: typeof notes[number]) => {
    setNotes((prev) => [note, ...prev])
  }, [])

  const handleNoteUpdated = useCallback((note: typeof notes[number]) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === note.id ? { ...n, ...note } : n))
    )
  }, [])

  const handleNoteDeleted = useCallback((noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId))
  }, [])

  const parsedLearningPlan = task.learningPlan
    ? {
        ...task.learningPlan,
        objectives: JSON.parse(task.learningPlan.objectives) as string[],
        resources: JSON.parse(task.learningPlan.resources) as Array<{
          title: string
          url?: string
          type: 'article' | 'video' | 'book' | 'course' | 'other'
        }>,
        milestones: JSON.parse(task.learningPlan.milestones) as Array<{
          title: string
          completed: boolean
          dueDate?: string
        }>,
      }
    : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to board
        </Link>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                {tCommon('cancel')}
              </Button>
              <Button onClick={handleSave}>{tCommon('save')}</Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="hidden md:inline-flex"
                onClick={() => setIsFloatingNoteOpen(true)}
              >
                <StickyNote className="mr-2 h-4 w-4" />
                {tNotes('quickNotes')}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                {tCommon('edit')}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {tCommon('delete')}
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? (
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="text-2xl font-bold"
              />
            ) : (
              task.title
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-3">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <Label className="text-xs">{t('status')}</Label>
                  <Select
                    value={formData.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className={cn('h-8 w-fit text-xs', statusColors[formData.status as keyof typeof statusColors])}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TaskStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {t(`statuses.${status}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('priority')}</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: PriorityType) =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Priority).map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {t(`priorities.${priority}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('dueDate')}</Label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="h-8 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('description')}</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={2}
                  className="text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger
                    className={cn(
                      'h-7 w-fit gap-1 border-none px-2.5 text-xs font-medium',
                      statusColors[formData.status as keyof typeof statusColors]
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TaskStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {t(`statuses.${status}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span
                  className={cn(
                    'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium',
                    priorityColors[task.priority as keyof typeof priorityColors]
                  )}
                >
                  {t(`priorities.${task.priority}`)}
                </span>
                {task.dueDate && (
                  <span className="text-xs text-muted-foreground">
                    {t('dueDate')}: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              {task.description && (
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {task.description}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="learning-plan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="learning-plan">
            {tLearningPlan('title')}
          </TabsTrigger>
          <TabsTrigger value="notes">
            {tNotes('title')} ({notes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learning-plan">
          <LearningPlanEditor
            taskId={task.id}
            initialPlan={parsedLearningPlan}
          />
        </TabsContent>

        <TabsContent value="notes">
          <NotesSection
            taskId={task.id}
            notes={notes}
            onNoteCreated={handleNoteCreated}
            onNoteUpdated={handleNoteUpdated}
            onNoteDeleted={handleNoteDeleted}
          />
        </TabsContent>
      </Tabs>

      {isFloatingNoteOpen && (
        <FloatingNoteWindow
          taskId={task.id}
          notes={notes}
          onClose={() => setIsFloatingNoteOpen(false)}
          onNoteCreated={handleNoteCreated}
          onNoteUpdated={handleNoteUpdated}
        />
      )}
    </div>
  )
}
