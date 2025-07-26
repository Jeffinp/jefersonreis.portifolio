import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react'
import {
  Palette,
  ChevronRight,
  Code,
  Terminal,
  Layers,
  Monitor,
} from 'lucide-react'
import {
  motion,
  useAnimation,
  useInView,
  Variants,
  Easing,
} from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { debounce } from '@/utils'
import SectionBackground from '@/components/SectionBackground'

/**
 * Hook personalizado para gerenciar animações baseadas em visibilidade
 */
const useAnimatedVisibility = (amount = 0.2, once = true) => {
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
 * Hook personalizado para navegação suave entre seções
 */
const useSmoothScroll = () => {
  return useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])
}

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  threshold?: number
  animation?: 'fadeUp' | 'fadeIn' | 'scaleUp'
}

/**
 * Componente de seção animada
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = '',
  threshold = 0.2,
  animation = 'fadeUp',
}) => {
  const { ref, controls } = useAnimatedVisibility(threshold)
  const cubicBezier: [number, number, number, number] = [0.22, 1, 0.36, 1]
  // Define as variantes de animação com base no tipo solicitado
  const variants: Variants = useMemo(() => {
    const animations = {
      fadeUp: {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: cubicBezier as Easing,
          },
        },
      },
      fadeIn: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.6,
            delay,
            // FIX: Add 'as Easing' to assert the type
            ease: 'easeInOut' as Easing,
          },
        },
      },
      scaleUp: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
            delay,
            ease: cubicBezier as Easing,
          },
        },
      },
    }
    return animations[animation]
  }, [animation, delay])

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
}

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  actionText: string
  onClick: () => void
  colorClass?: 'blue' | 'purple' | 'green' | 'orange'
  delay: number
  index: number
  ariaLabel: string
}

/**
 * Componente de Card para destacar recursos/habilidades
 */
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  actionText,
  onClick,
  colorClass = 'blue',
  delay,
  index,
  ariaLabel,
}) => {
  const Icon = icon

  // Mapeamento de cores para classes Tailwind
  const colorMap = {
    blue: {
      bg: 'from-blue-500 to-cyan-500',
      text: 'text-blue-600 dark:text-blue-400',
    },
    purple: {
      bg: 'from-purple-500 to-pink-500',
      text: 'text-purple-600 dark:text-purple-400',
    },
    green: {
      bg: 'from-green-500 to-blue-500',
      text: 'text-green-600 dark:text-green-400',
    },
    orange: {
      bg: 'from-orange-500 to-red-500',
      text: 'text-orange-600 dark:text-orange-400',
    },
  }

  const colors = colorMap[colorClass] || colorMap.blue

  return (
    <AnimatedSection delay={delay} className="group h-full" threshold={0.1}>
      <div className="relative h-full overflow-hidden rounded-xl border border-gray-100 bg-white/90 p-5 shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-xl md:p-6 lg:rounded-2xl lg:p-8 dark:border-slate-700/80 dark:bg-slate-800/90">
        <div className="relative flex h-full flex-col items-center text-center">
          {/* Ícone com gradiente */}
          <div
            className={`relative mb-4 rounded-full bg-gradient-to-br p-3 md:mb-6 md:p-4 ${colors.bg} text-white shadow-lg transition-transform duration-300 group-hover:scale-105`}
          >
            <Icon
              strokeWidth={1.5}
              className="h-6 w-6 md:h-7 md:w-7"
              aria-hidden="true"
            />
          </div>

          {/* Título */}
          <h3
            id={`feature-title-${index}`}
            className="mb-3 text-lg font-bold text-gray-800 md:mb-4 md:text-xl dark:text-white"
          >
            {title}
          </h3>

          {/* Descrição */}
          <p className="mb-6 flex-grow text-gray-600 dark:text-gray-300">
            {description}
          </p>

          {/* Botão de ação */}
          <button
            onClick={onClick}
            className={`inline-flex items-center text-sm font-medium ${colors.text} transition-colors duration-200 group-hover:underline focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-800`}
            aria-label={ariaLabel}
          >
            {actionText}
            <ChevronRight className="ml-1 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </AnimatedSection>
  )
}

