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
