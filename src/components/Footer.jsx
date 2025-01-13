import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__content">
                    <div className="footer__logo">
                        <h2 className="footer__logo-text">
                            <a href="#" className="footer__logo-link">Jeferson Reis</a>
                        </h2>
                        <p className="footer__logo-subtitle">Desenvolvedor Web Full Stack | Designer Gráfico | Técnico em Informática</p>
                    </div>

                    <div className="footer__social">
                        {/* Seção de Conexão Social */}
                        <h3 className="footer__social-title">Conecte-se</h3>
                        <ul className="footer__social-list">
                            {/* LinkedIn */}
                            <li className="footer__social-item">
                                <a href="https://www.linkedin.com/in/jeferson-reis-877a942b7/" target="_blank" rel="noopener" title="LinkedIn de Jeferson Reis Almeida" className="footer__social-link">
                                    <span className="iconify" data-icon="mdi:linkedin" aria-hidden="true"></span>
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </li>
                            {/* GitHub */}
                            <li className="footer__social-item">
                                <a href="https://github.com/Jeffinp" target="_blank" rel="noopener" title="GitHub de Jeferson Reis Almeida" className="footer__social-link">
                                    <span className="iconify" data-icon="mdi:github" aria-hidden="true"></span>
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </li>
                            {/* Instagram */}
                            <li className="footer__social-item">
                                <a href="https://www.instagram.com/jeffinx___/" target="_blank" rel="noopener" title="Instagram de Jeferson Reis Almeida" className="footer__social-link">
                                    <span className="iconify" data-icon="mdi:instagram" aria-hidden="true"></span>
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </li>
                            {/* WhatsApp */}
                            <li className="footer__social-item">
                                <a href="https://wa.me/qr/KW2XXA46XAXNH1" target="_blank" rel="noopener" title="WhatsApp de Jeferson Reis Almeida" className="footer__social-link">
                                    <span className="iconify" data-icon="mdi:whatsapp" aria-hidden="true"></span>
                                    <span className="sr-only">WhatsApp</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Seção inferior do footer */}
                <div className="footer__bottom">
                    <p className="footer__copy">&copy; 2024 Jeferson Reis. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
