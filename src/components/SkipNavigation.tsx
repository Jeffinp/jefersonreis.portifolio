import React from 'react'
import { useTranslation } from 'next-i18next'

const SkipNavigation: React.FC = () => {
  const { t } = useTranslation('common')

  const skipLinks = [
    {
      href: '#main-content',
      label: t('skipNav.toContent', 'Pular para o conteúdo principal'),
    },
    { href: '#about', label: t('skipNav.toAbout', 'Pular para Sobre') },
    { href: '#skills', label: t('skipNav.toSkills', 'Pular para Habilidades') },
    {
      href: '#services',
      label: t('skipNav.toServices', 'Pular para Serviços'),
    },
    {
      href: '#projects',
      label: t('skipNav.toProjects', 'Pular para Projetos'),
    },
    { href: '#contact', label: t('skipNav.toContact', 'Pular para Contato') },
  ]

  return (
    <nav
      className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:z-[9999] focus-within:w-full"
      aria-label={t('skipNav.label', 'Links de navegação rápida')}
    >
      <div className="bg-white p-4 shadow-lg dark:bg-gray-900">
        <ul className="flex flex-wrap gap-2">
          {skipLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-600 dark:focus:ring-offset-gray-900"
                onClick={(e) => {
                  e.currentTarget.blur()
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default SkipNavigation
