import { setRequestLocale } from 'next-intl/server'
import { BoardWithSidebar } from '@/components/features/kanban/board-with-sidebar'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="container py-6">
      <BoardWithSidebar />
    </div>
  )
}
