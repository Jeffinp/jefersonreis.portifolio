import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart3,
  PiggyBank,
  Target,
  Zap,
  ArrowUp,
  Info,
} from 'lucide-react'
import { trackEvent } from '@/utils/tracking'

interface CalculatorInputs {
  monthlyVisitors: number
  conversionRate: number
  averageTicket: number
  currentConversion: number
}

interface ROIResults {
  currentRevenue: number
  projectedRevenue: number
  revenueIncrease: number
  percentageIncrease: number
  monthlyProfit: number
  yearlyProfit: number
  paybackTime: number
  roi: number
}

export const ROICalculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyVisitors: 1000,
    conversionRate: 3,
    averageTicket: 100,
    currentConversion: 1,
  })
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const siteInvestment = 2000 // Average investment for a professional site

  // Calculate ROI
  const results: ROIResults = useMemo(() => {
    const currentSales =
      (inputs.monthlyVisitors * inputs.currentConversion) / 100
    const projectedSales =
      (inputs.monthlyVisitors * inputs.conversionRate) / 100

    const currentRevenue = currentSales * inputs.averageTicket
    const projectedRevenue = projectedSales * inputs.averageTicket
    const revenueIncrease = projectedRevenue - currentRevenue
    const percentageIncrease =
      currentRevenue > 0 ? (revenueIncrease / currentRevenue) * 100 : 100

    const monthlyProfit = revenueIncrease
    const yearlyProfit = monthlyProfit * 12
    const paybackTime = monthlyProfit > 0 ? siteInvestment / monthlyProfit : 0
    const roi = (yearlyProfit / siteInvestment) * 100

    return {
      currentRevenue,
      projectedRevenue,
      revenueIncrease,
      percentageIncrease,
      monthlyProfit,
      yearlyProfit,
      paybackTime,
      roi,
    }
  }, [inputs])

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs({ ...inputs, [field]: value })
  }

  const handleCalculate = () => {
    setShowResults(true)
    trackEvent({
      action: 'roi_calculated',
      category: 'Conversion',
      label: 'ROI Calculator',
      value: results.yearlyProfit,
    })
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track conversion
    trackEvent({
      action: 'roi_calculator_lead',
      category: 'Conversion',
      label: email,
      value: results.yearlyProfit,
    })

    // Save lead with calculation
    const roiLeads = JSON.parse(localStorage.getItem('roiLeads') || '[]')
    roiLeads.push({
      email,
      inputs,
      results,
      timestamp: Date.now(),
    })
    localStorage.setItem('roiLeads', JSON.stringify(roiLeads))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create personalized WhatsApp message
    const message = `Olá! Calculei meu ROI e vi que posso ter ${results.roi.toFixed(0)}% de retorno anual. Quero saber mais!`
    const whatsappUrl = `https://wa.me/5575999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    setIsSubmitting(false)
    setIsOpen(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <>
      {/* Trigger Button - Floating Calculator */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-[230px] z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl sm:right-6 sm:bottom-48 sm:px-4 sm:py-3"
      >
        <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-sm font-semibold sm:text-base">
          Calcule seu ROI
        </span>
      </motion.button>

      {/* Calculator Modal */}
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

            {/* Calculator Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 z-[10000] max-h-[90vh] w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 transform overflow-auto"
            >
              <div className="rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white/20 p-3 backdrop-blur">
                        <Calculator className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">
                          Calculadora de ROI
                        </h2>
                        <p className="text-green-100">
                          Descubra quanto você pode faturar com um site
                          profissional
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-full bg-white/20 p-2 backdrop-blur hover:bg-white/30"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {!showResults ? (
                    /* Input Form */
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          Preencha os dados do seu negócio
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Vamos calcular o potencial de crescimento
                        </p>
                      </div>

                      {/* Monthly Visitors */}
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Users className="h-4 w-4" />
                          Visitantes mensais no seu site/página
                          <div className="group relative">
                            <Info className="h-3 w-3 text-gray-400" />
                            <div className="invisible absolute top-6 left-0 z-10 w-48 rounded-lg bg-gray-800 p-2 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                              Estimativa de pessoas que visitam seu site por mês
                            </div>
                          </div>
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="100"
                            max="10000"
                            step="100"
                            value={inputs.monthlyVisitors}
                            onChange={(e) =>
                              handleInputChange(
                                'monthlyVisitors',
                                parseInt(e.target.value),
                              )
                            }
                            className="w-full"
                          />
                          <div className="mt-2 flex justify-between text-sm text-gray-600">
                            <span>100</span>
                            <span className="font-bold text-green-600">
                              {inputs.monthlyVisitors.toLocaleString('pt-BR')}{' '}
                              visitantes
                            </span>
                            <span>10.000</span>
                          </div>
                        </div>
                      </div>

                      {/* Current Conversion Rate */}
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Target className="h-4 w-4" />
                          Taxa de conversão atual (%)
                          <div className="group relative">
                            <Info className="h-3 w-3 text-gray-400" />
                            <div className="invisible absolute top-6 left-0 z-10 w-48 rounded-lg bg-gray-800 p-2 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                              Quantos % dos visitantes viram clientes hoje
                            </div>
                          </div>
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="0.1"
                            max="5"
                            step="0.1"
                            value={inputs.currentConversion}
                            onChange={(e) =>
                              handleInputChange(
                                'currentConversion',
                                parseFloat(e.target.value),
                              )
                            }
                            className="w-full"
                          />
                          <div className="mt-2 flex justify-between text-sm text-gray-600">
                            <span>0.1%</span>
                            <span className="font-bold text-orange-600">
                              {inputs.currentConversion.toFixed(1)}% atual
                            </span>
                            <span>5%</span>
                          </div>
                        </div>
                      </div>

                      {/* Projected Conversion Rate */}
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <TrendingUp className="h-4 w-4" />
                          Taxa de conversão com site profissional (%)
                          <div className="group relative">
                            <Info className="h-3 w-3 text-gray-400" />
                            <div className="invisible absolute top-6 left-0 z-10 w-48 rounded-lg bg-gray-800 p-2 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                              Com um site otimizado, a média é 3-5%
                            </div>
                          </div>
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={inputs.conversionRate}
                            onChange={(e) =>
                              handleInputChange(
                                'conversionRate',
                                parseFloat(e.target.value),
                              )
                            }
                            className="w-full"
                          />
                          <div className="mt-2 flex justify-between text-sm text-gray-600">
                            <span>1%</span>
                            <span className="font-bold text-green-600">
                              {inputs.conversionRate.toFixed(1)}% projetado
                            </span>
                            <span>10%</span>
                          </div>
                        </div>
                      </div>

                      {/* Average Ticket */}
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <DollarSign className="h-4 w-4" />
                          Ticket médio (valor por venda)
                          <div className="group relative">
                            <Info className="h-3 w-3 text-gray-400" />
                            <div className="invisible absolute top-6 left-0 z-10 w-48 rounded-lg bg-gray-800 p-2 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                              Valor médio que cada cliente gasta
                            </div>
                          </div>
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="50"
                            max="2000"
                            step="50"
                            value={inputs.averageTicket}
                            onChange={(e) =>
                              handleInputChange(
                                'averageTicket',
                                parseInt(e.target.value),
                              )
                            }
                            className="w-full"
                          />
                          <div className="mt-2 flex justify-between text-sm text-gray-600">
                            <span>R$ 50</span>
                            <span className="font-bold text-blue-600">
                              {formatCurrency(inputs.averageTicket)}
                            </span>
                            <span>R$ 2.000</span>
                          </div>
                        </div>
                      </div>

                      {/* Calculate Button */}
                      <button
                        onClick={handleCalculate}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl"
                      >
                        <BarChart3 className="h-5 w-5" />
                        Calcular Meu ROI
                      </button>
                    </div>
                  ) : (
                    /* Results */
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Main Result */}
                      <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-center dark:from-green-900/20 dark:to-emerald-900/20">
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Aumento de Faturamento Mensal
                          </p>
                          <p className="text-4xl font-bold text-green-600">
                            {formatCurrency(results.monthlyProfit)}
                          </p>
                          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-green-600">
                            <ArrowUp className="h-4 w-4" />
                            <span>
                              +{results.percentageIncrease.toFixed(0)}% de
                              crescimento
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Metrics */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <ShoppingCart className="h-4 w-4" />
                            Faturamento Atual
                          </div>
                          <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                            {formatCurrency(results.currentRevenue)}/mês
                          </p>
                        </div>

                        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <TrendingUp className="h-4 w-4" />
                            Faturamento Projetado
                          </div>
                          <p className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(results.projectedRevenue)}/mês
                          </p>
                        </div>

                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                            <PiggyBank className="h-4 w-4" />
                            Lucro Anual Extra
                          </div>
                          <p className="mt-1 text-xl font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(results.yearlyProfit)}
                          </p>
                        </div>

                        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
                          <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                            <Zap className="h-4 w-4" />
                            Retorno do Investimento
                          </div>
                          <p className="mt-1 text-xl font-bold text-purple-600 dark:text-purple-400">
                            {results.roi.toFixed(0)}% ao ano
                          </p>
                        </div>
                      </div>

                      {/* Payback Time */}
                      <div className="rounded-lg bg-yellow-50 p-4 text-center dark:bg-yellow-900/20">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          💰 Seu investimento se paga em apenas
                        </p>
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {results.paybackTime.toFixed(1)} meses
                        </p>
                      </div>

                      {/* CTA */}
                      <form onSubmit={handleSubmitLead} className="space-y-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Receba análise detalhada por e-mail
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            'Enviando...'
                          ) : (
                            <>
                              <ShoppingCart className="h-5 w-5" />
                              Quero Aumentar Meu Faturamento
                            </>
                          )}
                        </button>
                      </form>

                      <button
                        onClick={() => setShowResults(false)}
                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        ← Recalcular
                      </button>
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

export default ROICalculator
