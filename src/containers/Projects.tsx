import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Minus,
} from 'lucide-react'
import { projects } from '@/data/projectsData'
import { useTranslation } from 'next-i18next'
import SectionBackground from '@/components/SectionBackground'

interface Category {
  value: string
  label: string
}

interface CarouselButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
  direction,
  onClick,
  disabled,
}) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 z-20 -translate-y-1/2 transform ${
        direction === 'left'
          ? 'left-0 sm:left-1 md:left-2 lg:left-4'
          : 'right-0 sm:right-1 md:right-2 lg:right-4'
      } ${
        disabled
          ? 'cursor-not-allowed opacity-30'
          : 'opacity-70 hover:opacity-100'
      } rounded-full border border-gray-200 bg-white/80 p-2 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg sm:p-2 md:p-3 dark:border-gray-700 dark:bg-gray-800/80`}
      aria-label={direction === 'left' ? 'Projeto anterior' : 'Próximo projeto'}
    >
      <Icon className="h-5 w-5 text-gray-800 sm:h-5 sm:w-5 md:h-6 md:w-6 dark:text-gray-200" />
    </button>
  )
}

interface ProjectItemProps {
  project: any
  isMobile: boolean
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, isMobile }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const [isTechnologiesExpanded, setIsTechnologiesExpanded] = useState(false)
  const { t } = useTranslation('common')

  const { category, image, titleKey, descriptionKey, link, tags } = project

  return (
    <div className="w-full p-2 sm:p-3 md:p-4">
      <div className="h-full transform overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-2xl">
        <div className="xs:h-44 relative h-40 overflow-hidden sm:h-48 md:h-52 lg:h-56 xl:h-60">
          <Image
            src={image.src}
            alt={image.alt || t(`${titleKey}`)}
            className="h-full w-full transform object-cover transition-transform duration-500 hover:scale-105"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={project.featured}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
            quality={85}
          />
          {category && (
            <div className="absolute top-2 left-2 rounded-md bg-blue-600/80 px-1.5 py-0.5 text-xs text-white backdrop-blur-sm sm:top-3 sm:left-3 sm:px-2 sm:py-1">
              {t(`portfolio.categories.${category}`)}
            </div>
          )}

          {project.type === 'contracted' && (
            <div className="absolute top-2 right-2 rounded-md bg-amber-500/80 px-1.5 py-0.5 text-xs text-white backdrop-blur-sm sm:top-3 sm:right-3 sm:px-2 sm:py-1">
              {t('portfolio.projectLabels.contracted')}
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 md:p-5 lg:p-6">
          <h3 className="mb-1 text-base font-bold text-gray-900 sm:mb-2 sm:text-lg md:text-xl dark:text-white">
            {t(titleKey)}
          </h3>
          <p
            className={`mb-2 text-xs text-gray-600 sm:mb-3 sm:text-sm md:mb-4 dark:text-gray-300 ${
              isDescriptionVisible ? '' : 'line-clamp-2 sm:line-clamp-3'
            }`}
          >
            {t(descriptionKey)}
          </p>
          <button
            onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
            className="mt-1 text-xs text-blue-600 dark:text-blue-400"
          >
            {isDescriptionVisible
              ? t('portfolio.projectLabels.seeLess')
              : t('portfolio.projectLabels.seeMore')}
          </button>

          <div className="mb-2 flex flex-wrap gap-1 sm:mb-3 sm:gap-2 md:mb-4">
            {(isTechnologiesExpanded
              ? tags
              : tags.slice(0, isMobile ? 2 : 3)
            ).map((tag: { name: string; color?: string }, index: number) => (
              <span
                key={index}
                className={`px-1.5 py-0.5 text-xs sm:px-2 sm:py-1 ${
                  tag.color ||
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                } rounded-md`}
              >
                {tag.name}
              </span>
            ))}
            {tags.length > (isMobile ? 2 : 3) && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsTechnologiesExpanded(!isTechnologiesExpanded)
                }}
                type="button"
                className="focus:ring-opacity-50 cursor-pointer rounded-md bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700 transition-colors duration-200 hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-2 sm:py-1 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                title={
                  isTechnologiesExpanded
                    ? t('portfolio.projectLabels.seeLess')
                    : t('portfolio.projectLabels.seeMore')
                }
              >
                {isTechnologiesExpanded
                  ? t('portfolio.projectLabels.seeLess')
                  : `+${tags.length - (isMobile ? 2 : 3)}`}
              </button>
            )}
          </div>

          {link && !project.restricted ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {t('portfolio.projectLabels.viewProject')}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          ) : (
            <div className="mt-2 rounded-md border border-gray-200 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-700">
              <div className="mb-2 flex items-center justify-center">
                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  {t('portfolio.projectLabels.restrictedProject')}
                </span>
              </div>
              <p className="text-center text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                {t('portfolio.projectLabels.notPubliclyAvailable')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface CategoryNavProps {
  categories: Category[]
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

interface ViewToggleProps {
  viewMode: 'carousel' | 'grid'
  onToggle: () => void
  isMobile: boolean
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onToggle,
  isMobile,
}) => {
  return (
    <div className="mb-4 flex justify-center">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        title={
          viewMode === 'carousel' ? 'Mudar para grade' : 'Mudar para carousel'
        }
      >
        {viewMode === 'carousel' ? (
          <>
            <Grid3X3 className="h-4 w-4" />
            {!isMobile && 'Grade'}
          </>
        ) : (
          <>
            <Minus className="h-4 w-4" />
            {!isMobile && 'Carousel'}
          </>
        )}
      </button>
    </div>
  )
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeFilter,
  setActiveFilter,
}) => {
  const { t } = useTranslation('common')
  return (
    <div className="xs:gap-1.5 mb-6 flex flex-wrap justify-center gap-1 sm:mb-8 sm:gap-2 md:mb-10 md:gap-3 lg:mb-12 lg:gap-4">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => setActiveFilter(cat.value)}
          className={`xs:px-3 xs:text-sm rounded-full px-2 py-1 text-xs transition-colors duration-300 sm:px-4 sm:py-1.5 md:py-2 md:text-base ${
            activeFilter === cat.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {t(`portfolio.categories.${cat.value}`)}
        </button>
      ))}
    </div>
  )
}

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(false)
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel')
  const { t } = useTranslation('common')

  const trackRef = useRef<HTMLDivElement>(null)
  const touchStartXRef = useRef<number>(0)

  // Categorias atualizadas (removidas 'ia' e 'game' conforme solicitado)
  const categories: Category[] = [
    { value: 'all', label: 'Todos' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'design', label: 'Design' },
    { value: 'motion', label: 'Motion' },
    { value: 'modelagem', label: 'Modelagem 3D' },
  ]

  // Filtrar projetos baseado na categoria selecionada
  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  // Número total de itens
  const totalItems = filteredProjects.length

  // Detectar tamanho da tela e ajustar modo de visualização
  useEffect(() => {
    // No servidor, não fazer nada para evitar mismatch
    if (typeof window === 'undefined') {
      return
    }

    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 640
      setIsMobile(isMobileDevice)
      // Não mudar automaticamente para grid em dispositivos móveis
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Reset do índice quando o filtro muda
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeFilter])

  // Calcular quantos itens mostrar por vez baseado na tela
  const itemsPerView = useMemo(() => {
    // Durante o SSR, usar valor padrão consistente
    if (typeof window === 'undefined') return 4

    // No cliente
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    if (window.innerWidth < 1440) return 3
    return 4
  }, [])
  const maxIndex = Math.max(0, totalItems - itemsPerView)

  // Navegar para o próximo slide
  const nextSlide = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(Math.min(currentIndex + itemsPerView, maxIndex))
    }
  }, [currentIndex, maxIndex, itemsPerView])

  // Navegar para o slide anterior
  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(currentIndex - itemsPerView, 0))
    }
  }, [currentIndex, itemsPerView])

  // Toggle entre modo carousel e grid
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'carousel' ? 'grid' : 'carousel'))
    setCurrentIndex(0)
  }

  // Adicionar handlers de touch para funcionalidade de swipe no carrossel
  useEffect(() => {
    if (viewMode !== 'carousel' || !trackRef.current) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartXRef.current - touchEndX
      const threshold = 50

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentIndex < maxIndex) {
          nextSlide()
        } else if (diff < 0 && currentIndex > 0) {
          prevSlide()
        }
      }
    }

    const track = trackRef.current

    track.addEventListener('touchstart', handleTouchStart, { passive: true })
    track.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      track.removeEventListener('touchstart', handleTouchStart)
      track.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentIndex, maxIndex, nextSlide, prevSlide, viewMode])

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24 xl:py-28"
      aria-label="Projetos de Jeferson Reis"
    >
      {/* Background Elements */}
      <SectionBackground
        variant="projects"
        isMobile={isMobile}
        intensity="subtle"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="section-title mb-4 text-3xl font-bold text-blue-600 md:text-4xl lg:text-5xl dark:text-blue-400">
            {t('portfolio.title')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        <CategoryNav
          categories={categories}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <ViewToggle
          viewMode={viewMode}
          onToggle={toggleViewMode}
          isMobile={isMobile}
        />

        {viewMode === 'carousel' ? (
          // MODO CAROUSEL
          <div className="relative">
            <div className="relative overflow-hidden">
              <div
                ref={trackRef}
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
                }}
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{ width: `${100 / itemsPerView}%` }}
                    className="flex-shrink-0"
                  >
                    <ProjectItem project={project} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Botões de navegação */}
            {currentIndex > 0 && (
              <CarouselButton
                direction="left"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              />
            )}

            {currentIndex < maxIndex && (
              <CarouselButton
                direction="right"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
              />
            )}

            {/* Indicadores de página */}
            {totalItems > itemsPerView && (
              <div className="mt-6 flex justify-center space-x-2">
                {Array.from({
                  length: Math.ceil(totalItems / itemsPerView),
                }).map((_, index) => {
                  const pageIndex = index * itemsPerView
                  const isActive = pageIndex === currentIndex
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(pageIndex)}
                      className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                        isActive
                          ? 'bg-blue-600'
                          : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                      }`}
                      aria-label={`Ir para página ${index + 1}`}
                    />
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          // MODO GRID
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectItem project={project} isMobile={isMobile} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