interface StatCardProps {
  value: string
  label: string
  colorClass?: 'blue' | 'purple' | 'green' | 'pink'
}

/**
 * Componente para estatísticas
 */
const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  colorClass = 'blue',
}) => {
  const bgColorMap = {
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    purple: 'bg-purple-50 dark:bg-purple-900/20',
    green: 'bg-green-50 dark:bg-green-900/20',
    pink: 'bg-pink-50 dark:bg-pink-900/20',
  }

  const textColorMap = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    pink: 'text-pink-600 dark:text-pink-400',
  }

  const borderGradientMap = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-teal-500',
    pink: 'from-pink-500 to-purple-500',
  }

  return (
    <div
      className={`${bgColorMap[colorClass]} relative rounded-xl border border-white/60 p-6 backdrop-blur-sm sm:p-7 lg:rounded-2xl dark:border-transparent`}
    >
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br lg:rounded-2xl ${borderGradientMap[colorClass]} opacity-10`}
      ></div>
      <div className="relative z-10">
        <div
          className={`mb-2 text-3xl font-bold sm:text-4xl ${textColorMap[colorClass]}`}
        >
          {value}
        </div>
        <div className="font-medium text-gray-700 dark:text-gray-300">
          {label}
        </div>
      </div>
    </div>
  )
}

interface ExpertiseItemProps {
  icon: React.ReactNode
  label: string
  colorClass?: 'blue' | 'purple' | 'green' | 'pink'
}

/**
 * Componente para itens de expertise
 */
const ExpertiseItem: React.FC<ExpertiseItemProps> = ({
  icon,
  label,
  colorClass = 'blue',
}) => {
  // Mapeamento de cores para classes Tailwind
  const bgColorMap = {
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    purple: 'bg-purple-50 dark:bg-purple-900/20',
    green: 'bg-green-50 dark:bg-green-900/20',
    pink: 'bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30',
  }

  const textColorMap = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    pink: 'text-pink-600 dark:text-pink-400',
  }

  const bgClass = bgColorMap[colorClass] || bgColorMap.blue
  const textClass = textColorMap[colorClass] || textColorMap.blue

  return (
    <div
      className={`flex items-center gap-2 rounded-lg p-3 ${bgClass} ${textClass} justify-center lg:justify-start`}
    >
      {icon}
      <span className="text-sm font-medium md:text-base">{label}</span>
    </div>
  )
}

/**
 * Componente principal About
 */
const About: React.FC = () => {
  const { t } = useTranslation('common')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollTo = useSmoothScroll()

  // Detectar dispositivo móvel com debounce
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    const handleResize = debounce(() => {
      checkMobile()
    }, 250)

    checkMobile()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [checkMobile])

  // Efeito de paralaxe com mouse (apenas em desktop)
  useEffect(() => {
    if (isMobile) return () => {}

    const handleMouseMove = debounce((e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({
        x: x / rect.width - 0.5,
        y: y / rect.height - 0.5,
      })
    }, 50)

    const sectionElement = sectionRef.current
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (sectionElement) {
        sectionElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isMobile])

  // Memoizar os dados das features para evitar re-renderizações
  const features = useMemo(
    () => [
      {
        icon: Code,
        title: t('about.cards.webDev.title'),
        description: t('about.cards.webDev.description'),
        actionText: t('about.cards.action'),
        onClick: () => scrollTo('projects'),
        colorClass: 'blue' as const,
        ariaLabel: t('about.cards.webDev.ariaLabel'),
        delay: 0.1,
      },
      {
        icon: Palette,
        title: t('about.cards.design.title'),
        description: t('about.cards.design.description'),
        actionText: t('about.cards.action'),
        onClick: () => scrollTo('projects'),
        colorClass: 'purple' as const,
        ariaLabel: t('about.cards.design.ariaLabel'),
        delay: 0.2,
      },
      {
        icon: Terminal,
        title: t('about.cards.backend.title'),
        description: t('about.cards.backend.description'),
        actionText: t('about.cards.action'),
        onClick: () => scrollTo('skills-section'),
        colorClass: 'green' as const,
        ariaLabel: t('about.cards.backend.ariaLabel'),
        delay: 0.3,
      },
      {
        icon: Layers,
        title: t('about.cards.softSkills.title'),
        description: t('about.cards.softSkills.description'),
        actionText: t('about.cards.action'),
        onClick: () => scrollTo('skills-section'),
        colorClass: 'orange' as const,
        ariaLabel: t('about.cards.softSkills.ariaLabel'),
        delay: 0.4,
      },
    ],
    [scrollTo, t],
  )

  // Estatísticas
  const stats = [
    {
      value: '5+',
      label: t('about.stats.experience'),
      colorClass: 'blue' as const,
    },
    {
      value: '15+',
      label: t('about.stats.projects'),
      colorClass: 'purple' as const,
    },
    {
      value: '80+',
      label: t('about.stats.clients'),
      colorClass: 'green' as const,
    },
    {
      value: '99%',
      label: t('about.stats.satisfaction'),
      colorClass: 'pink' as const,
    },
  ]

  // Áreas de expertise
  const expertiseItems = [
    {
      icon: <Code className="h-5 w-5 md:h-6 md:w-6" />,
      label: t('about.expertise.frontend'),
      colorClass: 'blue' as const,
    },
    {
      icon: <Terminal className="h-5 w-5 md:h-6 md:w-6" />,
      label: t('about.expertise.backend'),
      colorClass: 'purple' as const,
    },
    {
      icon: <Palette className="h-5 w-5 md:h-6 md:w-6" />,
      label: t('about.expertise.design'),
      colorClass: 'green' as const,
    },
    {
      icon: <Monitor className="h-5 w-5 md:h-6 md:w-6" />,
      label: t('about.expertise.ux'),
      colorClass: 'pink' as const,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24 xl:py-28"
      aria-label={t('about.title')}
    >
      <SectionBackground
        isMobile={isMobile}
        variant="about"
        intensity="subtle"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-20 xl:gap-24">
          {/* Bio and Introduction */}
          <div className="w-full space-y-8 lg:w-1/2">
            <AnimatedSection delay={0} animation="fadeUp" className="w-full">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="mb-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl dark:from-blue-400 dark:to-purple-400">
                    {t('about.title')}
                  </h2>
                  <h3 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl dark:text-white">
                    {t('about.devTitle')}
                  </h3>
                </div>

                <div className="space-y-6 text-base leading-relaxed text-gray-600 md:text-lg md:leading-[1.5] dark:text-gray-300">
                  <p>{t('about.paragraphs.first')}</p>
                  <p>{t('about.paragraphs.second')}</p>
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/20"
                  >
                    {t('about.cta.contact')}
                  </a>
                  <a
                    href="/assets/files/jeferson_reis_almeida.pdf"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-blue-600 bg-white/80 px-6 py-3 text-base font-semibold text-blue-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-700 hover:text-blue-700 hover:shadow-blue-500/10 dark:border-blue-500 dark:bg-slate-900/80 dark:text-blue-400 dark:hover:border-blue-400 dark:hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('about.cta.resume')}
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Statistics and Expertise */}
          <div className="w-full space-y-12 lg:w-1/2">
            {/* Statistics */}
            <AnimatedSection delay={0.1} animation="fadeUp" className="w-full">
              <h2 className="mt-8 mb-8 text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
                {t('about.stats.title')}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    colorClass={stat.colorClass}
                  />
                ))}
              </div>
            </AnimatedSection>

            {/* Expertise */}
            <AnimatedSection delay={0.2} animation="fadeUp">
              <h2 className="mt-8 mb-8 text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
                {t('about.expertise.title')}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {expertiseItems.map((item, index) => (
                  <ExpertiseItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    colorClass={item.colorClass}
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 md:mt-24 lg:mt-28 xl:mt-32">
          <AnimatedSection
            delay={0}
            animation="fadeUp"
            className="mb-12 text-center md:mb-16"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
              {t('about.services.title')}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              {t('about.services.subtitle')}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                actionText={feature.actionText}
                onClick={feature.onClick}
                colorClass={feature.colorClass}
                delay={feature.delay}
                index={index}
                ariaLabel={feature.ariaLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
