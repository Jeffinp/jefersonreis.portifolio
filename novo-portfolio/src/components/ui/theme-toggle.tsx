'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/theme'
import { useEffect, useState } from 'react'

/**
 * Componente de toggle de tema (Light/Dark)
 * Com proteção contra FOUC (Flash of Unstyled Content)
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle() {
  const { toggleTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evita FOUC - só renderiza após montar no cliente
  useEffect(() => {
    const frameId = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frameId)
  }, [])

  if (!mounted) {
    return (
      <button
        className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-md border"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="group border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 w-10 items-center justify-center rounded-md border transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      {isDark ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-transform group-hover:rotate-12" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-transform group-hover:rotate-45" />
      )}
      <span className="sr-only">
        {isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      </span>
    </button>
  )
}
