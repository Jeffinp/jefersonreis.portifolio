import React from "react";
import "../styles/Services.css";

function Services() {
    return (
        <section id="servicos" class="services" aria-labelledby="meusServicosTitle">
        <div class="services__container">
            <div class="services__header">
                <h2 id="meusServicosTitle" class="section__title">Meus Serviços</h2>
                <p class="services__subtitle">Soluções profissionais personalizadas para dar vida às suas ideias!</p>
            </div>

            <div class="services__grid">
                <article class="services__card">
                    <div class="services__icon-container">
                        <span class="iconify services__icon" data-icon="mdi:web"></span>
                    </div>
                    <div class="services__content">
                        <h3 class="services__title"><strong>Desenvolvimento Web Imersivo</strong></h3>
                        <p class="services__description">
                            Crio experiências web únicas! <strong>Landing Pages</strong> que convertem, <strong>Sites Institucionais</strong> que contam sua história, <strong>E-commerces</strong> dinâmicos e <strong>Blogs</strong> envolventes. Design personalizado, responsividade e <strong>SEO</strong> para o topo das buscas!
                        </p>
                    </div>
                </article>

                <article class="services__card">
                    <div class="services__icon-container">
                        <span class="iconify services__icon" data-icon="mdi:palette"></span>
                    </div>
                    <div class="services__content">
                        <h3 class="services__title"><strong>Design & Identidade Visual Memorável</strong></h3>
                        <p class="services__description">
                            Desenvolvo <strong>logotipos marcantes</strong> e <strong>identidades visuais completas</strong>. Crio <strong>artes para redes sociais</strong>, <strong>banners</strong>, <strong>flyers</strong> e outros <strong>materiais publicitários</strong> que fortalecem sua marca e conectam você com seus clientes.
                        </p>
                    </div>
                </article>

                <article class="services__card">
                    <div class="services__icon-container">
                        <span class="iconify services__icon" data-icon="mdi:file-document"></span>
                    </div>
                    <div class="services__content">
                        <h3 class="services__title"><strong>Documentação Profissional Impecável</strong></h3>
                        <p class="services__description">
                            Transformo suas ideias em <strong>documentos profissionais e impactantes</strong>. <strong>Apresentações</strong> que impressionam, <strong>documentos empresariais</strong> claros, <strong>planilhas avançadas</strong>, <strong>currículos</strong> que destacam talentos e <strong>trabalhos acadêmicos</strong> com formatação <strong>ABNT</strong> impecável.
                        </p>
                    </div>
                </article>

                <article class="services__card">
                    <div class="services__icon-container">
                        <span class="iconify services__icon" data-icon="mdi:cube"></span>
                    </div>
                    <div class="services__content">
                        <h3 class="services__title"><strong>Modelagem 3D & Visualização Imersiva</strong></h3>
                        <p class="services__description">
                            Dou vida aos seus projetos com <strong>modelagem 3D</strong> de alta qualidade! <strong>Modelos e ambientes 3D</strong> detalhados, <strong>renderizações fotorrealistas</strong>, <strong>animações</strong> e <strong>assets otimizados para AR/VR</strong>. Projetos prontos para <strong>impressão 3D</strong> e <strong>visualização profissional</strong>.
                        </p>
                    </div>
                </article>

                <article class="services__card">
                    <div class="services__icon-container">
                        <span class="iconify services__icon" data-icon="mdi:laptop"></span>
                    </div>
                    <div class="services__content">
                        <h3 class="services__title"><strong>Suporte Técnico Eficiente</strong></h3>
                        <p class="services__description">
                            <strong>Suporte técnico completo</strong> para seus equipamentos: <strong>formatação, otimização, limpeza, recuperação de dados e manutenção preventiva</strong>. Atendimento remoto ou presencial, com agilidade e profissionalismo.
                        </p>
                    </div>
                </article>

                <article class="services__card">
                    <div class="services__icon-container">
                        <span class="iconify services__icon" data-icon="mdi:movie-edit"></span>
                    </div>
                    <div class="services__content">
                        <h3 class="services__title"><strong>Edição e Motion Graphics Profissional</strong></h3>
                        <p class="services__description">
                            Vídeos dinâmicos e envolventes! <strong>Corte, montagem, correção de cor, efeitos, legendagem, motion graphics e animações (com After Effects)</strong>. Uso <strong>Premiere Pro, After Effects, Filmora</strong> e outras ferramentas top. Perfeito para <strong>YouTube, redes sociais, vídeos institucionais, eventos, vinhetas, animações de logo</strong>!
                        </p>
                    </div>
                </article>

            </div>

            <div class="services__download">
                <a href="/assets/pdf/Orçamento_de_Serviços.pdf" download class="services__download-btn">
                    <span class="iconify" data-icon="line-md:file-download-filled"></span>
                    Baixe o Catálogo Completo de Serviços
                </a>
                <p class="services__download-info">Descubra todos os detalhes e valores em meu catálogo!</p>
            </div>
        </div>
    </section>
    );
}

export default Services;