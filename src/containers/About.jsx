import React from "react";
import "../styles/about.css";

function About() {
    return (
        <section className="section about" id="about" aria-labelledby="aboutTitle">
            <div className="container">
                <h2 id="aboutTitle" className="section__title about__title">Sobre mim</h2>
                <div className="about__content grid">
                    <article className="about__item">
                        <span className="iconify about__icon" data-icon="mdi:account" aria-hidden="true"></span>
                        <div className="about__item-content">
                            <p className="about__item-description">
                                Olá! Sou Jeferson Reis, um jovem desenvolvedor full-stack, designer gráfico e técnico em informática de Camaçari, Bahia.
                                Minha jornada começou com a criação de jogos em C#, despertando meu interesse por programação, design e tecnologia.
                                Atualmente, combino habilidades em React e Node.js para criar soluções web inovadoras, sempre priorizando a experiência do usuário (UX).
                                Minha paixão por design gráfico me permite criar identidades visuais marcantes, incluindo logotipos, banners e materiais para redes sociais.
                                Também ofereço serviços de suporte técnico, manutenção de computadores e otimização de sistemas, ajudando empresas a aumentar sua eficiência através de soluções personalizadas e automação de processos.
                                Estou sempre em busca de novos desafios e colaborações. Vamos conversar sobre como posso ajudar a concretizar seus projetos, combinando tecnologia, design e inovação!
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default About;
