import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { useState, useEffect } from 'react'
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
  // FIXED: Quantum always enabled, performance always medium
  const [quantumEnabled, setQuantumEnabled] = useState(true)
  const [commercialMode, setCommercialMode] = useState(false)

  // Initialize and preload critical resources
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources()

    // FIXED: Always enable quantum mode
    setQuantumEnabled(true)

    // Check for commercial mode
    const urlParams = new URLSearchParams(window.location.search)
    const isCommercial =
      urlParams.get('mode') === 'commercial' ||
      localStorage.getItem('commercialMode') === 'true'
    setCommercialMode(isCommercial)
  }, [])

  return (
    <ThemeProvider>
      <OptimizedQuantumLayout>
        <main id="main-content" role="main" className="relative min-h-screen">
          <Component {...pageProps} commercialMode={commercialMode} />
        </main>

        {/* Floating buttons - Only show in non-commercial mode and not on home page */}
        {!commercialMode && (
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
