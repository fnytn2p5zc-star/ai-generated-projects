import { z } from 'zod'

export const VocabLevel = {
  NEW: 'NEW',
  LEARNING: 'LEARNING',
  REVIEWING: 'REVIEWING',
  MASTERED: 'MASTERED',
} as const

export type VocabLevelType = (typeof VocabLevel)[keyof typeof VocabLevel]

export const vocabLevels = Object.values(VocabLevel)

export const LanguageCode = {
  EN: 'en',
  JA: 'ja',
} as const

export type LanguageCodeType = (typeof LanguageCode)[keyof typeof LanguageCode]

export const languageCodes = Object.values(LanguageCode)

export const createVocabCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  nameZh: z.string().max(100).default(''),
  language: z.enum(['en', 'ja']),
  color: z.string().default('#6B7280'),
})

export const updateVocabCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100).optional(),
  nameZh: z.string().max(100).optional(),
  color: z.string().optional(),
})

export const createVocabWordSchema = z.object({
  word: z.string().min(1, 'Word is required').max(200),
  reading: z.string().max(200).optional().nullable(),
  meaning: z.string().min(1, 'Meaning is required').max(500),
  phonetic: z.string().max(200).optional().nullable(),
  exampleSentence: z.string().max(1000).optional().nullable(),
  language: z.enum(['en', 'ja']),
  categoryId: z.string(),
})

export const updateVocabWordSchema = z.object({
  id: z.string(),
  word: z.string().min(1).max(200).optional(),
  reading: z.string().max(200).optional().nullable(),
  meaning: z.string().min(1).max(500).optional(),
  phonetic: z.string().max(200).optional().nullable(),
  exampleSentence: z.string().max(1000).optional().nullable(),
  categoryId: z.string().optional(),
})

export const startReviewSessionSchema = z.object({
  language: z.enum(['en', 'ja']),
  categoryId: z.string().optional().nullable(),
  level: z.enum(['NEW', 'LEARNING', 'REVIEWING', 'MASTERED', 'ALL']).default('ALL'),
  limit: z.number().int().min(1).max(100).default(20),
})

export const submitReviewSchema = z.object({
  wordId: z.string(),
  correct: z.boolean(),
})

export type CreateVocabCategoryInput = z.infer<typeof createVocabCategorySchema>
export type UpdateVocabCategoryInput = z.infer<typeof updateVocabCategorySchema>
export type CreateVocabWordInput = z.infer<typeof createVocabWordSchema>
export type UpdateVocabWordInput = z.infer<typeof updateVocabWordSchema>
export type StartReviewSessionInput = z.infer<typeof startReviewSessionSchema>
export type SubmitReviewInput = z.infer<typeof submitReviewSchema>
