import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Componente para item de navegação desktop
const NavItem = ({ href, label, onClick }) => (
    <a
        href={href}
        onClick={onClick}
        className="text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 hover:bg-clip-text transition-colors duration-300 px-1 py-0.5 rounded-md"
    >
        {label}
    </a>
);

// Componente para item de navegação mobile
const MobileNavItem = ({ href, label, onClick }) => (
    <li>
        <a
            href={href}
            onClick={onClick}
            className="block text-xl font-medium text-gray-900 dark:text-white hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 hover:bg-clip-text transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 py-2 px-2 rounded-md"
        >
            {label}
        </a>
    </li>
);

// Componente para seletor de idioma
const LanguageButton = ({ language, currentLanguage, onClick, icon, label, ariaLabel }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${currentLanguage === language
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-400'
            }`}
        aria-label={ariaLabel}
    >
        <img
            src={icon}
            alt={label}
            className="w-5 h-5 rounded-sm"
            loading="lazy"
        />
        <span>{language.toUpperCase()}</span>
    </button>
);

const Header = ({ toggleDarkMode, darkMode }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { i18n, t } = useTranslation();
    const mobileMenuRef = useRef(null);
    const menuButtonRef = useRef(null);
    const headerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const throttleTimeout = useRef(null);

    // Toggle menu com controle de overflow no body
    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => {
            const newState = !prev;
            document.body.classList.toggle('overflow-hidden', newState);
            return newState;
        });
    }, []);

    // Fechar menu
    const closeMenu = useCallback(() => {
        setMenuOpen(false);
        document.body.classList.remove('overflow-hidden');
        menuButtonRef.current?.focus();
    }, []);

    // Mudar idioma
    const changeLanguage = useCallback((lng) => {
        i18n.changeLanguage(lng);
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
    const navItems = useMemo(() =>
        ['home', 'about', 'areas', 'skills', 'portfolio', 'resume', 'contact'].map(item => ({
            href: `#${item}`,
            label: t(`menu.${item}`)
        })),
        [t]);

    // Atualizar o tema quando o estado mudar
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    // Garante que o body nunca fique travado ao montar o Header
    useEffect(() => {
        document.body.classList.remove('overflow-hidden');
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

    // CORREÇÃO: Implementação otimizada do controle de visibilidade do header durante o scroll
    useEffect(() => {
        // Inicializa com o valor atual de scroll
        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            // Sem throttle para garantir responsividade imediata
            const currentScrollY = window.scrollY;
            
            // Determina se está descendo a página (true) ou subindo (false)
            const isScrollingDown = currentScrollY > lastScrollY.current;
            
            // Se estiver descendo E já tiver passado do limiar de 80px, esconde o header
            // Se estiver subindo OU ainda não passou do limiar, mostra o header
            if (isScrollingDown && currentScrollY > 80) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            // Atualiza a referência para a próxima comparação
            lastScrollY.current = currentScrollY;
        };

        // Atualiza o progresso do scroll separadamente
        const handleScrollProgress = () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (windowHeight > 0) {
                setScrollProgress((window.scrollY / windowHeight) * 100);
            }
        };

        // Adiciona os event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('scroll', handleScrollProgress, { passive: true });

        // Limpa os listeners quando o componente é desmontado
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScrollProgress);
        };
    }, []); // Remove a dependência em isVisible para evitar recriações desnecessárias do listener

    return (
        <>
            {/* Barra de progresso do scroll */}
            <div
                className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 z-50 transition-transform duration-300"
                style={{ width: `${scrollProgress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(scrollProgress)}
                aria-valuemin="0"
                aria-valuemax="100"
            />

            <header
                ref={headerRef}
                style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
                className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 shadow-lg dark:shadow-slate-800/20 backdrop-blur-sm will-change-transform transition-transform duration-300 ease-in-out"
            >
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
                        <nav className="hidden md:flex items-center justify-center gap-8">
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
                        <div className="flex items-center space-x-4">
                            {/* Language Switcher */}
                            <div className="flex items-center space-x-2 border-r border-gray-200 dark:border-gray-700 pr-4">
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

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                aria-label={darkMode ? t("header.toggle_light_mode") : t("header.toggle_dark_mode")}
                                aria-pressed={darkMode}
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                ref={menuButtonRef}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                onClick={toggleMenu}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-menu"
                                aria-label={menuOpen ? t("header.close_menu") : t("header.open_menu")}
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
                    id="mobile-menu"
                    ref={mobileMenuRef}
                    className={`fixed top-20 right-0 w-64 h-[calc(100vh-5rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg z-30 transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                        } md:hidden`}
                    aria-hidden={!menuOpen}
                >
                    <div className="flex flex-col h-full px-6 pt-6">
                        <nav className="flex-1">
                            <ul className="space-y-10">
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
        </>
    );
};

export default React.memo(Header);