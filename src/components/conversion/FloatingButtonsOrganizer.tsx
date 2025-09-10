import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, X, Menu } from 'lucide-react'

interface FloatingButtonsOrganizerProps {
  children: React.ReactNode
  position?: 'left' | 'right'
  mobileCollapsible?: boolean
}

export const FloatingButtonsOrganizer: React.FC<
  FloatingButtonsOrganizerProps
> = ({ children, position = 'right', mobileCollapsible = true }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showButtons, setShowButtons] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Auto-collapse on mobile initially
      if (mobile && mobileCollapsible) {
        setIsExpanded(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Auto-hide buttons when scrolling on mobile
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      if (!isMobile) return

      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY

      // Hide when scrolling down, show when scrolling up
      setShowButtons(!scrollingDown || currentScrollY < 100)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, mobileCollapsible])

  if (!isMobile) {
    // Desktop: render children normally
    return <>{children}</>
  }

  // Mobile: organized layout
  return (
    <>
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-20 z-50 ${
              position === 'right' ? 'right-4' : 'left-4'
            }`}
          >
            {/* Toggle Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>

            {/* Buttons Container */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="absolute right-0 bottom-16 space-y-3"
                >
                  {/* Render children with adjusted positioning */}
                  <div className="space-y-3">
                    {React.Children.map(children, (child, index) => {
                      if (React.isValidElement(child)) {
                        // Clone and modify className to remove fixed positioning
                        const childElement = child as React.ReactElement<{className?: string, style?: React.CSSProperties}>
                        return React.cloneElement(
                          childElement,
                          {
                            className:
                              (childElement.props.className || '')
                                .replace(
                                  /fixed|bottom-\[?\d+px?\]?|right-\[?\d+px?\]?|left-\[?\d+px?\]?/g,
                                  '',
                                )
                                .trim() + ' relative block w-full',
                            style: {
                              ...childElement.props.style,
                              position: 'relative',
                              bottom: 'auto',
                              right: 'auto',
                              left: 'auto',
                            },
                          },
                        )
                      }
                      return child
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Visual indicator */}
            {!isExpanded && (
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {React.Children.count(children)}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop fallback */}
      <div className="hidden md:block">{children}</div>
    </>
  )
}

export default FloatingButtonsOrganizer
