import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  DollarSign,
  Calendar,
  Globe,
  Target,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2
} from 'lucide-react'

interface FormData {
  // Dados básicos
  nome: string
  whatsapp: string
  email: string
  empresa: string
  
  // Qualificação
  tipoServico: string
  descricaoProjeto: string
  orcamento: string
  prazo: string
  
  // Informações adicionais
  temSite: string
  temLogo: string
  objetivoPrincipal: string
  comoConheceu: string
  
  // Extras
  urgencia: string
  decisor: string
  concorrentes: string
}

interface StepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack?: () => void
}

const Step1: React.FC<StepProps> = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório'
    if (!formData.whatsapp) newErrors.whatsapp = 'WhatsApp é obrigatório'
    if (!formData.email) newErrors.email = 'Email é obrigatório'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Vamos começar! 👋
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Primeiro, me conte um pouco sobre você
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <User className="h-4 w-4" />
            Nome completo *
          </label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => updateFormData({ nome: e.target.value })}
            className={`w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none dark:bg-gray-700 ${
              errors.nome ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="João Silva"
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
          )}
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Phone className="h-4 w-4" />
            WhatsApp *
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => updateFormData({ whatsapp: e.target.value })}
            className={`w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none dark:bg-gray-700 ${
              errors.whatsapp ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="(75) 99999-9999"
          />
          {errors.whatsapp && (
            <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>
          )}
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Mail className="h-4 w-4" />
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={`w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none dark:bg-gray-700 ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="joao@empresa.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Building className="h-4 w-4" />
            Empresa/Negócio
          </label>
          <input
            type="text"
            value={formData.empresa}
            onChange={(e) => updateFormData({ empresa: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            placeholder="Nome da sua empresa (opcional)"
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Próximo
        <ArrowRight className="h-5 w-5" />
      </button>
    </motion.div>
  )
}

const Step2: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack }) => {
  const services = [
    { value: 'landing', label: 'Landing Page (R$ 800-1.500)', icon: '🚀' },
    { value: 'site', label: 'Site Profissional (R$ 2.000-2.500)', icon: '🌐' },
    { value: 'ia', label: 'IA + WhatsApp (R$ 3.500-4.000)', icon: '🤖' },
    { value: 'app', label: 'App Mobile (R$ 7.000-8.000)', icon: '📱' },
    { value: 'saas', label: 'Sistema SaaS (R$ 6.000+)', icon: '💻' },
    { value: 'outro', label: 'Outro projeto', icon: '✨' },
  ]

  const budgets = [
    { value: 'ate-1500', label: 'Até R$ 1.500' },
    { value: '1500-3000', label: 'R$ 1.500 - R$ 3.000' },
    { value: '3000-5000', label: 'R$ 3.000 - R$ 5.000' },
    { value: '5000-8000', label: 'R$ 5.000 - R$ 8.000' },
    { value: '8000+', label: 'Acima de R$ 8.000' },
    { value: 'indefinido', label: 'Ainda não defini' },
  ]

  const deadlines = [
    { value: 'urgente', label: 'Urgente (até 7 dias)' },
    { value: 'rapido', label: 'Rápido (15 dias)' },
    { value: 'normal', label: 'Normal (30 dias)' },
    { value: 'flexivel', label: 'Flexível' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sobre seu projeto 📋
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Me conte mais detalhes para um orçamento preciso
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Briefcase className="h-4 w-4" />
            Tipo de projeto *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {services.map((service) => (
              <button
                key={service.value}
                onClick={() => updateFormData({ tipoServico: service.value })}
                className={`rounded-lg border-2 p-3 text-left transition-all ${
                  formData.tipoServico === service.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{service.icon}</span>
                  <span className="text-sm font-medium">{service.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <DollarSign className="h-4 w-4" />
            Orçamento disponível
          </label>
          <select
            value={formData.orcamento}
            onChange={(e) => updateFormData({ orcamento: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="">Selecione...</option>
            {budgets.map((budget) => (
              <option key={budget.value} value={budget.value}>
                {budget.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Calendar className="h-4 w-4" />
            Prazo desejado
          </label>
          <select
            value={formData.prazo}
            onChange={(e) => updateFormData({ prazo: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="">Selecione...</option>
            {deadlines.map((deadline) => (
              <option key={deadline.value} value={deadline.value}>
                {deadline.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <MessageSquare className="h-4 w-4" />
            Descreva seu projeto
          </label>
          <textarea
            value={formData.descricaoProjeto}
            onChange={(e) => updateFormData({ descricaoProjeto: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            rows={4}
            placeholder="Conte-me sobre suas necessidades, objetivos e expectativas..."
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar
        </button>
        <button
          onClick={onNext}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Próximo
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  )
}

const Step3: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack }) => {
  const objectives = [
    { value: 'vendas', label: 'Aumentar vendas online', icon: '💰' },
    { value: 'leads', label: 'Capturar mais leads', icon: '🎯' },
    { value: 'credibilidade', label: 'Melhorar credibilidade', icon: '⭐' },
    { value: 'automatizar', label: 'Automatizar processos', icon: '🤖' },
    { value: 'expandir', label: 'Expandir o negócio', icon: '🚀' },
    { value: 'outro', label: 'Outro objetivo', icon: '✨' },
  ]

  const sources = [
    { value: 'google', label: 'Google' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'indicacao', label: 'Indicação' },
    { value: 'outro', label: 'Outro' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Últimas informações 🎯
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Isso me ajudará a criar a melhor proposta
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Target className="h-4 w-4" />
            Objetivo principal
          </label>
          <div className="grid grid-cols-2 gap-2">
            {objectives.map((objective) => (
              <button
                key={objective.value}
                onClick={() => updateFormData({ objetivoPrincipal: objective.value })}
                className={`rounded-lg border-2 p-3 text-left transition-all ${
                  formData.objetivoPrincipal === objective.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{objective.icon}</span>
                  <span className="text-sm font-medium">{objective.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Globe className="h-4 w-4" />
              Já tem site?
            </label>
            <select
              value={formData.temSite}
              onChange={(e) => updateFormData({ temSite: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="">Selecione...</option>
              <option value="sim">Sim, quero melhorar</option>
              <option value="nao">Não, primeiro site</option>
              <option value="basico">Sim, mas é básico</option>
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Building className="h-4 w-4" />
              Tem logo/materiais?
            </label>
            <select
              value={formData.temLogo}
              onChange={(e) => updateFormData({ temLogo: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="">Selecione...</option>
              <option value="completo">Tenho tudo</option>
              <option value="basico">Tenho logo apenas</option>
              <option value="nada">Não tenho nada</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Como urgente é?
            </label>
            <select
              value={formData.urgencia}
              onChange={(e) => updateFormData({ urgencia: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="">Selecione...</option>
              <option value="muito">Muito urgente</option>
              <option value="medio">Prazo normal</option>
              <option value="flexivel">Sem pressa</option>
            </select>
          </div>

          <div>
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Você decide sozinho?
            </label>
            <select
              value={formData.decisor}
              onChange={(e) => updateFormData({ decisor: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="">Selecione...</option>
              <option value="sim">Sim, decido sozinho</option>
              <option value="parcial">Decido com sócios</option>
              <option value="nao">Preciso de aprovação</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Como me encontrou?
          </label>
          <select
            value={formData.comoConheceu}
            onChange={(e) => updateFormData({ comoConheceu: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="">Selecione...</option>
            {sources.map((source) => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar
        </button>
        <button
          onClick={onNext}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors hover:bg-green-700"
        >
          Enviar Solicitação
          <CheckCircle className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  )
}

export const LeadQualifierForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    whatsapp: '',
    email: '',
    empresa: '',
    tipoServico: '',
    descricaoProjeto: '',
    orcamento: '',
    prazo: '',
    temSite: '',
    temLogo: '',
    objetivoPrincipal: '',
    comoConheceu: '',
    urgencia: '',
    decisor: '',
    concorrentes: ''
  })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55 75 99999-9999'

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Enviar para API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'website_form',
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) throw new Error('Failed to submit')

      // Criar mensagem para WhatsApp
      const message = `🚀 *Nova Solicitação de Orçamento*

📋 *Dados do Cliente:*
Nome: ${formData.nome}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Empresa: ${formData.empresa || 'Não informado'}

💼 *Projeto:*
Tipo: ${formData.tipoServico}
Orçamento: ${formData.orcamento}
Prazo: ${formData.prazo}
Objetivo: ${formData.objetivoPrincipal}

📝 *Descrição:*
${formData.descricaoProjeto}

🎯 *Qualificação:*
Tem site: ${formData.temSite}
Tem materiais: ${formData.temLogo}
Urgência: ${formData.urgencia}
Decisor: ${formData.decisor}
Como conheceu: ${formData.comoConheceu}

Podemos conversar sobre o projeto?`

      // Abrir WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')

      setIsSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Mesmo com erro, abrir WhatsApp
      const fallbackMessage = `Olá! Acabei de preencher o formulário no site mas houve um erro. Meu nome é ${formData.nome} e preciso de ${formData.tipoServico}. Podemos conversar?`
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(fallbackMessage)}`
      window.open(whatsappUrl, '_blank')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-green-50 p-8 text-center dark:bg-green-900/20"
      >
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
        <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Solicitação Enviada! 🎉
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Recebi suas informações e já estou preparando uma proposta personalizada.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Você será redirecionado para o WhatsApp. Se não abrir automaticamente,{' '}
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            clique aqui
          </a>
        </p>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                step <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
              }`}
            >
              {step < currentStep ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                step
              )}
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute h-1 w-full bg-gray-200 dark:bg-gray-700" />
          <div
            className="absolute h-1 bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-64 items-center justify-center"
          >
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-lg text-gray-600">Enviando...</span>
          </motion.div>
        ) : (
          <>
            {currentStep === 1 && (
              <Step1
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
              />
            )}
            {currentStep === 2 && (
              <Step2
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <Step3
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LeadQualifierForm