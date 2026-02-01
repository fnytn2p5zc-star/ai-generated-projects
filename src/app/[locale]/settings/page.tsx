import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LocaleSwitcher } from '@/components/layout/locale-switcher'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function SettingsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="container py-6">
      <SettingsContent />
    </div>
  )
}

function SettingsContent() {
  const t = useTranslations('settings')

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">{t('language')}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t('language')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Select your preferred language
            </p>
            <LocaleSwitcher />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
