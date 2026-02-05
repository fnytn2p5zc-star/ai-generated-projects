'use client'

import { useTranslations } from 'next-intl'
import { useTheme, type ThemeName } from './theme-provider'

const THEME_PREVIEWS: ReadonlyArray<{
  readonly id: ThemeName
  readonly colors: readonly [string, string, string, string]
}> = [
  {
    id: 'default',
    colors: ['hsl(262,83%,58%)', 'hsl(0,0%,100%)', 'hsl(220,14%,96%)', 'hsl(262,83%,96%)'],
  },
  {
    id: 'rpg',
    colors: ['hsl(43,96%,56%)', 'hsl(39,40%,94%)', 'hsl(33,25%,88%)', 'hsl(25,25%,8%)'],
  },
]

function ColorPreview({ colors }: { readonly colors: readonly [string, string, string, string] }) {
  return (
    <div className="grid grid-cols-2 gap-1 w-12 h-12 rounded-md overflow-hidden border border-border">
      {colors.map((color, i) => (
        <div key={i} style={{ backgroundColor: color }} />
      ))}
    </div>
  )
}

export function ThemeSelector() {
  const t = useTranslations('settings')
  const { theme, mode, setTheme, setMode } = useTheme()

  const themeOptions: ReadonlyArray<{
    readonly id: ThemeName
    readonly label: string
    readonly description: string
  }> = [
    {
      id: 'default',
      label: t('themeDefault'),
      description: t('themeDefaultDescription'),
    },
    {
      id: 'rpg',
      label: t('themeRpg'),
      description: t('themeRpgDescription'),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {themeOptions.map((option) => {
          const preview = THEME_PREVIEWS.find((p) => p.id === option.id)
          const isSelected = theme === option.id
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setTheme(option.id)}
              className={`flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-colors ${
                isSelected
                  ? 'border-primary bg-accent/50'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              {preview && <ColorPreview colors={preview.colors} />}
              <div className="min-w-0">
                <div className="font-medium text-sm">{option.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {option.description}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {theme === 'rpg' && (
        <div className="flex items-center gap-3 pt-2">
          <span className="text-sm font-medium">{t('colorMode')}:</span>
          <div className="flex gap-2">
            <button
              type="button"
              aria-pressed={mode === 'light'}
              onClick={() => setMode('light')}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                mode === 'light'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {t('lightMode')}
            </button>
            <button
              type="button"
              aria-pressed={mode === 'dark'}
              onClick={() => setMode('dark')}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                mode === 'dark'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {t('darkMode')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
