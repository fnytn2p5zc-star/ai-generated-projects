import { setRequestLocale } from 'next-intl/server'
import { VocabularyPageContent } from '@/components/features/vocabulary/vocabulary-page-content'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function VocabularyPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="container py-6">
      <VocabularyPageContent />
    </div>
  )
}
