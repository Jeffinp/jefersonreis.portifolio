import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export type TargetAudience = 'empresa' | 'freelance' | 'default'

interface UseTargetAudienceReturn {
  target: TargetAudience
  setTarget: (target: TargetAudience) => void
  switchToTarget: (target: TargetAudience) => void
  isEmpresa: boolean
  isFreelance: boolean
  isDefault: boolean
  getTargetURL: (target: TargetAudience) => string
}

/**
 * Hook inteligente para gerenciar o público-alvo do portfolio
 * Adapta conteúdo baseado em query parameters
 */
export const useTargetAudience = (): UseTargetAudienceReturn => {
  const router = useRouter()
  const [target, setTargetState] = useState<TargetAudience>('default')

  useEffect(() => {
    // Prioridade: Query param > localStorage > default
    const queryTarget = router.query.target as string
    const savedTarget = localStorage.getItem('portfolioTarget') as TargetAudience
    
    if (queryTarget === 'empresa' || queryTarget === 'freelance') {
      setTargetState(queryTarget)
      localStorage.setItem('portfolioTarget', queryTarget)
    } else if (savedTarget && !queryTarget) {
      // Se não tem query param mas tem salvo, usa o salvo
      setTargetState(savedTarget)
    } else {
      // Sem query param e sem localStorage = mostra versão default
      setTargetState('default')
    }
  }, [router.query])

  const setTarget = (newTarget: TargetAudience) => {
    setTargetState(newTarget)
    if (newTarget !== 'default') {
      localStorage.setItem('portfolioTarget', newTarget)
    } else {
      localStorage.removeItem('portfolioTarget')
    }
  }

  const switchToTarget = (newTarget: TargetAudience) => {
    // Navigate to specific pages instead of query params
    if (newTarget === 'empresa') {
      router.push('/empresa')
    } else if (newTarget === 'freelance') {
      router.push('/freelance')
    } else {
      router.push('/')
    }
  }

  const getTargetURL = (targetType: TargetAudience): string => {
    const baseURL = window.location.pathname
    const currentParams = new URLSearchParams(window.location.search)
    
    // Remove target param if switching to default
    if (targetType === 'default') {
      currentParams.delete('target')
    } else {
      currentParams.set('target', targetType)
    }
    
    // Preserve utm params and other tracking
    const queryString = currentParams.toString()
    return queryString ? `${baseURL}?${queryString}` : baseURL
  }

  return {
    target,
    setTarget,
    switchToTarget,
    isEmpresa: target === 'empresa',
    isFreelance: target === 'freelance',
    isDefault: target === 'default',
    getTargetURL,
  }
}

export default useTargetAudience