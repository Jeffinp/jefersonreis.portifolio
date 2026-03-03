import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/components/providers'
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
      { url: `${ICON_BASE}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${ICON_BASE}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${ICON_BASE}/favicon-96x96.png`, sizes: '96x96', type: 'image/png' },
      { url: `${ICON_BASE}/android-icon-192x192.png`, sizes: '192x192', type: 'image/png' },
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
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <WhatsAppFloatingButton />
        <DiscordFloatingButton />
        <Analytics />
      </body>
    </html>
  )
}
