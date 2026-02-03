'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { type TargetAudience } from '@/types'
import { AUDIENCE_STORAGE_KEY, AUDIENCE_ROUTES } from '@/lib/constants'

/**
 * Hook para gerenciar o público-alvo (Target Audience)
 * Controla se o usuário está em modo empresa ou freelance
 *
 * @example
 * ```tsx
 * const { target, setTarget, isEmpresa, isFreelance } = useTargetAudience()
 *
 * if (isEmpresa) {
 *   return <PortfolioView />
 * }
 *
 * return <FreelanceView />
 * ```
 */
export function useTargetAudience() {
  const router = useRouter()
  const pathname = usePathname()
  const [target, setTargetState] = useState<TargetAudience>('default')
  const [mounted, setMounted] = useState(false)

  // Detectar target inicial do localStorage ou pathname
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true)

      // Prioridade: pathname > localStorage > default
      if (pathname?.includes('/empresa')) {
        setTargetState('empresa')
        if (typeof window !== 'undefined') {
          localStorage.setItem(AUDIENCE_STORAGE_KEY, 'empresa')
        }
        return
      }

      if (pathname?.includes('/freelance')) {
        setTargetState('freelance')
        if (typeof window !== 'undefined') {
          localStorage.setItem(AUDIENCE_STORAGE_KEY, 'freelance')
        }
        return
      }

      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(
          AUDIENCE_STORAGE_KEY
        ) as TargetAudience | null
        if (stored && ['empresa', 'freelance'].includes(stored)) {
          setTargetState(stored)
        }
      }
    })
    return () => cancelAnimationFrame(frameId)
  }, [pathname])

  // Função para mudar o target e salvar no localStorage
  const setTarget = useCallback((newTarget: TargetAudience) => {
    setTargetState(newTarget)

    if (typeof window !== 'undefined') {
      if (newTarget === 'default') {
        localStorage.removeItem(AUDIENCE_STORAGE_KEY)
      } else {
        localStorage.setItem(AUDIENCE_STORAGE_KEY, newTarget)
      }
    }
  }, [])

  // Função para navegar para a rota do target
  const navigateToTarget = useCallback(
    (newTarget: TargetAudience) => {
      setTarget(newTarget)
      const route = AUDIENCE_ROUTES[newTarget]

      // Preservar locale na navegação
      const currentLocale = pathname?.split('/')[1]
      const localePrefix =
        currentLocale && ['pt', 'en'].includes(currentLocale)
          ? `/${currentLocale}`
          : '/pt'

      router.push(`${localePrefix}${route}`)
    },
    [pathname, router, setTarget]
  )

  // Limpar target
  const clearTarget = useCallback(() => {
    setTarget('default')
  }, [setTarget])

  return {
    target,
    setTarget,
    navigateToTarget,
    clearTarget,
    isEmpresa: target === 'empresa',
    isFreelance: target === 'freelance',
    isDefault: target === 'default',
    mounted,
  }
}
