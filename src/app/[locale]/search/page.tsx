import { setRequestLocale } from 'next-intl/server'
import { SearchPage } from '@/components/features/search/search-page'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Search({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="container py-6">
      <SearchPage />
    </div>
  )
}
