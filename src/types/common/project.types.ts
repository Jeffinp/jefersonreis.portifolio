/**
 * Tipos relacionados a projetos
 */

export interface ProjectImage {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface ProjectTag {
  id: string
  label: string
  color?: string
}

export type ProjectCategory = 'web' | 'mobile' | 'system'

export type ProjectStatus = 'completed' | 'in-progress' | 'planned'

export interface Project {
  id: string
  slug: string
  // Direct content (fallback for backward compatibility)
  title: string
  description: string
  longDescription?: string
  // i18n translation keys (preferred for multilingual support)
  titleKey?: string
  descriptionKey?: string
  longDescriptionKey?: string
  challengesKey?: string
  resultsKey?: string
  // Core fields
  category: ProjectCategory
  status: ProjectStatus
  tags: ProjectTag[]
  images: ProjectImage[]
  thumbnail: ProjectImage
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  order?: number
  startDate?: string
  endDate?: string
  client?: string
  role?: string
  teamSize?: number
  challenges?: string[]
  results?: string[]
}

export interface ProjectFilters {
  category?: ProjectCategory | 'all'
  status?: ProjectStatus | 'all'
  search?: string
  featured?: boolean
}
