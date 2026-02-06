import { setRequestLocale } from 'next-intl/server'
import { ReviewSession } from '@/components/features/vocabulary/review-session'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ lang?: string; cat?: string; level?: string; limit?: string }>
}

export default async function VocabularyReviewPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const search = await searchParams
  const language = search.lang === 'ja' ? 'ja' : 'en'
  const categoryId = search.cat || null
  const level = search.level || 'ALL'
  const limit = Math.min(Math.max(parseInt(search.limit || '20', 10) || 20, 1), 100)

  return (
    <div className="container py-6">
      <ReviewSession
        language={language}
        categoryId={categoryId}
        level={level}
        limit={limit}
      />
    </div>
  )
}
