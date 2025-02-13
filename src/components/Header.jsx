import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

function Header({ toggleDarkMode, darkMode }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { i18n, t } = useTranslation();

    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.style.overflow = menuOpen ? "" : "hidden";
    };

    // Função para fechar o menu e liberar o scroll
    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = "";
    };

    // Alterar o tema com base no estado darkMode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    // Função para mudar o idioma
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header role="banner" className="header">
            <div className="container header__container">
                <a href="#" className="header__logo" aria-label="Logo de Jeferson Reis">
                    JR
                </a>

                <button
                    className={`header__menu-toggle ${menuOpen ? "active" : ""}`}
                    aria-label="Abrir menu"
                    aria-expanded={menuOpen ? "true" : "false"}
                    onClick={toggleMenu}
                >
                    <span className="header__menu-icon"></span>
                </button>

                <nav
                    id="header-nav"
                    className={`header__nav ${menuOpen ? "open" : ""}`}
                    aria-label="Navegação principal"
                >
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <a href="#home" className="header__nav-link" onClick={closeMenu}>
                                {t("menu.home")}
                            </a>
                        </li>
                        <li className="header__nav-item">
                            <a href="#about" className="header__nav-link" onClick={closeMenu}>
                                {t("menu.about")}
                            </a>
                        </li>
                        <li className="header__nav-item">
                            <a
                                href="#atuacao"
                                className="header__nav-link"
                                onClick={closeMenu}
                            >
                                {t("menu.areas")}
                            </a>
                        </li>
                        <li className="header__nav-item">
                            <a
                                href="#skills"
                                className="header__nav-link"
                                onClick={closeMenu}
                            >
                                {t("menu.skills")}
                            </a>
                        </li>
                        <li className="header__nav-item">
                            <a
                                href="#portfolio"
                                className="header__nav-link"
                                onClick={closeMenu}
                            >
                                {t("menu.portfolio")}
                            </a>
                        </li>
                        <li className="header__nav-item">
                            <a
                                href="#resume"
                                className="header__nav-link"
                                onClick={closeMenu}
                            >
                                {t("menu.resume")}
                            </a>
                        </li>
                        <li className="header__nav-item">
                            <a
                                href="#contact"
                                className="header__nav-link"
                                onClick={closeMenu}
                            >
                                {t("menu.contact")}
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="header__actions">
                    <div className="language-switch">
                        <button
                            onClick={() => changeLanguage("pt")}
                            className={`language-switch__link ${i18n.language === "pt" ? "active" : ""
                                }`}
                            aria-label="Português"
                        >
                            <img
                                src="assets/images/icon/brazil.svg"
                                alt="Português"
                                className="language-switch__icon"
                                width="25"
                                height="25"
                            />
                            PT
                        </button>
                        <button
                            onClick={() => changeLanguage("en")}
                            className={`language-switch__link ${i18n.language === "en" ? "active" : ""
                                }`}
                            aria-label="English"
                        >
                            <img
                                src="assets/images/icon/eua.svg"
                                alt="English"
                                className="language-switch__icon"
                                width="25"
                                height="25"
                            />
                            EN
                        </button>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className="header__dark-mode-toggle"
                        aria-label="Alternar modo escuro"
                    >
                        <Icon
                            icon={darkMode ? "mdi:weather-night" : "mdi:white-balance-sunny"}
                            width={25}
                            height={25}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
