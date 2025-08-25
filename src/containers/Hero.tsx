import React, { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Mail, ChevronDown, Palette } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import { debounce } from '@/utils'
import { useTranslation } from 'next-i18next'
import SectionBackground from '@/components/SectionBackground'
import EnhancedButton from '@/components/EnhancedButton'
import {
  InteractiveCard,
  AnimatedTooltip,
} from '@/components/MicroInteractions'
import { staggerContainer, staggerItem } from '@/hooks/useAnimations'
import {
  SiNextdotjs,
  SiAngular,
  SiReact,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiPython,
} from 'react-icons/si'

interface ProfileCardProps {
  isMobile: boolean
  mousePosition: { x: number; y: number }
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  isMobile,
  mousePosition,
}) => (
  <motion.div
    className="order-1 flex w-full justify-center sm:w-3/4 md:order-2 md:w-1/2 lg:w-5/12 xl:w-2/5"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="perspective">
      <div
        className="relative h-60 w-60 transform-gpu transition-all duration-300 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 2xl:h-96 2xl:w-96"
        style={{
          transform: isMobile
            ? 'none'
            : `rotateY(${mousePosition.x * 5}deg) rotateX(${
                mousePosition.y * -5
              }deg)`,
        }}
      >
        {/* Camadas do card com profundidade */}
        <div className="absolute inset-0 transform-gpu rounded-3xl border border-white/20 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30 shadow-xl backdrop-blur-lg dark:border-white/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-cyan-500/20"></div>

        <div className="absolute inset-4 transform-gpu rounded-2xl bg-white/90 shadow-inner dark:bg-gray-800/90"></div>

        {/* Imagem de perfil com moldura */}
        <div className="absolute inset-0 flex transform-gpu items-center justify-center">
          <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-xl sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-60 lg:w-60 2xl:h-72 2xl:w-72 dark:border-gray-700">
            <Image
              src="/assets/images/Linkedin-foto.webp"
              alt="Jeferson Reis - Desenvolvedor Full-Stack"
              className="h-full w-full object-cover"
              width={256}
              height={256}
              loading="eager"
              priority={true}
            />
          </div>
        </div>

        {/* Elementos decorativos */}
        <div
          className="animate-float-1 absolute top-0 right-0 h-10 w-10 transform-gpu rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shadow-xl sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
          style={{ marginTop: '-1rem', marginRight: '-1rem' }}
        ></div>
      </div>
    </div>
  </motion.div>
)

interface Skill {
  name: string
  icon: React.ReactNode
}

