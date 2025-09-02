import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Navigation2,
  Volume2,
  VolumeX,
  Sparkles,
  SparklesIcon,
  Globe,
  Menu,
  X,
  Command,
  Settings,
  Zap,
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui'

interface QuantumHeaderProps {
  onNavigationOpen: () => void
  quantumMode: boolean
  onQuantumModeToggle: () => void
  soundEnabled: boolean
  onSoundToggle: () => void
}

const QuantumHeader: React.FC<QuantumHeaderProps> = ({
  onNavigationOpen,
  quantumMode,
  onQuantumModeToggle,
  soundEnabled,
  onSoundToggle,
}) => {
  const { t, i18n } = useTranslation('sections/header')
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Language toggle
  const toggleLanguage = () => {
    const newLocale = i18n.language === 'pt' ? 'en' : 'pt'
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-30 transition-all duration-300 ${
          isScrolled
            ? quantumMode
              ? 'bg-cosmic-black/80 border-stellar-blue/20 border-b backdrop-blur-xl'
              : 'border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/80'
            : ''
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Brand */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: quantumMode ? 360 : 0 }}
                transition={{
                  duration: 20,
                  repeat: quantumMode ? Infinity : 0,
                  ease: 'linear',
                }}
                className="relative h-10 w-10"
              >
                {/* Quantum Logo */}
                <div
                  className={`absolute inset-0 rounded-lg ${
                    quantumMode
                      ? 'from-stellar-blue via-nebula-purple to-nova-pink bg-gradient-to-br'
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center font-black text-white">
                    JR
                  </div>
                </div>
                {quantumMode && (
                  <div className="from-stellar-blue via-nebula-purple to-nova-pink absolute -inset-1 rounded-lg bg-gradient-to-br opacity-50 blur-md" />
                )}
              </motion.div>

              <div>
                <h1
                  className={`text-lg font-bold ${
                    quantumMode ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  Jeferson Reis
                </h1>
                <p
                  className={`text-xs ${
                    quantumMode
                      ? 'text-stellar-blue'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Full-Stack Developer
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 md:flex">
              {/* Quick Links */}
              <div className="flex items-center gap-4">
                <a
                  href="#about"
                  className={`hover:text-stellar-blue text-sm font-medium transition-colors ${
                    quantumMode
                      ? 'text-gray-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {t('nav.about')}
                </a>
                <a
                  href="#projects"
                  className={`hover:text-stellar-blue text-sm font-medium transition-colors ${
                    quantumMode
                      ? 'text-gray-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {t('nav.projects')}
                </a>
                <a
                  href="#contact"
                  className={`hover:text-stellar-blue text-sm font-medium transition-colors ${
                    quantumMode
                      ? 'text-gray-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {t('nav.contact')}
                </a>
              </div>

              {/* Separator */}
              <div
                className={`h-6 w-px ${
                  quantumMode
                    ? 'bg-stellar-blue/30'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* Navigation Button */}
                <motion.button
                  onClick={onNavigationOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative rounded-lg px-3 py-2 font-medium transition-all ${
                    quantumMode
                      ? 'bg-stellar-blue/10 text-stellar-blue hover:bg-stellar-blue/20'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Navigation2 className="h-4 w-4" />
                    <span className="text-sm">Navigate</span>
                    <kbd
                      className={`ml-1 rounded px-1.5 py-0.5 text-xs ${
                        quantumMode
                          ? 'bg-stellar-blue/20 text-stellar-blue'
                          : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      ⌘K
                    </kbd>
                  </div>
                  {quantumMode && (
                    <div className="bg-stellar-blue/20 absolute -inset-1 rounded-lg opacity-0 blur-md transition-opacity group-hover:opacity-100" />
                  )}
                </motion.button>

                {/* Quantum Mode Toggle */}
                <motion.button
                  onClick={onQuantumModeToggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-lg p-2 transition-colors ${
                    quantumMode
                      ? 'bg-nebula-purple/20 text-nebula-purple hover:bg-nebula-purple/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                  title={
                    quantumMode ? 'Disable Quantum Mode' : 'Enable Quantum Mode'
                  }
                >
                  {quantumMode ? (
                    <Sparkles className="h-4 w-4" />
                  ) : (
                    <SparklesIcon className="h-4 w-4" />
                  )}
                </motion.button>

                {/* Sound Toggle */}
                <motion.button
                  onClick={onSoundToggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-lg p-2 transition-colors ${
                    quantumMode
                      ? 'bg-stellar-blue/10 text-stellar-blue hover:bg-stellar-blue/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                  title={soundEnabled ? 'Mute' : 'Unmute'}
                >
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                </motion.button>

                {/* Language Toggle */}
                <motion.button
                  onClick={toggleLanguage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-lg p-2 transition-colors ${
                    quantumMode
                      ? 'bg-stellar-blue/10 text-stellar-blue hover:bg-stellar-blue/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                  title={t('aria.toggleLanguage')}
                >
                  <Globe className="h-4 w-4" />
                </motion.button>

                {/* Theme Toggle */}
                {!quantumMode && <ThemeToggle />}

                {/* Settings */}
                <motion.button
                  onClick={() => setShowSettings((prev) => !prev)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-lg p-2 transition-colors ${
                    quantumMode
                      ? 'bg-stellar-blue/10 text-stellar-blue hover:bg-stellar-blue/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                  title="Settings"
                >
                  <Settings className="h-4 w-4" />
                </motion.button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 right-0 left-0 z-20 border-b p-4 md:hidden ${
              quantumMode
                ? 'bg-cosmic-black/95 border-stellar-blue/20 backdrop-blur-xl'
                : 'border-gray-200 bg-white/95 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/95'
            }`}
          >
            <nav className="space-y-4">
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-sm font-medium ${
                  quantumMode
                    ? 'text-gray-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {t('nav.about')}
              </a>
              <a
                href="#projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-sm font-medium ${
                  quantumMode
                    ? 'text-gray-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {t('nav.projects')}
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-sm font-medium ${
                  quantumMode
                    ? 'text-gray-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {t('nav.contact')}
              </a>

              <div
                className={`my-4 h-px ${
                  quantumMode
                    ? 'bg-stellar-blue/30'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />

              <button
                onClick={() => {
                  onNavigationOpen()
                  setIsMobileMenuOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 ${
                  quantumMode
                    ? 'bg-stellar-blue/10 text-stellar-blue'
                    : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                }`}
              >
                <span>Open Navigation</span>
                <Navigation2 className="h-4 w-4" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`fixed top-20 right-4 z-40 w-80 rounded-xl p-4 shadow-2xl ${
              quantumMode
                ? 'bg-cosmic-black/90 border-stellar-blue/30 border backdrop-blur-xl'
                : 'border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
            }`}
          >
            <h3 className="mb-4 text-lg font-bold">Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm">Quantum Mode</span>
                <button
                  onClick={onQuantumModeToggle}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    quantumMode
                      ? 'bg-stellar-blue'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      quantumMode ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Sound Effects</span>
                <button
                  onClick={onSoundToggle}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    soundEnabled
                      ? 'bg-stellar-blue'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default QuantumHeader
