'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { useAnalytics } from '@/hooks/useAnalytics'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  variant?: 'button' | 'dropdown'
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
  variant = 'button',
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { trackThemeChange } = useAnalytics()

  // Evitar hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Durante SSR ou antes da hidratação, mostrar placeholder
  if (!mounted) {
    return (
      <div
        className={`animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 ${
          size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'
        } ${className}`}
      />
    )
  }

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  }

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const themeOptions = [
    {
      key: 'light' as const,
      label: 'Claro',
      icon: Sun,
      ariaLabel: 'Ativar modo claro',
    },
    {
      key: 'dark' as const,
      label: 'Escuro',
      icon: Moon,
      ariaLabel: 'Ativar modo escuro',
    },
    {
      key: 'system' as const,
      label: 'Sistema',
      icon: Monitor,
      ariaLabel: 'Usar preferência do sistema',
    },
  ]

  const currentOption =
    themeOptions.find((option) => option.key === theme) || themeOptions[0]
  const CurrentIcon = currentOption.icon

  // Variante simples (botão de toggle)
  if (variant === 'button') {
    return (
      <motion.button
        onClick={toggleTheme}
        className={`relative flex items-center justify-center rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 ${sizeClasses[size]} ${className} `}
        aria-label={
          resolvedTheme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedTheme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {resolvedTheme === 'light' ? (
              <Sun className={`${iconSizes[size]} text-yellow-500`} />
            ) : (
              <Moon className={`${iconSizes[size]} text-blue-400`} />
            )}
          </motion.div>
        </AnimatePresence>

        {showLabel && (
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {resolvedTheme === 'light' ? 'Claro' : 'Escuro'}
          </span>
        )}
      </motion.button>
    )
  }

  // Variante dropdown (seletor completo)
  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 ${sizeClasses[size]} `}
        aria-label="Selecionar tema"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CurrentIcon
          className={`${iconSizes[size]} text-gray-700 dark:text-gray-300`}
        />

        {showLabel && (
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentOption.label}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-gray-200 bg-white/95 p-2 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/95"
            >
              {themeOptions.map((option) => {
                const OptionIcon = option.icon
                const isActive = theme === option.key

                return (
                  <motion.button
                    key={option.key}
                    onClick={() => {
                      trackThemeChange(
                        option.key as 'light' | 'dark' | 'system',
                      )
                      setTheme(option.key)
                      setIsOpen(false)
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                    } `}
                    aria-label={option.ariaLabel}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <OptionIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-grow">{option.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="theme-indicator"
                        className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeToggle
