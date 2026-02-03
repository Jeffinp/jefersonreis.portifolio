import type { Metadata } from 'next'
import { locales } from '@/lib/i18n'
import { siteConfig } from '@/lib/config/site'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'portfolio',
    'desenvolvedor',
    'full stack',
    'web development',
    'react',
    'next.js',
  ],
  authors: [{ name: 'Jeferson Reis' }],
  creator: 'Jeferson Reis',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
