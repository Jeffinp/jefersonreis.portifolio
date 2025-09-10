import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Minus,
  Shield,
  Clock,
  CreditCard,
  Headphones,
  Code,
  RefreshCw,
} from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
  icon: React.ElementType
}

const FAQCommercial: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'Quanto tempo demora para entregar meu site?',
      answer:
        'Garantimos entrega em 7 dias úteis para landing pages e 15 dias para sites completos. Se não cumprirmos o prazo, você ganha 50% de desconto. Trabalhamos com metodologia ágil e você acompanha o progresso diariamente.',
      icon: Clock,
    },
    {
      id: 2,
      question: 'E se eu não gostar do resultado?',
      answer:
        'Oferecemos garantia de satisfação de 7 dias para você avaliar o trabalho. Além disso, fazemos revisões ilimitadas até você aprovar completamente o projeto. Trabalhamos juntos até alcançar o resultado que você deseja. Sua satisfação é nossa prioridade!',
      icon: Shield,
    },
    {
      id: 3,
      question: 'Preciso pagar tudo à vista?',
      answer:
        'Não! Facilitamos o pagamento: 50% de entrada e 50% na entrega. Aceitamos Pix (5% desconto), cartão em até 3x sem juros, ou boleto bancário. Para projetos maiores, podemos parcelar em até 6x.',
      icon: CreditCard,
    },
    {
      id: 4,
      question: 'Vocês dão suporte após a entrega?',
      answer:
        'Sim! Todo projeto inclui 90 dias de suporte técnico gratuito. Isso inclui pequenos ajustes, dúvidas, atualizações de conteúdo e correções. Após esse período, oferecemos planos de manutenção a partir de R$ 97/mês.',
      icon: Headphones,
    },
    {
      id: 5,
      question: 'Meu site vai aparecer no Google?',
      answer:
        'Com certeza! Todos os sites são otimizados para SEO desde o início: URLs amigáveis, meta tags, sitemap, schema markup e velocidade otimizada. Garantimos nota acima de 90 no Google PageSpeed. Seu site será encontrado!',
      icon: Code,
    },
    {
      id: 6,
      question: 'E se meu negócio mudar e eu precisar de alterações?',
      answer:
        'Desenvolvemos sites escaláveis e fáceis de atualizar. Durante os 90 dias de suporte, fazemos alterações gratuitamente. Além disso, você pode contratar nosso serviço de manutenção ou solicitar upgrades quando necessário.',
      icon: RefreshCw,
    },
  ]

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24"
      aria-label="Perguntas Frequentes"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Ainda com{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dúvidas?
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Respondemos as principais perguntas para você tomar a melhor decisão
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon
            const isOpen = openItems.includes(faq.id)

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl border-2 transition-all ${
                  isOpen
                    ? 'border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-900/20'
                    : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50'
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left transition-all hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-lg p-2 ${
                        isOpen
                          ? 'bg-blue-100 dark:bg-blue-900/50'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isOpen
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`rounded-full p-1 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white"
        >
          <h3 className="mb-4 text-2xl font-bold">
            Ainda tem alguma dúvida específica?
          </h3>
          <p className="mb-6 text-lg opacity-90">
            Fale comigo agora no WhatsApp e tire todas as suas dúvidas!
          </p>
          <button
            onClick={() => {
              const whatsappNumber =
                process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55 75 99999-9999'
              const message =
                'Olá! Vi o FAQ mas ainda tenho algumas dúvidas sobre os serviços.'
              const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
              window.open(whatsappUrl, '_blank')
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-all hover:bg-gray-100"
          >
            Conversar no WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQCommercial
