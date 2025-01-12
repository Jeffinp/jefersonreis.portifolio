import React from "react";
import "../styles/about.css";

function About() {
    return (
        <section class="section about" id="about" aria-labelledby="aboutTitle">
            <div class="container">
                <h2 id="aboutTitle" class="section__title about__title">Sobre mim</h2>
                <div class="about__content grid">

                    <article class="about__item">
                        <span class="iconify about__icon" data-icon="mdi:account" aria-hidden="true"></span>
                        <div class="about__item-content">
                            <h3 class="about__item-title">Paixão por Tecnologia e Criatividade</h3>
                            <p class="about__item-description">Olá! Sou Jeferson Reis, um jovem desenvolvedor full-stack, designer gráfico e técnico em informática de Camaçari, Bahia. Minha jornada começou com a criação de jogos em C#, despertando meu interesse por programação, design e tecnologia. Essa paixão me levou a explorar diversas áreas, conectando criatividade e inovação em cada projeto.</p>
                        </div>
                    </article>

                    <article class="about__item">
                        <span class="iconify about__icon" data-icon="mdi:code-braces" aria-hidden="true"></span>
                        <div class="about__item-content">
                            <h3 class="about__item-title">Desenvolvimento Full-Stack com Foco em UX</h3>
                            <p class="about__item-description">Como desenvolvedor full-stack, combino habilidades em React e Node.js para criar soluções web inovadoras. Priorizo a experiência do usuário (UX) em cada etapa, desenvolvendo interfaces intuitivas e eficientes que atendem às necessidades dos clientes.</p>
                        </div>
                    </article>

                    <article class="about__item">
                        <span class="iconify about__icon" data-icon="mdi:palette" aria-hidden="true"></span>
                        <div class="about__item-content">
                            <h3 class="about__item-title">Design Gráfico e Arte Digital</h3>
                            <p class="about__item-description">Minha paixão por design gráfico me permite criar identidades visuais marcantes, incluindo logotipos, banners e materiais para redes sociais. Como artista digital, utilizo ferramentas como Photoshop, Illustrator e CorelDRAW para transformar conceitos em realidade visual, combinando estética e funcionalidade.</p>
                        </div>
                    </article>

                    <article class="about__item">
                        <span class="iconify about__icon" data-icon="mdi:tools" aria-hidden="true"></span>
                        <div class="about__item-content">
                            <h3 class="about__item-title">Soluções em TI e Automação</h3>
                            <p class="about__item-description">Além do desenvolvimento e design, ofereço serviços de suporte técnico, manutenção de computadores e otimização de sistemas. Também atuo na automatização de processos, ajudando empresas a aumentar sua eficiência através de planilhas avançadas e soluções personalizadas.</p>
                        </div>
                    </article>

                    <article class="about__item">
                        <span class="iconify about__icon" data-icon="mdi:rocket" aria-hidden="true"></span>
                        <div class="about__item-content">
                            <h3 class="about__item-title">Pronto para Transformar sua Visão em Realidade?</h3>
                            <p class="about__item-description">Estou sempre em busca de novos desafios e colaborações. Vamos conversar sobre como posso ajudar a concretizar seus projetos, combinando tecnologia, design e inovação!</p>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    );
}

export default About;