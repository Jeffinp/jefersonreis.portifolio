'use client'

import { useState } from 'react'
import { SectionWrapper, SectionHeader, ProjectCard } from '@/components/common'
import { projects, getProjectCategories } from '@/data'
import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'
import type { ProjectCategory } from '@/types'

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | 'all'
  >('all')

  const categories = getProjectCategories()
  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <SectionWrapper id="projects">
      <SectionHeader
        subtitle="Meu Trabalho"
        title="Projetos em Destaque"
        description="Alguns dos projetos que desenvolvi recentemente"
      />

      {/* Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          Todos
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

      {/* Projects Carousel */}
      {filteredProjects.length > 0 ? (
        <Carousel
          options={{ loop: true, align: 'start', slidesToScroll: 1 }}
          showControls
          showDots
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Carousel>
      ) : (
        <p className="text-muted-foreground py-12 text-center">
          Nenhum projeto encontrado nesta categoria.
        </p>
      )}
    </SectionWrapper>
  )
}
