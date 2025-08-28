'use client'

import React, { createContext, useContext } from 'react'
import { useTheme as useThemeHook } from '@/hooks/theme/useTheme'
import type { Theme } from '@/hooks/theme/useTheme'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeHook = useThemeHook()

  // Prevenir flash de conteúdo não estilizado (FOUC)
  if (!themeHook.mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <ThemeContext.Provider value={themeHook}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Durante SSR ou fora do provider, retornar valores padrão
    return {
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: () => {},
      toggleTheme: () => {},
      mounted: false,
    }
  }
  return context
}

export default ThemeProvider
