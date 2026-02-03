import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config/site'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = siteConfig.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
