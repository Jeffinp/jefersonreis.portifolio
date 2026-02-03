/**
 * Tipos relacionados à internacionalização
 */

export type Locale = 'pt' | 'en'

export interface LocaleConfig {
  locale: Locale
  label: string
  flag: string
}

export const LOCALES: Record<Locale, LocaleConfig> = {
  pt: {
    locale: 'pt',
    label: 'Português',
    flag: '🇧🇷',
  },
  en: {
    locale: 'en',
    label: 'English',
    flag: '🇺🇸',
  },
}

export const DEFAULT_LOCALE: Locale = 'pt'
