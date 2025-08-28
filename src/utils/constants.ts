// Project constants and configuration

// Social media links
export const SOCIAL_LINKS = {
  github: 'https://github.com/Jeffinp',
  linkedin: 'https://www.linkedin.com/in/jefersonreis-dev/',
  discord: 'https://discord.gg/your-discord',
  whatsapp: 'https://wa.me/5571984393235',
  email: 'jefersonreisalmeida8356@gmail.com',
} as const

// Contact information
export const CONTACT_INFO = {
  phone: '+55 (71) 98439-3235',
  email: 'jefersonreisalmeida8356@gmail.com',
  location: 'camaçari, BA - Brasil',
} as const

// Project categories
export const PROJECT_CATEGORIES = {
  all: 'all',
  web: 'web',
  mobile: 'mobile',
  design: 'design',
  '3d': '3d',
} as const

// Skill categories
export const SKILL_CATEGORIES = {
  frontend: 'frontend',
  backend: 'backend',
  database: 'database',
  design: 'design',
  tools: 'tools',
  cloud: 'cloud',
  mobile: 'mobile',
  '3d': '3d',
} as const

// Theme options
export const THEME_OPTIONS = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'portfolio-theme',
  language: 'portfolio-language',
  preferences: 'portfolio-preferences',
} as const

// API endpoints (if needed)
export const API_ENDPOINTS = {
  contact: '/api/contact',
  analytics: '/api/analytics',
  sitemap: '/api/sitemap',
  robots: '/api/robots',
} as const

// SEO defaults
export const SEO_DEFAULTS = {
  title: 'Jeferson Reis - Full Stack Developer & Designer',
  description:
    'Portfolio de Jeferson Reis - Desenvolvedor Full Stack, Designer Gráfico e Técnico em Informática',
  keywords: [
    'Jeferson Reis',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Designer Gráfico',
  ],
  ogImage: '/assets/images/profile/profile-linkedin.webp',
  twitterCard: 'summary_large_image',
} as const

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  largeImageSize: 1024 * 1024, // 1MB
  maxBundleSize: 500 * 1024, // 500KB
  scrollThrottleMs: 16, // ~60fps
  debounceMs: 300,
} as const
