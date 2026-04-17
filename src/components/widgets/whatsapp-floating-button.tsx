'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { trackWhatsAppClick } from '@/lib/utils/tracking'
import { siteConfig, siteHelpers } from '@/lib/config/site'

interface WhatsAppFloatingButtonProps {
  phone?: string
  message?: string
  source?: string
}

export function WhatsAppFloatingButton({
  phone,
  message = 'Olá! Vim pelo seu portfólio e gostaria de saber mais sobre seus serviços. 📞⚡',
  source = 'floating_button',
}: WhatsAppFloatingButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [ripple, setRipple] = useState(false)

  const whatsappNumber =
    siteHelpers.sanitizePhoneNumber(phone) || siteConfig.whatsapp.dial

  useEffect(() => {
    // Delay para aparecer suavemente
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    setRipple(true)
    setTimeout(() => setRipple(false), 600)

    // Track no analytics
    trackWhatsAppClick(source)

    // Abre WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          className="fixed right-5 bottom-28 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-700 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:scale-100 sm:bottom-32 sm:h-16 sm:w-16"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Enviar mensagem no WhatsApp"
        >
          <FaWhatsapp className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />

          {/* Pulse — limitado a 3 ciclos (WCAG 2.2.2) */}
          <span
            aria-hidden="true"
            className="pulse-finite absolute inset-0 -z-10 rounded-full bg-green-500 opacity-75"
          />

          {/* Ripple effect */}
          {ripple && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-white"
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
