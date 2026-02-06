'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Plus } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { VocabCategorySidebar } from './vocab-category-sidebar'
import { WordList } from './word-list'
import { VocabStatsBar } from './vocab-stats-bar'
import { CreateWordDialog } from './create-word-dialog'
import { WordDetailDialog } from './word-detail-dialog'
import { ReviewStartDialog } from './review-start-dialog'
import { getVocabCategories } from '@/actions/vocab-categories'
import { getVocabWords } from '@/actions/vocab-words'
import { getVocabStats } from '@/actions/vocab-review'

interface VocabCategoryWithCount {
  id: string
  name: string
  nameZh: string
  language: string
  color: string
  position: number
  _count: { words: number }
}

interface WordWithProgress {
  id: string
  word: string
  reading?: string | null
  meaning: string
  phonetic?: string | null
  exampleSentence?: string | null
  language: string
  categoryId: string
  studyProgress?: {
    level: string
    correctCount: number
    incorrectCount: number
    streak: number
  } | null
  category: { id: string; name: string; nameZh: string; color: string }
}

interface VocabStats {
  total: number
  new: number
  learning: number
  reviewing: number
  mastered: number
  due: number
}

export function VocabularyPageContent() {
  const t = useTranslations('vocabulary')
  const [language, setLanguage] = useState<'en' | 'ja'>('en')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [categories, setCategories] = useState<VocabCategoryWithCount[]>([])
  const [words, setWords] = useState<WordWithProgress[]>([])
  const [stats, setStats] = useState<VocabStats>({ total: 0, new: 0, learning: 0, reviewing: 0, mastered: 0, due: 0 })
  const [isCreateWordOpen, setIsCreateWordOpen] = useState(false)
  const [isReviewStartOpen, setIsReviewStartOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState<WordWithProgress | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const fetchData = useCallback(async () => {
    const [catResult, wordResult, statsResult] = await Promise.all([
      getVocabCategories(language),
      getVocabWords(language, selectedCategoryId),
      getVocabStats(language, selectedCategoryId),
    ])

    if (catResult.success && catResult.data) {
      setCategories(catResult.data)
    }
    if (wordResult.success && wordResult.data) {
      setWords(wordResult.data as WordWithProgress[])
    }
    if (statsResult.success && statsResult.data) {
      setStats(statsResult.data)
    }
  }, [language, selectedCategoryId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'en' | 'ja')
    setSelectedCategoryId(null)
  }

  const handleWordClick = (wordId: string) => {
    const word = words.find((w) => w.id === wordId) ?? null
    setSelectedWord(word)
  }

  const categoryOptions = categories.map((c) => ({
    id: c.id,
    name: c.name,
    nameZh: c.nameZh,
  }))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={language} onValueChange={handleLanguageChange}>
          <TabsList>
            <TabsTrigger value="en">{t('english')}</TabsTrigger>
            <TabsTrigger value="ja">{t('japanese')}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="ml-auto">
          <Button
            size="sm"
            onClick={() => setIsCreateWordOpen(true)}
            className="gap-1.5"
            disabled={categories.length === 0}
          >
            <Plus className="h-4 w-4" />
            {t('addWord')}
          </Button>
        </div>
      </div>

      <VocabStatsBar stats={stats} onStartReview={() => setIsReviewStartOpen(true)} />

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className={`shrink-0 transition-all ${sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'}`}>
          <VocabCategorySidebar
            categories={categories}
            language={language}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            onCategoriesChanged={fetchData}
          />
        </div>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="fixed bottom-4 left-4 z-40 rounded-full bg-primary p-2 text-primary-foreground shadow-lg md:hidden"
        >
          {sidebarOpen ? '←' : '→'}
        </button>

        {/* Word list */}
        <div className="min-w-0 flex-1">
          <WordList
            words={words}
            onWordClick={handleWordClick}
          />
        </div>
      </div>

      <CreateWordDialog
        open={isCreateWordOpen}
        onOpenChange={setIsCreateWordOpen}
        language={language}
        categories={categoryOptions}
        defaultCategoryId={selectedCategoryId}
        onSuccess={fetchData}
      />

      {selectedWord && (
        <WordDetailDialog
          open={!!selectedWord}
          onOpenChange={(open) => {
            if (!open) setSelectedWord(null)
          }}
          word={selectedWord}
          categories={categoryOptions}
          onSuccess={() => {
            setSelectedWord(null)
            fetchData()
          }}
        />
      )}

      <ReviewStartDialog
        open={isReviewStartOpen}
        onOpenChange={setIsReviewStartOpen}
        language={language}
        categories={categoryOptions}
        selectedCategoryId={selectedCategoryId}
      />
    </div>
  )
}
