import React from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string
  message?: string
}

const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
    /[^0-9]/g,
    '',
  ) || '5571992594317',
  message = 'Olá, vim pelo seu portfólio! Gostaria de saber mais sobre seus serviços. 📞⚡',
}) => {
  const { t } = useTranslation('common')
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed right-5 bottom-25 z-50 rounded-full bg-green-500 p-3 text-white shadow-lg hover:bg-green-600 hover:shadow-green-500/20 focus:ring-2 focus:ring-green-500 focus:outline-none md:p-4 dark:hover:shadow-green-700/20 dark:focus:ring-green-400"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'backOut' }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.4)',
      }}
      whileTap={{ scale: 0.95 }}
      title={t('aria.whatsapp')}
      aria-label={t('aria.whatsapp')}
      style={{ position: 'fixed' }}
    >
      <FaWhatsapp className="h-5 w-5 md:h-6 md:w-6" />

      {/* Efeito de onda circular ao clicar */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{
          scale: 2,
          opacity: [0, 0.5, 0],
          transition: { duration: 0.5 },
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      />
    </motion.button>
  )
}

export default WhatsAppFloatingButton
