import { type Locale } from '@/types'

export const locales: Locale[] = ['pt', 'en']
export const defaultLocale: Locale = 'pt'

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
}

export const localeFlags: Record<Locale, string> = {
  pt: '🇧🇷',
  en: '🇺🇸',
}
