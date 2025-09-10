import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Send,
  Clock,
  Zap,
  HelpCircle,
  DollarSign,
} from 'lucide-react'

interface Message {
  id: string
  text: string
  action?: () => void
  icon?: React.ElementType
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55 75 99999-9999'

  useEffect(() => {
    // Mostrar notificação após 10 segundos
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true)
        // Esconder notificação após 5 segundos
        setTimeout(() => setShowNotification(false), 5000)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [isOpen])

  const quickMessages: Message[] = [
    {
      id: '1',
      text: 'Quero um orçamento',
      icon: DollarSign,
      action: () =>
        sendToWhatsApp(
          'Olá! Gostaria de solicitar um orçamento para um projeto.',
        ),
    },
    {
      id: '2',
      text: 'Quanto custa um site?',
      icon: HelpCircle,
      action: () =>
        sendToWhatsApp(
          'Olá! Gostaria de saber quanto custa para fazer um site profissional.',
        ),
    },
    {
      id: '3',
      text: 'Prazo para landing page?',
      icon: Clock,
      action: () =>
        sendToWhatsApp('Olá! Qual o prazo de entrega para uma landing page?'),
    },
    {
      id: '4',
      text: 'Como funciona a IA?',
      icon: Zap,
      action: () =>
        sendToWhatsApp(
          'Olá! Gostaria de entender como funciona a automação com IA para WhatsApp.',
        ),
    },
  ]

  const sendToWhatsApp = (msg: string) => {
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)

    // Track evento (será implementado depois)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'chat_widget',
      })
    }
  }

  const handleCustomMessage = () => {
    if (message.trim()) {
      sendToWhatsApp(message)
      setMessage('')
    }
  }

  return (
    <>
      {/* Notificação */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-6 bottom-24 z-[9999] max-w-xs rounded-lg bg-white p-4 shadow-xl dark:bg-gray-800"
          >
            <button
              onClick={() => setShowNotification(false)}
              className="absolute -top-2 -right-2 rounded-full bg-gray-100 p-1 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="mb-2 font-semibold text-gray-900 dark:text-white">
              👋 Olá! Precisa de ajuda?
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Estou online agora e posso responder suas dúvidas!
            </p>
            <button
              onClick={() => {
                setShowNotification(false)
                setIsOpen(true)
              }}
              className="mt-3 w-full rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
            >
              Iniciar conversa
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão do Chat */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-[10000] rounded-full bg-gradient-to-r from-green-500 to-green-600 p-4 text-white shadow-lg hover:from-green-600 hover:to-green-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de online */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </span>
      </motion.button>

      {/* Popup do Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-6 bottom-24 z-[9999] w-[350px] overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-white/20 p-2">
                      <MessageCircle className="h-full w-full" />
                    </div>
                    <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-green-500 bg-green-400"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Jeferson Reis</h3>
                    <p className="text-xs opacity-90">Online agora</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="mb-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  👋 Oi! Sou o Jeferson, desenvolvedor full-stack especialista
                  em IA. Como posso ajudar você hoje?
                </p>
              </div>

              <p className="mb-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                PERGUNTAS RÁPIDAS:
              </p>

              {/* Quick Messages */}
              <div className="mb-4 space-y-2">
                {quickMessages.map((msg) => {
                  const Icon = msg.icon
                  return (
                    <button
                      key={msg.id}
                      onClick={msg.action}
                      className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-left text-sm transition-all hover:bg-gray-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      {Icon && <Icon className="h-4 w-4 text-green-500" />}
                      <span className="flex-1 text-gray-700 dark:text-gray-300">
                        {msg.text}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Custom Message Input */}
              <div className="border-t border-gray-200 pt-4 dark:border-gray-600">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleCustomMessage()
                    }
                    placeholder="Digite sua mensagem..."
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleCustomMessage}
                    className="rounded-lg bg-green-500 p-2 text-white transition-colors hover:bg-green-600"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Resposta em até 2 horas • WhatsApp direto
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 dark:bg-gray-900">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Disponível agora
                </span>
                <span>•</span>
                <span>Resposta rápida garantida</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget
