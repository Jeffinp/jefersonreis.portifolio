import React from 'react'
import SectionBackground from './SectionBackground'

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
  containerClassName?: string
  backgroundVariant?:
    | 'default'
    | 'hero'
    | 'about'
    | 'projects'
    | 'skills'
    | 'services'
    | 'contact'
    | 'timeline'
    | 'testimonials'
  isMobile?: boolean
  paddingY?: 'small' | 'medium' | 'large' | 'none'
  intensity?: 'none' | 'subtle' | 'light' | 'medium'
  ariaLabel?: string
}

/**
 * Wrapper padronizado para todas as seções do site
 * Garante estrutura consistente, padding e background
 */
const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = '',
  containerClassName = '',
  backgroundVariant = 'default',
  isMobile = false,
  paddingY = 'large',
  intensity = 'subtle',
  ariaLabel,
}) => {
  // Mapeamento de padding consistente
  const paddingMap = {
    none: '',
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-16 lg:py-20',
    large: 'py-16 md:py-20 lg:py-24 xl:py-28',
  }

  const paddingClass = paddingMap[paddingY]

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${paddingClass} ${className}`}
      aria-label={ariaLabel}
    >
      <SectionBackground
        variant={backgroundVariant}
        isMobile={isMobile}
        intensity={intensity}
      />

      <div
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
