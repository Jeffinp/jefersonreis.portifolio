export interface BaseEntity {
  id: string
  createdAt?: Date
  updatedAt?: Date
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  color?: string
}

export interface ContactInfo {
  email: string
  phone?: string
  location: string
  socialLinks: SocialLink[]
}

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  image?: string
  content: string
  rating?: number
  date?: Date
}

export interface Service {
  id: string
  titleKey: string
  descriptionKey: string
  icon: string
  features?: string[]
  price?: {
    from: number
    currency: string
  }
  category?: string
}

export interface TimelineEvent {
  id: string
  date: string
  titleKey: string
  descriptionKey: string
  company?: string
  location?: string
  type?: 'work' | 'education' | 'project' | 'achievement'
  icon?: string
}

export type Locale = 'pt' | 'en'

export interface LoadingState {
  isLoading: boolean
  error?: string | null
}
