/**
 * i18n Helpers for Project Data
 *
 * Utility functions for handling internationalized project content.
 * Follows DRY principle by centralizing i18n logic.
 *
 * @module utils/i18n-helpers
 */

/**
 * Slug to camelCase converter
 *
 * Converts kebab-case slugs to camelCase for i18n keys.
 *
 * @param slug - Kebab-case slug
 * @returns camelCase version
 *
 * @example
 * ```ts
 * slugToCamelCase('rezerve-barber') // 'rezerveBarber'
 * slugToCamelCase('art-3d-modelo') // 'art3dModelo'
 * ```
 */
export function slugToCamelCase(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase())
}

/**
 * Generate i18n key for project field
 *
 * Creates the full i18n key path for a project field.
 *
 * @param slug - Project slug
 * @param field - Field name ('title', 'description', 'fullDescription')
 * @returns Full i18n key
 *
 * @example
 * ```ts
 * generateProjectI18nKey('rezerve-barber', 'title')
 * // Returns: 'portfolio.projects.rezerveBarber.title'
 * ```
 */
export function generateProjectI18nKey(
  slug: string,
  field: 'title' | 'description' | 'fullDescription' | 'challenges' | 'results'
): string {
  const camelKey = slugToCamelCase(slug)
  return `portfolio.projects.${camelKey}.${field}`
}

/**
 * Get project category namespace
 *
 * Returns the correct translation namespace for a project category.
 *
 * @param category - Project category
 * @returns Translation namespace
 *
 * @example
 * ```ts
 * getProjectNamespace('web') // 'projects/web-projects'
 * getProjectNamespace('mobile') // 'projects/mobile-projects'
 * ```
 */
export function getProjectNamespace(
  category: 'web' | 'mobile' | '3d' | 'design' | 'other'
): string {
  return `projects/${category}-projects`
}
