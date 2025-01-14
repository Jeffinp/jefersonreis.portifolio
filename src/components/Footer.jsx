import React from 'react';
import { Linkedin, Github, Instagram, MessageCircle } from 'lucide-react';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__content">
                    <div className="footer__logo">
                        <h2 className="footer__logo-text">
                            <a href="#" className="footer__logo-link">
                                <span className="footer__logo-highlight">{'<'}</span>
                                Jeferson Reis
                                <span className="footer__logo-highlight">{'/>'}</span>
                            </a>
                        </h2>
                        <p className="footer__logo-subtitle">
                            Desenvolvedor Web Full Stack | Designer Gráfico | Técnico em Informática
                        </p>
                    </div>

                    <div className="footer__social">
                        <h3 className="footer__social-title">Conecte-se</h3>
                        <ul className="footer__social-list">
                            <li className="footer__social-item">
                                <a href="https://www.linkedin.com/in/jeferson-reis-877a942b7/"
                                    target="_blank"
                                    rel="noopener"
                                    title="LinkedIn de Jeferson Reis Almeida"
                                    className="footer__social-link linkedin">
                                    <Linkedin size={20} />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href="https://github.com/Jeffinp"
                                    target="_blank"
                                    rel="noopener"
                                    title="GitHub de Jeferson Reis Almeida"
                                    className="footer__social-link github">
                                    <Github size={20} />
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href="https://www.instagram.com/jeffinx___/"
                                    target="_blank"
                                    rel="noopener"
                                    title="Instagram de Jeferson Reis Almeida"
                                    className="footer__social-link instagram">
                                    <Instagram size={20} />
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href="https://wa.me/qr/KW2XXA46XAXNH1"
                                    target="_blank"
                                    rel="noopener"
                                    title="WhatsApp de Jeferson Reis Almeida"
                                    className="footer__social-link whatsapp">
                                    <MessageCircle size={20} />
                                    <span className="sr-only">WhatsApp</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copy">
                        &copy; {new Date().getFullYear()} Jeferson Reis. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;