'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Plus, Trash2, ExternalLink, Check } from 'lucide-react'
import { upsertLearningPlan } from '@/actions/learning-plans'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface Resource {
  title: string
  url?: string
  type: 'article' | 'video' | 'book' | 'course' | 'other'
}

interface Milestone {
  title: string
  completed: boolean
  dueDate?: string
}

interface LearningPlan {
  id: string
  taskId: string
  objectives: string[]
  resources: Resource[]
  milestones: Milestone[]
}

interface LearningPlanEditorProps {
  taskId: string
  initialPlan: LearningPlan | null
}

const resourceTypes = ['article', 'video', 'book', 'course', 'other'] as const
type ResourceType = (typeof resourceTypes)[number]

export function LearningPlanEditor({
  taskId,
  initialPlan,
}: LearningPlanEditorProps) {
  const t = useTranslations('learningPlan')
  const tCommon = useTranslations('common')
  const router = useRouter()

  const [objectives, setObjectives] = useState<string[]>(
    initialPlan?.objectives ?? []
  )
  const [resources, setResources] = useState<Resource[]>(
    initialPlan?.resources ?? []
  )
  const [milestones, setMilestones] = useState<Milestone[]>(
    initialPlan?.milestones ?? []
  )
  const [isSaving, setIsSaving] = useState(false)

  const [newObjective, setNewObjective] = useState('')
  const [newResource, setNewResource] = useState<Resource>({
    title: '',
    url: '',
    type: 'article',
  })
  const [newMilestone, setNewMilestone] = useState<Milestone>({
    title: '',
    completed: false,
    dueDate: '',
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const result = await upsertLearningPlan({
        taskId,
        objectives,
        resources,
        milestones,
      })

      if (result.success) {
        router.refresh()
      }
    } finally {
      setIsSaving(false)
    }
  }

  const addObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, newObjective.trim()])
      setNewObjective('')
    }
  }

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index))
  }

  const addResource = () => {
    if (newResource.title.trim()) {
      setResources([...resources, { ...newResource, title: newResource.title.trim() }])
      setNewResource({ title: '', url: '', type: 'article' })
    }
  }

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index))
  }

  const addMilestone = () => {
    if (newMilestone.title.trim()) {
      setMilestones([
        ...milestones,
        { ...newMilestone, title: newMilestone.title.trim() },
      ])
      setNewMilestone({ title: '', completed: false, dueDate: '' })
    }
  }

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  const toggleMilestone = (index: number) => {
    setMilestones(
      milestones.map((m, i) =>
        i === index ? { ...m, completed: !m.completed } : m
      )
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('title')}</CardTitle>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? tCommon('loading') : tCommon('save')}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold">{t('objectives')}</Label>
          {objectives.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('noObjectives')}</p>
          ) : (
            <ul className="space-y-2">
              {objectives.map((objective, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-md bg-muted p-2"
                >
                  <span className="text-sm">{objective}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeObjective(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            <Input
              placeholder={t('addObjective')}
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addObjective()}
            />
            <Button onClick={addObjective}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">{t('resources')}</Label>
          {resources.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('noResources')}</p>
          ) : (
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-md bg-muted p-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-background px-2 py-0.5 text-xs">
                      {resource.type}
                    </span>
                    <span className="text-sm">{resource.title}</span>
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeResource(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Title"
              value={newResource.title}
              onChange={(e) =>
                setNewResource({ ...newResource, title: e.target.value })
              }
              className="flex-1"
            />
            <Input
              placeholder="URL (optional)"
              value={newResource.url}
              onChange={(e) =>
                setNewResource({ ...newResource, url: e.target.value })
              }
              className="flex-1"
            />
            <Select
              value={newResource.type}
              onValueChange={(value: ResourceType) =>
                setNewResource({ ...newResource, type: value })
              }
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addResource}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">{t('milestones')}</Label>
          {milestones.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('noMilestones')}</p>
          ) : (
            <ul className="space-y-2">
              {milestones.map((milestone, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-md bg-muted p-2"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMilestone(index)}
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded border',
                        milestone.completed
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground'
                      )}
                    >
                      {milestone.completed && <Check className="h-3 w-3" />}
                    </button>
                    <span
                      className={cn(
                        'text-sm',
                        milestone.completed && 'line-through opacity-50'
                      )}
                    >
                      {milestone.title}
                    </span>
                    {milestone.dueDate && (
                      <span className="text-xs text-muted-foreground">
                        ({new Date(milestone.dueDate).toLocaleDateString()})
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMilestone(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Milestone title"
              value={newMilestone.title}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, title: e.target.value })
              }
              className="flex-1"
            />
            <Input
              type="date"
              value={newMilestone.dueDate}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, dueDate: e.target.value })
              }
              className="w-[150px]"
            />
            <Button onClick={addMilestone}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
