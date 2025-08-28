import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, Users, Zap } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import EnhancedButton from './EnhancedButton'
import { InteractiveCard } from './MicroInteractions'

interface ProjectData {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  technologies: string[]
  category: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  type: 'personal' | 'contracted'
  completionDate: string
  teamSize?: number
  duration?: string
  challenges?: string[]
  results?: string[]
  testimonial?: {
    text: string
    author: string
    role: string
    company: string
  }
}

interface ProjectModalProps {
  project: ProjectData | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('main')
  const [headerLoaded, setHeaderLoaded] = useState(false)

  if (!project) return null

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Content */}
            <div className="max-h-[90vh] overflow-y-auto">
              {/* Header Image */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                {/* Skeleton enquanto carrega */}
                {!headerLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700" />
                )}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlZWUnIC8+PC9zdmc+"
                  onLoad={() => setHeaderLoaded(true)}
                  onError={() => setHeaderLoaded(true)}
                  className={`object-cover transition-opacity duration-300 ${
                    headerLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {headerLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                )}

                {/* Project Type Badge */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      project.type === 'personal'
                        ? 'bg-blue-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    {project.type === 'personal'
                      ? t('portfolio.projectModal.personalProject')
                      : t('portfolio.projectModal.commercialProject')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="p-6 md:p-8"
              >
                {/* Title and Actions */}
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                        {project.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t(`portfolio.categories.${project.category}`)}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <EnhancedButton
                          href={project.githubUrl}
                          external
                          variant="secondary"
                          size="sm"
                          icon={<Github className="h-4 w-4" />}
                          tooltip={t('portfolio.projectModal.viewCodeGithub')}
                        >
                          {t('portfolio.projectModal.code')}
                        </EnhancedButton>
                      )}
                      {project.liveUrl && (
                        <EnhancedButton
                          href={project.liveUrl}
                          external
                          variant="primary"
                          size="sm"
                          icon={<ExternalLink className="h-4 w-4" />}
                          tooltip={t('portfolio.projectModal.viewLiveProject')}
                        >
                          {t('portfolio.projectModal.demo')}
                        </EnhancedButton>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Project Stats */}
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <InteractiveCard className="p-4 text-center">
                      <Calendar className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.completionDate}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {t('portfolio.projectModal.completion')}
                      </p>
                    </InteractiveCard>

                    {project.teamSize && (
                      <InteractiveCard className="p-4 text-center">
                        <Users className="mx-auto mb-2 h-6 w-6 text-green-600" />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.teamSize}{' '}
                          {t('portfolio.projectModal.people')}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {t('portfolio.projectModal.team')}
                        </p>
                      </InteractiveCard>
                    )}

                    {project.duration && (
                      <InteractiveCard className="p-4 text-center">
                        <Zap className="mx-auto mb-2 h-6 w-6 text-purple-600" />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.duration}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {t('portfolio.projectModal.duration')}
                        </p>
                      </InteractiveCard>
                    )}

                    <InteractiveCard className="p-4 text-center">
                      <div className="mx-auto mb-2 h-6 w-6 rounded-full bg-orange-600" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.technologies.length}{' '}
                        {t('portfolio.projectModal.techs')}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {t('portfolio.projectModal.technologies')}
                      </p>
                    </InteractiveCard>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {t('portfolio.projectModal.aboutProject')}
                  </h3>
                  <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    {project.fullDescription}
                  </p>
                </motion.div>

                {/* Technologies */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {t('portfolio.projectModal.technologiesUsed')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Challenges */}
                {project.challenges && project.challenges.length > 0 && (
                  <motion.div variants={itemVariants} className="mb-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                      {t('portfolio.projectModal.challengesFaced')}
                    </h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Results */}
                {project.results && project.results.length > 0 && (
                  <motion.div variants={itemVariants} className="mb-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                      {t('portfolio.projectModal.resultsAchieved')}
                    </h3>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                  <motion.div variants={itemVariants} className="mb-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                      {t('portfolio.projectModal.clientTestimonial')}
                    </h3>
                    <InteractiveCard className="p-6">
                      <blockquote className="mb-4 text-gray-700 dark:text-gray-300">
                        &ldquo;{project.testimonial.text}&rdquo;
                      </blockquote>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {project.testimonial.author}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {project.testimonial.role} •{' '}
                          {project.testimonial.company}
                        </p>
                      </div>
                    </InteractiveCard>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
