import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Header = ({ toggleDarkMode, darkMode }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { i18n, t } = useTranslation();
    const mobileMenuRef = useRef(null);
    const menuButtonRef = useRef(null);

    // Controle do overflow do body
    const bodyStyleOverflow = useCallback((isHidden) => {
        document.body.classList.toggle('overflow-hidden', isHidden);
    }, []);

    // Toggle usando estado anterior para evitar race conditions
    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => {
            const newState = !prev;
            bodyStyleOverflow(newState);
            return newState;
        });
    }, [bodyStyleOverflow]);

    // Fechamento completo do menu
    const closeMenu = useCallback(() => {
        setMenuOpen(false);
        bodyStyleOverflow(false);
        menuButtonRef.current?.focus();
    }, [bodyStyleOverflow]);

    // Controle do tema dark
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    // Troca de idioma
    const changeLanguage = useCallback((lng) => {
        i18n.changeLanguage(lng);
    }, [i18n]);

    // Detecta clique fora do menu mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!menuOpen) return;
            
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

    // Controle do scroll progressivo e direção
    useEffect(() => {
        const handleScroll = () => {
            // Calcula progresso do scroll
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            setScrollProgress(scrolled);

            // Detecta direção do scroll
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100 && !menuOpen) {
                setIsScrollingDown(true);
            } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
                setIsScrollingDown(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, menuOpen]);

    return (
        <>
            {/* Barra de progresso do scroll */}
            <div className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 z-50 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
            />

            <header className={`fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 shadow-lg dark:shadow-slate-800/20 backdrop-blur-sm transition-transform duration-300 ${
                isScrollingDown ? '-translate-y-full' : 'translate-y-0'
            }`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a
                            href="/"
                            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight"
                            aria-label={t("header.logo_aria")}
                        >
                            JR
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-16">
                            {['home', 'about', 'areas', 'skills', 'portfolio', 'resume', 'contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item}`}
                                    className="text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 hover:bg-clip-text transition-colors duration-300 px-1 py-0.5 rounded-md"
                                >
                                    {t(`menu.${item}`)}
                                </a>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Language Switcher */}
                            <div className="flex items-center space-x-2 border-r border-gray-200 dark:border-gray-700 pr-4">
                                <button
                                    onClick={() => changeLanguage('pt')}
                                    className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                                        i18n.language === 'pt'
                                            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                                            : 'text-gray-600 dark:text-gray-400'
                                    }`}
                                    aria-label={t("header.portuguese_language")}
                                >
                                    <img
                                        src="/assets/images/icon/brazil.svg"
                                        alt={t("header.portuguese")}
                                        className="w-5 h-5 rounded-sm"
                                    />
                                    <span>PT</span>
                                </button>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                                        i18n.language === 'en'
                                            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                                            : 'text-gray-600 dark:text-gray-400'
                                    }`}
                                    aria-label={t("header.english_language")}
                                >
                                    <img
                                        src="/assets/images/icon/eua.svg"
                                        alt={t("header.english")}
                                        className="w-5 h-5 rounded-sm"
                                    />
                                    <span>EN</span>
                                </button>
                            </div>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                aria-label={t("header.toggle_dark_mode")}
                            >
                                {darkMode ? (
                                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                ) : (
                                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                ref={menuButtonRef}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                onClick={toggleMenu}
                                aria-expanded={menuOpen}
                                aria-label={t("header.navigation_menu")}
                            >
                                {menuOpen ? (
                                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 z-20 md:hidden"
                        onClick={closeMenu}
                        aria-hidden="true"
                    />
                )}

                {/* Mobile Menu */}
                <div
                    ref={mobileMenuRef}
                    className={`fixed top-20 right-0 w-64 h-[calc(100vh-5rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg z-30 transition-transform duration-300 ease-in-out ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden`}
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="flex flex-col h-full px-6 pt-6">
                        <nav className="flex-1">
                            <ul className="space-y-10">
                                {['home', 'about', 'areas', 'skills', 'portfolio', 'resume', 'contact'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href={`#${item}`}
                                            onClick={closeMenu}
                                            className="block text-xl font-medium text-gray-900 dark:text-white hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 hover:bg-clip-text transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 py-2 px-2 rounded-md"
                                        >
                                            {t(`menu.${item}`)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;