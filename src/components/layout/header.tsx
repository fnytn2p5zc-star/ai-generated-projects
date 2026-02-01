'use client'

import { useTranslations } from 'next-intl'
import { LayoutDashboard, Search, Settings } from 'lucide-react'
import { Link, usePathname } from '@/i18n/routing'
import { LocaleSwitcher } from './locale-switcher'
import { cn } from '@/lib/utils'

export function Header() {
  const t = useTranslations('navigation')
  const tCommon = useTranslations('common')
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: t('board'), icon: LayoutDashboard },
    { href: '/search', label: t('search'), icon: Search },
    { href: '/settings', label: t('settings'), icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">{tCommon('appName')}</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 transition-colors hover:text-foreground/80',
                  isActive ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  )
}
