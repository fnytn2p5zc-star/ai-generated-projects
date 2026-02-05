import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LocaleSwitcher } from '@/components/layout/locale-switcher'
import { ThemeSelector } from '@/components/layout/theme-selector'

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
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t('language')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {t('languageDescription')}
            </p>
            <LocaleSwitcher />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('theme')}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('themeDescription')}
          </p>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
        </CardContent>
      </Card>
    </div>
  )
}
