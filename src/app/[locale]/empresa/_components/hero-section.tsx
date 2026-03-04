'use client'

import { motion } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { AuroraBackground } from '@/components/ui/aurora-background'

export function HeroSection() {
  const t = useTranslations('hero.empresa')

  return (
    <AuroraBackground className="min-h-[calc(100vh-4rem)] pt-16">
      <div className="container-width flex min-h-[calc(100vh-8rem)] items-center">
        {/* CSS stagger animation — no JS dependency for LCP */}
        <div className="hero-stagger mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground mb-4 text-lg">{t('greeting')}</p>

          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t('name')}
          </h1>

          <h2 className="gradient-text mb-6 text-2xl font-bold sm:text-3xl md:text-4xl">
            {t('role')}
          </h2>

          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
            {t('description')}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="btn-shine" asChild>
              <a href="#projects">
                {t('cta.primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="btn-shine" asChild>
              <a
                href="/assets/pdf/Jeferson-Reis-CTO-2026.pdf"
                download="Jeferson-Reis-CT-2026.pdf"
              >
                <Download className="mr-2 h-5 w-5" />
                {t('cta.secondary')}
              </a>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8">
            {(['experience', 'projects', 'clients'] as const).map((key) => {
              const label = t(`stats.${key}`)
              const [value, ...rest] = label.split(' ')
              return (
                <div key={key} className="text-center">
                  <div className="text-primary text-3xl font-bold">{value}</div>
                  <div className="text-muted-foreground text-sm">
                    {rest.join(' ')}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator — only decorative, can use Framer Motion */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 sm:bottom-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="border-muted-foreground/30 h-8 w-5 rounded-full border-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="bg-muted-foreground/30 mx-auto mt-1 h-2 w-1 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </AuroraBackground>
  )
}
