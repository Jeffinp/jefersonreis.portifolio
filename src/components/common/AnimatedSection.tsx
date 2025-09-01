import React, { memo } from 'react'
import { motion } from 'framer-motion'
import {
  useAnimatedVisibility,
  animationVariants,
  createAnimationVariant,
} from '@/utils/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  threshold?: number
  animation?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'slideLeft' | 'slideRight'
}

/**
 * Componente de seção animada padronizado
 * Usado para manter consistência em todas as animações do site
 */
const AnimatedSection = memo<AnimatedSectionProps>(
  ({
    children,
    delay = 0,
    className = '',
    threshold = 0.2,
    animation = 'fadeUp',
  }) => {
    const { ref, controls } = useAnimatedVisibility(threshold)
    const variants =
      delay > 0
        ? createAnimationVariant(animation, delay)
        : animationVariants[animation]

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    )
  },
)

AnimatedSection.displayName = 'AnimatedSection'

export default AnimatedSection
