'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type ThemeName = 'default' | 'rpg'
export type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  readonly theme: ThemeName
  readonly mode: ThemeMode
  readonly setTheme: (theme: ThemeName) => void
  readonly setMode: (mode: ThemeMode) => void
}

const STORAGE_KEY = 'lm-theme-preference'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredPreference(): { theme: ThemeName; mode: ThemeMode } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as { theme?: string; mode?: string }
      return {
        theme: parsed.theme === 'rpg' ? 'rpg' : 'default',
        mode: parsed.mode === 'dark' ? 'dark' : 'light',
      }
    }
  } catch {
    // localStorage unavailable or corrupted
  }
  return { theme: 'default', mode: 'light' }
}

function writeStoredPreference(theme: ThemeName, mode: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, mode }))
  } catch {
    // localStorage unavailable
  }
}

// Dark mode is only supported for RPG theme. Default theme always uses light mode.
// The .dark CSS variables in globals.css exist for the base Tailwind setup but are
// not user-accessible for the default theme.
function applyThemeToDOM(theme: ThemeName, mode: ThemeMode): void {
  const html = document.documentElement
  if (theme === 'rpg') {
    html.setAttribute('data-theme', 'rpg')
  } else {
    html.removeAttribute('data-theme')
  }
  if (theme === 'rpg' && mode === 'dark') {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('default')
  const [mode, setModeState] = useState<ThemeMode>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = readStoredPreference()
    setThemeState(stored.theme)
    setModeState(stored.mode)
    applyThemeToDOM(stored.theme, stored.mode)
    setMounted(true)
  }, [])

  const setTheme = useCallback(
    (next: ThemeName) => {
      const nextMode = next === 'default' ? 'light' : mode
      setThemeState(next)
      setModeState(nextMode)
      writeStoredPreference(next, nextMode)
      applyThemeToDOM(next, nextMode)
    },
    [mode]
  )

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next)
      writeStoredPreference(theme, next)
      applyThemeToDOM(theme, next)
    },
    [theme]
  )

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

const FALLBACK: ThemeContextValue = {
  theme: 'default',
  mode: 'light',
  setTheme: () => {},
  setMode: () => {},
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  return ctx ?? FALLBACK
}
