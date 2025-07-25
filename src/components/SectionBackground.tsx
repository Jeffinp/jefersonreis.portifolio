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
  className?: string
}

/**
 * Componente Background padronizado para todas as seções
 * Segue o padrão visual estabelecido no Hero e About
 */
const SectionBackground: React.FC<SectionBackgroundProps> = ({
  isMobile = false,
  variant = 'default',
  className = '',
}) => {
  // Mapeamento de cores por seção
  const colorMap = {
    default: {
      primary: 'blue-500',
      secondary: 'purple-500',
    },
    hero: {
      primary: 'blue-500',
      secondary: 'purple-500',
    },
    about: {
      primary: 'blue-500',
      secondary: 'purple-500',
    },
    projects: {
      primary: 'purple-500',
      secondary: 'blue-500',
    },
    skills: {
      primary: 'green-500',
      secondary: 'blue-500',
    },
    services: {
      primary: 'cyan-500',
      secondary: 'blue-500',
    },
    contact: {
      primary: 'indigo-500',
      secondary: 'purple-500',
    },
    timeline: {
      primary: 'amber-500',
      secondary: 'orange-500',
    },
    testimonials: {
      primary: 'rose-500',
      secondary: 'pink-500',
    },
  }

  const colors = colorMap[variant] || colorMap.default

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Gradiente de fundo padronizado */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-gray-50/40 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-950/40"></div>

      {/* Grade sutil */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                             linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
          backgroundSize: isMobile ? '40px 40px' : '80px 80px',
        }}
      />

      {/* Esferas borradas decorativas com cores específicas por seção */}
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        <div
          className={`absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-${colors.primary}/5 blur-3xl dark:bg-${colors.primary}/10`}
        />
        <div
          className={`absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-${colors.secondary}/5 blur-3xl dark:bg-${colors.secondary}/10`}
          style={{ transform: 'translate(-50%, -50%) scale(0.7)' }}
        />
      </div>

      {/* Pontos decorativos sutis */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-blue-400/20 dark:bg-blue-400/10"></div>
        <div className="absolute top-3/4 right-1/4 h-1 w-1 rounded-full bg-purple-400/20 dark:bg-purple-400/10"></div>
        <div className="absolute top-1/2 right-1/3 h-1.5 w-1.5 rounded-full bg-cyan-400/20 dark:bg-cyan-400/10"></div>
      </div>

      {/* Gradiente sutil nas bordas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent dark:via-gray-700/50"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent dark:via-gray-700/50"></div>
    </div>
  )
}

export default SectionBackground
