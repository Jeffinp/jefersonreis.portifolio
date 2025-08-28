export interface SkillItem {
  name: string
  icon: string
  category: string
  description?: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  years?: number
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'design'
  | 'tools'
  | 'cloud'
  | 'mobile'
  | '3d'

export interface SkillGroup {
  category: SkillCategory
  skills: SkillItem[]
  icon?: string
  color?: string
}
