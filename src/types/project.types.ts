export interface ProjectImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface ProjectTag {
  name: string
  color?: string
}

export interface ProjectTestimonial {
  text: string
  author: string
  role: string
  company: string
}

export interface Project {
  id: string
  titleKey: string
  descriptionKey: string
  fullDescriptionKey?: string
  image?: ProjectImage
  hasImage?: boolean
  images?: ProjectImage[]
  link?: string
  githubUrl?: string
  tags: ProjectTag[]
  featured?: boolean
  date?: string
  client?: string
  category?: string
  restricted?: boolean
  type?: 'contracted' | 'personal'
  technologies?: string[]
  completionDate?: string
  teamSize?: number
  duration?: string
  challenges?: string[]
  results?: string[]
  testimonial?: ProjectTestimonial
}

export type ProjectType =
  | 'contracted'
  | 'personal'
  | 'web'
  | 'mobile'
  | 'design'
  | '3d'
export type ProjectCategory =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'mobile'
  | 'design'
  | '3d'
  | 'ui-ux'
