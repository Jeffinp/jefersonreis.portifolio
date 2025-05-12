import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Menu, X, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

// Componente para item de navegação desktop
const NavItem = ({ href, label, onClick, isRouterLink }) => {
    if (isRouterLink) {
        return (
            <Link
                to={href}
                className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 hover:bg-clip-text transition-colors duration-300 px-1 py-0.5 rounded-md"
            >
                {label}
            </Link>
        );
    }

    return (
        <a
            href={href}
            onClick={onClick}
            className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 hover:bg-clip-text transition-colors duration-300 px-1 py-0.5 rounded-md"
        >
            {label}
        </a>
    );
};

// Componente para item de navegação mobile
const MobileNavItem = ({ href, label, onClick, isRouterLink }) => {
    if (isRouterLink) {
        return (
            <li>
                <Link
                    to={href}
                    className="block text-lg sm:text-xl font-medium text-gray-900 dark:text-white hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 hover:bg-clip-text transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 py-2 px-2 rounded-md"
                >
                    {label}
                </Link>
            </li>
        );
    }

    return (
        <li>
            <a
                href={href}
                onClick={onClick}
                className="block text-lg sm:text-xl font-medium text-gray-900 dark:text-white hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 hover:bg-clip-text transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 py-2 px-2 rounded-md"
            >
                {label}
            </a>
        </li>
    );
};

// Componente para seletor de idioma
const LanguageButton = ({ language, currentLanguage, onClick, icon, label, ariaLabel }) => {
    const isActive = currentLanguage === language;

    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={`relative group p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-full overflow-hidden ${isActive ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                }`}
        >
            <span className="sr-only">{label}</span>
            <img
                src={icon}
                alt={label}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                    } transition-opacity duration-300`}
            />
        </button>
    );
};

const Header = ({ darkMode, toggleDarkMode, showBackHome = false }) => {
    const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('i18nextLng') || 'pt';
    });
    const menuButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const headerRef = useRef(null);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    // Toggle menu com controle de overflow no body
    const toggleMenu = useCallback(() => {
        setMenuOpen((prevState) => {
            const newState = !prevState;
            if (newState) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
            return newState;
        });
    }, []);

    // Fecha o menu
    const closeMenu = useCallback(() => {
        setMenuOpen(false);
        document.body.classList.remove('overflow-hidden');
    }, []);

    // Manipular mudança de idioma e salvar no localStorage
    const changeLanguage = useCallback((lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    }, [i18n]);

    // Navegar e fechar menu (para itens de menu móvel)
    const handleNavClick = useCallback((e) => {
        if (menuOpen) {
            e.preventDefault();
            const href = e.currentTarget.getAttribute('href');
            closeMenu();
            setTimeout(() => {
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }, [menuOpen, closeMenu]);

    // Lista de itens de navegação
    const navItems = useMemo(() => {
        if (showBackHome) {
            return [];
        }

        return ['home', 'about', 'areas', 'skills', 'portfolio', 'ebooks-promo','contact'].map(item => ({
            href: `#${item}`,
            label: t(`menu.${item}`, item === 'ebooks-promo' ? 'eBooks' : '')
        }));
    }, [t, showBackHome]);

    // Atualizar o tema quando o estado mudar
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    // Garante que o body nunca fique travado ao montar o Header
    useEffect(() => {
        document.body.classList.remove('overflow-hidden');
    }, []);

    // Detectar scroll para mostrar/ocultar cabeçalho e alterar background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Detecta clique fora do menu mobile
    useEffect(() => {
        if (!menuOpen) return;
        const handleClickOutside = (event) => {
            const isMenuButton = menuButtonRef.current?.contains(event.target);
            const isInMenu = mobileMenuRef.current?.contains(event.target);
            if (!isMenuButton && !isInMenu) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [menuOpen, closeMenu]);

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 py-2 md:py-3 transition-all duration-300 ${isScrolled || menuOpen
                ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        {showBackHome && (
                            <Link
                                to="/"
                                className="flex items-center mr-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                <span className="text-sm font-medium">Voltar</span>
                            </Link>
                        )}

                        <Link to="/" className="relative flex items-center">
                            <span className="font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                                JR
                            </span>
                        </Link>
                    </div>

                    {showBackHome ? (
                        <div className="flex items-center gap-4">
                            <Link
                                to="/ebooks"
                                className="text-sm sm:text-base lg:text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors px-1 py-0.5"
                            >
                                {t('menu.ebooks', 'eBooks')}
                            </Link>

        
                        </div>
                    ) : (
                        <>
                            {/* Desktop Navigation - Escondido em mobile, visível a partir de md */}
                            <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 xl:gap-8">
                                {navItems.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        href={item.href}
                                        label={item.label}
                                        onClick={handleNavClick}
                                    />
                                ))}
                            </nav>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                                {/* Language Switcher */}
                                <div className="flex items-center space-x-3 sm:space-x-4 border-r border-gray-200 dark:border-gray-700 pr-2 sm:pr-3 md:pr-4">
                                    <LanguageButton
                                        language="pt"
                                        currentLanguage={i18n.language}
                                        onClick={() => changeLanguage('pt')}
                                        icon="/assets/images/icon/brazil.svg"
                                        label={t("header.portuguese")}
                                        ariaLabel={t("header.portuguese_language")}
                                    />
                                    <LanguageButton
                                        language="en"
                                        currentLanguage={i18n.language}
                                        onClick={() => changeLanguage('en')}
                                        icon="/assets/images/icon/eua.svg"
                                        label={t("header.english")}
                                        ariaLabel={t("header.english_language")}
                                    />
                                </div>


                                {/* Mobile Menu Button - Apenas visível em mobile */}
                                <button
                                    ref={menuButtonRef}
                                    onClick={toggleMenu}
                                    aria-expanded={menuOpen}
                                    aria-label={menuOpen ? t('general.closeMenu') : t('general.openMenu')}
                                    className="md:hidden p-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                >
                                    <span className="sr-only">{menuOpen ? t('general.closeMenu') : t('general.openMenu')}</span>
                                    {menuOpen ? (
                                        <X className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                                    ) : (
                                        <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Menu - Full Screen, deslizando de cima para baixo */}
                <div
                    ref={mobileMenuRef}
                    className={`absolute inset-x-0 top-16 md:hidden bg-white dark:bg-gray-900 shadow-lg z-50 overflow-hidden transition-all duration-300 ${menuOpen
                        ? 'max-h-[calc(100vh-4rem)] opacity-100 visible'
                        : 'max-h-0 opacity-0 invisible'
                        }`}
                >
                    <nav className="px-4 py-6">
                        <ul className="flex flex-col space-y-4">
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
    );
};

export default Header;