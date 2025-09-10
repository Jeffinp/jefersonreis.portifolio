import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react'
import {
  motion,
  useAnimation,
  useInView,
  Variants,
  Easing,
} from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { debounce } from '@/utils'
import { SectionBackground } from '@/components/common'

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
  // Define as variantes de animação com base no tipo solicitado
  const variants: Variants = useMemo(() => {
    const cubicBezier: [number, number, number, number] = [0.22, 1, 0.36, 1]
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

/**
 * Componente principal About
 */
const About: React.FC = () => {
  const { t } = useTranslation('main')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
                  <h2 className="section-title mb-4 text-3xl font-bold text-blue-600 md:text-4xl lg:text-5xl dark:text-blue-400">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
