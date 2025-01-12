import React, { useState, useEffect } from 'react';
import { debounce, smoothScroll } from '../utils'; // Importe as funções utilitárias
import '../styles/ScrollToTopBtn.css'; 

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        const debouncedToggleVisibility = debounce(toggleVisibility, 100);
        window.addEventListener('scroll', debouncedToggleVisibility);
        return () => window.removeEventListener('scroll', debouncedToggleVisibility);
    }, []);

    return (
        <button 
            id="scrollToTopBtn" 
            className={isVisible ? 'show' : ''} 
            onClick={() => smoothScroll(0)}
            title="Voltar ao Topo" // Adicione um título para acessibilidade
            aria-label="Voltar ao Topo" // Adicione um aria-label para acessibilidade
        >
            <span class="iconify" data-icon="mdi:chevron-up" style={{ color: '#ffffff' }} data-width="50"></span>
        </button>
    );
};

export default ScrollToTopButton;