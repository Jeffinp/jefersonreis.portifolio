import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

function Header({ toggleDarkMode, darkMode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.style.overflow = menuOpen ? '' : 'hidden'; // Bloqueia/desbloqueia o scroll
    };

    // Função para fechar o menu e liberar o scroll
    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = ''; // Libera o scroll
    };

    // Alterar o tema com base no estado darkMode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark'); // Ativa o modo escuro
        } else {
            document.documentElement.classList.remove('dark'); // Desativa o modo escuro
        }
    }, [darkMode]);

    return (
        <header role="banner" className="header">
            <div className="container header__container">
                <a href="#" className="header__logo" aria-label="Logo de Jeferson Reis">JR</a>

                <button 
                    className={`header__menu-toggle ${menuOpen ? 'active' : ''}`} 
                    aria-label="Abrir menu" 
                    aria-expanded={menuOpen ? 'true' : 'false'} 
                    onClick={toggleMenu}
                >
                    <span className="header__menu-icon"></span>
                </button>

                <nav id="header-nav" className={`header__nav ${menuOpen ? 'open' : ''}`} aria-label="Navegação principal">
                    <ul className="header__nav-list">
                        <li className="header__nav-item"><a href="#home" className="header__nav-link" onClick={closeMenu}>Início</a></li>
                        <li className="header__nav-item"><a href="#about" className="header__nav-link" onClick={closeMenu}>Sobre</a></li>
                        <li className="header__nav-item"><a href="#atuacao" className="header__nav-link" onClick={closeMenu}>Áreas de Atuação</a></li>
                        <li className="header__nav-item"><a href="#skills" className="header__nav-link" onClick={closeMenu}>Habilidades</a></li>
                        <li className="header__nav-item"><a href="#portfolio" className="header__nav-link" onClick={closeMenu}>Portfólio</a></li>
                        <li className="header__nav-item"><a href="#resume" className="header__nav-link" onClick={closeMenu}>Currículo</a></li>
                        <li className="header__nav-item"><a href="#contact" className="header__nav-link" onClick={closeMenu}>Contato</a></li>
                    </ul>
                </nav>

                <div className="header__actions">
                    <div className="language-switch">
                        <a href="index.html" data-lang="pt" aria-label="Português" className="language-switch__link">
                            <img 
                                src="https://img.icons8.com/?size=100&id=Mf5IDKBchhlr&format=png&color=000000" 
                                alt="Português" 
                                className="language-switch__icon" 
                                width="25" 
                                height="25" 
                            />
                            PT
                        </a>
                        <a href="index-en.html" data-lang="en" aria-label="English" className="language-switch__link">
                            <img 
                                src="https://img.icons8.com/?size=100&id=15532&format=png&color=000000" 
                                alt="Inglês" 
                                className="language-switch__icon" 
                                width="25" 
                                height="25" 
                            />
                            EN
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
