import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react'
import {
  Globe,
  Palette,
  FileText,
  Box,
  Laptop,
  Video,
  Code2,
  Camera,
  Cpu,
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
  // 3. CORREÇÃO: A propriedade 'threshold' foi renomeada para 'amount'
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
 * Componente de seção animada - memoizado para evitar re-renderizações
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
              // 4. CORREÇÃO: Adicionada asserção de tipo
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
              // 4. CORREÇÃO: Adicionada asserção de tipo
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
              // 4. CORREÇÃO: Adicionada asserção de tipo
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

interface ServiceCardProps {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
  delay: number
  index: number
  mousePosition: MousePosition
  isMobile: boolean
}

interface GradientConfig {
  gradientClass: string
  textColor: string
  hoverBg: string
}

interface GradientMap {
  [key: string]: GradientConfig
}

/**
 * Componente de card de serviço com efeito 3D - memoizado para melhorar performance
 */
const ServiceCard3D = memo(
  ({
    icon,
    title,
    description,
    gradient,
    delay,
    index,
    mousePosition,
    isMobile,
  }: ServiceCardProps) => {
    const Icon = icon

    const gradientMap: GradientMap = {
      'from-blue-500 to-cyan-500': {
        gradientClass: 'from-blue-500 to-cyan-500',
        textColor: 'text-blue-500 dark:text-blue-400',
        hoverBg: 'bg-blue-50 dark:bg-blue-900/20',
      },
      'from-purple-500 to-pink-500': {
        gradientClass: 'from-purple-500 to-pink-500',
        textColor: 'text-purple-500 dark:text-purple-400',
        hoverBg: 'bg-purple-50 dark:bg-purple-900/20',
      },
      'from-orange-500 to-red-500': {
        gradientClass: 'from-orange-500 to-red-500',
        textColor: 'text-orange-500 dark:text-orange-400',
        hoverBg: 'bg-orange-50 dark:bg-orange-900/20',
      },
      'from-green-500 to-teal-500': {
        gradientClass: 'from-green-500 to-teal-500',
        textColor: 'text-green-500 dark:text-green-400',
        hoverBg: 'bg-green-50 dark:bg-green-900/20',
      },
      'from-blue-500 to-indigo-500': {
        gradientClass: 'from-blue-500 to-indigo-500',
        textColor: 'text-blue-500 dark:text-blue-400',
        hoverBg: 'bg-blue-50 dark:bg-blue-900/20',
      },
      'from-red-500 to-purple-500': {
        gradientClass: 'from-red-500 to-purple-500',
        textColor: 'text-red-500 dark:text-red-400',
        hoverBg: 'bg-red-50 dark:bg-red-900/20',
      },
    }

    const safeGradient =
      gradientMap[gradient] || gradientMap['from-blue-500 to-cyan-500']

    const transform = !isMobile
      ? `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`
      : 'none'

    return (
      <AnimatedSection
        delay={delay}
        className="group h-full w-full"
        threshold={0.1}
      >
        <motion.div
          className="perspective relative h-full cursor-pointer"
          style={{ transform }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/90">
            <div
              className={`h-1 w-full bg-gradient-to-r ${safeGradient.gradientClass}`}
            ></div>

            <div className="flex h-full flex-col items-center p-5 text-center sm:p-6 lg:p-8">
              <div
                className={`mb-6 rounded-full bg-gradient-to-br p-4 ${safeGradient.gradientClass} text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}
              >
                <Icon
                  strokeWidth={1.5}
                  className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors duration-300 sm:text-2xl dark:text-gray-100">
                {title}
              </h3>

              <div className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    )
  },
)

ServiceCard3D.displayName = 'ServiceCard3D'

interface Service {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
}

const Services: React.FC = () => {
  const { t } = useTranslation('main')
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      setMousePosition({ x, y })
    }
  }, [])

  const debouncedHandleMouseMove = useMemo(
    () => debounce((e: React.MouseEvent) => handleMouseMove(e), 50),
    [handleMouseMove],
  )

  const services: Service[] = [
    {
      icon: Globe,
      title: t('services.items.web.title'),
      description: t('services.items.web.description'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Palette,
      title: t('services.items.design.title'),
      description: t('services.items.design.description'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FileText,
      title: t('services.items.documentation.title'),
      description: t('services.items.documentation.description'),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Box,
      title: t('services.items.modeling.title'),
      description: t('services.items.modeling.description'),
      gradient: 'from-green-500 to-teal-500',
    },
    {
      icon: Laptop,
      title: t('services.items.support.title'),
      description: t('services.items.support.description'),
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Video,
      title: t('services.items.video.title'),
      description: t('services.items.video.description'),
      gradient: 'from-red-500 to-purple-500',
    },
  ]


  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24 xl:py-28"
      onMouseMove={!isMobile ? debouncedHandleMouseMove : undefined}
      aria-label="Serviços e Áreas de Expertise de Jeferson Reis"
    >
      <SectionBackground
        isMobile={isMobile}
        variant="services"
        intensity="subtle"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center md:mb-16">
          <h2 className="section-title mb-4 text-3xl font-bold text-blue-600 md:text-4xl lg:text-5xl dark:text-blue-400">
            {t('services.title')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('services.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard3D
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              gradient={service.gradient}
              delay={0.1 * (index % 3)}
              index={index}
              mousePosition={mousePosition}
              isMobile={isMobile}
            />
          ))}
        </div>


        <AnimatedSection
          className="mx-auto mt-16 max-w-3xl text-center"
          delay={0.4}
        >
          <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
            {t('services.customService.title')}
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {t('services.customService.description')}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {t('services.customService.cta')}
          </a>
        </AnimatedSection>
      </div>

      {/* Remove WhatsAppButton component */}
    </section>
  )
}

export default Services
