import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'
import { i18n } from './next-i18next.config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n,

  // Configuração de headers de segurança
  async headers() {
    // Desenvolvimento: CSP mais permissivo
    const isDev = process.env.NODE_ENV === 'development'
    
    const cspHeader = isDev
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: blob: https://www.google-analytics.com https://www.facebook.com; connect-src 'self' ws: wss: https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://vercel.live https://api.emailjs.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://api.emailjs.com; object-src 'none';"
      : "default-src 'self'; script-src 'self' 'sha256-dR9r8B61NuvUglVt0IV1YvhzVQYMcVD3X8gqH1wQDJw=' 'sha256-6q7CtSUhBASWIcZbaKmkg/GctwTCSeUGT8DMvrup3fM=' 'sha256-pU5E8IbTozyzhKXbmd6xCHkYUyyXPm4Q2615bZid42E=' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: blob: https://www.google-analytics.com https://www.facebook.com; connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://vercel.live https://api.emailjs.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://api.emailjs.com; object-src 'none'; upgrade-insecure-requests;"
    
    return [
      {
        source: '/(.*)',
        headers: [
          // Mantidos por serem excelentes práticas
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // HSTS apenas em produção
          ...(isDev ? [] : [{
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          }]),
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          // CSP adaptável para dev/prod
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
    ]
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cambridge-intelligence.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com' },
      { protocol: 'https', hostname: 'miro.medium.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'user-images.githubusercontent.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
    formats: ['image/avif', 'image/webp'],
    // Tamanhos ajustados para corresponder ao seu design
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 ano - Ótimo para assets imutáveis
    // Mantido para permitir SVGs externos que você está usando
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    unoptimized: false,
  },

  webpack: (config) => {
    // Mantendo seu alias atual
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/i18n': path.resolve(__dirname, './src/i18n'),
    }
    return config
  },

  // Otimizações de performance
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: [
      '@vercel/analytics',
      '@vercel/speed-insights',
      'framer-motion',
      'lucide-react',
      'react-icons',
      '@emailjs/browser',
    ],
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // ppr: true, // PPR só disponível no canary - será habilitado quando estiver estável
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
  },

  // typedRoutes desabilitado temporariamente para acelerar build
  // typedRoutes: true,

  // Ativar compressão
  compress: true,

  // Output padrão para evitar problemas de build
  // output: 'standalone', // Descomentar apenas para deploy em Docker

  // Melhorar performance de produção
  productionBrowserSourceMaps: false,

  // Configurações de poder computacional
  poweredByHeader: false,
}

export default nextConfig
