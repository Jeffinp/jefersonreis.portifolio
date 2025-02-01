import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEOHead = () => {
    const { i18n } = useTranslation();

    const translations = {
        en: {
            title: "Jeferson Reis - Full-Stack Developer, Designer & IT Technician | Portfolio",
            description: "Jeferson Reis: Full-Stack Developer, Graphic Designer and IT Technician. React, Node.js, UX/UI specialist, logo creation, visual identity, computer maintenance and process automation. Freelancer in Camaçari, Bahia. Check my portfolio and get in touch!",
            keywords: "full-stack developer, freelancer, react, node.js, javascript, html, css, graphic design, ux design, ui design, web development, portfolio, camaçari, bahia, web projects, front-end, back-end, IT, computer maintenance, technical support, office suite, word, excel, powerpoint, process automation, visual identity, logo, video editing, motion graphics, 3d modeling",
            ogDescription: "Jeferson Reis Portfolio: Full-Stack Developer, Graphic Designer and IT Technician. Innovative web projects, impactful design, IT solutions and process automation.",
            imageAlt: "Photo of Jeferson Reis - Full-Stack Developer, Graphic Designer and IT Technician"
        },
        'pt-BR': {
            title: "Jeferson Reis - Desenvolvedor Full-Stack, Designer & Técnico em Informática | Portfólio",
            description: "Jeferson Reis: Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática. Especialista em React, Node.js, UX/UI, criação de logotipos, identidade visual, manutenção de computadores e automação de processos. Freelancer em Camaçari, Bahia. Veja meu portfólio e entre em contato!",
            keywords: "desenvolvedor full-stack, freelancer, react, node.js, javascript, html, css, design gráfico, ux design, ui design, web development, portfólio, camaçari, bahia, projetos web, front-end, back-end, informática, manutenção de computadores, suporte técnico, pacote office, word, excel, powerpoint, automação de processos, identidade visual, logotipo, edição de vídeo, motion graphics, modelagem 3d",
            ogDescription: "Portfólio de Jeferson Reis: Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática. Projetos web inovadores, design impactante, soluções em TI e automação de processos.",
            imageAlt: "Foto de Jeferson Reis - Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática"
        }
    };

    const currentLang = translations[i18n.language] || translations['en'];

    return (
        <Helmet>
            <html lang={i18n.language} />
            <title>{currentLang.title}</title>

            <meta name="description" content={currentLang.description} />
            <meta name="keywords" content={currentLang.keywords} />
            <meta name="language" content={i18n.language} />

            {/* OpenGraph tags */}
            <meta property="og:title" content={currentLang.title} />
            <meta property="og:description" content={currentLang.ogDescription} />
            <meta property="og:locale" content={i18n.language === 'en' ? 'en_US' : 'pt_BR'} />
            <meta property="og:image:alt" content={currentLang.imageAlt} />

            {/* Twitter tags */}
            <meta name="twitter:title" content={currentLang.title} />
            <meta name="twitter:description" content={currentLang.ogDescription} />
            <meta name="twitter:image:alt" content={currentLang.imageAlt} />
        </Helmet>
    );
};

export default SEOHead;