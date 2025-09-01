import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Menu, X, ChevronLeft, Circle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { ThemeToggle } from '@/components/ui'

interface NavItemProps {
  href: string
  label: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  isRouterLink?: boolean
  isActive?: boolean
}

// Componente para item de navegação desktop
const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  onClick,
  isRouterLink = false,
  isActive = false,
}) => {
  const baseClasses = `relative rounded-md px-3 py-2 text-sm transition-all duration-300 sm:text-base lg:text-lg ${
    isActive
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold dark:from-blue-400 dark:to-purple-400'
      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent dark:text-gray-300 dark:hover:from-blue-400 dark:hover:to-purple-400'
  }`

  const activeIndicator = isActive && (
    <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400" />
  )

  if (isRouterLink) {
    return (
      <Link href={href} className={baseClasses}>
        {label}
        {activeIndicator}
      </Link>
    )
  }

  return (
    <a href={href} onClick={onClick} className={baseClasses}>
      {label}
      {activeIndicator}
    </a>
  )
}

interface MobileNavItemProps {
  href: string
  label: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  isRouterLink?: boolean
  isActive?: boolean
}

// Componente para item de navegação mobile
const MobileNavItem: React.FC<MobileNavItemProps> = ({
  href,
  label,
  onClick,
  isRouterLink = false,
  isActive = false,
}) => {
  const baseClasses = `relative flex items-center rounded-md px-4 py-3 text-lg font-medium transition-all duration-300 sm:text-xl ${
    isActive
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold border-l-4 border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20 dark:from-blue-400 dark:to-purple-400'
      : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-blue-50 dark:text-white dark:hover:from-blue-400 dark:hover:to-purple-400 dark:focus:ring-blue-400 dark:hover:bg-blue-900/20'
  }`

  const activeIndicator = isActive && (
    <Circle className="ml-auto h-2 w-2 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" />
  )

  if (isRouterLink) {
    return (
      <li>
        <Link href={href} className={baseClasses}>
          {label}
          {activeIndicator}
        </Link>
      </li>
    )
  }

  return (
    <li>
      <a href={href} onClick={onClick} className={baseClasses}>
        {label}
        {activeIndicator}
      </a>
    </li>
  )
}

interface LanguageButtonProps {
  language: string
  currentLanguage: string
  onClick: () => void
  icon: string
  label: string
  ariaLabel: string
}

// Componente para seletor de idioma
const LanguageButton: React.FC<LanguageButtonProps> = ({
  language,
  currentLanguage,
  onClick,
  icon,
  label,
  ariaLabel,
}) => {
  const isActive = currentLanguage === language

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`group relative overflow-hidden rounded-full p-1 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-400 ${
        isActive ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
      }`}
    >
      <span className="sr-only">{label}</span>
      <Image
        src={icon}
        alt={label}
        width={24}
        height={24}
        className={`rounded-full ${
          isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
        } transition-opacity duration-300`}
      />
    </button>
  )
}

interface HeaderProps {
  showBackHome?: boolean
}

