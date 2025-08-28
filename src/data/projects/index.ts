import type { Project, ProjectCategory, ProjectType } from '@/types'
import { webProjects } from './web-projects'
import { mobileProjects } from './mobile-projects'
import { designProjects } from './design-projects'
import { threeDProjects } from './3d-projects'

// Combine all projects
export const projects: Project[] = [
  ...mobileProjects,
  ...webProjects,
  ...designProjects,
  ...threeDProjects,
]

// Utility functions
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id)
}

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return projects.filter((project) => project.category === category)
}

export const getProjectsByType = (type: ProjectType): Project[] => {
  return projects.filter((project) => project.type === type)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured === true)
}

export const getProjectsByTechnology = (technology: string): Project[] => {
  return projects.filter(
    (project) =>
      project.technologies?.includes(technology) ||
      project.tags.some((tag) =>
        tag.name.toLowerCase().includes(technology.toLowerCase()),
      ),
  )
}

export const getRecentProjects = (limit: number = 6): Project[] => {
  return projects
    .filter((project) => project.completionDate)
    .sort((a, b) => {
      if (!a.completionDate || !b.completionDate) return 0
      return (
        new Date(b.completionDate).getTime() -
        new Date(a.completionDate).getTime()
      )
    })
    .slice(0, limit)
}

// Export individual project arrays for specific use cases
export { webProjects, mobileProjects, designProjects, threeDProjects }

// Project statistics
export const getProjectStats = () => {
  const totalProjects = projects.length
  const contractedProjects = projects.filter(
    (p) => p.type === 'contracted',
  ).length
  const personalProjects = projects.filter((p) => p.type === 'personal').length
  const featuredProjects = projects.filter((p) => p.featured).length

  const categoriesCount = projects.reduce(
    (acc, project) => {
      if (project.category) {
        acc[project.category] = (acc[project.category] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    total: totalProjects,
    contracted: contractedProjects,
    personal: personalProjects,
    featured: featuredProjects,
    byCategory: categoriesCount,
  }
}
