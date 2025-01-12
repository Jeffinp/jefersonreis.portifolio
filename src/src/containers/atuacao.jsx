import React from "react";
import "../styles/Expertise.css"; // Importe o CSS para este componente

function Atuacao() {
    return (
        <section id="atuacao" class="atuacao section" aria-labelledby="atuacaoTitle">
            <div class="container">
                <h2 id="atuacaoTitle" class="section__title">Áreas de Atuação</h2>
                <p class="section__subtitle">Conheça minhas principais áreas de expertise e como posso ajudar seu projeto a decolar.</p>
                <div class="atuacao__grid">
                    <div class="atuacao__card">
                        <div class="atuacao__icone-container">
                            <span class="iconify atuacao__icone" data-icon="bi:code-slash"></span>
                        </div>
                        <div class="atuacao__conteudo">
                            <h3 class="atuacao__titulo">Desenvolvimento Web Full-Stack</h3>
                            <p class="atuacao__descricao">Criação de sites, e-commerces, landing pages e sistemas web com foco em performance, segurança e experiência do usuário (UX/UI). Domínio de tecnologias como React, Node.js, HTML, CSS e JavaScript.</p>
                        </div>
                    </div>

                    <div class="atuacao__card">
                        <div class="atuacao__icone-container">
                            <span class="iconify atuacao__icone" data-icon="fa-solid:pencil-ruler"></span>
                        </div>
                        <div class="atuacao__conteudo">
                            <h3 class="atuacao__titulo">Design Gráfico & Identidade Visual</h3>
                            <p class="atuacao__descricao">Desenvolvimento de logotipos, banners, materiais para redes sociais e toda a identidade visual da sua marca. Domínio de ferramentas como Adobe Photoshop, Illustrator e CorelDRAW.</p>
                        </div>
                    </div>

                    <div class="atuacao__card">
                        <div class="atuacao__icone-container">
                            <span class="iconify atuacao__icone" data-icon="akar-icons:video"></span>
                        </div>
                        <div class="atuacao__conteudo">
                            <h3 class="atuacao__titulo">Edição de Vídeo e Motion</h3>
                            <p class="atuacao__descricao">Edição de vídeos com motion graphics, corte, montagem, correção de cor e legendagem. Utilizo Premiere Pro, After Effects, Filmora e outras ferramentas para atender a diversas necessidades, como vídeos para YouTube, redes sociais, eventos, vinhetas e animações de logo.</p>
                        </div>
                    </div>

                    <div class="atuacao__card">
                        <div class="atuacao__icone-container">
                            <span class="iconify atuacao__icone" data-icon="bx:cube-alt"></span>
                        </div>
                        <div class="atuacao__conteudo">
                            <h3 class="atuacao__titulo">Modelagem 3D e Visualização</h3>
                            <p class="atuacao__descricao">Criação de modelos e ambientes 3D detalhados, renderizações fotorrealistas, animações e assets otimizados para AR/VR. Projetos prontos para impressão 3D e visualização profissional.</p>
                        </div>
                    </div>

                    <div class="atuacao__card">
                        <div class="atuacao__icone-container">
                            <span class="iconify atuacao__icone" data-icon="fa-solid:laptop-code"></span>
                        </div>
                        <div class="atuacao__conteudo">
                            <h3 class="atuacao__titulo">Suporte Técnico & Soluções em TI</h3>
                            <p class="atuacao__descricao">Manutenção de computadores, formatação, otimização de sistemas, recuperação de dados, consultoria em informática e suporte técnico especializado.</p>
                        </div>
                    </div>

                    <div class="atuacao__card">
                        <div class="atuacao__icone-container">
                            <span class="iconify atuacao__icone" data-icon="fa-solid:chart-line"></span>
                        </div>
                        <div class="atuacao__conteudo">
                            <h3 class="atuacao__titulo">Produtividade & Automação de Processos</h3>
                            <p class="atuacao__descricao">Desenvolvimento de planilhas avançadas, automatização de tarefas, organização de documentos e implementação de soluções para aumentar a eficiência e produtividade do seu negócio, com uso de ferramentas de automação e integração de IA.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Atuacao;