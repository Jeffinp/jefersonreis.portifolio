import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "../styles/Hero.css";

function Hero() {
    const { t } = useTranslation();

    useEffect(() => {
        try {
            window.particlesJS("particles-js", {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: {
                        value: 0.5,
                        random: false,
                        animation: { enable: true, speed: 1, opacity_min: 0.1 }
                    },
                    size: {
                        value: 3,
                        random: true,
                        animation: { enable: true, speed: 2, size_min: 0.1 }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        repulse: { distance: 100, duration: 0.4 },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        } catch (error) {
            console.error("Erro ao inicializar o particles.js:", error);
        }
    }, []);

    return (
        <section id="home" className="hero" aria-labelledby="heroTitle">
            <div id="particles-js" className="particles-wrapper" aria-hidden="true"></div>
            <div className="hero__container">
                <div className="hero__content">
                    <div className="hero__profile-wrapper">
                        <img
                            src="/assets/images/Linkedin-foto.webp"
                            alt={t('hero.profileAlt')}
                            className="hero__profile-pic"
                            loading="eager"
                            width="300"
                            height="300"
                        />
                    </div>
                    <h1 id="heroTitle" className="hero__title">
                        {t('hero.title')}
                    </h1>
                    <p className="hero__subtitle">
                        {t('hero.subtitle')}
                        <strong>{t('hero.transforming')}</strong> ✨
                    </p>
                    <div className="hero__cta-buttons">
                        <a href="#portfolio" className="hero__button">
                            <span className="hero__button-icon">→</span>
                            {t('hero.buttons.viewProjects')}
                        </a>
                        <a href="#contact" className="hero__button hero__button--outline">
                            <span className="hero__button-icon">✉</span>
                            {t('hero.buttons.contact')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;