const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const controls = useAnimation()
  const { t } = useTranslation('common')

  // Habilitar animações somente após o carregamento inicial
  useEffect(() => {
    // Atrasar a habilitação das animações para melhorar o LCP
    const timer = setTimeout(() => {
      setAnimationsEnabled(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Detectar dispositivo móvel com callback memoizado
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Controle de scroll com debounce
  useEffect(() => {
    if (!animationsEnabled) return

    const handleScroll = debounce(() => {
      if (!document.documentElement) return
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setScrollProgress(scrolled)
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [animationsEnabled])

  // Efeito de paralaxe com mouse (apenas em desktop, com debounce)
  useEffect(() => {
    checkMobile()

    const handleResize = debounce(() => {
      checkMobile()
    }, 250)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [checkMobile])

  // Efeito de paralaxe simplificado e otimizado
  useEffect(() => {
    if (isMobile || !animationsEnabled) return () => {}

    const handleMouseMove = debounce((e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({
        x: x / rect.width - 0.5,
        y: y / rect.height - 0.5,
      })
    }, 50)

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isMobile, animationsEnabled])

  // Animação inicial
  useEffect(() => {
    if (animationsEnabled) {
      controls.start('visible')
    }
  }, [controls, animationsEnabled])

  // Skills para mostrar no carrossel (com ícones específicos)
  const skills: Skill[] = [
    {
      name: 'Next.js',
      icon: (
        <span className="text-black dark:text-white">
          <SiNextdotjs className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ),
    },
    {
      name: 'Angular',
      icon: (
        <span className="text-red-600">
          <SiAngular className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ),
    },
    {
      name: 'UX/UI',
      icon: <Palette className="h-4 w-4 text-pink-500 sm:h-5 sm:w-5" />,
    },
    {
      name: 'Python',
      icon: (
        <span className="text-yellow-500">
          <SiPython className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ),
    },
    {
      name: 'React Native',
      icon: (
        <span className="text-blue-500">
          <SiReact className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ),
    },
    {
      name: 'Node.js',
      icon: (
        <span className="text-green-600">
          <SiNodedotjs className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ),
    },
    {
      name: 'Docker',
      icon: (
        <span className="text-blue-400">
          <SiDocker className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ),
    },
    {
      name: 'PostgreSQL',
      icon: (
        <span className="text-blue-700">
          <SiPostgresql className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ),
    },
    {
      name: 'MongoDB',
      icon: (
        <span className="text-green-700">
          <SiMongodb className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ),
    },
    {
      name: 'MySQL',
      icon: (
        <span className="text-blue-600">
          <SiMysql className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ),
    },
  ]

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[600px] items-center overflow-hidden bg-transparent py-12 sm:min-h-[650px] sm:py-16 md:min-h-[700px] md:py-20 lg:min-h-screen lg:py-24 2xl:py-32"
      aria-label="Jeferson Reis - Desenvolvedor Full-Stack"
    >
      <SectionBackground isMobile={isMobile} variant="hero" intensity="light" />

      {/* Conteúdo principal */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-16 lg:py-16 2xl:px-20 2xl:py-20">
        <div className="flex flex-col items-center justify-between gap-12 sm:gap-16 md:flex-row md:gap-10 lg:gap-16 2xl:gap-24">
          {/* Card do perfil */}
          <ProfileCard isMobile={isMobile} mousePosition={mousePosition} />

          {/* Seção de texto animado */}
          <div className="order-2 mt-6 flex w-full flex-col items-center space-y-6 text-center sm:w-4/5 sm:space-y-8 md:order-1 md:mt-0 md:w-1/2 md:items-start md:space-y-6 md:text-left lg:w-7/12 lg:space-y-8 xl:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Cabeçalho */}
              <h2 className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold tracking-widest text-blue-600 uppercase sm:mb-4 sm:text-base md:justify-start md:text-lg dark:text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span className="xs:inline hidden">Desenvolvedor</span>
                <span className="xs:hidden">Dev</span> Full Stack & Designer
              </h2>

              {/* Título principal */}
              <h1 className="mb-4 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:mb-5 sm:text-5xl md:mb-6 md:text-5xl lg:mb-6 lg:text-6xl 2xl:text-7xl dark:text-white">
                {t('hero.title')}
              </h1>

              {/* Subtítulo */}
              <p className="mx-auto mb-6 max-w-full text-lg font-medium text-gray-700 sm:mb-6 sm:max-w-lg sm:text-xl md:mx-0 md:mb-8 md:max-w-xl md:text-xl lg:mb-8 lg:max-w-2xl lg:text-2xl dark:text-gray-300">
                {t('hero.transforming')}
              </p>

              {/* Botões de ação */}
              <motion.div
                className="xs:flex-row mt-6 flex w-full flex-col justify-center gap-4 sm:mt-8 md:mt-6 md:justify-start lg:mt-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={staggerItem}>
                  <EnhancedButton
                    href="#contact"
                    variant="gradient"
                    size="lg"
                    icon={<Mail className="h-5 w-5" />}
                    iconPosition="left"
                    tooltip={t('hero.buttons.contact_tooltip')}
                    className="xs:w-auto w-full"
                  >
                    {t('hero.buttons.contact')}
                  </EnhancedButton>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <EnhancedButton
                    href="#projects"
                    variant="secondary"
                    size="lg"
                    icon={<Palette className="h-5 w-5" />}
                    iconPosition="left"
                    tooltip={t('hero.buttons.projects_tooltip')}
                    className="xs:w-auto w-full"
                  >
                    {t('hero.buttons.viewProjects')}
                  </EnhancedButton>
                </motion.div>
              </motion.div>

              {/* Carrossel de skills com micro-interações */}
              <motion.div
                className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {skills.map((skill, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <AnimatedTooltip content={`Especialista em ${skill.name}`}>
                      <InteractiveCard
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        glowColor="blue"
                      >
                        <motion.span
                          initial={{ rotate: 0 }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {skill.icon}
                        </motion.span>
                        {skill.name}
                      </InteractiveCard>
                    </AnimatedTooltip>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Seta para baixo */}
        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform cursor-pointer md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            y: 5,
            transition: {
              duration: 0.3,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
        >
          <a href="#skills" aria-label={t('hero.scrollDown')}>
            <ChevronDown className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
