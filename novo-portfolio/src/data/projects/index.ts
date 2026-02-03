import type { Project, ProjectCategory } from '@/types'
import { projectsWeb } from './web-projects'
import { projectsMobile } from './mobile-projects'

/**
 * Todos os projetos organizados por categoria
 */
export const projects: Project[] = [...projectsWeb, ...projectsMobile]

/**
 * Helper: Obter projetos por categoria
 */
export function getProjectsByCategory(
  category: ProjectCategory | 'all'
): Project[] {
  if (category === 'all') return projects
  return projects.filter((project) => project.category === category)
}

/**
 * Helper: Obter projetos featured
 */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

/**
 * Helper: Obter categorias únicas de projetos
 */
export function getProjectCategories(): ProjectCategory[] {
  const categories = new Set(projects.map((p) => p.category))
  return Array.from(categories)
}

/**
 * Helper: Obter projeto por slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/**
 * Export individual arrays
 */
export { projectsWeb, projectsMobile }
