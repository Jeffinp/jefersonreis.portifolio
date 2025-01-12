import React from "react";
import "../styles/Resume.css";

function Resume() {
    return (
        <section id="resume" class="resume section">
        <div class="container_resume container">
            <h1 class="resume__title section__title">Meu Currículo</h1>
            <article class="resume__content">
                <section class="resume__highlights resume__section">
                    <h2 class="resume__section-title">Destaques</h2>
                    <ul class="resume__section-list">
                        <li class="resume__section-item">Desenvolvedor Full-Stack com +4 anos de experiência</li>
                        <li class="resume__section-item">Especialista em React e Node.js</li>
                        <li class="resume__section-item">Designer Gráfico</li>
                        <li class="resume__section-item">Experiência em Informática</li>
                        <li class="resume__section-item">Conhecimentos em Administração</li>
                    </ul>
                </section>

                <section class="resume__experience resume__section">
                    <h2 class="resume__section-title">Experiência Profissional</h2>
                    <ul class="resume__section-list">
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Desenvolvedor Web Freelancer (2024 – Atual)</h3>
                            <ul class="resume__section-item-details">
                                <li>Criação de websites intuitivos e responsivos para empresas e microempreendedores.</li>
                                <li>Desenvolvimento de plataforma de cursos online, aumentando as vendas em 90% com design focado na conversão e experiência do usuário.</li>
                            </ul>
                        </li>
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Técnico em Informática – Suporte Técnico Freelancer (2023 – 2024)</h3>
                            <ul class="resume__section-item-details">
                                <li>Manutenção de computadores, otimizando o desempenho do sistema e reduzindo o tempo de processamento.</li>
                                <li>Suporte técnico eficiente, resolvendo 95% dos incidentes no primeiro contato.</li>
                            </ul>
                        </li>
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Freelancer em Administração e Pacote Office (2024 - Atual)</h3>
                            <ul class="resume__section-item-details">
                                <li>Criação de planilhas financeiras automatizadas para controle de despesas e receitas.</li>
                                <li>Implementação de sistemas organizacionais para pequenas empresas, aumentando a eficiência administrativa em 95%.</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <section class="resume__education resume__section">
                    <h2 class="resume__section-title">Formação Acadêmica</h2>
                    <ul class="resume__section-list">
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Ensino Médio Completo</h3>
                            <p class="resume__section-item-details">Colégio Estadual Professora Nadir Araújo Copque (2022 – 2024)</p>
                        </li>
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Técnico em Meio Ambiente (Concluído)</h3>
                            <p class="resume__section-item-details">Colégio Estadual Professora Nadir Araújo Copque (2022 – 2024)</p>
                        </li>
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Desenvolvimento Web (Cursando)</h3>
                            <p class="resume__section-item-details">Triunfo (2024 - Atual)</p>
                        </li>
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Programação Web (Cursando)</h3>
                            <p class="resume__section-item-details">Udemy (2024 - 2025)</p>
                        </li>
                    </ul>
                </section>

                <section class="resume__skills resume__section">
                    <h2 class="resume__section-title">Habilidades Técnicas</h2>
                    <ul class="resume__section-list">
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Linguagens de Programação</h3>
                            <p class="resume__section-item-details">JavaScript, PHP, C#, React, Node.js, Python, SQL</p>
                        </li>
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Ferramentas de Design Gráfico</h3>
                            <p class="resume__section-item-details">Adobe Photoshop, Illustrator, Premiere, After Effects, CorelDRAW, Canva</p>
                        </li>
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Desenvolvimento Web</h3>
                            <p class="resume__section-item-details">HTML, CSS, WordPress, Bootstrap, Tailwind CSS, Responsividade, APIs RESTful</p>
                        </li>
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Sistemas e Suporte</h3>
                            <p class="resume__section-item-details">Pacote Office Avançado (Excel, Word, PowerPoint), Banco de Dados (MySQL, PostgreSQL), Linux, Windows, Manutenção e Otimização de Hardware/Software</p>
                        </li>
                        <li class="resume__section-item">
                            <h3 class="resume__section-item-title">Outras Tecnologias</h3>
                            <p class="resume__section-item-details">Git/GitHub, Docker, Firebase, Figma, Trello, Inteligência Artificial (IA) – uso de bibliotecas como TensorFlow, PyTorch, automação e integração de IA</p>
                        </li>
                    </ul>
                </section>

                <section class="resume__awards resume__section">
                    <h2 class="resume__section-title">Prêmios e Realizações</h2>
                    <ul class="resume__section-list">
                        <li class="resume__section-item">Prêmios por Otimização de Código e Excelência Acadêmica</li>
                        <li class="resume__section-item">Reconhecimento em Feira de Ciências e Hackathons</li>
                        <li class="resume__section-item">Criação de logotipo para a Campanha de Combate à Poluição Plástica</li>
                        <li class="resume__section-item">Líder de Turma até o 3º ano do Ensino Médio</li>
                    </ul>
                </section>

                <section class="resume__contact resume__section">
                    <h2 class="resume__section-title">Contato</h2>
                    <ul class="resume__section-list">
                        <li class="resume__section-item">Telefone: (71) 9 8439-3235 | (71) 9 9637-2613</li>
                        <li class="resume__section-item">E-mail: <a href="mailto:jefersonreisalmeida8356@gmail.com" class="resume__contact-link">jefersonreisalmeida8356@gmail.com</a></li>
                        <li class="resume__section-item">Endereço: Residencial Caminho do Mar III, Camaçari - BA, 42630-006</li>
                        <li class="resume__section-item"><a href="https://www.linkedin.com/in/jeferson-reis-877a942b7/" target="_blank" rel="noopener noreferrer" class="resume__contact-link">LinkedIn</a></li>
                        <li class="resume__section-item"><a href="https://github.com/Jeffinp" target="_blank" rel="noopener noreferrer" class="resume__contact-link">GitHub</a></li>
                    </ul>
                </section>

                <section class="resume__soft-skills resume__section">
                    <h2 class="resume__section-title">Soft Skills</h2>
                    <ul class="resume__section-list">
                        <li class="resume__section-item">Trabalho em equipe</li>
                        <li class="resume__section-item">Resolução de problemas</li>
                        <li class="resume__section-item">Comunicação eficaz</li>
                        <li class="resume__section-item">Criatividade</li>
                        <li class="resume__section-item">Proatividade</li>
                        <li class="resume__section-item">Adaptabilidade</li>
                        <li class="resume__section-item">Gestão de tempo</li>
                    </ul>
                </section>

                <section class="resume__objective resume__section">
                    <h2 class="resume__section-title">Objetivo Profissional</h2>
                    <p class="resume__section-item-details">Profissional motivado e dinâmico, com sólida experiência em Desenvolvimento Web, Design Gráfico e suporte técnico em informática. Especialista na criação de soluções criativas e funcionais, com foco em otimização de processos, melhoria da experiência do usuário e inovação tecnológica. Comprometido em aplicar habilidades técnicas, organização e colaboração em equipe para impulsionar o sucesso e o crescimento da empresa.</p>
                </section>

                <div class="resume__see-more-container">
                    <button class="resume__see-more" aria-expanded="false" aria-controls="resume-hidden-content">Ver Mais <span class="iconify" data-icon="uil:arrow-down"></span></button>
                </div>

                <div id="resume-hidden-content" hidden>
                   
                </div>

                <div class="resume__cta">
                    <p class="resume__cta-text">Para mais detalhes, baixe meu currículo completo:</p>
                    <a href="/public/Jeferson currículo.pdf" download class="button button--primary">
                        Baixar CV Completo
                    </a>
                </div>
            </article>
        </div>
    </section>
    );
}

export default Resume;