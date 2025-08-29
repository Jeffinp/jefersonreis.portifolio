import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { motion, AnimatePresence } from 'framer-motion'

interface ProjectTag {
  name: string
  color?: string
}

interface ProjectImage {
  src: string
  alt: string
  width?: number
  height?: number
}

interface ProjectItemProps {
  project: {
    id: string
    titleKey: string
    descriptionKey: string
    fullDescriptionKey?: string
    images: ProjectImage[]
    hasImage?: boolean
    link?: string
    tags: ProjectTag[]
    featured?: boolean
    restricted?: boolean
    type?: 'contracted' | 'personal'
    category?: string
  }
  isMobile?: boolean
  onOpenModal?: (project: any) => void
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  isMobile = false,
  onOpenModal,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const [isTechnologiesExpanded, setIsTechnologiesExpanded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useTranslation('main')

  // Preparar imagens para o carrossel (normaliza aliases @3d/ e @2d/)
  const resolveImageSrc = (src: string) => {
    if (src.startsWith('@3d/')) {
      return src.replace('@3d/', '/assets/images/projects/3d/')
    }
    if (src.startsWith('@2d/')) {
      return src.replace('@2d/', '/assets/images/projects/2d/')
    }
    if (src.startsWith('@design/')) {
      return src.replace('@design/', '/assets/images/projects/design/')
    }
    return src
  }

  const projectImages = (project.images || []).map((img) => ({
    ...img,
    src: resolveImageSrc(img.src),
  }))

  // Debug log para verificar as imagens
  console.log(`Project ${project.id} images:`, projectImages)

  // Avançar para a próxima imagem
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (projectImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
    }
  }

  // Voltar para a imagem anterior
  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (projectImages.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + projectImages.length) % projectImages.length,
      )
    }
  }

  // Iniciar rotação automática quando hover
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isHovered && projectImages.length > 1) {
      interval = setInterval(() => {
        nextImage()
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHovered, projectImages.length, currentImageIndex])

  // Helper para buscar traduções de projetos de diferentes namespaces
  const { t: tMobile } = useTranslation('projects/mobile-projects')
  const { t: tWeb } = useTranslation('projects/web-projects')
  const { t: tDesign } = useTranslation('projects/design-projects')
  const { t: t3D } = useTranslation('projects/3d-projects')
  const getProjectTranslation = (key: string) => {
    // Tenta buscar a tradução nos diferentes namespaces
    try {
      return tMobile(key) !== key
        ? tMobile(key)
        : tWeb(key) !== key
          ? tWeb(key)
          : tDesign(key) !== key
            ? tDesign(key)
            : t3D(key) !== key
              ? t3D(key)
              : key
    } catch {
      return key
    }
  }

  const { category, titleKey, descriptionKey, link, tags, type, restricted } =
    project

  return (
    <div className="w-full p-1 sm:p-3 md:p-4">
      <div
        className="h-full transform overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition duration-300 hover:shadow-lg sm:rounded-xl lg:hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="xs:h-44 relative h-40 overflow-hidden sm:h-48 md:h-52 lg:h-56 xl:h-60">
          {projectImages.length > 0 ? (
            <>
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={projectImages[currentImageIndex].src}
                    alt={
                      projectImages[currentImageIndex].alt ||
                      getProjectTranslation(titleKey)
                    }
                    className="h-full w-full transform object-cover transition-transform duration-500 hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={project.featured}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
                    quality={85}
                    onError={() =>
                      console.error(
                        `Error loading image: ${projectImages[currentImageIndex].src}`,
                      )
                    }
                  />
                </motion.div>
              </AnimatePresence>

              {/* Controles do carrossel - só aparecem quando há múltiplas imagens e o mouse está sobre o card */}
              {projectImages.length > 1 && isHovered && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md transition-all hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                    aria-label={t('portfolio.projectLabels.prevImage')}
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-800 dark:text-gray-200" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md transition-all hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                    aria-label={t('portfolio.projectLabels.nextImage')}
                  >
                    <ChevronRight className="h-4 w-4 text-gray-800 dark:text-gray-200" />
                  </button>

                  {/* Indicadores de imagens */}
                  <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 space-x-1">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(index)
                        }}
                        className={`h-1.5 w-1.5 rounded-full ${
                          currentImageIndex === index
                            ? 'bg-white'
                            : 'bg-white/50'
                        } transition-all duration-300 sm:h-2 sm:w-2`}
                        aria-label={`${t('portfolio.projectLabels.goToImage')} ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <div className="text-center">
                <div className="mb-2 text-3xl text-gray-400 dark:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('portfolio.projectLabels.noImage')}
                </p>
              </div>
            </div>
          )}
          {category && (
            <div className="absolute top-2 left-2 rounded-md bg-blue-600/80 px-1.5 py-0.5 text-xs text-white backdrop-blur-sm sm:top-3 sm:left-3 sm:px-2 sm:py-1">
              {t(`portfolio.categories.${category}`)}
            </div>
          )}

          {type === 'contracted' && (
            <div className="absolute top-2 right-2 rounded-md bg-amber-500/80 px-1.5 py-0.5 text-xs text-white backdrop-blur-sm sm:top-3 sm:right-3 sm:px-2 sm:py-1">
              {t('portfolio.projectLabels.contracted')}
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 md:p-5 lg:p-6">
          <h3 className="mb-1 text-base font-bold text-gray-900 sm:mb-2 sm:text-lg md:text-xl dark:text-white">
            {getProjectTranslation(titleKey)}
          </h3>
          <p
            className={`mb-2 text-xs text-gray-600 sm:mb-3 sm:text-sm md:mb-4 dark:text-gray-300 ${
              isDescriptionVisible ? '' : 'line-clamp-2 sm:line-clamp-3'
            }`}
          >
            {getProjectTranslation(descriptionKey)}
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
            ).map((tag, index) => (
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

          <div className="mt-2 flex gap-2">
            {/* Case Study Button - Always show */}
            <button
              onClick={() => onOpenModal && onOpenModal(project)}
              className="inline-flex flex-1 items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Case Study
            </button>

            {/* External Link Button - Only if available and not restricted */}
            {link && !restricted && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </a>
            )}
          </div>

          {/* Restricted Project Notice */}
          {restricted && (
            <div className="mt-2 rounded-md border border-gray-200 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700">
              <div className="flex items-center justify-center">
                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  {t('portfolio.projectLabels.restrictedProject')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
