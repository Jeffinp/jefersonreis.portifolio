import React, { useEffect, useRef, useState, useCallback } from 'react'
import { PhoneCall, Mail, ClipboardCheck } from 'lucide-react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { debounce } from '@/utils'
import { useTranslation } from 'next-i18next'
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

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Componente de seção animada
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const { ref, controls } = useAnimatedVisibility(0.2)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ExtraAction {
  icon: React.ReactNode
  label: string
  action: () => void
}

interface ContactItem {
  icon: React.ReactNode
  title: string
  link: string
  linkText: string
  ariaLabel: string
  colorFrom: string
  colorTo: string
  extraAction?: ExtraAction
  delay: number
}

interface ContactCardProps {
  item: ContactItem
  index: number
  isMobile: boolean
  mousePosition: { x: number; y: number }
  hoveredCard: number | null
  setHoveredCard: (index: number | null) => void
}

/**
 * Componente para o cartão de contato
 */
const ContactCard: React.FC<ContactCardProps> = ({
  item,
  index,
  isMobile,
  mousePosition,
  hoveredCard,
  setHoveredCard,
}) => {
  const isHovered = hoveredCard === index

  // Transformação 3D baseada na posição do mouse
  const transform = !isMobile
    ? `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`
    : 'none'

  return (
    <AnimatedSection delay={item.delay} className="group">
      <motion.div
        className="relative h-full rounded-2xl border border-white/20 bg-white/90 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl dark:border-slate-700/80 dark:bg-slate-800/90"
        style={{ transform }}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setHoveredCard(index)}
        onHoverEnd={() => setHoveredCard(null)}
      >
        <div className="flex h-full flex-col p-8">
          <div className="mb-4 flex items-center">
            {item.icon}
            <h3 className="ml-4 text-xl font-bold text-gray-800 dark:text-white">
              {item.title}
            </h3>
          </div>

          <a
            href={item.link}
            className="group mt-2 inline-flex items-center text-lg font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            aria-label={item.ariaLabel}
            target={item.link.startsWith('http') ? '_blank' : undefined}
            rel={
              item.link.startsWith('http') ? 'noopener noreferrer' : undefined
            }
          >
            {item.linkText}

            {item.extraAction && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  item.extraAction?.action()
                }}
                className="ml-2 inline-flex items-center text-sm"
                aria-label={item.extraAction.label}
              >
                {item.extraAction.icon}
              </button>
            )}
          </a>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}

/**
 * Componente principal de Contato
 */
const Contact: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const { t } = useTranslation('common')

  // Função de cópia de email
  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('jefersonreisalmeida8356@gmail.com')
      alert('E-mail copiado para a área de transferência!')
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }, [])

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

  // Efeito de paralaxe com mouse
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

  // Dados de contato
  const contactInfo: ContactItem[] = [
    {
      icon: (
        <PhoneCall
          className="h-6 w-6 text-blue-500 transition-colors duration-300 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300"
          aria-hidden="true"
        />
      ),
      title: 'Me Ligue',
      link: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}`,
      linkText: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55 (71) 8174-7099',
      ariaLabel: 'Entre em contato via WhatsApp',
      colorFrom: 'blue',
      colorTo: 'cyan',
      delay: 0.1,
    },
    {
      icon: (
        <Mail
          className="h-6 w-6 text-purple-500 transition-colors duration-300 group-hover:text-purple-600 dark:text-purple-400 dark:group-hover:text-purple-300"
          aria-hidden="true"
        />
      ),
      title: 'Me Envie um Email',
      link: 'mailto:jefersonreisalmeida8356@gmail.com',
      linkText: 'jefersonreisalmeida8356@gmail.com',
      ariaLabel: 'Entre em contato via Email',
      colorFrom: 'purple',
      colorTo: 'pink',
      extraAction: {
        icon: (
          <ClipboardCheck className="ml-2 h-4 w-4 text-gray-500 transition-colors duration-300 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400" />
        ),
        label: 'Copiar endereço de email',
        action: handleCopyEmail,
      },
      delay: 0.2,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24 xl:py-28"
      aria-label="Contato com Jeferson Reis"
    >
      <SectionBackground isMobile={isMobile} variant="contact" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl dark:from-blue-400 dark:to-purple-400">
            {t('contact.title')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('contact.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {contactInfo.map((item, index) => (
            <ContactCard
              key={index}
              item={item}
              index={index}
              isMobile={isMobile}
              mousePosition={mousePosition}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center md:mt-20" delay={0.3}>
          <div className="rounded-2xl border border-white/20 bg-white/90 p-8 shadow-xl backdrop-blur-md md:p-10 dark:border-slate-700/80 dark:bg-slate-800/90">
            <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
              {t('contact.projectTitle')}
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {t('contact.availableForProjects')}
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Iniciar Projeto
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default Contact
