import Head from 'next/head'
import { siteConfig } from '@/lib/config/site'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image'
  canonical?: string
  locale?: string
}

export function SEOHead({
  title = siteConfig.name,
  description = siteConfig.description,
  keywords = [
    'desenvolvedor full stack',
    'react',
    'nextjs',
    'typescript',
    'nodejs',
    'desenvolvedor web',
    'designer',
    'ui/ux',
    'freelancer',
  ],
  ogImage = '/assets/images/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonical,
  locale = 'pt_BR',
}: SEOHeadProps) {
  const siteUrl = siteConfig.url
  const fullCanonical = canonical || siteUrl
  const ogImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${siteUrl}${ogImage}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Jeferson Reis" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={defaultSiteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:creator" content="@jefersonreis" />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="pt" href={`${siteUrl}/pt`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Geo Tags */}
      <meta name="geo.region" content="BR-BA" />
      <meta name="geo.placename" content="Camaçari" />
    </Head>
  )
}
