import React, { useState, useEffect } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'

const ScrollToTopBtn: React.FC = () => {
  const { t } = useTranslation('common')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar botão apenas quando rolar mais que 300px
      const shouldBeVisible = window.scrollY > 300
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed right-5 bottom-45 z-50 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-3 text-white shadow-lg hover:shadow-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:outline-none md:p-4 dark:hover:shadow-blue-700/20 dark:focus:ring-blue-400"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          title={t('aria.scrollToTop')}
          aria-label={t('aria.scrollToTop')}
        >
          <FaChevronUp className="h-5 w-5 md:h-6 md:w-6" />

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
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopBtn
