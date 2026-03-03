import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.url

  const routes = ['', '/empresa']

  const locales = ['pt', 'en']

  const urls: MetadataRoute.Sitemap = []

  // Add all route/locale combinations
  for (const route of routes) {
    for (const locale of locales) {
      urls.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      })
    }
  }

  return urls
}
