import React, { useState, useRef, useEffect, memo, useCallback } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Star,
} from 'lucide-react'
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
}

/**
 * Componente de seção animada
 */
const AnimatedSection = memo(
  ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
    const { ref, controls } = useAnimatedVisibility(0.2)

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay,
            },
          },
        }}
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

interface TimelineEventProps {
  title: string
  subtitle: string
  date: string
  description: string
  icon: React.ReactNode
  isLeft?: boolean
  iconBgColor?: string
  delay: number
}

// Componente para um evento individual da timeline
const TimelineEvent = memo(
  ({
    title,
    subtitle,
    date,
    description,
    icon,
    isLeft = true,
    iconBgColor = 'bg-blue-500',
    delay,
  }: TimelineEventProps) => {
    const { ref, controls } = useAnimatedVisibility(0.1)

    return (
      <motion.div
        ref={ref}
        className={`relative flex items-center ${
          isLeft ? 'justify-end' : 'justify-start'
        } mb-8 w-full`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.6,
              delay,
            },
          },
        }}
      >
        {/* Card do conteúdo */}{' '}
        <motion.div
          className={`relative z-10 ${
            isLeft ? 'mr-12' : 'ml-12'
          } w-full max-w-[calc(50%-3rem)] rounded-xl border border-gray-100 bg-white/90 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-800/90`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.4,
                delay: delay + 0.2,
              },
            },
          }}
        >
          <div className="absolute -top-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-1 text-sm font-medium text-white">
            {date}
          </div>
          <h3 className="mt-3 text-xl font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          <h4 className="text-md mb-2 font-semibold text-blue-600 dark:text-blue-400">
            {subtitle}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </motion.div>
        {/* Ícone central */}
        <div className="absolute left-1/2 z-20 -translate-x-1/2 transform">
          <motion.div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBgColor} text-white shadow-lg`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              transition: {
                delay: delay + 0.1,
                duration: 0.5,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              },
            }}
          >
            {icon}
          </motion.div>
        </div>
        {/* Linha da timeline */}{' '}
        <motion.div
          className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform rounded-full bg-gradient-to-b from-blue-500 to-purple-500"
          initial={{ height: 0 }}
          animate={{
            height: '100%',
            transition: { delay: delay, duration: 0.8 },
          }}
        />
      </motion.div>
    )
  },
)

TimelineEvent.displayName = 'TimelineEvent'

// Componente principal da Timeline
const Timeline: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })
  const [isMobile, setIsMobile] = useState(false)

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Manipulador de movimento do mouse para efeitos parallax
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      setMousePosition({ x, y })
    }
  }, [])

  const debouncedHandleMouseMove = debounce(handleMouseMove, 50)

  // Toggle para expandir/recolher a seção
  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  // Dados da timeline
  const timelineEvents = [
    {
      title: 'Início da Carreira em Desenvolvimento',
      subtitle: 'Desenvolvedor Freelancer',
      date: '2018',
      description:
        'Comecei minha jornada como desenvolvedor web, trabalhando em projetos freelancer e desenvolvendo minhas habilidades em HTML, CSS e JavaScript.',
      icon: <Briefcase size={20} />,
      iconBgColor: 'bg-blue-500',
      isLeft: true,
      delay: 0.1,
    },
    {
      title: 'Especialização em Front-end',
      subtitle: 'Frameworks Modernos',
      date: '2019',
      description:
        'Aprofundei meus conhecimentos em React.js, Next.js e outras tecnologias front-end modernas, expandindo minha capacidade de criar interfaces interativas.',
      icon: <Star size={20} />,
      iconBgColor: 'bg-purple-500',
      isLeft: false,
      delay: 0.3,
    },
    {
      title: 'Full Stack Development',
      subtitle: 'Back-end & Databases',
      date: '2020-2021',
      description:
        'Expandi meus horizontes para o desenvolvimento full stack, trabalhando com Node.js, Express, MongoDB e MySQL para criar aplicações web completas.',
      icon: <Calendar size={20} />,
      iconBgColor: 'bg-indigo-500',
      isLeft: true,
      delay: 0.5,
    },
    {
      title: 'UI/UX Design',
      subtitle: 'Design de Experiência do Usuário',
      date: '2021',
      description:
        'Incorporei conhecimentos de UI/UX design ao meu conjunto de habilidades, focando em criar experiências de usuário excepcionais e designs intuitivos.',
      icon: <GraduationCap size={20} />,
      iconBgColor: 'bg-green-500',
      isLeft: false,
      delay: 0.7,
    },
    {
      title: 'Aplicações com IA',
      subtitle: 'Integração de IA em Projetos',
      date: '2022',
      description:
        'Comecei a trabalhar com inteligência artificial, integrando-a em minhas aplicações para criar soluções mais inteligentes e eficientes.',
      icon: <Award size={20} />,
      iconBgColor: 'bg-rose-500',
      isLeft: true,
      delay: 0.9,
    },
    {
      title: 'Projetos Internacionais',
      subtitle: 'Expansão Global',
      date: '2023-Atual',
      description:
        'Atualmente trabalho com clientes internacionais, desenvolvendo soluções tecnológicas para diferentes mercados e culturas.',
      icon: <Briefcase size={20} />,
      iconBgColor: 'bg-amber-500',
      isLeft: false,
      delay: 1.1,
    },
  ]

  // Eventos a serem exibidos (todos se expandido, apenas alguns se recolhido)
  const visibleEvents = expanded ? timelineEvents : timelineEvents.slice(0, 3)

  return (
    <section
      id="timeline"
      ref={timelineRef}
      onMouseMove={!isMobile ? debouncedHandleMouseMove : undefined}
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24 xl:py-28"
      aria-label="Trajetória Profissional de Jeferson Reis"
    >
      <SectionBackground isMobile={isMobile} variant="timeline" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl dark:from-blue-400 dark:to-purple-400">
            Trajetória Profissional
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Acompanhe minha evolução profissional e conquistas ao longo dos anos
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 transform rounded-full bg-gradient-to-b from-blue-200 to-blue-400 opacity-50 dark:from-blue-900 dark:to-purple-900" />

          {visibleEvents.map((event, index) => (
            <TimelineEvent key={index} {...event} />
          ))}

          {/* Botão de expandir/recolher */}
          {timelineEvents.length > 3 && (
            <motion.button
              onClick={toggleExpand}
              className="group mx-auto mt-8 flex items-center justify-center rounded-full border border-gray-100 bg-white px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2 font-medium text-gray-800 dark:text-gray-200">
                {expanded ? 'Ver menos' : 'Ver mais'}
              </span>
              {expanded ? (
                <ChevronUp className="h-5 w-5 text-blue-500 group-hover:text-blue-600 dark:text-blue-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-500 group-hover:text-blue-600 dark:text-blue-400" />
              )}
            </motion.button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Timeline
