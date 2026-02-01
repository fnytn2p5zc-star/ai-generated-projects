import { setRequestLocale } from 'next-intl/server'
import { KanbanBoard } from '@/components/features/kanban/kanban-board'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="container py-6">
      <KanbanBoard />
    </div>
  )
}
