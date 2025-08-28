import { useState, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import { useAnalytics } from './useAnalytics'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactFormState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage: string
}

interface UseContactFormReturn {
  formData: ContactFormData
  formState: ContactFormState
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  resetForm: () => void
  resetState: () => void
}

export const useContactForm = (): UseContactFormReturn => {
  const { trackContactFormSubmit } = useAnalytics()

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [formState, setFormState] = useState<ContactFormState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  })

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      // Limpar estados de erro quando o usuário começar a digitar
      if (formState.isError) {
        setFormState((prev) => ({
          ...prev,
          isError: false,
          errorMessage: '',
        }))
      }
    },
    [formState.isError],
  )

  const validateForm = useCallback((data: ContactFormData): string | null => {
    if (!data.name.trim()) {
      return 'Nome é obrigatório'
    }
    if (!data.email.trim()) {
      return 'E-mail é obrigatório'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return 'E-mail inválido'
    }
    if (!data.subject.trim()) {
      return 'Assunto é obrigatório'
    }
    if (!data.message.trim()) {
      return 'Mensagem é obrigatória'
    }
    if (data.message.trim().length < 10) {
      return 'Mensagem deve ter pelo menos 10 caracteres'
    }
    return null
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Validar formulário
      const validationError = validateForm(formData)
      if (validationError) {
        setFormState({
          isLoading: false,
          isSuccess: false,
          isError: true,
          errorMessage: validationError,
        })
        return
      }

      setFormState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMessage: '',
      })

      try {
        // Configurações do EmailJS (usar variáveis de ambiente)
        const serviceId =
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_default'
        const templateId =
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_default'
        const publicKey =
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_default'

        // Preparar dados para o template
        const now = new Date()
        const formattedTime = now.toLocaleString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Sao_Paulo',
        })

        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
          to_name: 'Jeferson Reis',
          time: formattedTime,
        }

        // Enviar e-mail
        const response = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          publicKey,
        )

        if (response.status === 200) {
          setFormState({
            isLoading: false,
            isSuccess: true,
            isError: false,
            errorMessage: '',
          })

          // Track successful form submission
          trackContactFormSubmit('contact')

          // Resetar formulário após sucesso
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          })
        } else {
          throw new Error('Falha no envio do e-mail')
        }
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error)
        setFormState({
          isLoading: false,
          isSuccess: false,
          isError: true,
          errorMessage:
            'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.',
        })
      }
    },
    [formData, validateForm, trackContactFormSubmit],
  )

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }, [])

  const resetState = useCallback(() => {
    setFormState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    })
  }, [])

  return {
    formData,
    formState,
    handleInputChange,
    handleSubmit,
    resetForm,
    resetState,
  }
}
