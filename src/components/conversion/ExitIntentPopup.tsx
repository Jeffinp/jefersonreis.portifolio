import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Clock, Star, ArrowRight, Sparkles } from 'lucide-react'
import { useExitIntent } from '@/hooks/conversion/useExitIntent'
import { trackEvent } from '@/utils/tracking'

interface ExitIntentPopupProps {
  variant?: 'discount' | 'consultation' | 'ebook' | 'quiz'
  onClose?: () => void
  onConvert?: (data: any) => void
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  variant = 'discount',
  onClose,
  onConvert,
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { isVisible, dismiss } = useExitIntent({
    threshold: 10,
    delay: 0,
    cooldown: 24 * 60 * 60 * 1000, // 24 horas
    mobileEnabled: false,
    onTrigger: () => {
      trackEvent({
        action: 'exit_intent_triggered',
        category: 'Conversion',
        label: variant,
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track conversion
    trackEvent({
      action: 'exit_intent_converted',
      category: 'Conversion',
      label: variant,
      value: email,
    })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Save to localStorage for follow-up
    const leads = JSON.parse(localStorage.getItem('exitIntentLeads') || '[]')
    leads.push({
      email,
      variant,
      timestamp: Date.now(),
    })
    localStorage.setItem('exitIntentLeads', JSON.stringify(leads))

    setIsSuccess(true)
    setIsSubmitting(false)

    // Call parent callback
    onConvert?.({ email, variant })

    // Auto close after success
    setTimeout(() => {
      handleClose()
    }, 3000)
  }

  const handleClose = () => {
    dismiss()
    onClose?.()
    trackEvent({
      action: 'exit_intent_closed',
      category: 'Conversion',
      label: variant,
    })
  }

  const variants = {
    discount: {
      title: 'ESPERE! 🎁',
      subtitle: 'Oferta Exclusiva Só Hoje',
      description: 'Ganhe 15% de desconto no seu primeiro projeto',
      benefit: 'Economize até R$ 600 em sua landing page',
      cta: 'Quero Meu Desconto',
      icon: Gift,
      color: 'from-purple-600 to-pink-600',
    },
    consultation: {
      title: 'Consultoria GRÁTIS! 💡',
      subtitle: 'Análise Completa do Seu Negócio',
      description: '30 minutos de consultoria estratégica sem custo',
      benefit: 'Descubra como triplicar suas conversões',
      cta: 'Agendar Consultoria Grátis',
      icon: Sparkles,
      color: 'from-blue-600 to-cyan-600',
    },
    ebook: {
      title: 'E-book GRÁTIS! 📚',
      subtitle: 'Guia Completo de Conversão',
      description: '27 estratégias para vender mais online',
      benefit: 'Usado por +500 empresários',
      cta: 'Baixar E-book Grátis',
      icon: Star,
      color: 'from-green-600 to-emerald-600',
    },
    quiz: {
      title: 'Descubra GRÁTIS! 🎯',
      subtitle: 'Qual Site Ideal Para Você',
      description: 'Quiz rápido de 2 minutos + orçamento na hora',
      benefit: 'Economize tempo e dinheiro',
      cta: 'Fazer Quiz Grátis',
      icon: Clock,
      color: 'from-orange-600 to-red-600',
    },
  }

  const currentVariant = variants[variant]
  const Icon = currentVariant.icon

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-[10000] w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 transform"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
              {/* Header com gradiente */}
              <div className={`relative bg-gradient-to-r ${currentVariant.color} p-6 text-white`}>
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 rounded-full bg-white/20 p-2 backdrop-blur transition-all hover:bg-white/30"
                >
                  <X className="h-5 w-5 text-white" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{currentVariant.title}</h2>
                    <p className="text-lg opacity-90">{currentVariant.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {!isSuccess ? (
                  <>
                    <div className="mb-6 text-center">
                      <p className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                        {currentVariant.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ✨ {currentVariant.benefit}
                      </p>
                    </div>

                    {/* Timer urgência */}
                    <div className="mb-6 rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/20">
                      <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                        ⏰ Oferta expira em: 14:59:47
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Digite seu melhor e-mail"
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${currentVariant.color} px-6 py-3 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50`}
                      >
                        {isSubmitting ? (
                          'Processando...'
                        ) : (
                          <>
                            {currentVariant.cta}
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Trust badges */}
                    <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>🔒 100% Seguro</span>
                      <span>📧 Sem SPAM</span>
                      <span>🚫 Cancele quando quiser</span>
                    </div>
                  </>
                ) : (
                  /* Success state */
                  <div className="py-8 text-center">
                    <div className="mb-4 inline-flex rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                      <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                      Parabéns! 🎉
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Verifique seu e-mail para receber sua oferta exclusiva!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ExitIntentPopup