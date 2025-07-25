'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system'
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: 'light' | 'dark' | 'system'
  storageKey?: string
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-theme',
}) => {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(
    defaultTheme,
  )
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Função para detectar preferência do sistema
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  // Função para resolver o tema atual
  const resolveTheme = (
    currentTheme: 'light' | 'dark' | 'system',
  ): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme()
    }
    return currentTheme
  }

  // Aplicar o tema ao DOM
  const applyTheme = (resolvedTheme: 'light' | 'dark') => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)

    // Atualizar meta theme-color para melhor UX em dispositivos móveis
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#0f172a' : '#ffffff',
      )
    }

    // Salvar no localStorage
    try {
      localStorage.setItem(storageKey, theme)
    } catch (error) {
      console.warn('Não foi possível salvar a preferência de tema:', error)
    }
  }

  // Função para alterar o tema
  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme)
    const resolved = resolveTheme(newTheme)
    setResolvedTheme(resolved)
    applyTheme(resolved)
  }

  // Função para alternar entre claro e escuro
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // Inicializar tema na montagem do componente
  useEffect(() => {
    let savedTheme: 'light' | 'dark' | 'system' = defaultTheme

    // Tentar recuperar tema salvo
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        savedTheme = stored as 'light' | 'dark' | 'system'
      }
    } catch (error) {
      console.warn('Não foi possível acessar o localStorage:', error)
    }

    const resolved = resolveTheme(savedTheme)
    setThemeState(savedTheme)
    setResolvedTheme(resolved)
    applyTheme(resolved)
    setMounted(true)
  }, [defaultTheme, storageKey])

  // Escutar mudanças na preferência do sistema
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      const newResolvedTheme = e.matches ? 'dark' : 'light'
      setResolvedTheme(newResolvedTheme)
      applyTheme(newResolvedTheme)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  // Prevenir flash de conteúdo não estilizado (FOUC)
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Durante SSR ou fora do provider, retornar valores padrão
    // Também fornece valores padrão durante renderização do cliente para evitar erros
    return {
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: () => {},
      toggleTheme: () => {},
    }
  }
  return context
}

export default ThemeProvider
