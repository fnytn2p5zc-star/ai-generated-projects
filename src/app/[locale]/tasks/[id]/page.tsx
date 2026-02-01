import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getTask } from '@/actions/tasks'
import { TaskDetail } from '@/components/features/task/task-detail'

interface PageProps {
  params: Promise<{ locale: string; id: string }>
}

export default async function TaskPage({ params }: PageProps) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const result = await getTask(id)

  if (!result.success || !result.data) {
    notFound()
  }

  return (
    <div className="container py-6">
      <TaskDetail task={result.data} />
    </div>
  )
}
