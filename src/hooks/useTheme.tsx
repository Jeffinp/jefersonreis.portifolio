'use client'

import { useEffect, useState, useCallback } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Aplicar tema ao DOM
  const applyTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement
    const body = document.body

    // Remove todas as classes de tema
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')

    // Adiciona a nova classe
    root.classList.add(theme)
    body.classList.add(theme)

    // Atualiza variáveis CSS customizadas
    if (theme === 'dark') {
      root.style.colorScheme = 'dark'
    } else {
      root.style.colorScheme = 'light'
    }

    // Theme applied successfully
  }

  // Resolver tema system
  const resolveSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  // Resolver tema atual
  const resolveTheme = useCallback(
    (themeToResolve: Theme): 'light' | 'dark' => {
      if (themeToResolve === 'system') {
        return resolveSystemTheme()
      }
      return themeToResolve
    },
    [],
  )

  // Função para alterar tema
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    const resolved = resolveTheme(newTheme)
    setResolvedTheme(resolved)
    applyTheme(resolved)

    // Salvar no localStorage
    try {
      localStorage.setItem('portfolio-theme', newTheme)
    } catch (error) {
      console.warn('Erro ao salvar tema:', error)
    }
  }

  // Toggle entre light e dark
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    changeTheme(newTheme)
  }

  // Inicialização
  useEffect(() => {
    // Recuperar tema salvo
    let savedTheme: Theme = 'system'
    try {
      const stored = localStorage.getItem('portfolio-theme')
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        savedTheme = stored as Theme
      }
    } catch (error) {
      console.warn('Erro ao ler localStorage:', error)
    }

    setTheme(savedTheme)
    const resolved = resolveTheme(savedTheme)
    setResolvedTheme(resolved)
    applyTheme(resolved)
    setMounted(true)
  }, [resolveTheme])

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
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return {
    theme,
    resolvedTheme,
    setTheme: changeTheme,
    toggleTheme,
    mounted,
  }
}
