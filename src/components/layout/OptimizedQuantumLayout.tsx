import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {
  usePerformanceMonitor,
  isLowEndDevice,
  throttle,
} from '@/hooks/usePerformanceMonitor'
import { useScrollFix } from '@/hooks/useScrollFix'

// Performance-optimized imports with loading states
const PerformanceOptimizedParticles = dynamic(
  () => import('@/components/quantum/PerformanceOptimizedParticles'),
  { ssr: false },
)

const LiteSpaceNavigation = dynamic(
  () => import('@/components/quantum/LiteSpaceNavigation'),
  { ssr: false },
)

// Only load heavy components if performance allows
const QuantumCursor = dynamic(
  () => import('@/components/quantum/QuantumCursor'),
  {
    ssr: false,
    loading: () => null,
  },
)

// UI Components
import { SkipNavigation } from '@/components/common'
import QuantumHeader from './QuantumHeader'
import Footer from './Footer'

interface OptimizedQuantumLayoutProps {
  children: React.ReactNode
}

export const OptimizedQuantumLayout: React.FC<OptimizedQuantumLayoutProps> = ({
  children,
}) => {
  const router = useRouter()
  const performanceMetrics = usePerformanceMonitor()
  useScrollFix() // Apply scroll fix to prevent automatic scrolling

  // Check if we're on specific pages
  const isHomePage = router.pathname === '/'
  const isCommercialPage = router.pathname === '/freelance'

  // State
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const [quantumMode, setQuantumMode] = useState(false)
  const [performanceMode, setPerformanceMode] = useState<
    'ultra-low' | 'low' | 'medium' | 'high'
  >('medium')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Check device and set initial performance mode
  useEffect(() => {
    const checkDevice = () => {
      const isLowEnd = isLowEndDevice()
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      // Load saved preferences
      const savedQuantumMode = localStorage.getItem('quantumMode')

      // ALWAYS use medium mode - fixed configuration
      setPerformanceMode('medium')
      setQuantumMode(true)

      if (savedQuantumMode !== null) {
        setQuantumMode(JSON.parse(savedQuantumMode))
      }

      setIsInitialized(true)
    }

    // Delay initialization to avoid blocking initial render
    requestIdleCallback(() => checkDevice())
  }, [])

  // Auto-adjust performance based on FPS
  useEffect(() => {
    if (!isInitialized) return

    // Performance mode is fixed to medium - no automatic adjustments
    // Keep medium mode regardless of performance metrics
  }, [performanceMetrics, performanceMode, isInitialized])

  // Fixed medium mode features
  useEffect(() => {
    // Medium mode fixed configuration
    setShowCursor(false)
  }, [])

  // Save preferences
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('quantumMode', JSON.stringify(quantumMode))
      localStorage.setItem('performanceMode', performanceMode)
    }
  }, [quantumMode, performanceMode, isInitialized])

  // Throttled scroll handler for better performance
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        // Scroll-based optimizations can go here
      }, 100),
    [],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K - Open navigation
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsNavigationOpen((prev) => !prev)
      }

      // Ctrl/Cmd + Q - Toggle quantum mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
        e.preventDefault()
        setQuantumMode((prev) => !prev)
      }

      // Ctrl/Cmd + P - Cycle performance modes
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        const modes: Array<'ultra-low' | 'low' | 'medium' | 'high'> = [
          'ultra-low',
          'low',
          'medium',
          'high',
        ]
        const currentIndex = modes.indexOf(performanceMode)
        const nextIndex = (currentIndex + 1) % modes.length
        setPerformanceMode(modes[nextIndex])
        console.log(`Performance mode: ${modes[nextIndex]}`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [performanceMode])

  // Memoized background class
  const backgroundClass = useMemo(() => {
    if (!quantumMode) return 'bg-white dark:bg-gray-900'
    return performanceMode === 'ultra-low' ? 'bg-cosmic-black' : 'cosmic-bg'
  }, [quantumMode, performanceMode])

  return (
    <>
      {/* Skip Navigation */}
      <SkipNavigation />

      {/* Quantum Background Elements - Only if enabled and performance allows */}
      {quantumMode && isInitialized && (
        <>
          {/* Optimized Particle Field */}
          <PerformanceOptimizedParticles
            enabled={quantumMode}
            performanceMode={performanceMode}
          />

          {/* Quantum Cursor - Only on high performance */}
          {showCursor && performanceMode === 'high' && (
            <QuantumCursor enabled={true} />
          )}
        </>
      )}

      {/* Space Navigation System */}
      {isInitialized && (
        <LiteSpaceNavigation
          isOpen={isNavigationOpen}
          onClose={() => setIsNavigationOpen(false)}
        />
      )}

      {/* Main Layout */}
      <div
        className={`min-h-screen transition-colors duration-500 ${backgroundClass}`}
      >
        {/* Quantum Header - Hide on home and commercial pages */}
        {!isHomePage && !isCommercialPage && (
          <QuantumHeader
            onNavigationOpen={() => setIsNavigationOpen(true)}
            quantumMode={quantumMode}
            onQuantumModeToggle={() => setQuantumMode((prev) => !prev)}
            soundEnabled={soundEnabled}
            onSoundToggle={() => setSoundEnabled((prev) => !prev)}
          />
        )}

        {/* Main Content */}
        <main className="relative z-10">
          {/* Simple gradient overlay for ultra-low mode */}
          {quantumMode && performanceMode === 'ultra-low' && (
            <div className="via-cosmic-black/50 to-cosmic-black pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent" />
          )}

          {children}
        </main>

        {/* Footer - Hide on home and commercial pages */}
        {!isHomePage && !isCommercialPage && <Footer />}
      </div>

      {/* Performance Monitor Removed - Fixed Medium Mode */}
    </>
  )
}

export default OptimizedQuantumLayout
