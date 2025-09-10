import { useEffect, useState, useCallback } from 'react'

interface UseExitIntentOptions {
  threshold?: number // Distância do topo para trigger (default: 10px)
  delay?: number // Delay antes de mostrar popup (ms)
  cooldown?: number // Tempo mínimo entre popups (ms)
  mobileEnabled?: boolean // Habilitar em mobile
  onTrigger?: () => void // Callback quando triggered
}

export const useExitIntent = ({
  threshold = 10,
  delay = 0,
  cooldown = 86400000, // 24 horas default
  mobileEnabled = false,
  onTrigger,
}: UseExitIntentOptions = {}) => {
  const [isTriggered, setIsTriggered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Só trigger quando mouse sai pelo topo
      if (e.clientY <= threshold) {
        // Verificar cooldown
        const lastShown = localStorage.getItem('exitIntentLastShown')
        const now = Date.now()

        if (lastShown) {
          const timeSinceLastShown = now - parseInt(lastShown)
          if (timeSinceLastShown < cooldown) {
            return
          }
        }

        setIsTriggered(true)
        localStorage.setItem('exitIntentLastShown', now.toString())

        if (delay > 0) {
          setTimeout(() => {
            setIsVisible(true)
            onTrigger?.()
          }, delay)
        } else {
          setIsVisible(true)
          onTrigger?.()
        }
      }
    },
    [threshold, delay, cooldown, onTrigger]
  )

  // Mobile exit intent - detectar scroll up rápido no topo
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!mobileEnabled) return

      // Implementar lógica de detecção de saída em mobile
      // Por exemplo, scroll rápido para cima quando já está no topo
      if (window.scrollY < 100 && e.touches[0].clientY > window.innerHeight * 0.8) {
        const lastShown = localStorage.getItem('exitIntentLastShownMobile')
        const now = Date.now()

        if (lastShown) {
          const timeSinceLastShown = now - parseInt(lastShown)
          if (timeSinceLastShown < cooldown) {
            return
          }
        }

        setIsTriggered(true)
        localStorage.setItem('exitIntentLastShownMobile', now.toString())
        setIsVisible(true)
        onTrigger?.()
      }
    },
    [mobileEnabled, cooldown, onTrigger]
  )

  useEffect(() => {
    // Desktop listeners
    document.addEventListener('mouseleave', handleMouseLeave)

    // Mobile listeners (se habilitado)
    if (mobileEnabled) {
      document.addEventListener('touchmove', handleTouchMove)
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (mobileEnabled) {
        document.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [handleMouseLeave, handleTouchMove, mobileEnabled])

  const dismiss = useCallback(() => {
    setIsVisible(false)
  }, [])

  const reset = useCallback(() => {
    setIsTriggered(false)
    setIsVisible(false)
    localStorage.removeItem('exitIntentLastShown')
    localStorage.removeItem('exitIntentLastShownMobile')
  }, [])

  return {
    isTriggered,
    isVisible,
    dismiss,
    reset,
  }
}