/**
 * Tipos relacionados a habilidades/skills
 */

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'database'
  | 'design'
  | 'tools'
  | 'soft-skills'
  | 'other'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  level: SkillLevel
  icon?: string
  color?: string
  description?: string
  yearsOfExperience?: number
}

export interface SkillGroup {
  category: SkillCategory
  label: string
  icon: string
  skills: Skill[]
}
