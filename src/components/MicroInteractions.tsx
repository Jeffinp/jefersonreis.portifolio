import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Hook para micro-interações
export const useMicroInteraction = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  }

  return { isHovered, isPressed, isFocused, handlers }
}

// Componente de botão com micro-interações
interface InteractiveButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const { isHovered, isPressed, handlers } = useMicroInteraction()

  const baseClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
    secondary:
      'bg-white text-gray-900 border-2 border-gray-300 hover:border-blue-500',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      className={`relative overflow-hidden rounded-xl font-semibold transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${baseClasses[variant]} ${sizeClasses[size]} ${className} `}
      onClick={onClick}
      disabled={disabled}
      {...handlers}
      initial={{ scale: 1 }}
      animate={{
        scale: isPressed ? 0.98 : isHovered ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
    >
      {/* Ripple effect */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-white/20"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '200%' } : { x: '-100%' }}
        transition={{ duration: 0.6 }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Card com hover effect avançado
interface InteractiveCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  glowColor?: string
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  onClick,
  className = '',
  glowColor = 'blue',
}) => {
  const { isHovered, handlers } = useMicroInteraction()

  const glowColors = {
    blue: 'shadow-blue-500/25',
    purple: 'shadow-purple-500/25',
    green: 'shadow-green-500/25',
    orange: 'shadow-orange-500/25',
    pink: 'shadow-pink-500/25',
  }

  return (
    <motion.div
      className={`relative cursor-pointer rounded-2xl border border-gray-200/50 bg-white/90 p-6 backdrop-blur-lg transition-all duration-300 dark:border-gray-700/50 dark:bg-slate-800/90 ${className} `}
      onClick={onClick}
      {...handlers}
      initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
      animate={{
        scale: isHovered ? 1.02 : 1,
        rotateX: isHovered ? 5 : 0,
        rotateY: isHovered ? 5 : 0,
      }}
      whileHover={{
        boxShadow: isHovered
          ? `0 20px 40px -10px ${glowColors[glowColor as keyof typeof glowColors]}`
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 ${
          glowColor === 'blue'
            ? 'from-blue-400 to-purple-400'
            : glowColor === 'purple'
              ? 'from-purple-400 to-pink-400'
              : glowColor === 'green'
                ? 'from-green-400 to-teal-400'
                : glowColor === 'orange'
                  ? 'from-orange-400 to-red-400'
                  : 'from-pink-400 to-rose-400'
        }`}
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// Loader animado
interface AnimatedLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({
  size = 'md',
  color = 'blue',
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-gray-200 border-t-${color}-600`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

// Floating action button com pulso
interface FloatingButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  position?: 'bottom-right' | 'bottom-left'
  color?: string
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  onClick,
  position = 'bottom-right',
  color = 'blue',
}) => {
  const { isHovered, handlers } = useMicroInteraction()
  const [isPulsing, setIsPulsing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  }

  return (
    <motion.button
      className={`fixed z-50 rounded-full p-4 shadow-2xl bg-${color}-600 text-white hover:bg-${color}-700 focus:ring-4 focus:ring-${color}-500/20 focus:outline-none ${positionClasses[position]} `}
      onClick={onClick}
      {...handlers}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        rotate: isHovered ? 360 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {/* Pulse animation */}
      <AnimatePresence>
        {isPulsing && (
          <motion.div
            className={`absolute inset-0 rounded-full bg-${color}-600`}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">{icon}</div>
    </motion.button>
  )
}

// Magnetic button effect
interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    setMousePosition({
      x: (e.clientX - centerX) * 0.1,
      y: (e.clientY - centerY) * 0.1,
    })
  }

  return (
    <motion.button
      className={`relative ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      animate={{
        x: isHovered ? mousePosition.x : 0,
        y: isHovered ? mousePosition.y : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 25,
      }}
    >
      {children}
    </motion.button>
  )
}

// Tooltip animado
interface AnimatedTooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-50 rounded-lg bg-gray-900 px-3 py-2 text-sm whitespace-nowrap text-white dark:bg-gray-700 ${positionClasses[position]} `}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {content}
            <div
              className={`absolute h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700 ${
                position === 'top'
                  ? 'top-full left-1/2 -mt-1 -translate-x-1/2'
                  : position === 'bottom'
                    ? 'bottom-full left-1/2 -mb-1 -translate-x-1/2'
                    : position === 'left'
                      ? 'top-1/2 left-full -ml-1 -translate-y-1/2'
                      : 'top-1/2 right-full -mr-1 -translate-y-1/2'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
