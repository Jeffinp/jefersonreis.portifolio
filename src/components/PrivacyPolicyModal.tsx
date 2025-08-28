import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'next-i18next'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('main')

  // Fechar o modal com a tecla ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
      // Prevenir o scroll quando o modal estiver aberto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  // Impedir a propagação de cliques dentro do modal
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative mx-4 max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-gray-200 bg-white p-6 shadow-2xl md:p-8 dark:border-gray-700 dark:bg-gray-800"
            onClick={handleContentClick}
          >
            {/* Botão de fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              aria-label={t('privacy.closeModal')}
            >
              <X size={20} />
            </button>

            {/* Cabeçalho */}
            <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('privacy.title')}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {t('privacy.lastUpdated')}
              </p>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <section>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t('privacy.sections.introduction.title')}
                </h3>
                <p>{t('privacy.sections.introduction.content')}</p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t('privacy.sections.informationCollection.title')}
                </h3>
                <p>{t('privacy.sections.informationCollection.content')}</p>
                <ul className="mt-2 ml-6 list-disc space-y-1">
                  <li>
                    {t('privacy.sections.informationCollection.items.contact')}
                  </li>
                  <li>
                    {t('privacy.sections.informationCollection.items.usage')}
                  </li>
                  <li>
                    {t('privacy.sections.informationCollection.items.cookies')}
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t('privacy.sections.dataUsage.title')}
                </h3>
                <p>{t('privacy.sections.dataUsage.content')}</p>
                <ul className="mt-2 ml-6 list-disc space-y-1">
                  <li>{t('privacy.sections.dataUsage.items.communication')}</li>
                  <li>{t('privacy.sections.dataUsage.items.improvement')}</li>
                  <li>{t('privacy.sections.dataUsage.items.analytics')}</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t('privacy.sections.dataSharing.title')}
                </h3>
                <p>{t('privacy.sections.dataSharing.content')}</p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t('privacy.sections.dataSecurity.title')}
                </h3>
                <p>{t('privacy.sections.dataSecurity.content')}</p>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t('privacy.sections.userRights.title')}
                </h3>
                <p>{t('privacy.sections.userRights.content')}</p>
                <ul className="mt-2 ml-6 list-disc space-y-1">
                  <li>{t('privacy.sections.userRights.items.access')}</li>
                  <li>
                    {t('privacy.sections.userRights.items.rectification')}
                  </li>
                  <li>{t('privacy.sections.userRights.items.deletion')}</li>
                  <li>{t('privacy.sections.userRights.items.objection')}</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t('privacy.sections.contact.title')}
                </h3>
                <p>{t('privacy.sections.contact.content')}</p>
              </section>
            </div>

            {/* Rodapé */}
            <div className="mt-8 border-t border-gray-200 pt-4 text-center dark:border-gray-700">
              <button
                onClick={onClose}
                className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {t('privacy.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PrivacyPolicyModal
