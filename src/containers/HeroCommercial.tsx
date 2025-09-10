import React, { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  Mail,
  Phone,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { SectionBackground } from '@/components/common'
import { EnhancedButton } from '@/components/ui'
import { InteractiveCard } from '@/components/ui/MicroInteractions'

const HeroCommercial: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })
  const heroRef = useRef<HTMLElement>(null)
  const controls = useAnimation()
  const { t } = useTranslation('sections/hero')

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55 75 99999-9999'

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 } // Reset after 24h
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleContactClick = () => {
    const message = `Olá! Vi seu portfólio e tenho interesse em seus serviços de desenvolvimento. Gostaria de solicitar um orçamento.`
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const services = [
    { name: 'Landing Pages', price: 'R$ 800+', time: '7-15 dias' },
    { name: 'Sites Completos', price: 'R$ 2.000+', time: '15-30 dias' },
    { name: 'Automação IA', price: 'R$ 3.500+', time: '20-40 dias' },
    { name: 'Apps Mobile', price: 'R$ 7.000+', time: '45-90 dias' },
    { name: 'SaaS Completo', price: 'R$ 6.000+', time: '30-60 dias' },
    { name: 'Soluções Custom', price: 'Sob consulta', time: 'A definir' },
  ]

  const benefits = [
    'Especialista em IA e automações',
    'Código limpo e documentado', 
    'SEO otimizado desde o início',
    'Suporte pós-entrega incluso',
    'Pagamento facilitado',
    'Revisões ilimitadas até aprovação',
  ]

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent py-12 sm:py-16 md:py-20 lg:py-24"
      aria-label="Jeferson Reis - Desenvolvedor Full-Stack Especialista em IA"
    >
      <SectionBackground
        isMobile={isMobile}
        variant="hero"
        intensity="medium"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 md:px-10 lg:px-16 2xl:px-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Coluna de Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Timer de Oferta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2"
            >
              <AlertCircle className="h-5 w-5 animate-pulse text-red-600" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-red-600">
                  OFERTA TERMINA EM:
                </span>
                <div className="flex items-center gap-1 font-mono text-lg font-bold text-red-700">
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="animate-pulse">:</span>
                  <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="animate-pulse">:</span>
                  <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>
            </motion.div>

            {/* Badge de credibilidade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 dark:from-green-900/30 dark:to-emerald-900/30"
            >
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                +50 projetos entregues • Clientes relatam até 300% mais conversões
              </span>
            </motion.div>

            {/* Título Principal */}
            <div>
              <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                Landing Page Profissional em{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  7 Dias*
                </span>
                <br />
                Com Garantia de{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Satisfação Total
                </span>
              </h1>
              <p className="text-lg text-gray-600 lg:text-xl dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">
                  Sites que Geram Resultados Reais
                </strong>{' '}
                para seu Negócio.
                <br />
                <span className="text-base">
                  7 dias de garantia + Revisões até sua aprovação
                </span>
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                *Sites completos: 15-30 dias | Apps: 45-90 dias | Consulte prazos específicos
              </p>
            </div>

            {/* Lista de Benefícios */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={handleContactClick}
                className="group relative flex animate-pulse items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:animate-none hover:from-green-700 hover:to-green-800 hover:shadow-2xl"
              >
                <span className="absolute -top-3 -right-2 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">
                  VAGAS LIMITADAS
                </span>
                <Phone className="h-5 w-5" />
                GARANTIR MINHA VAGA AGORA
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#services"
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Ver Todos os Preços
              </a>
            </motion.div>

            {/* Urgência/Escassez */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="flex items-center gap-1 text-yellow-400">
                <Clock className="h-4 w-4 animate-pulse" />
                <span className="font-semibold">
                  2 pessoas estão vendo esta oferta agora
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="font-semibold text-red-400">
                Apenas 3 vagas restantes
              </span>
            </motion.div>
          </motion.div>

          {/* Coluna de Cards de Serviços */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all hover:bg-white/20"
              >
                <h3 className="mb-2 text-lg font-bold">{service.name}</h3>
                <div className="mb-2 text-2xl font-bold text-yellow-400">
                  {service.price}
                </div>
                <div className="text-sm text-blue-200">
                  Entrega: {service.time}
                </div>
              </motion.div>
            ))}

            {/* Card de Depoimento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="col-span-full rounded-xl border border-green-400/30 bg-green-400/10 p-6 backdrop-blur-md"
            >
              <div className="mb-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-2 text-sm text-blue-100 italic">
                &ldquo;Jeferson transformou nossa ideia em realidade. Site
                rápido, moderno e que realmente converte!&rdquo;
              </p>
              <p className="text-xs text-blue-200">
                — Maria Silva, CEO StartupX
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 border-t border-white/20 pt-8"
        >
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-3xl font-bold text-yellow-400">50+</div>
              <div className="text-sm text-blue-200">Projetos Entregues</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">98%</div>
              <div className="text-sm text-blue-200">Satisfação</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">24h</div>
              <div className="text-sm text-blue-200">Suporte Rápido</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">6+</div>
              <div className="text-sm text-blue-200">Anos Experiência</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroCommercial
