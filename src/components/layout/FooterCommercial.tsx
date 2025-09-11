import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Shield,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  CreditCard,
  Lock,
  Headphones,
  RefreshCw,
  Zap,
  ArrowRight,
} from 'lucide-react'
import { trackCTAClick } from '@/utils/tracking'

export const FooterCommercial: React.FC = () => {
  const handleWhatsAppClick = () => {
    trackCTAClick('footer_whatsapp', 'commercial_footer')
    const message = 'Olá! Gostaria de saber mais sobre os serviços.'
    const whatsappUrl = `https://wa.me/5575999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const guarantees = [
    {
      icon: Shield,
      title: '7 Dias de Garantia',
      description: 'Não gostou? Devolvemos 100% do valor',
    },
    {
      icon: Clock,
      title: 'Entrega no Prazo',
      description: 'Ou você ganha 10% de desconto',
    },
    {
      icon: Headphones,
      title: 'Suporte 24/7',
      description: 'WhatsApp direto comigo',
    },
    {
      icon: RefreshCw,
      title: '30 Dias de Ajustes',
      description: 'Revisões ilimitadas após entrega',
    },
  ]

  const services = [
    { name: 'Landing Pages', price: 'R$ 800', time: '7 dias' },
    { name: 'Sites Institucionais', price: 'R$ 2.000', time: '15 dias' },
    { name: 'Automação com IA', price: 'R$ 3.500', time: '20 dias' },
    { name: 'Apps Mobile', price: 'R$ 7.000', time: '45 dias' },
  ]

  const achievements = [
    { number: '+47', label: 'Clientes Satisfeitos' },
    { number: '98%', label: 'Taxa de Satisfação' },
    { number: '+150', label: 'Projetos Entregues' },
    { number: '4.9', label: 'Avaliação Média' },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* CTA Section */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center shadow-xl sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Pronto para multiplicar suas vendas?
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Comece hoje mesmo com 15% de desconto no primeiro projeto
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-bold text-green-600 shadow-lg transition-all hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="h-5 w-5" />
                  Quero Meu Desconto
                  <ArrowRight className="h-5 w-5 animate-pulse" />
                </motion.button>
                <a
                  href="tel:+5575999999999"
                  className="flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-6 py-3 text-lg font-bold text-white backdrop-blur transition-all hover:bg-white/20"
                >
                  <Phone className="h-5 w-5" />
                  Ligar Agora
                </a>
              </div>
              <p className="mt-4 text-sm text-white/80">
                ⏰ Oferta válida por tempo limitado
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Guarantees */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <guarantee.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-gray-900 dark:text-white">
                  {guarantee.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {guarantee.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <span className="text-xl font-bold text-white">JR</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    Jeferson Reis
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Desenvolvedor Full-Stack
                  </p>
                </div>
              </div>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Especialista em criar sites e apps que geram resultados reais
                para seu negócio. Tecnologia de ponta com IA integrada.
              </p>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                4.9/5 baseado em 47 avaliações
              </p>
            </div>

            {/* Services & Pricing */}
            <div>
              <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                Serviços & Preços
              </h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index} className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {service.name}
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {service.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="h-3 w-3" />
                      Entrega em {service.time}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                Resultados
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {achievement.number}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {achievement.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                Contato Direto
              </h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp: (75) 99999-9999
                  </button>
                </li>
                <li>
                  <a
                    href="tel:+5575999999999"
                    className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                  >
                    <Phone className="h-4 w-4" />
                    Telefone: (75) 99999-9999
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contato@jefersonreis.com"
                    className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                  >
                    <Mail className="h-4 w-4" />
                    contato@jefersonreis.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  Salvador, BA - Brasil
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Security */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Lock className="h-4 w-4" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CreditCard className="h-4 w-4" />
                <span>Pix, Cartão, Boleto</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Garantia de 7 dias</span>
              </div>
            </div>
            <div className="text-center text-xs text-gray-500 sm:text-right dark:text-gray-500">
              <p>© 2024 Jeferson Reis. Todos os direitos reservados.</p>
              <p className="mt-1">CNPJ: 00.000.000/0001-00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar - Mobile Only */}
      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200 bg-white p-2 sm:hidden dark:border-gray-700 dark:bg-gray-900">
        <button
          onClick={handleWhatsAppClick}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 py-3 text-sm font-bold text-white shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
          Falar no WhatsApp Agora
          <ArrowRight className="h-5 w-5 animate-pulse" />
        </button>
      </div>
    </footer>
  )
}

export default FooterCommercial
