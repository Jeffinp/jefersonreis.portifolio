import { useEffect, useRef } from 'react'
import { useAnimation, useInView, Variants } from 'framer-motion'

/**
 * Hook personalizado para gerenciar animações baseadas em visibilidade
 * Padronizado para uso em todos os containers
 */
export const useAnimatedVisibility = (amount = 0.2, once = true) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return { ref, controls }
}

/**
 * Variantes de animação padronizadas para uso consistente
 */
export const animationVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
}

/**
 * Função para criar variantes de animação com delay customizado
 */
export const createAnimationVariant = (
  type: keyof typeof animationVariants,
  delay = 0,
): Variants => {
  const baseVariant = animationVariants[type]
  const baseVisible = baseVariant.visible as any
  return {
    ...baseVariant,
    visible: {
      ...baseVisible,
      transition: {
        ...baseVisible?.transition,
        delay,
      },
    },
  }
}

/**
 * Configurações de easing padronizadas
 */
export const easingPresets = {
  smooth: [0.22, 1, 0.36, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.25, 0.46, 0.45, 0.94] as const,
  sharp: [0.4, 0, 0.2, 1] as const,
}

/**
 * Configurações de stagger para animações em sequência
 */
export const staggerConfig = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easingPresets.smooth,
      },
    },
  },
}
