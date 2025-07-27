import React from 'react'
import AnimatedSection from './AnimatedSection'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
  alignment?: 'left' | 'center' | 'right'
  delay?: number
}

/**
 * Componente de cabeçalho padronizado para seções
 * Mantém consistência visual em títulos e descrições
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
  alignment = 'center',
  delay = 0,
}) => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[alignment]

  const containerAlignmentClass = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end',
  }[alignment]

  return (
    <AnimatedSection
      delay={delay}
      className={`mb-12 flex flex-col ${containerAlignmentClass} ${className}`}
    >
      <div className={`max-w-4xl ${alignmentClass}`}>
        {subtitle && (
          <p
            className={`mb-3 text-sm font-medium tracking-wider text-blue-600 uppercase dark:text-blue-400 ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        )}

        <h2
          className={`section-title mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl dark:text-white ${titleClassName}`}
        >
          {title}
        </h2>

        {description && (
          <p
            className={`text-lg leading-relaxed text-gray-600 dark:text-gray-300 ${descriptionClassName}`}
          >
            {description}
          </p>
        )}
      </div>
    </AnimatedSection>
  )
}

export default SectionHeader
