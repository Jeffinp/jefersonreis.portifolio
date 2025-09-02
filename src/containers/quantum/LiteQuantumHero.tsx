import React, { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { Rocket, Terminal, Code, Zap } from 'lucide-react'
import { EnhancedButton } from '@/components/ui'

// Simplified, performance-optimized Quantum Hero
const LiteQuantumHero: React.FC = memo(() => {
  const { t } = useTranslation('sections/hero')
  const [typedText, setTypedText] = useState('')
  const fullText = 'Full-Stack Developer'

  // Simple typing effect without heavy animations
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Simple static background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(107, 70, 193, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)
            `,
          }}
        />

        {/* Simple grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="space-y-8">
          {/* Terminal-style header */}
          <div className="max-w-2xl">
            <div className="rounded-lg border border-blue-500/20 bg-black/50 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-500">portfolio.sh</span>
              </div>

              <div className="font-mono text-sm text-green-400">
                <div>$ whoami</div>
                <div className="mt-2 text-blue-400">&gt; Jeferson Reis</div>
                <div className="mt-2">$ role --current</div>
                <div className="mt-2 text-blue-400">
                  &gt; {typedText}
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            <motion.h1
              className="text-5xl font-black text-white lg:text-6xl xl:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Jeferson Reis
              </span>
            </motion.h1>

            <motion.p
              className="max-w-2xl text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero.transforming')}
            </motion.p>

            {/* Simple stats */}
            <motion.div
              className="grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                {
                  icon: <Rocket className="h-4 w-4" />,
                  label: 'Projetos',
                  value: '50+',
                },
                {
                  icon: <Code className="h-4 w-4" />,
                  label: 'Commits',
                  value: '10k+',
                },
                {
                  icon: <Zap className="h-4 w-4" />,
                  label: 'Clientes',
                  value: '100%',
                },
                {
                  icon: <Terminal className="h-4 w-4" />,
                  label: 'Tech Stack',
                  value: '30+',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-700 bg-gray-800/50 p-3 backdrop-blur-sm"
                >
                  <div className="mb-1 flex items-center gap-2 text-blue-400">
                    {stat.icon}
                    <span className="text-xs">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <EnhancedButton
                href="#projects"
                variant="gradient"
                size="lg"
                icon={<Rocket className="h-5 w-5" />}
                iconPosition="left"
              >
                {t('hero.buttons.viewProjects')}
              </EnhancedButton>

              <EnhancedButton
                href="#contact"
                variant="secondary"
                size="lg"
                icon={<Terminal className="h-5 w-5" />}
                iconPosition="left"
              >
                {t('hero.buttons.contact')}
              </EnhancedButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Simple scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-blue-400"
        >
          <Rocket className="h-8 w-8 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  )
})

LiteQuantumHero.displayName = 'LiteQuantumHero'

export default LiteQuantumHero
