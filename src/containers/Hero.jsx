// src/containers/Hero.jsx
import React, { useEffect } from "react";
import "../styles/Hero.css";

function Hero() {
    useEffect(() => {
        // Configuração do particles.js após a montagem do componente
        window.particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: "#ffffff",
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000",
                    },
                    polygon: {
                        nb_sides: 5,
                    },
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 40,
                        size_min: 0.1,
                        sync: false,
                    },
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                },
            },
            interactivity: {
                detect_on: "window",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse",
                    },
                    onclick: {
                        enable: true,
                        mode: "push",
                    },
                    resize: true,
                },
            },
            retina_detect: true,
        });
    }, []);

    return (
        <section id="home" className="hero" aria-labelledby="heroTitle">
            <div id="particles-js" className="particles-wrapper"></div>
            <div className="hero__container">
                <div className="hero__content">
                    <img
                        src="/assets/images/Linkedin-foto.webp"
                        alt="Foto de Jeferson Reis, desenvolvedor web full-stack"
                        className="hero__profile-pic"
                        loading="eager"
                        width="300"
                        height="300"
                    />
                    <h1 id="heroTitle" className="hero__title" data-aos="fade-up">
                        Jeferson Reis Almeida
                    </h1>
                    <p className="hero__subtitle" data-aos="fade-up" data-aos-delay="200">
                        Desenvolvedor Full-Stack | Designer Gráfico | Técnico em Informática |{" "}
                        <strong>Transformando Ideias em Realidade</strong> ✨
                    </p>
                    <div className="hero__cta-buttons" data-aos="fade-up" data-aos-delay="400">
                        <a href="#portfolio" className="button hero__cta">
                            <span
                                className="iconify"
                                data-icon="akar-icons:arrow-right"
                                aria-hidden="true"
                            ></span>
                            Ver Meus Projetos
                        </a>
                        <a href="#contact" className="button button--secondary hero__cta">
                            <span
                                className="iconify"
                                data-icon="mdi:email-outline"
                                aria-hidden="true"
                            ></span>
                            Entrar em Contato
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
