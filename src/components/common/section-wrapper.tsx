'use client'

import { motion } from 'framer-motion'
import { fadeInUp, defaultViewport } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
  containerClassName?: string
  animate?: boolean
}

export function SectionWrapper({
  children,
  id,
  className,
  containerClassName,
  animate = true,
}: SectionWrapperProps) {
  const Component = animate ? motion.section : 'section'

  return (
    <Component
      id={id}
      className={cn('section-padding', className)}
      {...(animate && {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: defaultViewport,
        variants: fadeInUp,
      })}
    >
      <div className={cn('container-width', containerClassName)}>
        {children}
      </div>
    </Component>
  )
}
