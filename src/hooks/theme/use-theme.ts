'use client'

import { useTheme as useNextTheme } from 'next-themes'

/**
 * Hook customizado para gerenciar tema
 * Wrapper em volta do useTheme do next-themes com tipos melhorados
 *
 * @example
 * ```tsx
 * const { theme, setTheme, resolvedTheme } = useTheme()
 *
 * <button onClick={() => setTheme('dark')}>
 *   Dark Mode
 * </button>
 * ```
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme()

  return {
    theme: theme as 'light' | 'dark' | 'system' | undefined,
    setTheme,
    resolvedTheme: resolvedTheme as 'light' | 'dark' | undefined,
    systemTheme: systemTheme as 'light' | 'dark' | undefined,
    toggleTheme: () => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    },
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  }
}
