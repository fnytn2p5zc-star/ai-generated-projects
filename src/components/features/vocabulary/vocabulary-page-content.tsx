'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Plus } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { VocabCategorySidebar } from './vocab-category-sidebar'
import { WordList } from './word-list'
import { VocabStatsBar } from './vocab-stats-bar'
import { VocabSearchBar } from './vocab-search-bar'
import { CreateWordDialog } from './create-word-dialog'
import { WordDetailDialog } from './word-detail-dialog'
import { ReviewStartDialog } from './review-start-dialog'
import { getVocabCategories } from '@/actions/vocab-categories'
import { searchVocabWords } from '@/actions/vocab-words'
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
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalWords, setTotalWords] = useState(0)
  const fetchIdRef = useRef(0)

  const fetchData = useCallback(async () => {
    const fetchId = ++fetchIdRef.current

    try {
      const [catResult, wordResult, statsResult] = await Promise.allSettled([
        getVocabCategories(language),
        searchVocabWords({
          language,
          categoryId: selectedCategoryId,
          search: searchQuery || undefined,
          page: currentPage,
          pageSize: 24,
        }),
        getVocabStats(language, selectedCategoryId),
      ])

      if (fetchId !== fetchIdRef.current) return

      if (catResult.status === 'fulfilled' && catResult.value.success && catResult.value.data) {
        setCategories(catResult.value.data)
      }
      if (wordResult.status === 'fulfilled' && wordResult.value.success && wordResult.value.data) {
        setWords(wordResult.value.data.words as WordWithProgress[])
        setTotalPages(wordResult.value.data.totalPages)
        setTotalWords(wordResult.value.data.total)
      }
      if (statsResult.status === 'fulfilled' && statsResult.value.success && statsResult.value.data) {
        setStats(statsResult.value.data)
      }
    } catch {
      // Prevent component crash on unexpected errors
    }
  }, [language, selectedCategoryId, searchQuery, currentPage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'en' | 'ja')
    setSelectedCategoryId(null)
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId)
    setCurrentPage(1)
  }

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

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

      <VocabSearchBar onSearch={handleSearch} totalCount={totalWords} />

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className={`shrink-0 transition-all ${sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'}`}>
          <VocabCategorySidebar
            categories={categories}
            language={language}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleCategorySelect}
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
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isSearching={searchQuery.length > 0}
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
