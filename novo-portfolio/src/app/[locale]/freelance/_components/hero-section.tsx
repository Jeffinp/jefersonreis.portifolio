'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { staggerContainer, staggerItem } from '@/lib/utils'

export function HeroSection() {
  const t = useTranslations('hero.freelance')

  const benefits = [t('benefits.0'), t('benefits.1'), t('benefits.2')]

  return (
    <section className="relative min-h-[calc(100vh-4rem)] pt-16">
      <div className="container-width flex min-h-[calc(100vh-8rem)] items-center">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <motion.h1
            className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            variants={staggerItem}
          >
            {t('headline')}
          </motion.h1>

          {/* Subheadline */}
          <motion.h2
            className="gradient-text mb-6 text-2xl font-bold sm:text-3xl md:text-4xl"
            variants={staggerItem}
          >
            {t('subheadline')}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg"
            variants={staggerItem}
          >
            {t('description')}
          </motion.p>

          {/* Benefits */}
          <motion.div
            className="mb-8 flex flex-wrap justify-center gap-4"
            variants={staggerItem}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-primary/10 flex items-center gap-2 rounded-full px-4 py-2"
              >
                <CheckCircle2 className="text-primary h-5 w-5" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={staggerItem}
          >
            <Button size="lg" asChild>
              <a href="#services">
                {t('cta.primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#testimonials">{t('cta.secondary')}</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
    </section>
  )
}
