import React from 'react';
import '../styles/Footer.css'; // Importe o CSS do Footer

function Footer() {
    return (
        
    <footer class="footer">
    <div class="footer__container">
        <div class="footer__content">
            <div class="footer__logo">
                <h2 class="footer__logo-text">
                    <a href="#" class="footer__logo-link">Jeferson Reis</a>
                </h2>
                <p class="footer__logo-subtitle">Desenvolvedor Web Full Stack | Designer Gráfico | Técnico em Informática</p>
            </div>

            <div class="footer__social">
                <h3 class="footer__social-title">Conecte-se</h3>
                <ul class="footer__social-list">
                    <li class="footer__social-item">
                        <a href="https://www.linkedin.com/in/jeferson-reis-877a942b7/" target="_blank" rel="noopener" title="LinkedIn de Jeferson Reis Almeida" class="footer__social-link">
                            <span class="iconify" data-icon="mdi:linkedin" aria-hidden="true"></span>
                            <span class="sr-only">LinkedIn</span>
                        </a>
                    </li>
                    <li class="footer__social-item">
                        <a href="https://github.com/Jeffinp" target="_blank" rel="noopener" title="GitHub de Jeferson Reis Almeida" class="footer__social-link">
                            <span class="iconify" data-icon="mdi:github" aria-hidden="true"></span>
                            <span class="sr-only">GitHub</span>
                        </a>
                    </li>
                    <li class="footer__social-item">
                        <a href="https://www.instagram.com/jeffinx___/" target="_blank" rel="noopener" title="Instagram de Jeferson Reis Almeida" class="footer__social-link">
                            <span class="iconify" data-icon="mdi:instagram" aria-hidden="true"></span>
                            <span class="sr-only">Instagram</span>
                        </a>
                    </li>
                    <li class="footer__social-item">
                        <a href="https://wa.me/qr/KW2XXA46XAXNH1" target="_blank" rel="noopener" title="WhatsApp de Jeferson Reis Almeida" class="footer__social-link">
                            <span class="iconify" data-icon="mdi:whatsapp" aria-hidden="true"></span>
                            <span class="sr-only">WhatsApp</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="footer__bottom">
            <p class="footer__copy">&copy; 2024 Jeferson Reis. Todos os direitos reservados.</p>
        </div>
    </div>
</footer>
    );
}

export default Footer;