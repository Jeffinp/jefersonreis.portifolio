import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Palette, Code, Rocket, CheckCircle } from 'lucide-react'

const ProcessCommercial: React.FC = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Briefing & Análise',
      description:
        'Entendemos suas necessidades, objetivos e público-alvo para criar a solução ideal.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Palette,
      title: 'Design & Prototipação',
      description:
        'Criamos protótipos interativos e designs que alinham estética com funcionalidade.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Code,
      title: 'Desenvolvimento',
      description:
        'Codificamos sua solução com as melhores práticas e tecnologias do mercado.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: CheckCircle,
      title: 'Testes & Validação',
      description:
        'Testamos cada funcionalidade para garantir performance e qualidade.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Rocket,
      title: 'Deploy & Lançamento',
      description:
        'Colocamos seu projeto no ar com segurança e acompanhamento completo.',
      color: 'from-red-500 to-red-600',
    },
  ]

  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Nosso Processo de Trabalho
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Um processo estruturado e transparente que garante resultados
            excepcionais em cada projeto.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="absolute top-1/2 right-0 left-0 hidden h-0.5 -translate-y-1/2 transform bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 lg:block" />

          <div className="relative grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="relative z-10 rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-900">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`h-16 w-16 bg-gradient-to-r ${step.color} mx-auto mb-4 flex items-center justify-center rounded-xl`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-center text-lg font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>

                {/* Connection Arrow - Mobile */}
                {index < steps.length - 1 && (
                  <div className="mt-4 mb-4 flex justify-center lg:hidden">
                    <div className="h-8 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900"
        >
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                2-3 Semanas
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Prazo médio para sites
              </div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                4-8 Semanas
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Prazo para e-commerces
              </div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Personalizado
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Para projetos complexos
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessCommercial
