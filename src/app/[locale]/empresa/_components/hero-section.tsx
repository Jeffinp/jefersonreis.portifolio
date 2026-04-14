'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AuroraBackground } from '@/components/ui/aurora-background'

export function HeroSection() {
  const t = useTranslations('hero.empresa')
  const heroRef = useRef<HTMLDivElement>(null)

  // Raw mouse values (0 to 1 relative to hero)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Smooth spring for all transforms
  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Photo: 3D tilt (-8deg to +8deg)
  const rotateX = useTransform(smoothY, [0, 1], [8, -8])
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8])

  // Photo: subtle translate following mouse
  const photoX = useTransform(smoothX, [0, 1], [-8, 8])
  const photoY = useTransform(smoothY, [0, 1], [-6, 6])

  // Text: counter-parallax (opposite direction, smaller range)
  const textX = useTransform(smoothX, [0, 1], [6, -6])
  const textY = useTransform(smoothY, [0, 1], [4, -4])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <AuroraBackground className="min-h-[calc(100vh-4rem)] pt-16">
      <div
        ref={heroRef}
        className="container-width flex min-h-[calc(100vh-8rem)] items-center py-12"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hero-stagger mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text — left, counter-parallax */}
          <motion.div
            className="text-center lg:text-left"
            style={{ x: textX, y: textY }}
          >
            <p className="text-muted-foreground mb-4 text-lg">
              {t('greeting')}
            </p>

            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t('name')}
            </h1>

            <h2 className="gradient-text mb-6 text-2xl font-bold sm:text-3xl md:text-4xl">
              {t('role')}
            </h2>

            <p className="text-muted-foreground mb-8 text-lg lg:max-w-xl">
              {t('description')}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button size="lg" className="btn-shine" asChild>
                <a href="#projects">
                  {t('cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="btn-shine" asChild>
                <a
                  href="/assets/pdf/Jeferson-Reis-CTO-2026.pdf"
                  download="Jeferson-Reis-CTO-2026.pdf"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t('cta.secondary')}
                </a>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {(['experience', 'projects', 'clients'] as const).map((key) => {
                const label = t(`stats.${key}`)
                const [value, ...rest] = label.split(' ')
                return (
                  <div key={key} className="text-center lg:text-left">
                    <div className="text-primary text-3xl font-bold">
                      {value}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {rest.join(' ')}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Photo — right, 3D tilt + parallax */}
          <div className="flex justify-center" style={{ perspective: '900px' }}>
            <motion.div
              className="relative"
              style={{
                x: photoX,
                y: photoY,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ scale: { duration: 0.3 } }}
            >
              {/* Glow — moves with photo */}
              <div className="bg-primary/25 dark:bg-primary/20 absolute inset-0 -z-10 scale-110 rounded-3xl blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src="/assets/images/me/IMG_0126.png"
                  alt="Jeferson Reis"
                  width={300}
                  height={380}
                  className="h-[320px] w-[250px] object-cover object-[center_12%] sm:h-[400px] sm:w-[310px]"
                  priority
                />
                {/* shine reflection that moves with tilt */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: useTransform(
                      [smoothX, smoothY],
                      ([x, y]: number[]) =>
                        `radial-gradient(circle at ${(x ?? 0.5) * 100}% ${(y ?? 0.5) * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
                    ),
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
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
