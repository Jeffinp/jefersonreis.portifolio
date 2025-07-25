import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Dynamic imports for components that don't need SSR
const ScrollToTopBtn = dynamic(() => import('@/components/ScrollToTopBtn'), {
  ssr: false,
})
const WhatsAppFloatBtn = dynamic(
  () => import('@/components/WhatsAppFloatBtn'),
  {
    ssr: false,
  },
)
const DiscordFloatBtn = dynamic(() => import('@/components/DiscordFloatBtn'), {
  ssr: false,
})
const Analytics = dynamic(
  () =>
    import('@vercel/analytics/react').then((mod) => ({
      default: mod.Analytics,
    })),
  {
    ssr: false,
  },
)

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div id="__next-app" className="relative">
        <Header />
        <main role="main" className="min-h-screen">
          <Component {...pageProps} />
        </main>
        <Footer />

        {/* Client-side only components */}
        <ScrollToTopBtn />
        <WhatsAppFloatBtn />
        <DiscordFloatBtn />
        <Analytics />
      </div>
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
