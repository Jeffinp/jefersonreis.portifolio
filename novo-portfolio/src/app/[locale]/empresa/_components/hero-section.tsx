'use client'

import { motion } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { fadeIn, staggerContainer, staggerItem } from '@/lib/utils'

export function HeroSection() {
  const t = useTranslations('hero.empresa')

  return (
    <section className="relative min-h-[calc(100vh-4rem)] pt-16">
      <div className="container-width flex min-h-[calc(100vh-8rem)] items-center">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            className="text-muted-foreground mb-4 text-lg"
            variants={staggerItem}
          >
            {t('greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1
            className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            variants={staggerItem}
          >
            {t('name')}
          </motion.h1>

          {/* Role */}
          <motion.h2
            className="gradient-text mb-6 text-2xl font-bold sm:text-3xl md:text-4xl"
            variants={staggerItem}
          >
            {t('role')}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg"
            variants={staggerItem}
          >
            {t('description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={staggerItem}
          >
            <Button size="lg" asChild>
              <a href="#projects">
                {t('cta.primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/cv.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                {t('cta.secondary')}
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8"
            variants={fadeIn}
          >
            {[
              { key: 'experience', value: '5+', label: 'Anos' },
              { key: 'projects', value: '50+', label: 'Projetos' },
              { key: 'clients', value: '30+', label: 'Clientes' },
            ].map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-primary text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
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
