import React from "react";
import "../styles/Hero.css";
import ParticlesComponent from "../components/ParticlesComponent"; // Importe o componente Particles

function Hero() {
    return (
        <section id="home" className="hero parallax" aria-labelledby="heroTitle">
            <ParticlesComponent /> {/* Renderize o componente Particles aqui */}
            <div className="container hero__container">
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
                        Jeferson Reis Almeida CASDASDSA
                    </h1>
                    <p className="hero__subtitle" data-aos="fade-up" data-aos-delay="200">
                        Desenvolvedor Full-Stack | Designer Gráfico | Técnico em
                        Informática | <strong>Transformando Ideias em Realidade</strong> ✨
                    </p>
                    <div
                        className="hero__cta-buttons"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
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