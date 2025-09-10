import React from 'react'
import { motion } from 'framer-motion'
import { Award, TrendingUp, Users, Zap } from 'lucide-react'

const AboutCommercial: React.FC = () => {
  const stats = [
    { icon: Award, value: '6+', label: 'Anos de Experiência' },
    { icon: Users, value: '137+', label: 'Clientes Satisfeitos' },
    { icon: TrendingUp, value: '98%', label: 'Taxa de Sucesso' },
    { icon: Zap, value: '24h', label: 'Tempo de Resposta' },
  ]

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-transparent py-12 md:py-16"
      aria-label="Sobre Jeferson Reis"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Texto Compacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
              Por que me escolher para{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                seu projeto?
              </span>
            </h2>
            <p className="mb-6 text-base text-gray-600 lg:text-lg dark:text-gray-300">
              Sou <strong>Jeferson Reis</strong>, desenvolvedor full-stack com{' '}
              <strong>6+ anos de experiência</strong> criando soluções que{' '}
              <strong>realmente vendem</strong>. Já entreguei mais de{' '}
              <strong>137 projetos</strong> que geraram resultados reais para
              meus clientes.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Especialista em conversão:</strong> Seus visitantes
                  viram clientes
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Tecnologia de ponta:</strong> Next.js, React,
                  TypeScript, IA
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Entrega garantida:</strong> No prazo ou seu dinheiro
                  de volta
                </span>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl border border-gray-200 bg-white/80 p-6 text-center backdrop-blur-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/80"
                >
                  <Icon className="mx-auto mb-2 h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-center dark:from-green-900/20 dark:to-emerald-900/20"
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            🏆 Compromisso com Resultados
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            "Se seu site não gerar resultados em 30 dias, eu refaço sem custo
            adicional. Essa é minha garantia de sucesso para você!"
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutCommercial
