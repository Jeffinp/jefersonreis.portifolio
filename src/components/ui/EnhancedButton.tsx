import React from 'react'
import { motion } from 'framer-motion'
import { InteractiveButton, AnimatedTooltip } from './MicroInteractions'

interface EnhancedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  tooltip?: string
  className?: string
  href?: string
  external?: boolean
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  tooltip,
  className = '',
  href,
  external = false,
}) => {
  const variantClasses = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/20 shadow-lg hover:shadow-blue-500/25',
    secondary:
      'bg-white text-gray-900 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 focus:ring-blue-500/20 shadow-md',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/20 dark:text-gray-300 dark:hover:bg-gray-800',
    gradient:
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-purple-500/20 shadow-lg hover:shadow-purple-500/25',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-3',
    lg: 'px-8 py-4 text-lg gap-4',
  }

  const buttonContent = (
    <InteractiveButton
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className} `}
    >
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      <motion.div
        className={`gap-inherit flex items-center ${loading ? 'opacity-0' : 'opacity-100'}`}
        transition={{ duration: 0.2 }}
      >
        {icon && iconPosition === 'left' && (
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {icon}
          </motion.span>
        )}

        <span>{children}</span>

        {icon && iconPosition === 'right' && (
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {icon}
          </motion.span>
        )}
      </motion.div>
    </InteractiveButton>
  )

  // Se for um link
  if (href) {
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}

    const linkContent = (
      <motion.a
        href={href}
        className="inline-block"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...linkProps}
      >
        {buttonContent}
      </motion.a>
    )

    return tooltip ? (
      <AnimatedTooltip content={tooltip}>{linkContent}</AnimatedTooltip>
    ) : (
      linkContent
    )
  }

  // Se tiver tooltip
  if (tooltip) {
    return <AnimatedTooltip content={tooltip}>{buttonContent}</AnimatedTooltip>
  }

  return buttonContent
}

export default EnhancedButton
