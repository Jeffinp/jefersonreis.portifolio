/**
 * Tipos relacionados ao sistema de público-alvo (Target Audience)
 */

export type TargetAudience = 'empresa' | 'freelance' | 'default'

export interface AudienceConfig {
  value: TargetAudience
  label: string
  description: string
  route: string
  icon: string
}

export const AUDIENCE_CONFIGS: Record<
  Exclude<TargetAudience, 'default'>,
  AudienceConfig
> = {
  empresa: {
    value: 'empresa',
    label: 'Empresa',
    description: 'Portfólio técnico para recrutadores e empresas',
    route: '/empresa',
    icon: '🏢',
  },
  freelance: {
    value: 'freelance',
    label: 'Freelance',
    description: 'Serviços e soluções para clientes',
    route: '/freelance',
    icon: '💼',
  },
}

export const DEFAULT_AUDIENCE: TargetAudience = 'default'
