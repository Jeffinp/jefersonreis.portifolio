import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from './config'
import type { Locale } from '@/types'

const isValidLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale)

export default getRequestConfig(async ({ requestLocale }) => {
  // Valida que o locale recebido é válido
  const locale = await requestLocale

  if (!locale || !isValidLocale(locale)) {
    notFound()
  }

  // Import de todas as mensagens
  const common =
    locale === 'pt'
      ? (await import('@/data/locales/pt/common.json')).default
      : (await import('@/data/locales/en/common.json')).default

  const hero =
    locale === 'pt'
      ? (await import('@/data/locales/pt/hero.json')).default
      : (await import('@/data/locales/en/hero.json')).default

  const messages = {
    ...common,
    hero,
  }

  return {
    locale,
    messages,
    timeZone: 'America/Sao_Paulo',
    now: new Date(),
  }
})
