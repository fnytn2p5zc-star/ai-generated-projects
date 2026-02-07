import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import '../globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// FOUC prevention: must stay in sync with STORAGE_KEY in theme-provider.tsx
// Also handles Safari BFCache: force reload when restored from back-forward cache
const themeInitScript = `
(function(){
  try {
    var s = localStorage.getItem('lm-theme-preference');
    if (s) {
      var p = JSON.parse(s);
      var valid = ['rpg','ocean','forest','cyberpunk','dracula'];
      if (valid.indexOf(p.theme) !== -1) {
        document.documentElement.setAttribute('data-theme', p.theme);
        if (p.mode === 'dark') document.documentElement.classList.add('dark');
      }
    }
  } catch(e) {}
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) { window.location.reload(); }
  });
})();
`

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <ErrorBoundary>{children}</ErrorBoundary>
              </main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