const Header: React.FC<HeaderProps> = ({ showBackHome = false }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('#home')
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const router = useRouter()
  const { t, i18n } = useTranslation('sections/header')
  const [language, setLanguage] = useState<string>(router.locale || 'pt')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Toggle menu com controle de overflow no body
  const toggleMenu = useCallback(() => {
    setMenuOpen((prevState) => {
      const newState = !prevState
      if (newState) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
      return newState
    })
  }, [])

  // Fecha o menu
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    document.body.classList.remove('overflow-hidden')
  }, [])

  // Manipular mudança de idioma utilizando o i18n e o router
  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng)
      setLanguage(lng)
      localStorage.setItem('i18nextLng', lng)

      // Mudar o locale usando o router (isso força o Next.js a recarregar a página com o novo idioma)
      const { pathname, asPath, query } = router
      router.push({ pathname, query }, asPath, { locale: lng })
    },
    [i18n, router],
  )

  // Navegar e fechar menu (para itens de menu móvel)
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (menuOpen) {
        closeMenu()
      }

      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Pequeno delay para garantir que o menu está fechado primeiro
          setTimeout(
            () => {
              window.scrollTo({
                top: targetElement.offsetTop - 70, // Ajuste para o cabeçalho fixo
                behavior: 'smooth',
              })
            },
            menuOpen ? 300 : 0,
          )
        }
      }
    },
    [menuOpen, closeMenu],
  )

  // Lista de itens de navegação
  const navItems = useMemo(() => {
    if (showBackHome) {
      return []
    }
    return [
      { href: '#home', label: t('menu.home') },
      { href: '#about', label: t('menu.about') },
      { href: '#services', label: t('menu.services') },
      { href: '#skills', label: t('menu.skills') },
      { href: '#projects', label: t('menu.portfolio') },
      { href: '#timeline', label: t('menu.timeline') },
      { href: '#contact', label: t('menu.contact') },
    ]
  }, [showBackHome, t])

  // Garante que o body nunca fique travado ao montar o Header
  useEffect(() => {
    document.body.classList.remove('overflow-hidden')
  }, [])

  // Detectar scroll para mostrar/ocultar cabeçalho, alterar background e calcular progresso
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 10)

      // Calcular progresso do scroll
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollY / windowHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))

      // Detectar seção ativa
      const sections = [
        '#home',
        '#about',
        '#services',
        '#skills',
        '#projects',
        '#timeline',
        '#contact',
      ]
      let currentSection = '#home'

      for (const section of sections) {
        const element = document.querySelector(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detecta clique fora do menu mobile
  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      const isMenuButton = menuButtonRef.current?.contains(event.target as Node)
      const isInMenu = mobileMenuRef.current?.contains(event.target as Node)
      if (!isMenuButton && !isInMenu) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener(
      'touchstart',
      handleClickOutside as unknown as EventListener,
    )
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener(
        'touchstart',
        handleClickOutside as unknown as EventListener,
      )
    }
  }, [menuOpen, closeMenu])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 right-0 left-0 z-50 py-2 transition-all duration-300 md:py-3 ${
        isScrolled || menuOpen
          ? 'bg-white/90 shadow-sm backdrop-blur-lg dark:bg-slate-900/90'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {showBackHome && (
              <Link
                href="/"
                className="mr-4 flex items-center text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <ChevronLeft className="mr-1 h-5 w-5" />
                <span className="text-sm font-medium">Voltar</span>
              </Link>
            )}

            <Link href="/" className="relative flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent sm:text-xl lg:text-2xl dark:from-blue-400 dark:to-purple-400">
                JR
              </span>
              <span className="absolute right-0 -bottom-0.5 left-0 h-[2px] origin-left scale-x-0 transform bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 group-hover:scale-x-100 dark:from-blue-400 dark:to-purple-400"></span>
            </Link>
          </div>

          {/* Nav Desktop */}
          {!showBackHome && (
            <nav className="hidden items-center space-x-6 lg:flex xl:space-x-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={handleNavClick}
                  isActive={activeSection === item.href}
                />
              ))}
            </nav>
          )}

          {/* Controles - Tema e Idioma */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Seletor de idioma */}
            <div className="mr-1 flex items-center gap-2">
              <LanguageButton
                language="pt"
                currentLanguage={language}
                onClick={() => changeLanguage('pt')}
                icon="/assets/images/icons/brazil.svg"
                label={t('header.portuguese')}
                ariaLabel={t('header.portuguese_language')}
              />
              <LanguageButton
                language="en"
                currentLanguage={language}
                onClick={() => changeLanguage('en')}
                icon="/assets/images/icons/eua.svg"
                label={t('header.english')}
                ariaLabel={t('header.english_language')}
              />
            </div>

            {/* Seletor de Tema */}
            <ThemeToggle variant="dropdown" size="md" />

            {/* Botão Menu Mobile */}
            <div className="lg:hidden">
              <button
                ref={menuButtonRef}
                onClick={toggleMenu}
                aria-label={
                  menuOpen ? t('header.close_menu') : t('header.open_menu')
                }
                className="rounded-lg p-2 text-gray-700 transition-colors hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-300 dark:hover:text-blue-400 dark:focus:ring-blue-400"
              >
                {menuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150 ease-out dark:from-blue-400 dark:to-purple-400"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden dark:bg-slate-900 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header do menu */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
            Menu
          </span>
          <button
            onClick={closeMenu}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
            aria-label="Fechar menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Conteúdo do menu */}
        <div className="flex h-full flex-col overflow-y-auto px-6 py-6">
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={handleNavClick}
                  isActive={activeSection === item.href}
                />
              ))}
            </ul>
          </nav>

          {/* Footer do menu com controles de tema e idioma */}
          <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Idioma
                </span>
                <div className="flex items-center gap-2">
                  <LanguageButton
                    language="pt"
                    currentLanguage={language}
                    onClick={() => changeLanguage('pt')}
                    icon="/assets/images/icons/brazil.svg"
                    label={t('header.portuguese')}
                    ariaLabel={t('header.portuguese_language')}
                  />
                  <LanguageButton
                    language="en"
                    currentLanguage={language}
                    onClick={() => changeLanguage('en')}
                    icon="/assets/images/icons/eua.svg"
                    label={t('header.english')}
                    ariaLabel={t('header.english_language')}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tema
                </span>
                <ThemeToggle variant="dropdown" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
