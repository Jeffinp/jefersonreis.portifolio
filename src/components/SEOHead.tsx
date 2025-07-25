import React from 'react'
import Head from 'next/head'

interface Translation {
  title: string
  description: string
  keywords: string
  ogDescription: string
  imageAlt: string
}

interface Translations {
  [key: string]: Translation
}

interface SEOHeadProps {
  title?: string
  description?: string
  lang?: string
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  lang = 'pt',
}) => {
  const translations: Translations = {
    en: {
      title:
        'Jeferson Reis - Full-Stack Developer, Designer & IT Technician | Portfolio',
      description:
        'Jeferson Reis: Full-Stack Developer, Graphic Designer and IT Technician. React, Node.js, UX/UI specialist, logo creation, visual identity, computer maintenance and process automation. Freelancer in Camaçari, Bahia. Check my portfolio and get in touch!',
      keywords:
        'full-stack developer, freelancer, react, node.js, javascript, html, css, graphic design, ux design, ui design, web development, portfolio, camaçari, bahia, web projects, front-end, back-end, IT, computer maintenance, technical support, office suite, word, excel, powerpoint, process automation, visual identity, logo, video editing, motion graphics, 3d modeling',
      ogDescription:
        'Jeferson Reis Portfolio: Full-Stack Developer, Graphic Designer and IT Technician. Innovative web projects, impactful design, IT solutions and process automation.',
      imageAlt:
        'Photo of Jeferson Reis - Full-Stack Developer, Graphic Designer and IT Technician',
    },
    pt: {
      title:
        'Jeferson Reis - Desenvolvedor Full-Stack, Designer & Técnico em Informática | Portfólio',
      description:
        'Jeferson Reis: Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática. Especialista em React, NextJS, Angular, Python, Node.js, UX/UI, criação de logotipos, identidade visual, manutenção de computadores e automação de processos. Freelancer em Camaçari, Bahia. Veja meu portfólio e entre em contato!',
      keywords:
        'desenvolvedor full-stack, freelancer, react, node.js, javascript, html, css, design gráfico, ux design, ui design, web development, portfólio, camaçari, bahia, projetos web, front-end, back-end, informática, manutenção de computadores, suporte técnico, pacote office, word, excel, powerpoint, automação de processos, identidade visual, logotipo, edição de vídeo, motion graphics, modelagem 3d',
      ogDescription:
        'Portfólio de Jeferson Reis: Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática. Projetos web inovadores, design impactante, soluções em TI e automação de processos.',
      imageAlt:
        'Foto de Jeferson Reis - Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática',
    },
  }

  const currentLang = translations[lang] || translations['pt']

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://jefersonreis.dev'
  const siteName =
    process.env.NEXT_PUBLIC_SITE_NAME ||
    'Jeferson Reis | Desenvolvedor Full-Stack'
  const ogImage = `${siteUrl}/assets/images/Linkedin-foto.webp`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title || currentLang.title}</title>
      <meta
        name="description"
        content={description || currentLang.description}
      />
      <meta name="keywords" content={currentLang.keywords} />
      <meta name="language" content={lang} />
      <meta name="author" content="Jeferson Reis" />
      <meta name="creator" content="Jeferson Reis" />
      <meta name="publisher" content="Jeferson Reis" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="format-detection" content="telephone=no" />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="pt" href={`${siteUrl}/pt`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* OpenGraph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title || currentLang.title} />
      <meta
        property="og:description"
        content={description || currentLang.ogDescription}
      />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'pt_BR'} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={currentLang.imageAlt} />
      <meta property="og:image:type" content="image/webp" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@jefersonreis" />
      <meta name="twitter:creator" content="@jefersonreis" />
      <meta name="twitter:title" content={title || currentLang.title} />
      <meta
        name="twitter:description"
        content={description || currentLang.ogDescription}
      />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={currentLang.imageAlt} />

      {/* LinkedIn specific */}
      <meta property="article:author" content="Jeferson Reis" />
      <meta property="profile:first_name" content="Jeferson" />
      <meta property="profile:last_name" content="Reis" />

      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/svg+xml"
        href="/assets/images/icon/favicon.svg"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/assets/images/icon/favicon-96x96.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/images/icon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/assets/images/icon/web-app-manifest-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/assets/images/icon/web-app-manifest-512x512.png"
      />
      <link rel="manifest" href="/assets/images/icon/site.webmanifest" />
      <meta name="theme-color" content="#1f2937" />
      <meta name="msapplication-TileColor" content="#1f2937" />
      <meta
        name="msapplication-config"
        content="/assets/images/icon/browserconfig.xml"
      />

      {/* Performance Optimizations */}
      <link
        rel="preload"
        href="/assets/images/Linkedin-foto.webp"
        as="image"
        type="image/webp"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />

      {/* Additional Meta for better indexing */}
      <meta name="geo.region" content="BR-BA" />
      <meta name="geo.placename" content="Camaçari, Bahia, Brazil" />
      <meta name="geo.position" content="-12.6993;-38.3289" />
      <meta name="ICBM" content="-12.6993, -38.3289" />
    </Head>
  )
}

export default SEOHead
