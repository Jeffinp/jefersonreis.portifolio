// Resume.jsx
import React, { useState } from "react";
import "../styles/Resume.css";

function Resume() {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        console.log("Expansão alternada");  // Adicione um log para verificar se está sendo acionado
        setExpanded(!expanded);
        console.log(expanded); // Verifique se está alternando corretamente

    };

    return (
        <section id="resume" className="resume section">
            <div className="container_resume container">
                <h1 className="resume__title section__title">Meu Currículo</h1>
                <article className="resume__content">
                    <section className="resume__highlights resume__section">
                        <h2 className="resume__section-title">Destaques</h2>
                        <ul className="resume__section-list">
                            <li className="resume__section-item">Desenvolvedor Full-Stack com +4 anos de experiência</li>
                            <li className="resume__section-item">Especialista em React e Node.js</li>
                            <li className="resume__section-item">Designer Gráfico</li>
                            <li className="resume__section-item">Experiência em Informática</li>
                            <li className="resume__section-item">Conhecimentos em Administração</li>
                        </ul>
                    </section>

                    {/* Conteúdo inicial sempre visível */}
                    <div className="resume__initial-content">
                        <section className="resume__experience resume__section">
                            <h2 className="resume__section-title">Experiência Profissional</h2>
                            <ul className="resume__section-list">
                                <li className="resume__section-item">
                                    <h3 className="resume__section-item-title">Desenvolvedor Web Freelancer (2024 – Atual)</h3>
                                    <ul className="resume__section-item-details">
                                        <li>Criação de websites intuitivos e responsivos para empresas e microempreendedores.</li>
                                        <li>Desenvolvimento de plataforma de cursos online, aumentando as vendas em 90% com design focado na conversão e experiência do usuário.</li>
                                    </ul>
                                </li>
                                <li className="resume__section-item">
                                    <h3 className="resume__section-item-title">Técnico em Informática – Suporte Técnico Freelancer (2023 – 2024)</h3>
                                    <ul className="resume__section-item-details">
                                        <li>Manutenção de computadores, otimizando o desempenho do sistema e reduzindo o tempo de processamento.</li>
                                        <li>Suporte técnico eficiente, resolvendo 95% dos incidentes no primeiro contato.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        <section className="resume__education resume__section">
                            <h2 className="resume__section-title">Formação Acadêmica</h2>
                            <ul className="resume__section-list">
                                <li className="resume__section-item">
                                    <h3 className="resume__section-item-title">Ensino Médio Completo</h3>
                                    <p className="resume__section-item-details">Colégio Estadual Professora Nadir Araújo Copque (2022 – 2024)</p>
                                </li>
                                <li className="resume__section-item">
                                    <h3 className="resume__section-item-title">Desenvolvimento Web (Cursando)</h3>
                                    <p className="resume__section-item-details">Triunfo (2024 - Atual)</p>
                                </li>
                            </ul>
                        </section>
                    </div>

                    {/* Conteúdo expandível */}
                    <div className={`resume__expandable-content ${expanded ? 'expanded' : ''}`} id="resume-expandable-content">
                        <section className="resume__skills resume__section">
                            <h2 className="resume__section-title">Habilidades Técnicas</h2>
                            <ul className="resume__section-list">
                                <li className="resume__section-item">
                                    <h3 className="resume__section-item-title">Linguagens de Programação</h3>
                                    <p className="resume__section-item-details">JavaScript, PHP, C#, React, Node.js, Python, SQL</p>
                                </li>
                                <li className="resume__section-item">
                                    <h3 className="resume__section-item-title">Ferramentas de Design Gráfico</h3>
                                    <p className="resume__section-item-details">Adobe Photoshop, Illustrator, Premiere, After Effects, CorelDRAW, Canva</p>
                                </li>
                                <li className="resume__section-item">
                                    <h3 className="resume__section-item-title">Desenvolvimento Web</h3>
                                    <p className="resume__section-item-details">HTML, CSS, WordPress, Bootstrap, Tailwind CSS, Responsividade, APIs RESTful</p>
                                </li>
                            </ul>
                        </section>

                        <section className="resume__awards resume__section">
                            <h2 className="resume__section-title">Prêmios e Realizações</h2>
                            <ul className="resume__section-list">
                                <li className="resume__section-item">Prêmios por Otimização de Código e Excelência Acadêmica</li>
                                <li className="resume__section-item">Reconhecimento em Feira de Ciências e Hackathons</li>
                                <li className="resume__section-item">Criação de logotipo para a Campanha de Combate à Poluição Plástica</li>
                                <li className="resume__section-item">Líder de Turma até o 3º ano do Ensino Médio</li>
                            </ul>
                        </section>

                        <section className="resume__contact resume__section">
                            <h2 className="resume__section-title">Contato</h2>
                            <ul className="resume__section-list">
                                <li className="resume__section-item">Telefone: (71) 9 8439-3235 | (71) 9 9637-2613</li>
                                <li className="resume__section-item">E-mail: <a href="mailto:jefersonreisalmeida8356@gmail.com" className="resume__contact-link">jefersonreisalmeida8356@gmail.com</a></li>
                                <li className="resume__section-item">Endereço: Residencial Caminho do Mar III, Camaçari - BA, 42630-006</li>
                                <li className="resume__section-item"><a href="https://www.linkedin.com/in/jeferson-reis-877a942b7/" target="_blank" rel="noopener noreferrer" className="resume__contact-link">LinkedIn</a></li>
                                <li className="resume__section-item"><a href="https://github.com/Jeffinp" target="_blank" rel="noopener noreferrer" className="resume__contact-link">GitHub</a></li>
                            </ul>
                        </section>

                        <section className="resume__soft-skills resume__section">
                            <h2 className="resume__section-title">Soft Skills</h2>
                            <ul className="resume__section-list">
                                <li className="resume__section-item">Trabalho em equipe</li>
                                <li className="resume__section-item">Resolução de problemas</li>
                                <li className="resume__section-item">Comunicação eficaz</li>
                                <li className="resume__section-item">Criatividade</li>
                                <li className="resume__section-item">Proatividade</li>
                                <li className="resume__section-item">Adaptabilidade</li>
                                <li className="resume__section-item">Gestão de tempo</li>
                            </ul>
                        </section>

                        <section className="resume__objective resume__section">
                            <h2 className="resume__section-title">Objetivo Profissional</h2>
                            <p className="resume__section-item-details">
                                Profissional motivado e dinâmico, com sólida experiência em Desenvolvimento Web,
                                Design Gráfico e suporte técnico em informática. Especialista na criação de soluções
                                criativas e funcionais, com foco em otimização de processos, melhoria da experiência
                                do usuário e inovação tecnológica.
                            </p>
                        </section>
                    </div>

                    {/* Botão Ver Mais/Menos */}
                    <div className="resume__see-more-container">
                        <button
                            className="resume__see-more"
                            onClick={handleToggle}
                            aria-expanded={expanded}
                            aria-controls="resume-expandable-content"
                        >
                            {expanded ? (
                                <>
                                    Ver Menos <span className="iconify" data-icon="uil:arrow-up"></span>
                                </>
                            ) : (
                                <>
                                    Ver Mais <span className="iconify" data-icon="uil:arrow-down"></span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Seção de download do CV */}
                    <div className="resume__cta">
                        <p className="resume__cta-text">Para mais detalhes, baixe meu currículo completo:</p>
                        <a href="/assets/pdf/Jeferson_currículo.pdf" download className="button button--primary">
                            Baixar CV Completo
                        </a>
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Resume;