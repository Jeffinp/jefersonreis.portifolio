import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { Download, Calendar, MessageCircle, ArrowRight, Code, Briefcase, Rocket } from 'lucide-react'
import { useTargetAudience } from '@/hooks/useTargetAudience'
import { SectionBackground } from '@/components/common'

const HeroAdaptive: React.FC = () => {
  const { t } = useTranslation('sections/hero')
  const { target, isEmpresa, isFreelance, isDefault, switchToTarget } = useTargetAudience()

  const handleWhatsAppClick = () => {
    const message = isFreelance 
      ? 'Olá! Vi seu portfólio e tenho interesse em seus serviços de desenvolvimento.'
      : 'Olá! Vi seu portfólio e gostaria de conversar sobre oportunidades.'
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+5575999999999'
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleDownloadCV = () => {
    window.open('/assets/cv/jeferson-reis-cv.pdf', '_blank')
  }

  const handleScheduleMeeting = () => {
    window.open('https://calendly.com/jefersonreis/30min', '_blank')
  }

  // Conteúdo adaptável baseado no público
  const getHeroContent = () => {
    if (isEmpresa) {
      return {
        title: 'Desenvolvedor Full-Stack Sênior',
        subtitle: 'React • Node.js • Python • IA • 2+ anos de experiência',
        description: 'Especialista em sistemas escaláveis, automações inteligentes e soluções que geram resultados reais. Disponível para CLT, PJ e projetos desafiadores.',
        primaryCTA: { label: 'Baixar CV', action: handleDownloadCV, icon: Download },
        secondaryCTA: { label: 'Agendar Conversa', action: handleScheduleMeeting, icon: Calendar },
        badges: [
          'Stack Moderno',
          'Metodologias Ágeis',
          'Clean Code',
          'DevOps',
        ],
      }
    }

    if (isFreelance) {
      return {
        title: 'Sites que VENDEM + Automações com IA',
        subtitle: 'Desenvolvedor Full-Stack especialista em resultados',
        description: 'Landing pages que convertem 3x mais. Automações que economizam 20h/semana. Apps que geram receita real. ROI comprovado em 60 dias.',
        primaryCTA: { label: 'Quero Orçamento', action: handleWhatsAppClick, icon: MessageCircle },
        secondaryCTA: { label: 'Ver Preços', action: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), icon: ArrowRight },
        badges: [
          'Entrega em 7 dias',
          '50+ projetos',
          'Suporte incluso',
          'Garantia de satisfação',
        ],
      }
    }

    // Versão default - mostra ambas opções
    return {
      title: 'Desenvolvedor Full-Stack & Especialista em IA',
      subtitle: 'Transformando ideias em soluções digitais que geram resultados',
      description: 'Desenvolvimento web moderno, automações inteligentes e apps mobile. Disponível para projetos freelance e oportunidades CLT/PJ.',
      primaryCTA: null, // Será substituído por dual CTA
      secondaryCTA: null,
      badges: [
        '2+ anos experiência',
        'Stack completo',
        '50+ projetos',
        'IA & Automação',
      ],
    }
  }

  const content = getHeroContent()

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent py-20"
      aria-label="Hero Section"
    >
      <SectionBackground variant="hero" intensity="medium" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Target Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 dark:from-blue-900/30 dark:to-purple-900/30"
            >
              {isEmpresa && <Briefcase className="h-4 w-4 text-blue-600" />}
              {isFreelance && <Rocket className="h-4 w-4 text-purple-600" />}
              {isDefault && <Code className="h-4 w-4 text-green-600" />}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isEmpresa && 'Para Empresas'}
                {isFreelance && 'Para Negócios'}
                {isDefault && 'Portfolio Completo'}
              </span>
            </motion.div>

            {/* Title */}
            <div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                {content.title}
              </h1>
              <p className="text-xl text-gray-600 lg:text-2xl dark:text-gray-300">
                {content.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {content.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {content.badges.map((badge, index) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-gray-700 backdrop-blur dark:bg-gray-800/80 dark:text-gray-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {badge}
                </motion.span>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              {isDefault ? (
                /* Dual CTA for default view */
                <>
                  <button
                    onClick={() => switchToTarget('freelance')}
                    className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                  >
                    <Rocket className="h-5 w-5" />
                    <span>Quero Contratar</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => switchToTarget('empresa')}
                    className="group flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>Sou Empresa</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </>
              ) : (
                /* Specific CTAs for targeted views */
                <>
                  {content.primaryCTA && (
                    <button
                      onClick={content.primaryCTA.action}
                      className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                    >
                      <content.primaryCTA.icon className="h-5 w-5" />
                      <span>{content.primaryCTA.label}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                  {content.secondaryCTA && (
                    <button
                      onClick={content.secondaryCTA.action}
                      className="group flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                      <content.secondaryCTA.icon className="h-5 w-5" />
                      <span>{content.secondaryCTA.label}</span>
                    </button>
                  )}
                </>
              )}
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 border-t border-gray-200 pt-6 dark:border-gray-700"
            >
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isFreelance ? '50+' : '2+'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isFreelance ? 'Projetos Entregues' : 'Anos Experiência'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isFreelance ? '98%' : '10+'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isFreelance ? 'Satisfação' : 'Tecnologias'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isFreelance ? '7-15' : '100%'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isFreelance ? 'Dias Entrega' : 'Clean Code'}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Column - Code animation or illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 backdrop-blur-sm">
              {/* Tech Stack Visual */}
              <div className="grid grid-cols-3 gap-4">
                {['React', 'Node.js', 'Python', 'TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'AWS', 'OpenAI'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-center rounded-lg bg-white/80 p-3 text-sm font-medium text-gray-700 backdrop-blur dark:bg-gray-800/80 dark:text-gray-300"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-3 shadow-lg"
              >
                <Code className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroAdaptive