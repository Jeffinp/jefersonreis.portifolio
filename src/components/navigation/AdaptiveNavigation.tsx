import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Briefcase, Rocket, Grid } from 'lucide-react'
import { useTargetAudience } from '@/hooks/useTargetAudience'

interface NavigationItem {
  href: string
  label: string
  showFor: ('empresa' | 'freelance' | 'default')[]
}

export const AdaptiveNavigation: React.FC = () => {
  const { t } = useTranslation('sections/header')
  const { target, switchToTarget, getTargetURL } = useTargetAudience()
  const router = useRouter()

  // Items de navegação adaptáveis baseados na página atual
  const currentPath = router.pathname
  let navigationItems: NavigationItem[] = []

  if (currentPath === '/empresa') {
    navigationItems = [
      { href: '#home', label: t('nav.home'), showFor: ['empresa'] },
      { href: '#about', label: t('nav.about'), showFor: ['empresa'] },
      { href: '#skills', label: t('nav.skills'), showFor: ['empresa'] },
      { href: '#services', label: t('nav.services'), showFor: ['empresa'] },
      { href: '#projects', label: t('nav.portfolio'), showFor: ['empresa'] },
      { href: '#timeline', label: t('nav.timeline'), showFor: ['empresa'] },
      {
        href: '#testimonials',
        label: t('nav.testimonials'),
        showFor: ['empresa'],
      },
      { href: '#contact', label: t('nav.contact'), showFor: ['empresa'] },
    ]
  } else if (currentPath === '/freelance') {
    navigationItems = [
      { href: '#home', label: t('nav.home'), showFor: ['freelance'] },
      { href: '#about', label: t('nav.about'), showFor: ['freelance'] },
      { href: '#services', label: t('nav.services'), showFor: ['freelance'] },
      { href: '#projects', label: t('nav.portfolio'), showFor: ['freelance'] },
      {
        href: '#testimonials',
        label: t('nav.testimonials'),
        showFor: ['freelance'],
      },
      { href: '#faq', label: 'FAQ', showFor: ['freelance'] },
    ]
  } else {
    // Home page - no navigation items, just the selector
    navigationItems = []
  }

  // Determinar o target baseado na página atual
  const currentTarget =
    currentPath === '/empresa'
      ? 'empresa'
      : currentPath === '/freelance'
        ? 'freelance'
        : 'default'

  // Usar todos os items já filtrados pela página
  const visibleItems = navigationItems

  return (
    <nav className="flex items-center gap-6">
      {/* Links de navegação */}
      <ul className="hidden items-center gap-6 md:flex">
        {visibleItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Target Switcher */}
      <div className="flex items-center gap-2 border-l border-gray-300 pl-6 dark:border-gray-600">
        <span className="text-xs text-gray-500 dark:text-gray-400">Modo:</span>
        <div className="flex items-center rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          <button
            onClick={() => router.push('/freelance')}
            className={`flex items-center gap-1 rounded px-3 py-1 text-xs font-medium transition-colors ${
              currentPath === '/freelance'
                ? 'bg-white text-purple-600 shadow-sm dark:bg-gray-700 dark:text-purple-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            title="Modo Freelance - Para clientes"
          >
            <Rocket className="h-3 w-3" />
            <span className="hidden sm:inline">Freelance</span>
          </button>

          <button
            onClick={() => router.push('/empresa')}
            className={`flex items-center gap-1 rounded px-3 py-1 text-xs font-medium transition-colors ${
              currentPath === '/empresa'
                ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            title="Modo Empresa - Para recrutadores"
          >
            <Briefcase className="h-3 w-3" />
            <span className="hidden sm:inline">Empresa</span>
          </button>

          <button
            onClick={() => router.push('/')}
            className={`flex items-center gap-1 rounded px-3 py-1 text-xs font-medium transition-colors ${
              currentPath === '/'
                ? 'bg-white text-green-600 shadow-sm dark:bg-gray-700 dark:text-green-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            title="Página inicial"
          >
            <Grid className="h-3 w-3" />
            <span className="hidden sm:inline">Início</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AdaptiveNavigation
