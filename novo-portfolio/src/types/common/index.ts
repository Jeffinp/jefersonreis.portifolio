/**
 * Exportações centralizadas de tipos comuns
 */

// Theme
export type { Theme, ResolvedTheme, ThemeContextType } from './theme.types'

// Locale
export type { Locale, LocaleConfig } from './locale.types'
export { LOCALES, DEFAULT_LOCALE } from './locale.types'

// Audience
export type { TargetAudience, AudienceConfig } from './audience.types'
export { AUDIENCE_CONFIGS, DEFAULT_AUDIENCE } from './audience.types'

// Project
export type {
  Project,
  ProjectImage,
  ProjectTag,
  ProjectCategory,
  ProjectStatus,
  ProjectFilters,
} from './project.types'

// Skill
export type {
  Skill,
  SkillLevel,
  SkillCategory,
  SkillGroup,
} from './skill.types'
