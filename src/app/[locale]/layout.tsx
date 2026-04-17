import type { Metadata } from 'next'
import { Sora, Plus_Jakarta_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ThemeProvider, LenisProvider } from '@/components/providers'
import { Analytics } from '@/components/analytics'
import {
  WhatsAppFloatingButton,
  DiscordFloatingButton,
} from '@/components/widgets'
import { locales } from '@/lib/i18n'
import type { Locale } from '@/types'
import '@/styles/globals.css'

const ICON_BASE = '/assets/icon'

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: `${ICON_BASE}/favicon-16x16.png`,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: `${ICON_BASE}/favicon-32x32.png`,
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: `${ICON_BASE}/favicon-96x96.png`,
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: `${ICON_BASE}/android-icon-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    shortcut: `${ICON_BASE}/favicon.ico`,
    apple: [
      { url: `${ICON_BASE}/apple-icon-57x57.png`, sizes: '57x57' },
      { url: `${ICON_BASE}/apple-icon-60x60.png`, sizes: '60x60' },
      { url: `${ICON_BASE}/apple-icon-72x72.png`, sizes: '72x72' },
      { url: `${ICON_BASE}/apple-icon-76x76.png`, sizes: '76x76' },
      { url: `${ICON_BASE}/apple-icon-114x114.png`, sizes: '114x114' },
      { url: `${ICON_BASE}/apple-icon-120x120.png`, sizes: '120x120' },
      { url: `${ICON_BASE}/apple-icon-144x144.png`, sizes: '144x144' },
      { url: `${ICON_BASE}/apple-icon-152x152.png`, sizes: '152x152' },
      { url: `${ICON_BASE}/apple-icon-180x180.png`, sizes: '180x180' },
    ],
  },
  manifest: `${ICON_BASE}/manifest.json`,
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': `${ICON_BASE}/ms-icon-144x144.png`,
  },
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['600', '700', '800'],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const isValidLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale)

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  // Validar locale
  if (!isValidLocale(locale)) {
    notFound()
  }

  // Habilitar static rendering
  setRequestLocale(locale)

  // Carregar mensagens
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sora.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main"
          className="bg-primary text-primary-foreground focus-visible:ring-ring sr-only rounded-md px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          {locale === 'pt' ? 'Pular para o conteúdo' : 'Skip to main content'}
        </a>
        <ThemeProvider>
          <LenisProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </LenisProvider>
        </ThemeProvider>
        <WhatsAppFloatingButton />
        <DiscordFloatingButton />
        <Analytics />
      </body>
    </html>
  )
}
