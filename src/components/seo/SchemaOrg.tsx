import React from 'react'
import Head from 'next/head'

interface SchemaOrgProps {
  lang?: string
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({ lang = 'pt' }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jefersonreis.dev'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jeferson Reis Almeida',
    alternateName: 'Jeferson Reis',
    url: siteUrl,
    image: `${siteUrl}/assets/images/profile/profile-linkedin.webp`,
    sameAs: [
      'https://github.com/jefersonreis',
      'https://linkedin.com/in/jefersonreis',
      'https://instagram.com/jefersonreis',
    ],
    jobTitle:
      lang === 'pt'
        ? 'Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática'
        : 'Full-Stack Developer, Graphic Designer and IT Technician',
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
      'React',
      'Next.js',
      'Angular',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'Python',
      'Docker',
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'UI/UX Design',
      'Graphic Design',
      'Motion Graphics',
      '3D Modeling',
      'IT Support',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'UNINTER',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jeferson Reis Portfolio',
    alternateName: 'JR Portfolio',
    url: siteUrl,
    description:
      lang === 'pt'
        ? 'Portfólio profissional de Jeferson Reis - Desenvolvedor Full-Stack, Designer Gráfico e Técnico em Informática'
        : 'Professional portfolio of Jeferson Reis - Full-Stack Developer, Graphic Designer and IT Technician',
    publisher: personSchema,
    inLanguage: lang === 'pt' ? 'pt-BR' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Jeferson Reis - Serviços de Desenvolvimento e Design',
    image: `${siteUrl}/assets/images/profile/profile-linkedin.webp`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+55-71-99999-9999',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Camaçari',
      addressRegion: 'BA',
      postalCode: '42800-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -12.6993,
      longitude: -38.3289,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
    serviceType: [
      'Web Development',
      'Mobile Development',
      'UI/UX Design',
      'Graphic Design',
      'IT Support',
      'Process Automation',
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -12.6993,
        longitude: -38.3289,
      },
      geoRadius: '500000',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: lang === 'pt' ? 'Projetos' : 'Projects',
        item: `${siteUrl}#projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: lang === 'pt' ? 'Contato' : 'Contact',
        item: `${siteUrl}#contact`,
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name:
          lang === 'pt'
            ? 'Quais serviços você oferece?'
            : 'What services do you offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            lang === 'pt'
              ? 'Ofereço desenvolvimento web full-stack, design UI/UX, design gráfico, criação de identidade visual, edição de vídeo, modelagem 3D, suporte técnico em TI e automação de processos.'
              : 'I offer full-stack web development, UI/UX design, graphic design, visual identity creation, video editing, 3D modeling, IT technical support and process automation.',
        },
      },
      {
        '@type': 'Question',
        name:
          lang === 'pt'
            ? 'Qual é sua experiência profissional?'
            : 'What is your professional experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            lang === 'pt'
              ? 'Tenho mais de 5 anos de experiência em desenvolvimento web, design e TI, trabalhando com empresas de diversos setores e projetos freelance.'
              : 'I have over 5 years of experience in web development, design and IT, working with companies from various sectors and freelance projects.',
        },
      },
      {
        '@type': 'Question',
        name:
          lang === 'pt'
            ? 'Como posso entrar em contato?'
            : 'How can I get in touch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            lang === 'pt'
              ? 'Você pode entrar em contato através do formulário no site, WhatsApp, Discord ou pelos links das redes sociais disponíveis no rodapé.'
              : 'You can get in touch through the website form, WhatsApp, Discord or through the social media links available in the footer.',
        },
      },
    ],
  }

  const schemas = [
    personSchema,
    websiteSchema,
    professionalServiceSchema,
    breadcrumbSchema,
    faqSchema,
  ]

  return (
    <Head>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  )
}

export default SchemaOrg
