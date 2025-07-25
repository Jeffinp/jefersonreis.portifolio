import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Menu, X, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import ThemeToggle from '@/components/ThemeToggle'

interface NavItemProps {
  href: string
  label: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  isRouterLink?: boolean
}

// Componente para item de navegação desktop
const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  onClick,
  isRouterLink = false,
}) => {
  if (isRouterLink) {
    return (
      <Link
        href={href}
        className="rounded-md px-1 py-0.5 text-sm text-gray-700 transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent sm:text-base lg:text-lg dark:text-gray-300 dark:hover:from-blue-400 dark:hover:to-purple-400"
      >
        {label}
      </Link>
    )
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-md px-1 py-0.5 text-sm text-gray-700 transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent sm:text-base lg:text-lg dark:text-gray-300 dark:hover:from-blue-400 dark:hover:to-purple-400"
    >
      {label}
    </a>
  )
}

interface MobileNavItemProps {
  href: string
  label: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  isRouterLink?: boolean
}

// Componente para item de navegação mobile
const MobileNavItem: React.FC<MobileNavItemProps> = ({
  href,
  label,
  onClick,
  isRouterLink = false,
}) => {
  if (isRouterLink) {
    return (
      <li>
        <Link
          href={href}
          className="block rounded-md px-2 py-2 text-lg font-medium text-gray-900 transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-xl dark:text-white dark:hover:from-blue-400 dark:hover:to-purple-400 dark:focus:ring-blue-400"
        >
          {label}
        </Link>
      </li>
    )
  }

  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        className="block rounded-md px-2 py-2 text-lg font-medium text-gray-900 transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-xl dark:text-white dark:hover:from-blue-400 dark:hover:to-purple-400 dark:focus:ring-blue-400"
      >
        {label}
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
  const router = useRouter()
  const { t, i18n } = useTranslation('common')
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
      { href: '#ebooks-promo', label: t('menu.ebooks') },
      { href: '#contact', label: t('menu.contact') },
    ]
  }, [showBackHome, t])

  // Garante que o body nunca fique travado ao montar o Header
  useEffect(() => {
    document.body.classList.remove('overflow-hidden')
  }, [])

  // Detectar scroll para mostrar/ocultar cabeçalho e alterar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
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
              <span className="ml-1 hidden bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent sm:inline-block sm:text-xl lg:text-2xl dark:from-blue-400 dark:to-purple-400">
                Jeferson Reis
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
                icon="/assets/images/icon/brazil.svg"
                label={t('header.portuguese')}
                ariaLabel={t('header.portuguese_language')}
              />
              <LanguageButton
                language="en"
                currentLanguage={language}
                onClick={() => changeLanguage('en')}
                icon="/assets/images/icon/eua.svg"
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

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out lg:hidden dark:bg-slate-900/95 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 py-20">
          <nav>
            <ul className="flex flex-col items-center space-y-6">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={handleNavClick}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
