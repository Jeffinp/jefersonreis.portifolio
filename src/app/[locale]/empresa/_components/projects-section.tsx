'use client'

import { useCallback, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { SectionWrapper, SectionHeader, ProjectCard } from '@/components/common'
import { ProjectModal } from '@/components/projects'
import { projects, getProjectCategories } from '@/data'
import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'
import type { Project, ProjectCategory } from '@/types'

export function ProjectsSection() {
  const t = useTranslations('projects')
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | 'all'
  >('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const categories = getProjectCategories()
  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  const handleDetails = useCallback(
    (project: Project, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger
      setSelectedProject(project)
    },
    [],
  )

  const handleClose = useCallback(() => {
    setSelectedProject(null)
  }, [])

  return (
    <>
      <SectionWrapper id="projects">
        <SectionHeader
          subtitle={t('subtitle')}
          title={t('title')}
          description={t('description')}
        />

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            {t('all')}
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Projects carousel */}
        {filteredProjects.length > 0 ? (
          <Carousel
            key={selectedCategory}
            options={{ loop: true, align: 'start', slidesToScroll: 1 }}
            showControls
            showDots
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDetails={handleDetails}
              />
            ))}
          </Carousel>
        ) : (
          <p className="text-muted-foreground py-12 text-center">
            {t('empty')}
          </p>
        )}
      </SectionWrapper>

      <ProjectModal
        project={selectedProject}
        onClose={handleClose}
        triggerRef={triggerRef as React.RefObject<HTMLButtonElement | null>}
      />
    </>
  )
}
