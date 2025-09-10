import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Star, 
  Clock, 
  Shield, 
  TrendingUp,
  Phone,
  ArrowRight,
  Globe,
  Zap,
  Users,
  Award
} from 'lucide-react'
import { trackEvent, trackPageView, trackCTAClick } from '@/utils/tracking'

// Dynamic imports
const LeadQualifierForm = dynamic(
  () => import('@/components/forms/LeadQualifierForm'),
  { ssr: false }
)
const ChatWidget = dynamic(
  () => import('@/components/ChatWidget'),
  { ssr: false }
)
const Analytics = dynamic(
  () => import('@/components/Analytics'),
  { ssr: false }
)

interface BenefitProps {
  icon: React.ElementType
  title: string
  description: string
}

const Benefit: React.FC<BenefitProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex gap-4"
  >
    <div className="flex-shrink-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
    <div>
      <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </motion.div>
)

export default function SiteProfissionalLandingPage() {
  const [showForm, setShowForm] = useState(false)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55 71 8174-7099'

  useEffect(() => {
    // Track page view with UTM parameters
    trackPageView('/lp/site-profissional', 'Landing Page - Site Profissional')
    
    // Track bounce rate
    const timer = setTimeout(() => {
      trackEvent('engaged_user', { page: 'site-profissional-lp' })
    }, 15000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = (source: string) => {
    trackCTAClick('whatsapp_contact', source)
    const message = `Olá! Vi o anúncio sobre criação de sites profissionais. Gostaria de um orçamento para minha empresa.`
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleFormOpen = () => {
    trackEvent('form_open', { form: 'lead_qualifier', page: 'site-profissional-lp' })
    setShowForm(true)
  }

  return (
    <>
      <Head>
        <title>Site Profissional para sua Empresa | Desenvolvedor Full-Stack</title>
        <meta 
          name="description" 
          content="Crie um site profissional que converte visitantes em clientes. Design moderno, SEO otimizado, mobile-first. Orçamento em 24h. Entrega em 10-15 dias."
        />
        <meta property="og:title" content="Site Profissional para sua Empresa" />
        <meta property="og:description" content="Design moderno, SEO otimizado, mobile-first. Orçamento grátis em 24h." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-site-profissional.jpg" />
        <link rel="canonical" href="https://jefersonreis.dev/lp/site-profissional" />
      </Head>

      <Analytics />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">+50 Sites Criados • 98% Satisfação</span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Site Profissional que{' '}
                  <span className="text-yellow-400">Vende 24h</span> por Dia
                </h1>
                <p className="text-xl text-blue-100 lg:text-2xl">
                  Aumente suas vendas com um site moderno, rápido e otimizado para Google
                </p>
              </div>

              {/* Price & Delivery */}
              <div className="flex flex-wrap gap-4">
                <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-yellow-400">R$ 2.000 - 2.500</div>
                  <div className="text-sm text-blue-200">Investimento total</div>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-green-400">10-15 dias</div>
                  <div className="text-sm text-blue-200">Entrega garantida</div>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3">
                {[
                  'Até 8 páginas personalizadas',
                  'Blog integrado para conteúdo',
                  'Painel administrativo completo',
                  'SEO otimizado para rankear no Google',
                  'Design responsivo mobile-first',
                  '60 dias de suporte gratuito'
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleFormOpen}
                  className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-4 text-lg font-bold text-gray-900 shadow-xl transition-all hover:from-yellow-500 hover:to-yellow-600 hover:shadow-2xl"
                >
                  Quero Meu Site Agora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => handleWhatsAppClick('hero')}
                  className="flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Phone className="h-5 w-5" />
                  Falar no WhatsApp
                </button>
              </div>

              {/* Urgency */}
              <p className="text-sm text-yellow-300">
                ⚡ Apenas 3 vagas disponíveis este mês • Resposta em até 2 horas
              </p>
            </motion.div>

            {/* Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl bg-white/10 p-8 backdrop-blur-md">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-400 to-purple-600 p-1">
                  <div className="flex h-full items-center justify-center rounded-lg bg-gray-900">
                    <Globe className="h-24 w-24 text-blue-400" />
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div className="absolute -bottom-4 -left-4 rounded-lg bg-white p-4 shadow-xl">
                  <div className="text-3xl font-bold text-gray-900">+200%</div>
                  <div className="text-sm text-gray-600">Aumento em vendas</div>
                </div>
                <div className="absolute -right-4 -top-4 rounded-lg bg-white p-4 shadow-xl">
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Clientes satisfeitos</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Por que escolher nossos sites?
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
              Não é apenas um site bonito. É uma máquina de vendas otimizada.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Benefit
              icon={TrendingUp}
              title="SEO Otimizado"
              description="Seu site aparecerá nas primeiras posições do Google, trazendo clientes orgânicos todos os dias."
            />
            <Benefit
              icon={Zap}
              title="Carregamento Ultra-Rápido"
              description="Sites que carregam em menos de 3 segundos. Velocidade que converte visitantes em clientes."
            />
            <Benefit
              icon={Shield}
              title="Segurança Garantida"
              description="SSL gratuito, backup automático e proteção contra ataques. Seu site sempre seguro e online."
            />
            <Benefit
              icon={Phone}
              title="100% Responsivo"
              description="Perfeito em celulares, tablets e computadores. Seus clientes compram de qualquer dispositivo."
            />
            <Benefit
              icon={Users}
              title="Painel Administrativo"
              description="Atualize conteúdo, preços e produtos sem precisar de programador. Total autonomia."
            />
            <Benefit
              icon={Award}
              title="Suporte 60 Dias"
              description="Suporte técnico gratuito por 2 meses. Ajudamos você a dominar seu novo site."
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="mb-12 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Resultados Reais de Clientes Reais
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: 'Maria Silva',
                  company: 'Boutique Fashion',
                  result: '+180% vendas online',
                  testimonial: 'Meu faturamento triplicou em 3 meses após o novo site!'
                },
                {
                  name: 'João Santos',
                  company: 'Clínica Dental',
                  result: '+250% agendamentos',
                  testimonial: 'Agora recebo agendamentos online 24h por dia.'
                },
                {
                  name: 'Ana Costa',
                  company: 'Consultoria RH',
                  result: '+320% leads',
                  testimonial: 'O site profissional mudou completamente meu negócio.'
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900"
                >
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.company}
                    </div>
                    <div className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {testimonial.result}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'Quanto tempo leva para o site ficar pronto?',
                answer: 'Entre 10 a 15 dias úteis após aprovação do layout. Sites mais complexos podem levar até 20 dias.'
              },
              {
                question: 'Preciso pagar tudo à vista?',
                answer: 'Não! Trabalho com 50% de entrada e 50% na entrega. Aceito Pix, cartão e boleto.'
              },
              {
                question: 'O site vai aparecer no Google?',
                answer: 'Sim! Todos os sites são otimizados para SEO. Você começará a aparecer nas buscas em 30-60 dias.'
              },
              {
                question: 'Consigo atualizar o conteúdo sozinho?',
                answer: 'Sim! Você terá um painel administrativo completo e intuitivo. Também ofereço treinamento gratuito.'
              },
              {
                question: 'E se eu não gostar do resultado?',
                answer: 'Ofereço revisões ilimitadas até sua total satisfação. Seu site só é entregue quando você aprovar 100%.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg border border-gray-200 p-6 dark:border-gray-700"
              >
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Pronto para Ter um Site que Vende?
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Solicite seu orçamento agora e receba uma proposta personalizada em até 24 horas
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={handleFormOpen}
              className="group flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-xl transition-all hover:bg-gray-100"
            >
              Solicitar Orçamento Grátis
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => handleWhatsAppClick('final-cta')}
              className="flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              Preferir WhatsApp
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Orçamento sem compromisso</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Resposta em até 2 horas</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Garantia de satisfação</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              ✕
            </button>
            <LeadQualifierForm />
          </motion.div>
        </div>
      )}

      <ChatWidget />
    </>
  )
}