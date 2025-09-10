import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Smartphone,
  Brain,
  Laptop,
  Check,
  Star,
  Clock,
  Zap,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { SectionBackground } from '@/components/common'

interface Service {
  id: string
  icon: React.ElementType
  title: string
  subtitle: string
  price: string
  originalPrice?: string
  duration: string
  description: string
  features: string[]
  popular?: boolean
  discount?: string
  results?: string[]
}

interface ServiceCardProps {
  service: Service
  index: number
  onSelect: () => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative h-full"
    >
      {service.popular && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform">
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-1 text-xs font-bold text-white shadow-lg">
            <Star className="h-3 w-3" />
            MAIS POPULAR
          </div>
        </div>
      )}

      <div
        className={`relative h-full overflow-hidden rounded-2xl border-2 backdrop-blur-md transition-all duration-300 ${
          service.popular
            ? 'border-blue-500 bg-white/95 shadow-2xl dark:bg-gray-800/95'
            : 'border-gray-200 bg-white/90 shadow-lg hover:border-blue-300 hover:bg-white/95 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/90 dark:hover:bg-gray-800/95'
        }`}
      >
        {/* Header */}
        <div
          className={`relative p-6 pb-4 ${
            service.popular
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
              : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800'
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <div
              className={`rounded-lg p-3 ${
                service.popular
                  ? 'bg-white/20'
                  : 'bg-blue-100 dark:bg-blue-900/30'
              }`}
            >
              <Icon
                className={`h-8 w-8 ${
                  service.popular
                    ? 'text-white'
                    : 'text-blue-600 dark:text-blue-400'
                }`}
              />
            </div>
            {service.discount && (
              <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                {service.discount}
              </span>
            )}
          </div>

          <h3
            className={`mb-1 text-2xl font-bold ${
              service.popular ? 'text-white' : 'text-gray-800 dark:text-white'
            }`}
          >
            {service.title}
          </h3>
          <p
            className={`text-sm ${
              service.popular
                ? 'text-blue-100'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {service.subtitle}
          </p>
        </div>

        {/* Pricing */}
        <div className="border-b border-gray-100 p-6 dark:border-gray-700">
          <div className="flex items-baseline gap-2">
            {service.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {service.originalPrice}
              </span>
            )}
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {service.price}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Entrega em {service.duration}</span>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 pb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {service.description}
          </p>
        </div>

        {/* Features */}
        <div className="px-6 pb-6">
          <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            O que está incluído:
          </h4>
          <ul className="space-y-2">
            {service.features
              .slice(0, isHovered ? undefined : 5)
              .map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>{feature}</span>
                </motion.li>
              ))}
          </ul>
          {service.features.length > 5 && !isHovered && (
            <p className="mt-2 text-xs text-gray-500">
              +{service.features.length - 5} outros benefícios
            </p>
          )}
        </div>

        {/* Results (if available) */}
        {service.results && (
          <div className="border-t border-gray-100 bg-blue-50 p-4 dark:border-gray-700 dark:bg-blue-900/20">
            <h4 className="mb-2 text-xs font-semibold text-blue-700 uppercase dark:text-blue-400">
              Resultados típicos:
            </h4>
            <div className="space-y-1">
              {service.results.map((result, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300"
                >
                  <TrendingUp className="h-3 w-3 text-blue-600" />
                  <span>{result}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="p-6 pt-0">
          <button
            onClick={onSelect}
            className={`group flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all ${
              service.popular
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Solicitar Orçamento
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const ServicesCommercial: React.FC = () => {
  const { t } = useTranslation('main')
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55 75 99999-9999'

  const services: Service[] = [
    {
      id: 'landing',
      icon: Zap,
      title: 'Landing Page',
      subtitle: 'Página que converte visitantes em clientes',
      price: 'R$ 800 - 1.500',
      duration: '7-15 dias*',
      description:
        'Landing page otimizada para conversão. *Prazo varia: Frontend (7 dias) | Com integrações (10 dias) | Full-stack com painel (15 dias).',
      features: [
        'Design exclusivo e personalizado',
        'Otimização para conversão (CRO)',
        'Integração com WhatsApp',
        'Formulário de captura de leads',
        'SEO básico incluído',
        'Mobile-first responsive',
        'Velocidade otimizada (PageSpeed 90+)',
        'Analytics configurado',
        'SSL e segurança',
        '30 dias de suporte grátis',
      ],
      results: [
        '+45% taxa de conversão média',
        'Carregamento < 3 segundos',
        'Score SEO 95+',
      ],
    },
    {
      id: 'site',
      icon: Globe,
      title: 'Site Profissional',
      subtitle: 'Presença digital completa para sua empresa',
      price: 'R$ 2.000 - 4.000',
      originalPrice: 'R$ 5.000',
      duration: '15-30 dias*',
      discount: '-20%',
      description:
        'Site institucional completo. *Prazo: Frontend estático (15 dias) | Com CMS simples (20 dias) | Full-stack com painel completo (30 dias).',
      features: [
        'Até 8 páginas personalizadas',
        'Blog integrado com CMS',
        'Painel administrativo completo',
        'SEO avançado e sitemap',
        'Integração com redes sociais',
        'Formulários inteligentes',
        'Chat online integrado',
        'Galeria de imagens/vídeos',
        'Google Maps integrado',
        'Certificado SSL gratuito',
        'Backup automático',
        '60 dias de suporte',
      ],
      popular: true,
      results: [
        '+200% tráfego orgânico',
        '+150% leads qualificados',
        '98% satisfação do cliente',
      ],
    },
    {
      id: 'ia',
      icon: Brain,
      title: 'IA + WhatsApp',
      subtitle: 'Atendimento automatizado 24/7',
      price: 'R$ 3.500 - 4.000',
      duration: '20-40 dias*',
      description:
        'Chatbot inteligente com IA. *Prazo: Bot simples (20 dias) | IA treinada (30 dias) | Sistema completo com CRM (40 dias).',
      features: [
        'Chatbot com IA avançada',
        'Atendimento 24/7 automático',
        'Qualificação de leads inteligente',
        'Agendamento automático',
        'Integração com CRM',
        'Respostas personalizadas',
        'Multi-atendimento simultâneo',
        'Relatórios detalhados',
        'Treinamento da IA incluso',
        'Fluxos conversacionais customizados',
        'Integração com sistemas',
        '90 dias de ajustes grátis',
      ],
      results: [
        '80% redução no tempo de resposta',
        '+300% leads qualificados',
        '24/7 disponibilidade',
      ],
    },
    {
      id: 'app',
      icon: Smartphone,
      title: 'App Mobile',
      subtitle: 'Aplicativo nativo para iOS e Android',
      price: 'R$ 7.000 - 12.000',
      duration: '45-90 dias*',
      description:
        'App mobile completo. *Prazo: App simples (45 dias) | Com backend (60 dias) | Sistema completo com painel (90 dias).',
      features: [
        'App nativo iOS + Android',
        'Design UI/UX profissional',
        'Backend completo incluso',
        'Painel administrativo web',
        'Notificações push',
        'Login social (Google/Facebook)',
        'Pagamento integrado',
        'Chat em tempo real',
        'Geolocalização e mapas',
        'Publicação nas lojas',
        'Código fonte incluído',
        'Documentação completa',
        '6 meses de manutenção',
      ],
      results: [
        '4.8★ avaliação média nas lojas',
        '+5000 downloads primeiro mês',
        '95% retenção de usuários',
      ],
    },
    {
      id: 'saas',
      icon: Laptop,
      title: 'SaaS Completo',
      subtitle: 'Plataforma completa como serviço',
      price: 'R$ 6.000+',
      duration: '30-60 dias*',
      description:
        'Sistema SaaS completo. *Prazo: MVP básico (30 dias) | Com pagamentos (45 dias) | Plataforma completa (60 dias).',
      features: [
        'Dashboard administrativo completo',
        'Sistema de planos e assinaturas',
        'Pagamento recorrente integrado',
        'Multi-tenancy (múltiplos clientes)',
        'API REST documentada',
        'Sistema de autenticação robusto',
        'Gestão de usuários e permissões',
        'Webhooks e integrações',
        'Relatórios e analytics',
        'Infraestrutura escalável',
        'Deploy automatizado',
        'Documentação técnica completa',
        'Código fonte incluído',
        '90 dias de suporte técnico',
      ],
      results: [
        'MRR desde o primeiro mês',
        'Escala para milhares de usuários',
        'Uptime 99.9% garantido',
      ],
    },
    {
      id: 'custom',
      icon: Shield,
      title: 'Soluções Custom',
      subtitle: 'Desenvolvimento sob medida',
      price: 'Sob consulta',
      duration: 'A definir',
      description:
        'Soluções personalizadas. Prazo definido após análise detalhada dos requisitos e complexidade do projeto.',
      features: [
        'Análise completa de requisitos',
        'Arquitetura personalizada',
        'Desenvolvimento ágil iterativo',
        'Integrações com sistemas existentes',
        'Automações de processos',
        'Machine Learning e IA',
        'Big Data e analytics',
        'Blockchain e Web3',
        'IoT e sistemas embarcados',
        'Migração de sistemas legados',
        'Consultoria técnica especializada',
        'Treinamento da equipe',
        'Suporte e manutenção sob medida',
        'SLA personalizado',
      ],
      results: [
        'Solução 100% personalizada',
        'ROI médio de 6 meses',
        'Suporte dedicado',
      ],
    },
  ]

  const handleServiceSelect = useCallback(
    (serviceId: string) => {
      const service = services.find((s) => s.id === serviceId)
      if (!service) return

      const message = `Olá! Tenho interesse no serviço de *${service.title}*.\n\nGostaria de receber um orçamento personalizado.\n\nPrazo desejado: ${service.duration}\nOrçamento estimado: ${service.price}`
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    },
    [whatsappNumber],
  )

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24"
      aria-label="Serviços e Preços"
    >
      <SectionBackground
        variant="services"
        isMobile={false}
        intensity="subtle"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Como Posso{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ajudar Seu Negócio
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Soluções profissionais com preços transparentes. Escolha o serviço
            ideal para seu projeto.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">
                Garantia de Satisfação
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">
                Entrega no Prazo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-700 dark:text-gray-300">
                4.9/5 Avaliação
              </span>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelect={() => handleServiceSelect(service.id)}
            />
          ))}
        </div>

        {/* Additional Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white md:p-12"
        >
          <h3 className="mb-4 text-2xl font-bold md:text-3xl">
            Precisa de Algo Personalizado?
          </h3>
          <p className="mb-6 text-lg opacity-90">
            Desenvolvimento de SaaS, sistemas complexos, integrações
            específicas...
          </p>
          <button
            onClick={() => handleServiceSelect('custom')}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-all hover:bg-gray-100"
          >
            Solicitar Orçamento Personalizado
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>

        {/* Prazo Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center dark:border-yellow-800 dark:bg-yellow-900/20"
        >
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>📅 Sobre os prazos:</strong> Os tempos informados variam
            conforme o escopo.
            <span className="mt-1 block">
              <strong>Frontend apenas:</strong> prazo mínimo |
              <strong> Frontend + Backend:</strong> prazo médio |
              <strong> Sistema completo:</strong> prazo máximo
            </span>
          </p>
        </motion.div>

        {/* FAQ Mini */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          <div className="text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
              <Zap className="h-6 w-6" />
            </div>
            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Pagamento Facilitado
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              50% entrada + 50% na entrega. Aceito Pix, cartão e boleto.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
              <Shield className="h-6 w-6" />
            </div>
            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Garantia Total
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Revisões ilimitadas até sua total satisfação com o projeto.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30">
              <Clock className="h-6 w-6" />
            </div>
            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Suporte Incluso
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Suporte técnico gratuito por até 90 dias após a entrega.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesCommercial
