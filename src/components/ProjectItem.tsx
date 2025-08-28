import React, { useState } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'next-i18next'

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
    image: ProjectImage
    link?: string
    tags: ProjectTag[]
    featured?: boolean
    restricted?: boolean
    type?: 'contracted' | 'personal'
    category?: string
  }
  isMobile?: boolean
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  isMobile = false,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const [isTechnologiesExpanded, setIsTechnologiesExpanded] = useState(false)
  const { t } = useTranslation('main')
  
  // Helper para buscar traduções de projetos de diferentes namespaces
  const { t: tMobile } = useTranslation('projects/mobile-projects')
  const { t: tWeb } = useTranslation('projects/web-projects') 
  const { t: tDesign } = useTranslation('projects/design-projects')
  const { t: t3D } = useTranslation('projects/3d-projects')
  
  const getProjectTranslation = (key: string) => {
    // Tenta buscar a tradução nos diferentes namespaces
    try {
      return tMobile(key) !== key ? tMobile(key) :
             tWeb(key) !== key ? tWeb(key) :
             tDesign(key) !== key ? tDesign(key) :
             t3D(key) !== key ? t3D(key) : key
    } catch {
      return key
    }
  }

  const {
    category,
    image,
    titleKey,
    descriptionKey,
    link,
    tags,
    type,
    restricted,
  } = project

  return (
    <div className="xs:w-[280px] xs:p-2 w-full flex-shrink-0 p-1 sm:w-[320px] sm:p-3 md:w-[340px] md:p-4 lg:w-[380px] xl:w-[400px] 2xl:w-[420px]">
      <div className="h-full transform overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition duration-300 hover:shadow-lg sm:rounded-xl lg:hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-2xl">
        <div className="xs:h-44 relative h-40 overflow-hidden sm:h-48 md:h-52 lg:h-56 xl:h-60">
          <Image
            src={image.src}
            alt={image.alt || getProjectTranslation(titleKey)}
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

          {link && !restricted ? (
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
            restricted && (
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
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
