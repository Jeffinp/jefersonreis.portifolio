import React from 'react';
import { Icon } from '@iconify/react';
import '../styles/Header.css';

function Header({ toggleDarkMode, darkMode }) {
    return (
        <header role="banner" className="header">
            <div className="container header__container">
                <a href="#" className="header__logo" aria-label="Logo de Jeferson Reis">JR</a>

                <button className="header__menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="header-nav">
                    <span className="header__menu-icon"></span>
                </button>

                <nav id="header-nav" className="header__nav" aria-label="Navegação principal">
                    <ul className="header__nav-list">
                        <li className="header__nav-item"><a href="#home" className="header__nav-link">Início</a></li>
                        <li className="header__nav-item"><a href="#about" className="header__nav-link">Sobre</a></li>
                        <li className="header__nav-item"><a href="#atuacao" className="header__nav-link">Áreas de Atuação</a></li>
                        <li className="header__nav-item"><a href="#skills" className="header__nav-link">Habilidades</a></li>
                        <li className="header__nav-item"><a href="#portfolio" className="header__nav-link">Portfólio</a></li>
                        <li className="header__nav-item"><a href="#resume" className="header__nav-link">Currículo</a></li>
                        <li className="header__nav-item"><a href="#contact" className="header__nav-link">Contato</a></li>
                    </ul>
                </nav>

                <div className="header__actions">
                    <div className="language-switch">
                        <a href="index.html" data-lang="pt" aria-label="Português" className="language-switch__link">
                            <img src="https://img.icons8.com/?size=100&id=Mf5IDKBchhlr&format=png&color=000000" alt="Português" className="language-switch__icon" width="25" height="25" />PT
                        </a>
                        <a href="index-en.html" data-lang="en" aria-label="English" className="language-switch__link">
                            <img src="https://img.icons8.com/?size=100&id=15532&format=png&color=000000" alt="Inglês" className="language-switch__icon" width="25" height="25" />EN
                        </a>
                    </div>
                    <button onClick={toggleDarkMode} className="header__dark-mode-toggle" aria-label="Alternar modo escuro">
                        <Icon
                            icon={darkMode ? 'mdi:weather-night' : 'mdi:white-balance-sunny'}
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
