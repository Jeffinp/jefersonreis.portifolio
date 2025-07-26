import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { debounce } from '@/utils'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeader from '@/components/SectionHeader'
import AnimatedSection from '@/components/AnimatedSection'

interface RatingStarsProps {
  rating: number
}

/**
 * Componente para estrelas de avaliação
 */
const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => (
  <div className="mb-3 flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'} mr-1`}
        aria-hidden="true"
      />
    ))}
  </div>
)

interface Testimonial {
  id: number
  author: string
  title: string
  content: string
  rating: number
  image?: string
}

interface TestimonialSlideProps {
  testimonial: Testimonial
  index: number
  activeIndex: number
  isMobile: boolean
  mousePosition: { x: number; y: number }
}

/**
 * Componente para cada slide de testemunho
 */
const TestimonialSlide: React.FC<TestimonialSlideProps> = ({
  testimonial,
  index,
  activeIndex,
  isMobile,
  mousePosition,
}) => {
  const isActive = index === activeIndex

  return (
    <div className="w-full flex-shrink-0 px-4 md:px-8" aria-hidden={!isActive}>
      <div
        className={`relative mx-auto h-full max-w-3xl rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-md md:p-8 dark:border-slate-700/80 dark:bg-slate-800/90 ${isActive ? 'ring-2 ring-blue-200 dark:ring-blue-900' : ''}`}
        style={
          !isMobile && isActive
            ? {
                transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * -3}deg)`,
                transition: 'transform 0.2s ease-out',
              }
            : undefined
        }
      >
        <Quote className="mb-4 text-indigo-500" size={24} />
        <RatingStars rating={testimonial.rating} />

        <blockquote>
          <p className="mb-6 text-lg font-medium text-gray-700 md:text-xl dark:text-gray-300">
            {testimonial.content}
          </p>
          <footer className="flex items-center">
            {testimonial.image && (
              <div className="mr-4 flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.author}, ${testimonial.title}`}
                  className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md dark:border-gray-700"
                  width={48}
                  height={48}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback para um avatar padrão em caso de erro
                    const target = e.target as HTMLImageElement
                    target.src = '/avatars/ana.jpg'
                  }}
                />
              </div>
            )}
            <div>
              <div className="font-bold text-gray-800 dark:text-gray-200">
                {testimonial.author}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {testimonial.title}
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  )
}

interface NavigationButtonProps {
  onClick: () => void
  direction: 'prev' | 'next'
  disabled: boolean
  ariaLabel: string
}

/**
 * Componente para botões de navegação
 */
const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  direction,
  disabled,
  ariaLabel,
}) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`absolute top-1/2 z-20 -translate-y-1/2 transform ${direction === 'prev' ? 'left-2 md:left-4' : 'right-2 md:right-4'} ${disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer opacity-70 hover:opacity-100'} rounded-full border border-gray-200 bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-opacity duration-300 md:p-3 dark:border-gray-700 dark:bg-gray-800/80`}
    >
      <Icon className="h-5 w-5 text-gray-800 md:h-6 md:w-6 dark:text-gray-200" />
    </button>
  )
}

/**
 * Componente principal de Depoimentos
 */
