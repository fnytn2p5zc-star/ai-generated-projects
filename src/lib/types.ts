import { z } from 'zod'

export const TaskStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  DONE: 'DONE',
} as const

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus]

export const Priority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const

export type PriorityType = (typeof Priority)[keyof typeof Priority]

export const taskStatuses = Object.values(TaskStatus)
export const priorities = Object.values(Priority)

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']).default('TODO'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  dueDate: z.string().datetime().optional().nullable(),
})

export const updateTaskSchema = createTaskSchema.partial().extend({
  id: z.string(),
  position: z.number().int().min(0).optional(),
})

export const createNoteSchema = z.object({
  taskId: z.string(),
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().default(''),
})

export const updateNoteSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
})

export const learningPlanSchema = z.object({
  taskId: z.string(),
  objectives: z.array(z.object({
    text: z.string(),
    completed: z.boolean().default(false),
  })).default([]),
  resources: z.array(z.object({
    title: z.string(),
    url: z.string().url().optional(),
    type: z.enum(['article', 'video', 'book', 'course', 'other']).default('other'),
  })).default([]),
  milestones: z.array(z.object({
    title: z.string(),
    completed: z.boolean().default(false),
    dueDate: z.string().datetime().optional().nullable(),
    completedAt: z.string().optional().nullable(),
  })).default([]),
})

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  color: z.string().default('#6B7280'),
})

export const updateCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100).optional(),
  color: z.string().optional(),
  groupId: z.string().nullable().optional(),
})

export const createCategoryGroupSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
})

export const updateCategoryGroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100).optional(),
  position: z.number().int().min(0).optional(),
})

export const updateTaskCategoriesSchema = z.object({
  taskId: z.string(),
  categoryIds: z.array(z.string()),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
export type CreateNoteInput = z.infer<typeof createNoteSchema>
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>
export type LearningPlanInput = z.infer<typeof learningPlanSchema>
export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
export type UpdateTaskCategoriesInput = z.infer<typeof updateTaskCategoriesSchema>
export type CreateCategoryGroupInput = z.infer<typeof createCategoryGroupSchema>
export type UpdateCategoryGroupInput = z.infer<typeof updateCategoryGroupSchema>
