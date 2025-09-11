import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { preloadCriticalResources } from '@/config/performance.config'

// Dynamic import for Optimized Quantum Layout
const OptimizedQuantumLayout = dynamic(
  () => import('@/components/layout/OptimizedQuantumLayout'),
  { ssr: false },
)

// Legacy components (still used in Quantum Layout)
const ScrollToTopButton = dynamic(
  () => import('@/components/ui/ScrollToTopButton'),
  { ssr: false },
)
const WhatsAppFloatingButton = dynamic(
  () => import('@/components/ui/WhatsAppFloatingButton'),
  { ssr: false },
)
const DiscordFloatingButton = dynamic(
  () => import('@/components/ui/DiscordFloatingButton'),
  { ssr: false },
)
const Analytics = dynamic(
  () =>
    import('@vercel/analytics/react').then((mod) => ({
      default: mod.Analytics,
    })),
  { ssr: false },
)
const SpeedInsights = dynamic(
  () =>
    import('@vercel/speed-insights/next').then((mod) => ({
      default: mod.SpeedInsights,
    })),
  { ssr: false },
)

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // FIXED: Quantum always enabled, performance always medium
  const [quantumEnabled, setQuantumEnabled] = useState(true)
  const [isFreelancePage, setIsFreelancePage] = useState(false)
  const [isHomePage, setIsHomePage] = useState(false)

  // Initialize and preload critical resources
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources()

    // FIXED: Always enable quantum mode
    setQuantumEnabled(true)

    // Check if we're on the freelance page or home page
    const isFreelance = router.pathname === '/freelance'
    const isHome = router.pathname === '/'
    setIsFreelancePage(isFreelance)
    setIsHomePage(isHome)
  }, [router.pathname])

  return (
    <ThemeProvider>
      <OptimizedQuantumLayout>
        <main id="main-content" role="main" className="relative min-h-screen">
          <Component {...pageProps} />
        </main>

        {/* Floating buttons - Different per page */}
        {/* Commercial page (freelance) uses ChatWidget instead */}
        
        {/* All buttons for empresa page */}
        {router.pathname === '/empresa' && (
          <>
            <ScrollToTopButton />
            <WhatsAppFloatingButton />
            <DiscordFloatingButton />
          </>
        )}

        {/* Analytics and Performance Monitoring */}
        <Analytics />
        <SpeedInsights />
      </OptimizedQuantumLayout>
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
