'use client'

import Script from 'next/script'
import { siteConfig } from '@/lib/config/site'

interface SchemaOrgProps {
  type?: 'person' | 'website' | 'service' | 'faq'
}

export function SchemaOrg({ type = 'person' }: SchemaOrgProps) {
  const siteUrl = siteConfig.url

  const schemas = {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Jeferson Reis Almeida',
      url: siteUrl,
      jobTitle: 'Full-Stack Developer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Camaçari',
        addressRegion: 'BA',
        addressCountry: 'BR',
      },
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteUrl,
    },
    service: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `${siteConfig.name} - Desenvolvimento Web`,
      description: siteConfig.description,
      url: siteUrl,
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
    },
  }

  const schema = schemas[type]

  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(schema)}
    </Script>
  )
}
