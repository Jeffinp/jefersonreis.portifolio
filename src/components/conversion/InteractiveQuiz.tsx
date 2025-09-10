import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Target,
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  Brain,
  Laptop,
  ShoppingCart,
  Calendar,
  DollarSign,
  Sparkles,
  CheckCircle,
} from 'lucide-react'
import { trackEvent } from '@/utils/tracking'

interface QuizAnswer {
  id: string
  text: string
  icon?: React.ElementType
  value: string
}

interface QuizQuestion {
  id: string
  question: string
  subtitle?: string
  type: 'single' | 'multiple' | 'range'
  answers: QuizAnswer[]
}

interface QuizResult {
  type: string
  title: string
  description: string
  recommendation: string
  estimatedPrice: string
  estimatedTime: string
  features: string[]
}

export const InteractiveQuiz: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const questions: QuizQuestion[] = [
    {
      id: 'business_type',
      question: 'Qual é o seu tipo de negócio?',
      subtitle: 'Isso nos ajuda a entender suas necessidades',
      type: 'single',
      answers: [
        {
          id: 'startup',
          text: 'Startup/Novo Negócio',
          icon: TrendingUp,
          value: 'startup',
        },
        { id: 'small', text: 'Pequena Empresa', icon: Users, value: 'small' },
        { id: 'medium', text: 'Média Empresa', icon: Globe, value: 'medium' },
        {
          id: 'personal',
          text: 'Profissional Liberal',
          icon: Target,
          value: 'personal',
        },
      ],
    },
    {
      id: 'main_goal',
      question: 'Qual seu principal objetivo?',
      subtitle: 'O que você quer alcançar com seu projeto',
      type: 'single',
      answers: [
        {
          id: 'sales',
          text: 'Aumentar Vendas',
          icon: ShoppingCart,
          value: 'sales',
        },
        { id: 'leads', text: 'Gerar Leads', icon: Users, value: 'leads' },
        { id: 'brand', text: 'Fortalecer Marca', icon: Globe, value: 'brand' },
        {
          id: 'automation',
          text: 'Automatizar Processos',
          icon: Brain,
          value: 'automation',
        },
      ],
    },
    {
      id: 'project_type',
      question: 'Que tipo de solução você precisa?',
      subtitle: 'Podemos combinar múltiplas soluções',
      type: 'multiple',
      answers: [
        { id: 'landing', text: 'Landing Page', icon: Globe, value: 'landing' },
        {
          id: 'website',
          text: 'Site Institucional',
          icon: Laptop,
          value: 'website',
        },
        {
          id: 'ecommerce',
          text: 'E-commerce',
          icon: ShoppingCart,
          value: 'ecommerce',
        },
        {
          id: 'app',
          text: 'Aplicativo Mobile',
          icon: Smartphone,
          value: 'app',
        },
        { id: 'ai', text: 'Automação com IA', icon: Brain, value: 'ai' },
      ],
    },
    {
      id: 'timeline',
      question: 'Quando você precisa do projeto?',
      subtitle: 'Nos ajuda a priorizar seu projeto',
      type: 'single',
      answers: [
        {
          id: 'urgent',
          text: 'Urgente (7-15 dias)',
          icon: Calendar,
          value: 'urgent',
        },
        { id: 'month', text: 'Este mês', icon: Calendar, value: 'month' },
        {
          id: 'quarter',
          text: 'Próximos 3 meses',
          icon: Calendar,
          value: 'quarter',
        },
        {
          id: 'planning',
          text: 'Estou planejando',
          icon: Calendar,
          value: 'planning',
        },
      ],
    },
    {
      id: 'budget',
      question: 'Qual seu orçamento estimado?',
      subtitle: 'Para oferecermos a melhor solução',
      type: 'single',
      answers: [
        { id: 'low', text: 'R$ 800 - 2.000', icon: DollarSign, value: 'low' },
        {
          id: 'medium',
          text: 'R$ 2.000 - 5.000',
          icon: DollarSign,
          value: 'medium',
        },
        {
          id: 'high',
          text: 'R$ 5.000 - 10.000',
          icon: DollarSign,
          value: 'high',
        },
        {
          id: 'enterprise',
          text: 'Acima de R$ 10.000',
          icon: DollarSign,
          value: 'enterprise',
        },
      ],
    },
  ]

  const calculateResult = (): QuizResult => {
    const { business_type, main_goal, project_type, timeline, budget } = answers

    // Logic to determine the best solution
    let recommendation: QuizResult = {
      type: 'landing',
      title: 'Landing Page Otimizada',
      description: 'Solução perfeita para começar a vender online rapidamente',
      recommendation: 'Recomendamos uma Landing Page focada em conversão',
      estimatedPrice: 'R$ 800 - 1.500',
      estimatedTime: '7-15 dias',
      features: [
        'Design responsivo e moderno',
        'Otimização para conversão',
        'Integração com WhatsApp',
        'SEO básico incluído',
        '30 dias de suporte',
      ],
    }

    // Adjust based on answers
    if (project_type?.includes('website') || business_type === 'medium') {
      recommendation = {
        type: 'website',
        title: 'Site Profissional Completo',
        description: 'Presença digital completa para sua empresa',
        recommendation: 'Um site institucional é ideal para seu negócio',
        estimatedPrice: 'R$ 2.000 - 4.000',
        estimatedTime: '15-30 dias',
        features: [
          'Até 8 páginas personalizadas',
          'Blog integrado',
          'Painel administrativo',
          'SEO avançado',
          'Chat online',
          '60 dias de suporte',
        ],
      }
    }

    if (project_type?.includes('ai') || main_goal === 'automation') {
      recommendation = {
        type: 'ai',
        title: 'Automação Inteligente com IA',
        description: 'Automatize seu atendimento e vendas 24/7',
        recommendation: 'IA + WhatsApp é perfeito para escalar seu negócio',
        estimatedPrice: 'R$ 3.500 - 5.000',
        estimatedTime: '20-40 dias',
        features: [
          'Chatbot com IA avançada',
          'Atendimento 24/7',
          'Qualificação automática de leads',
          'Integração com CRM',
          'Treinamento da IA incluso',
          '90 dias de ajustes',
        ],
      }
    }

    if (project_type?.includes('app')) {
      recommendation = {
        type: 'app',
        title: 'Aplicativo Mobile Nativo',
        description: 'App profissional para iOS e Android',
        recommendation: 'Um app mobile vai revolucionar seu negócio',
        estimatedPrice: 'R$ 7.000 - 12.000',
        estimatedTime: '45-90 dias',
        features: [
          'App nativo iOS + Android',
          'Design UI/UX profissional',
          'Backend completo',
          'Painel administrativo',
          'Publicação nas lojas',
          '6 meses de manutenção',
        ],
      }
    }

    return recommendation
  }

  const handleAnswer = (questionId: string, value: any) => {
    const question = questions[currentStep]

    if (question.type === 'multiple') {
      const currentValues = answers[questionId] || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value)
        : [...currentValues, value]
      setAnswers({ ...answers, [questionId]: newValues })
    } else {
      setAnswers({ ...answers, [questionId]: value })
    }

    // Auto advance for single choice questions
    if (question.type === 'single') {
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(currentStep + 1)
        } else {
          // Calculate and show result
          const finalResult = calculateResult()
          setResult(finalResult)
        }
      }, 300)
    }
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const finalResult = calculateResult()
      setResult(finalResult)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track conversion
    trackEvent({
      action: 'quiz_completed',
      category: 'Conversion',
      label: result?.type,
      value: email,
    })

    // Save lead
    const quizLeads = JSON.parse(localStorage.getItem('quizLeads') || '[]')
    quizLeads.push({
      email,
      answers,
      result: result?.type,
      timestamp: Date.now(),
    })
    localStorage.setItem('quizLeads', JSON.stringify(quizLeads))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to WhatsApp with personalized message
    const message = `Olá! Fiz o quiz e recebi a recomendação: ${result?.title}. Gostaria de um orçamento personalizado.`
    const whatsappUrl = `https://wa.me/5575999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    setIsSubmitting(false)
    setIsOpen(false)
  }

  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-[180px] z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl sm:right-6 sm:bottom-32 sm:px-4 sm:py-3"
      >
        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-sm font-semibold sm:text-base">
          Quiz: Descubra sua solução ideal
        </span>
      </motion.button>

      {/* Quiz Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
            />

            {/* Quiz Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 z-[10000] w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 transform"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
                {/* Progress Bar */}
                {!result && (
                  <div className="h-2 bg-gray-200 dark:bg-gray-800">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}

                <div className="p-8">
                  {!result ? (
                    /* Questions */
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-8 text-center">
                          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                            {questions[currentStep].question}
                          </h2>
                          {questions[currentStep].subtitle && (
                            <p className="text-gray-600 dark:text-gray-400">
                              {questions[currentStep].subtitle}
                            </p>
                          )}
                        </div>

                        <div className="mb-8 grid gap-3 sm:grid-cols-2">
                          {questions[currentStep].answers.map((answer) => {
                            const Icon = answer.icon
                            const isSelected =
                              questions[currentStep].type === 'multiple'
                                ? answers[questions[currentStep].id]?.includes(
                                    answer.value,
                                  )
                                : answers[questions[currentStep].id] ===
                                  answer.value

                            return (
                              <motion.button
                                key={answer.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                  handleAnswer(
                                    questions[currentStep].id,
                                    answer.value,
                                  )
                                }
                                className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                                  isSelected
                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                                    : 'border-gray-200 hover:border-purple-300 dark:border-gray-700'
                                }`}
                              >
                                {Icon && (
                                  <Icon
                                    className={`h-6 w-6 ${
                                      isSelected
                                        ? 'text-purple-600'
                                        : 'text-gray-400'
                                    }`}
                                  />
                                )}
                                <span
                                  className={`font-medium ${
                                    isSelected
                                      ? 'text-purple-900 dark:text-purple-300'
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {answer.text}
                                </span>
                                {isSelected && (
                                  <CheckCircle className="ml-auto h-5 w-5 text-purple-600" />
                                )}
                              </motion.button>
                            )
                          })}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between">
                          <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-all hover:bg-gray-100 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-800"
                          >
                            <ChevronLeft className="h-5 w-5" />
                            Voltar
                          </button>

                          {questions[currentStep].type === 'multiple' && (
                            <button
                              onClick={handleNext}
                              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-white transition-all hover:shadow-lg"
                            >
                              {currentStep === questions.length - 1
                                ? 'Ver Resultado'
                                : 'Próxima'}
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    /* Result */
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="mb-6 text-center">
                        <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-green-100 to-emerald-100 p-3 dark:from-green-900/30 dark:to-emerald-900/30">
                          <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                          {result.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {result.description}
                        </p>
                      </div>

                      <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4 dark:from-purple-900/20 dark:to-pink-900/20">
                        <p className="mb-3 font-semibold text-gray-900 dark:text-white">
                          💡 {result.recommendation}
                        </p>
                        <div className="mb-3 flex gap-4 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            💰 Investimento:{' '}
                            <strong>{result.estimatedPrice}</strong>
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            ⏱️ Prazo: <strong>{result.estimatedTime}</strong>
                          </span>
                        </div>
                        <div className="space-y-1">
                          {result.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lead Capture */}
                      <form onSubmit={handleSubmitLead} className="space-y-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Receba o orçamento detalhado por e-mail
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                        >
                          {isSubmitting
                            ? 'Enviando...'
                            : 'Receber Orçamento no WhatsApp'}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default InteractiveQuiz
