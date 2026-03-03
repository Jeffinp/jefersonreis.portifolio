import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')

const nextConfig: NextConfig = {
  // Experimental features
  experimental: {
    // Otimizações automáticas de imports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },

  // Otimizações de imagem
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/devicon/**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
