import React, { useState, useMemo, memo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import {
  ExternalLink,
  Github,
  Rocket,
  Monitor,
  Smartphone,
  Palette,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Clock,
  X,
  Eye,
  Code,
} from 'lucide-react'
import { projects } from '@/data/projectsData'
import type { Project } from '@/types/project.types'

// Simplified project card without heavy animations
const LiteProjectCard = memo(
  ({ project, onClick }: { project: Project; onClick: () => void }) => {
    const { t } = useTranslation([
      'projects/web-projects',
      'projects/mobile-projects',
      'projects/design-projects',
      'projects/3d-projects',
    ])

    // Use titleKey and descriptionKey if available, otherwise fallback to old format
    const projectTitle = project.titleKey
      ? t(project.titleKey, {
          ns: [
            'projects/web-projects',
            'projects/mobile-projects',
            'projects/design-projects',
            'projects/3d-projects',
          ],
        })
      : t(`projects.${project.id}.title`, project.id)
    const projectDescription = project.descriptionKey
      ? t(project.descriptionKey, {
          ns: [
            'projects/web-projects',
            'projects/mobile-projects',
            'projects/design-projects',
            'projects/3d-projects',
          ],
        })
      : t(`projects.${project.id}.description`, '')

    const getCategoryIcon = () => {
      switch (project.category) {
        case 'web':
          return <Monitor className="h-4 w-4" />
        case 'mobile':
          return <Smartphone className="h-4 w-4" />
        case 'design':
          return <Palette className="h-4 w-4" />
        default:
          return <Rocket className="h-4 w-4" />
      }
    }

    const firstImage = project.images?.[0]
    const imageSrc =
      typeof firstImage === 'string' ? firstImage : firstImage?.src || null

    return (
      <motion.div
        className="group relative overflow-hidden rounded-lg border border-blue-500/20 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-blue-500/40 hover:bg-gray-900/70"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image with lazy loading */}
        <div
          className="relative h-48 w-full cursor-pointer overflow-hidden bg-gray-800"
          onClick={onClick}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={projectTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Code className="h-12 w-12 text-gray-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />

          {/* View Project Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <div className="rounded-full bg-blue-500/90 p-3 backdrop-blur-sm">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-400">{getCategoryIcon()}</span>
              <span className="text-xs tracking-wider text-blue-400 uppercase">
                {project.category}
              </span>
            </div>
            {project.type && (
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  project.type === 'contracted'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-purple-500/10 text-purple-400'
                }`}
              >
                {project.type === 'contracted' ? 'Comercial' : 'Pessoal'}
              </span>
            )}
          </div>

          <h3
            className="mb-2 cursor-pointer text-lg font-bold text-white transition-colors hover:text-blue-400"
            onClick={onClick}
          >
            {projectTitle}
          </h3>

          <p className="line-clamp-2 text-sm text-gray-400">
            {projectDescription}
          </p>

          {/* Tech stack - simplified */}
          {project.technologies && (
            <div className="mt-3 flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-400"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex flex-1 items-center justify-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-xs text-white transition-colors hover:bg-blue-600"
              >
                <ExternalLink className="h-3 w-3" />
                Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex flex-1 items-center justify-center gap-1 rounded-md border border-gray-600 px-3 py-2 text-xs text-gray-300 transition-colors hover:border-gray-500 hover:bg-gray-800"
              >
                <Github className="h-3 w-3" />
                Código
              </a>
            )}
          </div>
        </div>
      </motion.div>
    )
  },
)

LiteProjectCard.displayName = 'LiteProjectCard'

// Simplified modal with image carousel
const LiteProjectModal = memo(
  ({
    project,
    isOpen,
    onClose,
  }: {
    project: Project | null
    isOpen: boolean
    onClose: () => void
  }) => {
    const { t } = useTranslation([
      'projects/web-projects',
      'projects/mobile-projects',
      'projects/design-projects',
      'projects/3d-projects',
      'main',
    ])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Reset image index when project changes
    useEffect(() => {
      setCurrentImageIndex(0)
    }, [project?.id])

    if (!project || !isOpen) return null

    const projectTitle = project.titleKey
      ? t(project.titleKey, {
          ns: [
            'projects/web-projects',
            'projects/mobile-projects',
            'projects/design-projects',
            'projects/3d-projects',
          ],
        })
      : t(`projects.${project.id}.title`, project.id)
    const projectDescription = project.descriptionKey
      ? t(project.descriptionKey, {
          ns: [
            'projects/web-projects',
            'projects/mobile-projects',
            'projects/design-projects',
            'projects/3d-projects',
          ],
        })
      : t(`projects.${project.id}.description`, '')
    const projectDetailedDescription = project.fullDescriptionKey
      ? t(project.fullDescriptionKey, {
          ns: [
            'projects/web-projects',
            'projects/mobile-projects',
            'projects/design-projects',
            'projects/3d-projects',
          ],
        })
      : projectDescription

    // Normalize images
    const projectImages =
      project.images?.map((img) => {
        if (typeof img === 'string') {
          return { src: img, alt: projectTitle }
        }
        return { ...img, src: img.src }
      }) || []

    const hasMultipleImages = projectImages.length > 1

    const nextImage = () => {
      if (hasMultipleImages) {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
      }
    }

    const prevImage = () => {
      if (hasMultipleImages) {
        setCurrentImageIndex(
          (prev) => (prev - 1 + projectImages.length) % projectImages.length,
        )
      }
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg border border-blue-500/20 bg-gray-900 p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 rounded-full bg-gray-800/50 p-2 text-gray-400 backdrop-blur-sm transition-colors hover:bg-gray-700/50 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      project.type === 'contracted'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-purple-500/10 text-purple-400'
                    }`}
                  >
                    {project.type === 'contracted'
                      ? 'Projeto Comercial'
                      : 'Projeto Pessoal'}
                  </span>
                  <span className="text-xs tracking-wider text-gray-500 uppercase">
                    {project.category}
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white">
                  {projectTitle}
                </h2>
                <p className="text-gray-400">{projectDescription}</p>
              </div>

              {/* Image Carousel */}
              {projectImages.length > 0 && (
                <div className="relative mb-4">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-800 md:h-96">
                    <Image
                      src={projectImages[currentImageIndex].src}
                      alt={projectImages[currentImageIndex].alt || projectTitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Navigation Buttons */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                          {projectImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`h-2 w-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? 'w-6 bg-blue-500'
                                  : 'bg-gray-500 hover:bg-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Sobre o Projeto
                </h3>
                <p className="leading-relaxed text-gray-300">
                  {projectDetailedDescription}
                </p>
              </div>

              {/* Project Info Grid */}
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {project.completionDate && (
                  <div className="rounded-lg bg-gray-800/50 p-3">
                    <Calendar className="mb-1 h-4 w-4 text-blue-400" />
                    <p className="text-xs text-gray-500">Conclusão</p>
                    <p className="text-sm font-medium text-white">
                      {project.completionDate}
                    </p>
                  </div>
                )}
                {project.teamSize && (
                  <div className="rounded-lg bg-gray-800/50 p-3">
                    <Users className="mb-1 h-4 w-4 text-green-400" />
                    <p className="text-xs text-gray-500">Equipe</p>
                    <p className="text-sm font-medium text-white">
                      {project.teamSize}{' '}
                      {project.teamSize > 1 ? 'pessoas' : 'pessoa'}
                    </p>
                  </div>
                )}
                {project.duration && (
                  <div className="rounded-lg bg-gray-800/50 p-3">
                    <Clock className="mb-1 h-4 w-4 text-purple-400" />
                    <p className="text-xs text-gray-500">Duração</p>
                    <p className="text-sm font-medium text-white">
                      {project.duration}
                    </p>
                  </div>
                )}
                {project.technologies && (
                  <div className="rounded-lg bg-gray-800/50 p-3">
                    <Code className="mb-1 h-4 w-4 text-yellow-400" />
                    <p className="text-xs text-gray-500">Tecnologias</p>
                    <p className="text-sm font-medium text-white">
                      {project.technologies.length} techs
                    </p>
                  </div>
                )}
              </div>

              {/* Technologies */}
              {project.technologies && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Tecnologias Utilizadas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Desafios Enfrentados
                  </h3>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                        <span className="text-sm text-gray-300">
                          {challenge}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Resultados Alcançados
                  </h3>
                  <ul className="space-y-2">
                    {project.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" />
                        <span className="text-sm text-gray-300">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Projeto ao Vivo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-2 text-blue-400 transition-colors hover:bg-blue-500/10"
                  >
                    <Github className="h-4 w-4" />
                    Ver Código no GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
)

LiteProjectModal.displayName = 'LiteProjectModal'

// Main component with optimized filtering and rendering
const LiteQuantumProjects: React.FC = memo(() => {
  const { t } = useTranslation('main')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = useMemo(
    () => [
      { id: 'all', label: t('projects.categories.all'), icon: <Rocket /> },
      { id: 'web', label: t('projects.categories.web'), icon: <Monitor /> },
      {
        id: 'mobile',
        label: t('projects.categories.mobile'),
        icon: <Smartphone />,
      },
      {
        id: 'design',
        label: t('projects.categories.design'),
        icon: <Palette />,
      },
    ],
    [t],
  )

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 200)
  }, [])

  return (
    <section id="projects" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h2
            className="mb-4 text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t('projects.title')}
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('projects.subtitle')}
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex justify-center">
          <div className="flex gap-2 rounded-lg border border-blue-500/20 bg-gray-900/50 p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="h-4 w-4">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <LiteProjectCard
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <LiteProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
})

LiteQuantumProjects.displayName = 'LiteQuantumProjects'

export default LiteQuantumProjects
