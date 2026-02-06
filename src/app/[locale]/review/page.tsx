import { setRequestLocale } from 'next-intl/server'
import { ReviewPage } from '@/components/features/review/review-page'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Review({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="container py-6">
      <ReviewPage />
    </div>
  )
}
