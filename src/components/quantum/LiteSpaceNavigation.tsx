import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useMemo,
} from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  Home,
  User,
  Briefcase,
  Code,
  FolderOpen,
  Clock,
  Mail,
  X,
  Rocket,
  Command,
  Search,
} from 'lucide-react'

interface LiteSpaceNavigationProps {
  isOpen: boolean
  onClose: () => void
}

interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  x: number
  y: number
  color: string
  description: string
}

// Custom cursor component for the navigation
const NavigationCursor = memo(
  ({
    containerRef,
  }: {
    containerRef: React.RefObject<HTMLDivElement | null>
  }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
      const container = containerRef.current
      if (!container) return

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        setIsHovering(target.matches('.planet-item, .nav-link'))
      }

      const handleMouseOut = () => setIsHovering(false)

      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseover', handleMouseOver)
      container.addEventListener('mouseout', handleMouseOut)

      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseover', handleMouseOver)
        container.removeEventListener('mouseout', handleMouseOut)
      }
    }, [containerRef])

    return (
      <motion.div
        className="pointer-events-none absolute z-50"
        style={{ left: position.x, top: position.y }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 1 : 0.6,
        }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div
            className={`h-6 w-6 rounded-full border-2 ${isHovering ? 'border-blue-400' : 'border-gray-400'}`}
          >
            <div className="absolute inset-2 rounded-full bg-white" />
          </div>
          {isHovering && (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: [0.5, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <div className="h-6 w-6 rounded-full border border-blue-400" />
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  },
)

NavigationCursor.displayName = 'NavigationCursor'

export const LiteSpaceNavigation: React.FC<LiteSpaceNavigationProps> = memo(
  ({ isOpen, onClose }) => {
    const { t } = useTranslation('sections/header')
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)

    // Motion values for parallax effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Spring animations for smooth movement
    const springConfig = { damping: 30, stiffness: 200 }
    const translateX = useSpring(
      useTransform(mouseX, [-1, 1], [-20, 20]),
      springConfig,
    )
    const translateY = useSpring(
      useTransform(mouseY, [-1, 1], [-20, 20]),
      springConfig,
    )

    // Touch state for mobile
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
    const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 })

    const navigationItems: NavigationItem[] = useMemo(
      () => [
        {
          id: 'home',
          label: t('nav.home'),
          icon: <Home className="h-5 w-5" />,
          href: '#home',
          x: 50,
          y: 20,
          color: 'from-blue-400 to-cyan-400',
          description: t('quantum.navigation.home'),
        },
        {
          id: 'about',
          label: t('nav.about'),
          icon: <User className="h-5 w-5" />,
          href: '#about',
          x: 20,
          y: 40,
          color: 'from-purple-400 to-pink-400',
          description: t('quantum.navigation.about'),
        },
        {
          id: 'services',
          label: t('nav.services'),
          icon: <Briefcase className="h-5 w-5" />,
          href: '#services',
          x: 80,
          y: 35,
          color: 'from-green-400 to-emerald-400',
          description: t('quantum.navigation.services'),
        },
        {
          id: 'skills',
          label: t('nav.skills'),
          icon: <Code className="h-5 w-5" />,
          href: '#skills',
          x: 35,
          y: 70,
          color: 'from-yellow-400 to-orange-400',
          description: t('quantum.navigation.expertise'),
        },
        {
          id: 'projects',
          label: t('nav.projects'),
          icon: <FolderOpen className="h-5 w-5" />,
          href: '#projects',
          x: 65,
          y: 60,
          color: 'from-red-400 to-rose-400',
          description: t('quantum.navigation.projects'),
        },
        {
          id: 'timeline',
          label: t('nav.timeline'),
          icon: <Clock className="h-5 w-5" />,
          href: '#timeline',
          x: 15,
          y: 65,
          color: 'from-indigo-400 to-blue-400',
          description: t('quantum.navigation.timeline'),
        },
        {
          id: 'contact',
          label: t('nav.contact'),
          icon: <Mail className="h-5 w-5" />,
          href: '#contact',
          x: 50,
          y: 85,
          color: 'from-teal-400 to-cyan-400',
          description: t('quantum.navigation.contact'),
        },
      ],
      [t],
    )

    // Handle mouse movement for parallax
    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
          const x = (e.clientX - rect.left) / rect.width
          const y = (e.clientY - rect.top) / rect.height
          mouseX.set(x * 2 - 1)
          mouseY.set(y * 2 - 1)
        }
      },
      [mouseX, mouseY],
    )

    // Handle touch for mobile
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      const touch = e.touches[0]
      setTouchStart({ x: touch.clientX, y: touch.clientY })
    }, [])

    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        const touch = e.touches[0]
        const deltaX = touch.clientX - touchStart.x
        const deltaY = touch.clientY - touchStart.y

        setViewOffset((prev) => ({
          x: Math.max(-100, Math.min(100, prev.x + deltaX * 0.5)),
          y: Math.max(-100, Math.min(100, prev.y + deltaY * 0.5)),
        }))

        setTouchStart({ x: touch.clientX, y: touch.clientY })
      },
      [touchStart],
    )

    const handleNavigation = useCallback(
      (href: string) => {
        onClose()
        if (href.startsWith('#')) {
          const element = document.querySelector(href)
          element?.scrollIntoView({ behavior: 'smooth' })
        } else {
          router.push(href)
        }
      },
      [onClose, router],
    )

    const filteredItems = navigationItems.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return

        if (e.key === 'Escape') {
          onClose()
        } else if (e.key >= '1' && e.key <= '7') {
          const index = parseInt(e.key) - 1
          if (navigationItems[index]) {
            handleNavigation(navigationItems[index].href)
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose, handleNavigation, navigationItems])

    // Hide default cursor when inside navigation
    useEffect(() => {
      const container = containerRef.current
      if (isOpen && container) {
        container.style.cursor = 'none'
      }
      return () => {
        if (container) {
          container.style.cursor = 'auto'
        }
      }
    }, [isOpen])

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={onClose}
            />

            {/* Navigation Container */}
            <motion.div
              ref={containerRef}
              className="relative h-full w-full"
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Custom Cursor */}
              <NavigationCursor containerRef={containerRef} />

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.button>

              {/* Search Bar */}
              <motion.div
                className="absolute top-8 left-1/2 z-50 -translate-x-1/2"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('quantum.navigation.searchPlaceholder')}
                    className="bg-transparent text-white placeholder-gray-400 outline-none"
                  />
                  <kbd className="rounded bg-white/20 px-2 py-1 text-xs text-gray-300">
                    ESC
                  </kbd>
                </div>
              </motion.div>

              {/* Star Field Background */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-white"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              {/* Navigation Planets */}
              <motion.div
                className="relative h-full w-full"
                style={{
                  x: viewOffset.x,
                  y: viewOffset.y,
                }}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="planet-item absolute"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      x: translateX,
                      y: translateY,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onHoverStart={() => setSelectedPlanet(item.id)}
                    onHoverEnd={() => setSelectedPlanet(null)}
                  >
                    <motion.button
                      onClick={() => handleNavigation(item.href)}
                      className={`nav-link group relative flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br ${item.color} p-[2px] shadow-2xl`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', damping: 15 }}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gray-900 transition-all group-hover:bg-gray-800">
                        {item.icon}
                        <span className="mt-1 text-xs font-medium text-white">
                          {item.label}
                        </span>
                      </div>

                      {/* Orbit Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-white/20"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />

                      {/* Keyboard Shortcut */}
                      <div className="absolute -bottom-6 rounded bg-white/10 px-2 py-1 text-xs text-gray-300 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                        {index + 1}
                      </div>
                    </motion.button>

                    {/* Description Tooltip */}
                    {selectedPlanet === item.id && (
                      <motion.div
                        className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-lg bg-white/10 px-3 py-2 whitespace-nowrap backdrop-blur-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <p className="text-sm text-gray-300">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Instructions */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-gray-400">
                  <Command className="mb-1 inline h-4 w-4" /> Use numbers 1-7
                  for quick navigation
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Move mouse or swipe to explore • Click planets to navigate
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
)

LiteSpaceNavigation.displayName = 'LiteSpaceNavigation'

export default LiteSpaceNavigation
