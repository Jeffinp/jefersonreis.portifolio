import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react'
import {
  Code2,
  Palette,
  FileText,
  Box,
  Camera,
  Cpu,
  ChevronRight,
} from 'lucide-react'
import { motion, useAnimation, useInView, Easing } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { debounce } from '@/utils'
import SectionBackground from '@/components/SectionBackground'

/**
 * Hook personalizado para gerenciar animações baseadas em visibilidade
 */
const useAnimatedVisibility = (threshold = 0.2, once = true) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: threshold })

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
 * Componente de seção animada - memoizado para melhorar performance
 */
const AnimatedSection = memo(
  ({
    children,
    delay = 0,
    className = '',
    threshold = 0.2,
    animation = 'fadeUp',
  }: AnimatedSectionProps) => {
    const { ref, controls } = useAnimatedVisibility(threshold)

    // Define as variantes de animação com base no tipo solicitado
    const variants = useMemo(() => {
      const animations = {
        fadeUp: {
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay,
              ease: [0.22, 1, 0.36, 1] as Easing,
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
              ease: [0.22, 1, 0.36, 1] as Easing,
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
  },
)

AnimatedSection.displayName = 'AnimatedSection'

interface MousePosition {
  x: number
  y: number
}

interface ExpertiseCardProps {
  icon: React.ElementType
  title: string
  description: string
  actionText: string
  gradient: string
  delay: number
  index: number
  mousePosition: MousePosition
  isMobile: boolean
}

/**
 * Componente de Card 3D para áreas de atuação - otimizado
 */
const ExpertiseCard3D = memo(
  ({
    icon,
    title,
    description,
    actionText,
    gradient,
    delay,
    index,
    mousePosition,
    isMobile,
  }: ExpertiseCardProps) => {
    const Icon = icon
    const isEven = index % 2 === 0

    // Extração segura das cores base do gradiente
    let colorFrom = 'blue'
    let colorTo = 'cyan'

    if (gradient && typeof gradient === 'string') {
      const parts = gradient.split(' ')
      if (parts.length >= 2 && parts[1] && parts[1].startsWith('from-')) {
        colorFrom = parts[1].replace('from-', '').split('-')[0]
      }
      if (parts.length >= 3 && parts[2] && parts[2].startsWith('to-')) {
        colorTo = parts[2].replace('to-', '').split('-')[0]
      }
    }

    // Transformação 3D simplificada
    const transform = !isMobile
      ? `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`
      : 'none'

    return (
      <AnimatedSection delay={delay} className="group h-full" threshold={0.1}>
        <motion.div
          className="perspective relative h-full"
          style={{ transform }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-full overflow-hidden rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl md:p-8 dark:border-slate-700/80 dark:bg-slate-800/90">
            {/* Efeito de borda inferior simplificado */}
            <div className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Fundo simplificado */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-white/0 to-${colorFrom}-50/30 dark:from-slate-800/0 dark:to-${colorFrom}-900/20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />

            <div className="relative flex h-full flex-col items-center text-center">
              {/* Ícone com gradiente - efeitos simplificados */}
              <div
                className={`relative mb-6 rounded-full bg-gradient-to-br p-5 md:p-6 ${gradient} z-10 text-white shadow-lg transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon
                  strokeWidth={1.5}
                  className="relative z-10 h-8 w-8 md:h-10 md:w-10"
                  aria-hidden="true"
                />
              </div>

              {/* Título simplificado */}
              <h3 className="z-10 mb-4 text-xl font-bold text-gray-800 transition-colors duration-300 md:text-2xl dark:text-gray-100">
                {title}
              </h3>

              {/* Descrição */}
              <p className="mb-6 flex-grow leading-relaxed text-gray-600 dark:text-gray-300">
                {description}
              </p>

              {/* Botão simplificado */}
              <button
                type="button"
                className={`flex items-center text-${colorFrom}-500 dark:text-${colorFrom}-400 mt-auto font-medium hover:underline`}
              >
                {actionText}
                <ChevronRight
                  className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    )
  },
)

ExpertiseCard3D.displayName = 'ExpertiseCard3D'

const ExpertiseAreas: React.FC = () => {
  const { t } = useTranslation('common')
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Detectar dispositivo móvel com callback memoizado
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

  // Efeito de paralaxe com mouse otimizado
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
      sectionElement.addEventListener(
        'mousemove',
        handleMouseMove as EventListener,
      )
    }

    return () => {
      if (sectionElement) {
        sectionElement.removeEventListener(
          'mousemove',
          handleMouseMove as EventListener,
        )
      }
    }
  }, [isMobile])

  // Áreas de expertise
  const expertiseAreas = [
    {
      icon: Code2,
      title: t('expertise.items.item0.title'),
      description: t('expertise.items.item0.description'),
      actionText: t('expertise.learnMore'),
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-400',
    },
    {
      icon: Palette,
      title: t('expertise.items.item1.title'),
      description: t('expertise.items.item1.description'),
      actionText: t('expertise.learnMore'),
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
    },
    {
      icon: FileText,
      title: t('expertise.items.item2.title'),
      description: t('expertise.items.item2.description'),
      actionText: t('expertise.learnMore'),
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-500',
    },
    {
      icon: Box,
      title: t('expertise.items.item3.title'),
      description: t('expertise.items.item3.description'),
      actionText: t('expertise.learnMore'),
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
    },
    {
      icon: Cpu,
      title: t('expertise.items.item4.title'),
      description: t('expertise.items.item4.description'),
      actionText: t('expertise.learnMore'),
      gradient: 'bg-gradient-to-br from-red-500 to-rose-500',
    },
    {
      icon: Camera,
      title: t('expertise.items.item5.title'),
      description: t('expertise.items.item5.description'),
      actionText: t('expertise.learnMore'),
      gradient: 'bg-gradient-to-br from-indigo-500 to-violet-500',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="relative w-full overflow-hidden bg-transparent py-16 md:py-24 lg:py-32"
    >
      {/* Background unificado */}
      <SectionBackground
        variant="expertise"
        isMobile={isMobile}
        intensity="subtle"
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center md:mb-16 lg:mb-20">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl dark:text-white">
            {t('expertise.title')}
          </h2>
          <p className="text-lg text-gray-600 md:text-xl dark:text-gray-300">
            {t('expertise.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {expertiseAreas.map((area, index) => (
            <ExpertiseCard3D
              key={index}
              icon={area.icon}
              title={area.title}
              description={area.description}
              actionText={area.actionText}
              gradient={area.gradient}
              delay={0.1 * (index % 3)}
              index={index}
              mousePosition={mousePosition}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExpertiseAreas
