import React from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase,
  Rocket,
  ArrowRight,
  Users,
  Code,
  TrendingUp,
  Clock,
  Shield,
  Star,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const AudienceSelector: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleSelection = (target: 'empresa' | 'freelance') => {
    // Salva a preferência
    localStorage.setItem('portfolioTarget', target)

    // Redireciona para página específica
    if (target === 'empresa') {
      router.push('/empresa')
    } else {
      router.push('/freelance')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
            Olá! Eu sou{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Jeferson Reis
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Desenvolvedor Full-Stack & Especialista em Soluções Digitais
          </p>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Como posso ajudar você hoje?
          </p>
        </motion.div>

        {/* Cards de seleção */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Card Empresa/Recrutador */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
            onClick={() => handleSelection('empresa')}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Icon */}
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-4 text-white shadow-lg">
              <Briefcase className="h-8 w-8" />
            </div>

            {/* Content */}
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Sou Empresa / Recrutador
            </h2>

            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Procuro um desenvolvedor Full-Stack experiente para integrar nossa
              equipe ou projeto
            </p>

            {/* Benefits list */}
            <ul className="mb-8 space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Code className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                <span>Stack moderno: React, Node.js, Python, IA</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                <span>2+ anos de experiência comprovada</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                <span>Metodologias ágeis e trabalho em equipe</span>
              </li>
            </ul>

            {/* CTA */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Ver portfolio técnico
              </span>
              <div className="flex items-center gap-2 text-blue-600 transition-transform group-hover:translate-x-2 dark:text-blue-400">
                <span className="font-semibold">Acessar</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>

            {/* Badge */}
            <div className="absolute -top-1 -right-1">
              <div className="rounded-bl-xl bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                CLT / PJ
              </div>
            </div>
          </motion.div>

          {/* Card Freelance/Negócios */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
            onClick={() => handleSelection('freelance')}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Icon */}
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4 text-white shadow-lg">
              <Rocket className="h-8 w-8" />
            </div>

            {/* Content */}
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Quero Escalar Meu Negócio
            </h2>

            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Preciso de sites, sistemas e automações para vender mais e
              trabalhar menos
            </p>

            {/* Benefits list */}
            <ul className="mb-8 space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-500" />
                <span>Sites que vendem 3x mais</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-500" />
                <span>Automações que economizam 20h/semana</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-500" />
                <span>Garantia de satisfação de 7 dias</span>
              </li>
            </ul>

            {/* CTA */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Ver soluções e preços
              </span>
              <div className="flex items-center gap-2 text-purple-600 transition-transform group-hover:translate-x-2 dark:text-purple-400">
                <span className="font-semibold">Acessar</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>

            {/* Badge */}
            <div className="absolute -top-1 -right-1">
              <div className="rounded-bl-xl bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-semibold text-white">
                FREELANCE
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          Você pode mudar sua escolha a qualquer momento usando o menu de
          navegação
        </motion.p>
      </div>
    </div>
  )
}

export default AudienceSelector
