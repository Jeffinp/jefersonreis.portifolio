'use client'

import { Building2, Briefcase } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTargetAudience } from '@/hooks'
import { type TargetAudience } from '@/types'

const audienceConfig = {
  empresa: {
    icon: Building2,
    gradient: 'from-blue-500 to-cyan-500',
  },
  freelance: {
    icon: Briefcase,
    gradient: 'from-purple-500 to-pink-500',
  },
} as const

/**
 * Componente de seleção de público-alvo
 * Exibido na página inicial para o usuário escolher entre empresa ou freelance
 *
 * @example
 * ```tsx
 * <AudienceSelector />
 * ```
 */
export function AudienceSelector() {
  const t = useTranslations('audience')
  const { navigateToTarget } = useTargetAudience()

  const handleSelect = (target: Exclude<TargetAudience, 'default'>) => {
    navigateToTarget(target)
  }

  return (
    <div className="container-width section-padding">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-balance">{t('title')}</h1>
          <p className="text-muted-foreground text-xl text-pretty">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {(['empresa', 'freelance'] as const).map((audience) => {
            const config = audienceConfig[audience]
            const Icon = config.icon

            return (
              <button
                key={audience}
                onClick={() => handleSelect(audience)}
                className="group border-border bg-card hover:border-primary focus-visible:ring-ring relative overflow-hidden rounded-xl border p-8 text-left transition-all hover:scale-105 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 transition-opacity group-hover:opacity-10`}
                />

                {/* Content */}
                <div className="relative space-y-4">
                  <div
                    className={`inline-flex rounded-lg bg-gradient-to-br ${config.gradient} p-3 text-white`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                      {t(`${audience}.title`)}
                    </h2>
                    <p className="text-muted-foreground">
                      {t(`${audience}.description`)}
                    </p>
                  </div>

                  <div className="text-primary flex items-center transition-transform group-hover:translate-x-2">
                    <span className="text-sm font-semibold">Ver mais</span>
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