const Testimonials: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null)
  const autoplayDelay = 5000

  // Dados de depoimentos
  const testimonials: Testimonial[] = [
    {
      id: 1,
      author: 'Ana Silva',
      title: 'CEO da TechSolutions',
      content:
        'O sistema SaaS desenvolvido superou todas as nossas expectativas. A integração com nossos sistemas internos foi perfeita, e a interface de usuário é extremamente intuitiva. Excelente trabalho com Angular e C++.',
      rating: 5,
      image: '/avatars/ana.jpg',
    },
    {
      id: 2,
      author: 'Carlos Mendes',
      title: 'Gerente de Projetos na InnovateDigital',
      content:
        'A implementação do nosso ERP foi concluída dentro do prazo e com todas as funcionalidades que precisávamos. O suporte técnico tem sido excepcional e as atualizações constantes mantêm nosso sistema seguro e eficiente.',
      rating: 5,
      image: '/avatars/carlos.jpg',
    },
    {
      id: 3,
      author: 'Mariana Costa',
      title: 'Proprietária da MarketingPro',
      content:
        'A integração do bot no WhatsApp revolucionou nosso atendimento ao cliente. Conseguimos automatizar 70% das consultas comuns e nosso tempo de resposta diminuiu de horas para minutos. Um investimento que valeu cada centavo.',
      rating: 4,
      image: '/avatars/mariana.jpg',
    },
  ]

  // Handlers
  const goToSlide = useCallback((index: number) => {
    setActiveSlideIndex(index)
  }, [])

  const moveToNextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const moveToPrevSlide = useCallback(() => {
    setActiveSlideIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    )
  }, [testimonials.length])

  // Detectar dispositivo móvel
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

  // Gerenciamento do carrossel e autoplay
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateSlidePosition = () => {
      const slideWidth = (track.children[0] as HTMLElement)?.offsetWidth || 0
      track.style.transform = `translateX(${-slideWidth * activeSlideIndex}px)`
    }

    const startAutoplay = () => {
      if (autoplayInterval.current || isHovering) return
      autoplayInterval.current = setInterval(moveToNextSlide, autoplayDelay)
    }

    const stopAutoplay = () => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current)
        autoplayInterval.current = null
      }
    }

    // Eventos de toque para dispositivos móveis
    let touchStartX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      stopAutoplay()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartX - touchEndX
      const threshold = 50

      if (Math.abs(diff) > threshold) {
        if (diff > 0) moveToNextSlide()
        else moveToPrevSlide()
      }

      startAutoplay()
    }

    // Inicialização
    updateSlidePosition()
    startAutoplay()

    // Event listeners com cleanup
    const handleResizeDebounced = debounce(updateSlidePosition, 250)

    track.addEventListener('touchstart', handleTouchStart as any, {
      passive: true,
    })
    track.addEventListener('touchend', handleTouchEnd as any, { passive: true })
    window.addEventListener('resize', handleResizeDebounced)

    return () => {
      stopAutoplay()
      track.removeEventListener('touchstart', handleTouchStart as any)
      track.removeEventListener('touchend', handleTouchEnd as any)
      window.removeEventListener('resize', handleResizeDebounced)
    }
  }, [
    activeSlideIndex,
    isHovering,
    moveToNextSlide,
    moveToPrevSlide,
    autoplayDelay,
  ])

  const { t } = useTranslation('common')

  return (
    <SectionWrapper
      id="testimonials"
      backgroundVariant="testimonials"
      paddingY="large"
      containerClassName="max-w-7xl"
      isMobile={isMobile}
      intensity="subtle"
      ariaLabel={t('testimonials.title')}
    >
      <div
        ref={sectionRef}
        aria-labelledby="testimonials-heading"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <SectionHeader
          subtitle={t('testimonials.subtitle')}
          title={t('testimonials.title')}
          description={t('testimonials.description')}
          delay={0.1}
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Botões de navegação */}
          <NavigationButton
            onClick={moveToPrevSlide}
            direction="prev"
            disabled={false}
            ariaLabel="Ver depoimento anterior"
          />

          <NavigationButton
            onClick={moveToNextSlide}
            direction="next"
            disabled={false}
            ariaLabel="Ver próximo depoimento"
          />

          {/* Container do carrossel */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ touchAction: 'pan-y' }}
            >
              {/* Slides */}
              {testimonials.map((testimonial, index) => (
                <TestimonialSlide
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                  activeIndex={activeSlideIndex}
                  isMobile={isMobile}
                  mousePosition={mousePosition}
                />
              ))}
            </div>
          </div>

          {/* Indicadores de paginação */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  index === activeSlideIndex
                    ? 'w-5 bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Ir para o depoimento ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Testimonials
