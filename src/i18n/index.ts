// Funções auxiliares para usar com o i18n
import { useTranslation } from 'next-i18next'

// Hook para obter as traduções
export const useAppTranslation = () => {
  return useTranslation('main')
}

// Função para obter a URL com o locale
export const getLocalizedUrl = (path: string, locale: string) => {
  return `/${locale}${path}`
}

// Função para alternar entre locales
export const getToggleLocale = (currentLocale: string) => {
  return currentLocale === 'pt' ? 'en' : 'pt'
}

// Exporta constantes de locales
export const LOCALES = {
  PT: 'pt',
  EN: 'en',
}
