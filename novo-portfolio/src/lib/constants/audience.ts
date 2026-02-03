import { type TargetAudience } from '@/types'

/**
 * Chave do localStorage para armazenar a preferência de audiência
 */
export const AUDIENCE_STORAGE_KEY = 'portfolio-target-audience'

/**
 * Rotas por tipo de audiência
 */
export const AUDIENCE_ROUTES: Record<TargetAudience, string> = {
  empresa: '/empresa',
  freelance: '/freelance',
  default: '/',
}
