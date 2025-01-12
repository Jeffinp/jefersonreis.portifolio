import React from 'react';
import '../styles/Header.css';

function Header() {
    return (
        <header role="banner" class="header">
        <div class="container header__container">
            <a href="#" class="header__logo" aria-label="Logo de Jeferson Reis">JR</a>

            <button class="header__menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="header-nav">
                <span class="header__menu-icon"></span>
            </button>

            <nav id="header-nav" class="header__nav" aria-label="Navegação principal">
                <ul class="header__nav-list">
                    <li class="header__nav-item"><a href="#home" class="header__nav-link">Início</a></li>
                    <li class="header__nav-item"><a href="#about" class="header__nav-link">Sobre</a></li>
                    <li class="header__nav-item"><a href="#atuacao" class="header__nav-link">Áreas de Atuação</a></li>
                    <li class="header__nav-item"><a href="#skills" class="header__nav-link">Habilidades</a></li>
                    <li class="header__nav-item"><a href="#portfolio" class="header__nav-link">Portfólio</a></li>
                    <li class="header__nav-item"><a href="#resume" class="header__nav-link">Currículo</a></li>
                    <li class="header__nav-item"><a href="#contact" class="header__nav-link">Contato</a></li>
                </ul>
            </nav>

            <div class="header__actions">
                <div class="language-switch">
                    <a href="index.html" data-lang="pt" aria-label="Português" class="language-switch__link">
                        <img src="https://img.icons8.com/?size=100&id=Mf5IDKBchhlr&format=png&color=000000" alt="Português" class="language-switch__icon" width="25" height="25"/>PT
                    </a>
                    <a href="index-en.html" data-lang="en" aria-label="English" class="language-switch__link">
                        <img src="https://img.icons8.com/?size=100&id=15532&format=png&color=000000" alt="Inglês" class="language-switch__icon" width="25" height="25"/>EN
                    </a>
                </div>
                <button id="darkModeToggle" class="header__dark-mode-toggle" aria-label="Alternar modo escuro">
                    <span id="darkModeIcon" class="iconify" data-icon="mdi:white-balance-sunny" data-inline="false"></span>
                </button>
            </div>
        </div>
    </header>
    );
}

export default Header;