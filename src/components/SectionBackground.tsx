import React from 'react'

interface SectionBackgroundProps {
  isMobile?: boolean
  variant?:
    | 'default'
    | 'hero'
    | 'about'
    | 'projects'
    | 'skills'
    | 'services'
    | 'contact'
    | 'timeline'
    | 'testimonials'
    | 'expertise'
  className?: string
  intensity?: 'none' | 'subtle' | 'light' | 'medium'
}

/**
 * Sistema de Background complementar ao gradiente global
 * Adiciona elementos decorativos específicos por seção sem interferir no gradiente contínuo
 */
const SectionBackground: React.FC<SectionBackgroundProps> = ({
  isMobile = false,
  variant = 'default',
  className = '',
  intensity = 'subtle',
}) => {
  // Elementos decorativos por seção com cores harmoniosas ao gradiente global
  const decorativeElements = {
    hero: { primary: '#3b82f6', secondary: '#6366f1', accent: '#8b5cf6' },
    about: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#a855f7' },
    expertise: { primary: '#8b5cf6', secondary: '#a855f7', accent: '#c084fc' },
    skills: { primary: '#a855f7', secondary: '#c084fc', accent: '#d946ef' },
    projects: { primary: '#c084fc', secondary: '#d946ef', accent: '#e879f9' },
    services: { primary: '#d946ef', secondary: '#e879f9', accent: '#f0abfc' },
    timeline: { primary: '#e879f9', secondary: '#f0abfc', accent: '#ec4899' },
    testimonials: {
      primary: '#f0abfc',
      secondary: '#ec4899',
      accent: '#f43f5e',
    },
    contact: { primary: '#ec4899', secondary: '#f43f5e', accent: '#fb7185' },
    default: { primary: '#8b5cf6', secondary: '#a855f7', accent: '#c084fc' },
  }

  const colors = decorativeElements[variant] || decorativeElements.default

  // Intensidade dos efeitos decorativos
  const intensityMap = {
    none: { opacity: 0, blur: 0 },
    subtle: { opacity: 0.008, blur: 4 },
    light: { opacity: 0.015, blur: 3 },
    medium: { opacity: 0.025, blur: 2 },
  }

  const effects = intensityMap[intensity]

  if (intensity === 'none') {
    return null
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-40 overflow-hidden ${className}`}
    >
      {/* Elementos decorativos específicos da seção */}
      <div className="absolute inset-0">
        {/* Esfera principal sutil */}
        <div
          className={`absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-${effects.blur}xl`}
          style={{
            background: `radial-gradient(circle, ${colors.primary}${Math.round(
              effects.opacity * 1000,
            )
              .toString(16)
              .padStart(2, '0')}, transparent 70%)`,
            opacity: effects.opacity * 100,
          }}
        />

        {/* Esfera secundária */}
        <div
          className={`absolute top-1/3 right-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-${effects.blur}xl`}
          style={{
            background: `radial-gradient(circle, ${colors.secondary}${Math.round(
              effects.opacity * 800,
            )
              .toString(16)
              .padStart(2, '0')}, transparent 70%)`,
            opacity: effects.opacity * 80,
          }}
        />

        {/* Esfera de destaque */}
        <div
          className={`absolute bottom-1/3 left-1/4 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-${effects.blur}xl`}
          style={{
            background: `radial-gradient(circle, ${colors.accent}${Math.round(
              effects.opacity * 600,
            )
              .toString(16)
              .padStart(2, '0')}, transparent 70%)`,
            opacity: effects.opacity * 60,
          }}
        />
      </div>

      {/* Pontos decorativos minimalistas específicos da seção */}
      {intensity !== 'subtle' && (
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/6 h-0.5 w-0.5 rounded-full"
            style={{
              backgroundColor: colors.primary,
              opacity: effects.opacity * 20,
            }}
          />
          <div
            className="absolute top-2/3 right-1/5 h-0.5 w-0.5 rounded-full"
            style={{
              backgroundColor: colors.secondary,
              opacity: effects.opacity * 15,
            }}
          />
          <div
            className="absolute bottom-1/5 left-1/3 h-0.5 w-0.5 rounded-full"
            style={{
              backgroundColor: colors.accent,
              opacity: effects.opacity * 18,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default SectionBackground
