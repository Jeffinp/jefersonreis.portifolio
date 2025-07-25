import React from 'react'
import { motion } from 'framer-motion'
import SkillCard from './SkillCard'
import { skills, getSkillsByCategory, skillCategories } from '@/data/skills'
import {
  Code,
  Server,
  Database,
  GitBranch,
  Palette,
  Wrench,
} from 'lucide-react'
import { useTranslation } from 'next-i18next'

/**
 * Componente Background padronizado
 */
const Background: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <>
    {/* Gradiente de fundo similar ao Hero/About */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/40 via-white to-gray-50/40 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-950/40"></div>

    {/* Grade sutil */}
    <div
      className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                           linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
        backgroundSize: isMobile ? '40px 40px' : '80px 80px',
      }}
    />

    {/* Esferas borradas decorativas */}
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
      <div className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl dark:bg-green-500/10" />
      <div
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10"
        style={{ transform: 'translate(-50%, -50%) scale(0.7)' }}
      />
    </div>
  </>
)

const SkillsCloud: React.FC = () => {
  const { t } = useTranslation('common')
  const [isMobile, setIsMobile] = React.useState(false)

  // Detectar dispositivo móvel
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mapeamento de ícones para categorias
  const skillsIcons: Record<string, React.ElementType> = {
    frontend: Code,
    backend: Server,
    database: Database,
    devops: GitBranch,
    design: Palette,
    tools: Wrench,
  }

  // Mapeamento de cores para categorias
  const skillsColors: Record<string, string> = {
    frontend: 'from-blue-500 to-indigo-600',
    backend: 'from-green-500 to-emerald-600',
    database: 'from-amber-500 to-orange-600',
    devops: 'from-purple-500 to-fuchsia-600',
    design: 'from-rose-500 to-pink-600',
    tools: 'from-slate-500 to-gray-600',
  }

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24 xl:py-28"
      aria-label="Habilidades de Jeferson Reis"
    >
      {/* Background Elements */}
      <Background isMobile={isMobile} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl dark:from-blue-400 dark:to-purple-400">
            {t('menu.skills')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('about.expertise.title')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1"
            >
              <SkillCard
                category={category.id}
                title={category.name}
                skills={getSkillsByCategory(category.id)}
                iconName={skillsIcons[category.id] as React.ElementType}
                color={skillsColors[category.id]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsCloud
