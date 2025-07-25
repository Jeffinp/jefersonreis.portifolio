import React from 'react'
import Head from 'next/head'

interface StructuredDataProps {
  lang?: string
}

const StructuredData: React.FC<StructuredDataProps> = ({ lang = 'pt' }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jefersonreis.dev'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jeferson Reis',
    alternateName: ['Jeferson Reis da Silva', 'Jeff Reis'],
    description:
      lang === 'en'
        ? 'Full-Stack Developer, Graphic Designer and IT Technician specialized in React, Node.js, UX/UI design and process automation'
        : 'Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática especializado em React, Node.js, design UX/UI e automação de processos',
    url: siteUrl,
    image: `${siteUrl}/assets/images/Linkedin-foto.webp`,
    sameAs: [
      'https://linkedin.com/in/jefersonreis',
      'https://github.com/jefersonreis',
      'https://instagram.com/jefersonreis.dev',
      'https://twitter.com/jefersonreis',
    ],
    jobTitle:
      lang === 'en' ? 'Full-Stack Developer' : 'Desenvolvedor Full-Stack',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelancer',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Camaçari',
      addressRegion: 'BA',
      addressCountry: 'BR',
    },
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Graphic Design',
      'UX/UI Design',
      'Web Development',
      'Mobile Development',
      'Database Design',
      'API Development',
      'Process Automation',
      'IT Support',
    ],
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'Portuguese',
        alternateName: 'pt',
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name:
      lang === 'en' ? 'Jeferson Reis - Portfolio' : 'Jeferson Reis - Portfólio',
    description:
      lang === 'en'
        ? 'Portfolio of Jeferson Reis, Full-Stack Developer, Graphic Designer and IT Technician'
        : 'Portfólio de Jeferson Reis, Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Jeferson Reis',
    },
    inLanguage: [lang === 'en' ? 'en-US' : 'pt-BR'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name:
      lang === 'en'
        ? 'Jeferson Reis - Web Development Services'
        : 'Jeferson Reis - Serviços de Desenvolvimento Web',
    description:
      lang === 'en'
        ? 'Professional web development, graphic design and IT services by Jeferson Reis'
        : 'Serviços profissionais de desenvolvimento web, design gráfico e informática por Jeferson Reis',
    url: siteUrl,
    image: `${siteUrl}/assets/images/Linkedin-foto.webp`,
    provider: {
      '@type': 'Person',
      name: 'Jeferson Reis',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Brazil',
    },
    serviceType: [
      'Web Development',
      'Mobile App Development',
      'Graphic Design',
      'UX/UI Design',
      'IT Support',
      'Process Automation',
    ],
    priceRange: '$$',
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Jeferson Reis - Portfolio',
    url: siteUrl,
    logo: `${siteUrl}/assets/images/icon/favicon-96x96.png`,
    image: `${siteUrl}/assets/images/Linkedin-foto.webp`,
    description:
      lang === 'en'
        ? 'Portfolio of Jeferson Reis, Full-Stack Developer, Graphic Designer and IT Technician'
        : 'Portfólio de Jeferson Reis, Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática',
    founder: {
      '@type': 'Person',
      name: 'Jeferson Reis',
    },
    foundingDate: '2020',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Portuguese', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Camaçari',
      addressRegion: 'BA',
      addressCountry: 'BR',
    },
    sameAs: [
      'https://linkedin.com/in/jefersonreis',
      'https://github.com/jefersonreis',
      'https://instagram.com/jefersonreis.dev',
    ],
  }

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: lang === 'en' ? 'Jeferson Reis Portfolio' : 'Portfólio Jeferson Reis',
    description:
      lang === 'en'
        ? 'A collection of web development, design and IT projects by Jeferson Reis'
        : 'Uma coleção de projetos de desenvolvimento web, design e TI por Jeferson Reis',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Jeferson Reis',
    },
    dateCreated: '2020-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: [lang === 'en' ? 'en-US' : 'pt-BR'],
    workExample: [
      {
        '@type': 'WebSite',
        name: 'Portfolio Website',
        description: 'Personal portfolio showcasing web development skills',
        url: siteUrl,
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'en' ? 'Home' : 'Início',
        item: siteUrl,
      },
    ],
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </Head>
  )
}

export default StructuredData
