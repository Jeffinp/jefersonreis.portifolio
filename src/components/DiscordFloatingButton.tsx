import React from 'react'
import { motion } from 'framer-motion'
import { FaDiscord } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'

interface DiscordFloatingButtonProps {
  username?: string
}

const DiscordFloatingButton: React.FC<DiscordFloatingButtonProps> = ({
  username = '563186981962776577',
}) => {
  const { t } = useTranslation('common')
  const handleDiscordClick = () => {
    const discordUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE?.includes(
      'discord.gg',
    )
      ? process.env.NEXT_PUBLIC_DISCORD_INVITE
      : `https://discordapp.com/users/${username}`
    window.open(discordUrl, '_blank')
  }

  return (
    <motion.button
      onClick={handleDiscordClick}
      className="fixed right-5 bottom-8 z-50 rounded-full bg-indigo-500 p-3 text-white shadow-lg hover:bg-indigo-600 hover:shadow-indigo-500/20 focus:ring-2 focus:ring-indigo-500 focus:outline-none md:p-4 dark:hover:shadow-indigo-700/20 dark:focus:ring-indigo-400"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'backOut' }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
      }}
      whileTap={{ scale: 0.95 }}
      title={t('aria.discord')}
      aria-label={t('aria.discord')}
    >
      <FaDiscord className="h-5 w-5 md:h-6 md:w-6" />

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

export default DiscordFloatingButton
