import type { Project, ProjectCategory } from '@/types'

/**
 * Todos os projetos do portfólio - Apenas programação (Web, Mobile, Systems)
 * Migrados do portfolio antigo com transformações de tipo completas
 */

export const projects: Project[] = [
  // ==========================================
  // FEATURED WEB PROJECTS
  // ==========================================

  {
    id: 'rezerve-barber',
    slug: 'rezerve-barber',
    title: 'Rezerve Barber',
    description:
      'Sistema completo de agendamento omnichannel para barbearias via WhatsApp',
    longDescription:
      'Sistema de agendamento omnichannel que transformou a gestão de barbearias, integrando WhatsApp, pagamentos e gestão financeira completa.',
    category: 'web',
    status: 'completed',
    featured: true,
    order: 1,
    thumbnail: {
      url: '/assets/images/projects/web/rezerve-barber/thumbnail.webp',
      alt: 'Rezerve Barber - Sistema de Agendamento',
    },
    images: [],
    tags: [
      { id: 'php', label: 'PHP', color: 'bg-indigo-600' },
      { id: 'mysql', label: 'MySQL', color: 'bg-blue-600' },
      { id: 'n8n', label: 'n8n', color: 'bg-emerald-600' },
      { id: 'whatsapp-api', label: 'WhatsApp API', color: 'bg-green-500' },
      { id: 'rest-api', label: 'REST API', color: 'bg-violet-600' },
    ],
    technologies: [
      'PHP',
      'MySQL',
      'n8n',
      'Evolution API (WhatsApp)',
      'REST API',
      'Mercado Pago',
    ],
    teamSize: 1,
    endDate: '2025',
    challenges: [
      'Integração omnichannel via WhatsApp com fluxos conversacionais',
      'Sistema transacional de agendamentos com validações',
      'Gestão financeira com carteira, comissões e saques',
    ],
    results: [
      'APIs REST com validações e transações para agendamentos',
      'Workflows n8n (Dinâmico, Otimizado e Enterprise)',
      'Banco completo com agenda, carteira financeira e planos',
    ],
  },

  {
    id: 'assistente-vendas-ia',
    slug: 'assistente-vendas-ia',
    title: 'Assistente de Vendas com IA',
    description: 'CRM com IA conversacional via WhatsApp para transportadora',
    longDescription:
      'Sistema CRM completo com integração WhatsApp e IA conversacional (GPT-4.1) para atendimento 24/7, qualificação de leads e cotações automatizadas.',
    category: 'web',
    status: 'in-progress',
    featured: true,
    order: 2,
    thumbnail: {
      url: '/assets/images/projects/web/project-assistente-vendas-ia/main.png',
      alt: 'Assistente de Vendas com IA',
    },
    images: [
      {
        url: '/assets/images/projects/web/project-assistente-vendas-ia/dashboard.png',
        alt: 'Dashboard com métricas em tempo real',
      },
      {
        url: '/assets/images/projects/web/project-assistente-vendas-ia/chat.png',
        alt: 'Interface de chat com IA',
      },
      {
        url: '/assets/images/projects/web/project-assistente-vendas-ia/leads.png',
        alt: 'Gestão de leads e funil de vendas',
      },
    ],
    tags: [
      { id: 'fastapi', label: 'FastAPI', color: 'bg-green-600' },
      { id: 'python', label: 'Python', color: 'bg-blue-700' },
      { id: 'nextjs', label: 'Next.js', color: 'bg-black' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
      { id: 'openai', label: 'OpenAI', color: 'bg-purple-700' },
      { id: 'postgresql', label: 'PostgreSQL', color: 'bg-blue-600' },
    ],
    technologies: [
      'FastAPI',
      'Python 3.11+',
      'PostgreSQL 16+',
      'OpenAI (GPT-4.1)',
      'Next.js 15.4+',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Docker',
    ],
    teamSize: 1,
    challenges: [
      'Backend assíncrono com FastAPI e SQLAlchemy 2.0',
      'Integração com WhatsApp via Z-API',
      'IA conversacional com GPT-4.1 para atendimento automatizado',
      'Dashboard em tempo real com métricas e análises',
    ],
    results: [
      'Sistema CRM completo com integração WhatsApp e IA',
      'Automação de atendimento 24/7 com qualificação de leads',
      'Processamento inteligente de cotações de transporte',
      'Sistema escalável e seguro em ambiente cloud',
    ],
  },

  {
    id: 'itamir-gestao-juridica',
    slug: 'itamir-gestao-juridica',
    title: 'Juristask',
    description: 'Sistema SaaS de gestão jurídica multi-tenant',
    longDescription:
      'Plataforma SaaS completa para gestão de escritórios de advocacia com arquitetura multi-tenant, módulos de processos, financeiro, documentos e integrações.',
    category: 'web',
    status: 'in-progress',
    featured: true,
    order: 3,
    thumbnail: {
      url: '/assets/images/projects/web/project-gestao-juridica/main.png',
      alt: 'Juristask',
    },
    images: [],
    tags: [
      { id: 'react19', label: 'React 19', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-700' },
      { id: 'fastapi', label: 'FastAPI', color: 'bg-green-600' },
      { id: 'postgresql', label: 'PostgreSQL 15', color: 'bg-blue-600' },
      { id: 'docker', label: 'Docker', color: 'bg-cyan-700' },
    ],
    technologies: [
      'React 19',
      'TypeScript',
      'FastAPI',
      'PostgreSQL 15',
      'Stripe',
      'Tailwind CSS 4',
      'Docker',
      'Google Calendar API',
    ],
    teamSize: 1,
    githubUrl: 'https://github.com/Jeffinp/juristask',
    challenges: [
      'Arquitetura multi-tenant com isolamento total entre clientes',
      'Backend robusto com 40+ endpoints REST e RBAC',
      'Banco de dados com 25+ tabelas e migrações Alembic',
      'Frontend com 60+ componentes reutilizáveis',
    ],
    results: [
      'Sistema SaaS pronto para produção, altamente personalizável',
      'Isolamento total de dados entre clientes',
      'Interface moderna, intuitiva e responsiva',
      'Automação de tarefas jurídicas e financeiras',
    ],
  },

  {
    id: 'flyserv-drones',
    slug: 'flyserv-drones',
    title: 'FlyServ Drones',
    description: 'Site corporativo para empresa de serviços com drones',
    longDescription:
      'Website profissional para empresa de serviços com drones, apresentando portfólio, serviços e casos de sucesso com design moderno e animações.',
    category: 'web',
    status: 'completed',
    featured: true,
    order: 4,
    thumbnail: {
      url: '/assets/images/projects/web/project-flyserv/main.png',
      alt: 'FlyServ Drones',
    },
    images: [
      {
        url: '/assets/images/projects/web/project-flyserv/services.png',
        alt: 'Serviços',
      },
      {
        url: '/assets/images/projects/web/project-flyserv/contact.png',
        alt: 'Contato',
      },
    ],
    tags: [
      { id: 'react19', label: 'React 19', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
      { id: 'tailwind', label: 'Tailwind CSS', color: 'bg-sky-500' },
      { id: 'framer', label: 'Framer Motion', color: 'bg-purple-600' },
    ],
    technologies: [
      'React 19',
      'TypeScript',
      'Tailwind CSS 4.0',
      'Framer Motion',
      'React Router DOM',
    ],
    liveUrl: 'https://flyservdrones.com.br/',
    client: 'FlyServ Drones',
    teamSize: 1,
  },

  {
    id: 'lexcheck',
    slug: 'lexcheck',
    title: 'LexCheck',
    description: 'Plataforma de análise e verificação de citações jurídicas',
    longDescription:
      'Sistema para verificação automatizada de citações legais em documentos jurídicos, com integração LexML e geração de relatórios profissionais.',
    category: 'web',
    status: 'completed',
    featured: true,
    order: 5,
    thumbnail: {
      url: '/assets/images/projects/web/project-lexcheck/main.png',
      alt: 'LexCheck',
    },
    images: [],
    tags: [
      { id: 'fastapi', label: 'FastAPI', color: 'bg-green-600' },
      { id: 'python', label: 'Python', color: 'bg-blue-700' },
      { id: 'pdf', label: 'PDF/Excel', color: 'bg-violet-600' },
    ],
    technologies: [
      'FastAPI',
      'Python',
      'Jinja2',
      'PyPDF2',
      'ReportLab',
      'OpenPyXL',
      'SQLite',
    ],
    githubUrl: 'https://github.com/Jeffinp/LexCheck',
    teamSize: 1,
    endDate: '2025',
    challenges: [
      'Detecção e normalização de citações jurídicas',
      'Integração com LexML',
      'Geração de relatórios executivos (PDF e Excel)',
    ],
    results: [
      'Redução significativa no tempo de revisão documental',
      'Relatórios profissionais com rastreabilidade',
      'Execução 100% local (conforme LGPD)',
    ],
  },

  // ==========================================
  // OTHER WEB PROJECTS
  // ==========================================

  {
    id: 'portfolio',
    slug: 'portfolio',
    title: 'Portfolio Pessoal',
    description: 'Portfolio pessoal com Next.js 15, React 19 e i18n',
    longDescription:
      'Portfolio moderno construído com as tecnologias mais recentes, incluindo suporte completo a internacionalização e otimizações de performance.',
    category: 'web',
    status: 'in-progress',
    featured: false,
    thumbnail: {
      url: '/assets/images/projects/web/project-portfolio/main.png',
      alt: 'Portfolio Pessoal',
    },
    images: [
      {
        url: '/assets/images/projects/web/project-portfolio/skills.png',
        alt: 'Habilidades',
      },
    ],
    tags: [
      { id: 'nextjs', label: 'Next.js 15', color: 'bg-blue-600' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-700' },
      { id: 'tailwind', label: 'Tailwind CSS 4', color: 'bg-sky-500' },
      { id: 'i18n', label: 'i18n', color: 'bg-emerald-600' },
    ],
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Framer Motion',
      'next-i18next',
    ],
    liveUrl: 'https://jefersonreis.dev/',
    githubUrl: 'https://github.com/Jeffinp/jefersonreis.portifolio',
    teamSize: 1,
  },

  {
    id: 'ricardodias',
    slug: 'ricardodias',
    title: 'Ricardo Dias',
    description: 'Website para professor de artes',
    category: 'web',
    status: 'completed',
    featured: false,
    thumbnail: {
      url: '/assets/images/projects/web/project-ricardo-dias/main.png',
      alt: 'Ricardo Dias',
    },
    images: [],
    tags: [
      { id: 'react', label: 'React', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
    ],
    technologies: ['Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
    liveUrl: 'https://www.ricardodiasdesenhos.com/',
    teamSize: 1,
  },

  {
    id: 'leve-saude-web',
    slug: 'leve-saude-web',
    title: 'Leve Saúde Web',
    description: 'Website institucional para empresa de saúde',
    category: 'web',
    status: 'completed',
    featured: false,
    thumbnail: {
      url: '/assets/images/projects/web/project-leve-saude-web/main.png',
      alt: 'Leve Saúde Web',
    },
    images: [],
    tags: [
      { id: 'react', label: 'React', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
      { id: 'tailwind', label: 'TailwindCSS', color: 'bg-purple-500' },
    ],
    technologies: ['Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
    liveUrl: 'https://test-web-leve-saude.vercel.app/',
    githubUrl: 'https://github.com/Jeffinp/test-web-leve-saude',
    teamSize: 1,
  },

  {
    id: 'meushop',
    slug: 'meushop',
    title: 'MeuShop',
    description: 'Plataforma de e-commerce',
    category: 'web',
    status: 'in-progress',
    featured: false,
    thumbnail: {
      url: '/assets/images/projects/web/project-meushop/main.png',
      alt: 'MeuShop',
    },
    images: [],
    tags: [
      { id: 'react', label: 'React', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
    ],
    technologies: ['Next.js', 'TailwindCSS', 'TypeScript'],
    teamSize: 1,
  },

  {
    id: 'organizadorweb',
    slug: 'organizadorweb',
    title: 'TaskFlow',
    description: 'Sistema de gestão de tarefas',
    category: 'web',
    status: 'in-progress',
    featured: false,
    thumbnail: {
      url: '/assets/images/projects/web/project-organizador/main.webp',
      alt: 'TaskFlow',
    },
    images: [],
    tags: [
      { id: 'react', label: 'React', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
    ],
    technologies: ['Next.js', 'TailwindCSS', 'TypeScript'],
    teamSize: 1,
  },

  {
    id: 'sistema-solar-3d',
    slug: 'sistema-solar-3d',
    title: 'AstroVerse',
    description: 'Sistema Solar 3D interativo com Three.js',
    category: 'web',
    status: 'completed',
    featured: false,
    thumbnail: {
      url: '/assets/images/projects/web/project-sistema-solar/main.png',
      alt: 'AstroVerse',
    },
    images: [],
    tags: [
      { id: 'react', label: 'React', color: 'bg-blue-500' },
      { id: 'threejs', label: 'Three.js', color: 'bg-purple-600' },
    ],
    technologies: ['React', 'Three.js', 'TailwindCSS'],
    liveUrl: 'https://jefersonreis.dev/3d',
    githubUrl: 'https://github.com/Jeffinp/sistema-solar-3d',
    teamSize: 1,
  },

  {
    id: 'menu-interativo',
    slug: 'menu-interativo',
    title: 'DynamicMenu',
    description: 'Sistema de cardápio digital interativo',
    category: 'web',
    status: 'in-progress',
    featured: false,
    thumbnail: {
      url: '/assets/images/projects/web/project-menu-interativo/main.webp',
      alt: 'DynamicMenu',
    },
    images: [],
    tags: [
      { id: 'react', label: 'React', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
    ],
    technologies: ['Next.js', 'TailwindCSS', 'TypeScript'],
    teamSize: 1,
  },

  {
    id: 'chatbot',
    slug: 'chatbot',
    title: 'SmartChat',
    description: 'Chatbot inteligente para atendimento',
    category: 'web',
    status: 'in-progress',
    featured: false,
    thumbnail: {
      url: '/assets/images/projects/web/project-chatbot/main.webp',
      alt: 'SmartChat',
    },
    images: [],
    tags: [
      { id: 'react', label: 'React', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
    ],
    technologies: ['Next.js', 'TailwindCSS', 'TypeScript'],
    teamSize: 1,
  },

  {
    id: 'jogo-plataforma',
    slug: 'jogo-plataforma',
    title: 'PixelJump',
    description: 'Jogo de plataforma 2D web',
    category: 'web',
    status: 'in-progress',
    featured: false,
    thumbnail: {
      url: '/assets/images/projects/web/project-jogo-plataforma/main.webp',
      alt: 'PixelJump',
    },
    images: [],
    tags: [
      { id: 'react', label: 'React', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
    ],
    technologies: ['Next.js', 'TailwindCSS', 'TypeScript'],
    teamSize: 1,
  },

  // ==========================================
  // MOBILE PROJECTS
  // ==========================================

  {
    id: 'stashy',
    slug: 'stashy',
    title: 'Stashy',
    description: 'Super app de gestão financeira pessoal',
    longDescription:
      'Aplicativo de gestão financeira com backend NestJS, PostgreSQL e frontend React Native. Inclui dashboard, gestão de gastos e planejamento futuro para IA e Open Banking.',
    category: 'mobile',
    status: 'in-progress',
    featured: true,
    order: 1,
    thumbnail: {
      url: '/assets/images/projects/mobile/project-stashy/main.png',
      alt: 'Stashy',
    },
    images: [],
    tags: [
      { id: 'react-native', label: 'React Native', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
      { id: 'nestjs', label: 'NestJS', color: 'bg-red-600' },
      { id: 'postgresql', label: 'PostgreSQL', color: 'bg-blue-700' },
    ],
    technologies: [
      'React Native',
      'Expo SDK 53',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'Supabase',
    ],
    teamSize: 1,
    challenges: [
      'Arquitetura escalável em monorepo',
      'Autenticação segura com JWT e biometria',
      'Dashboard financeiro com visualizações interativas',
      'Integração com Supabase',
    ],
    results: [
      'Backend NestJS completo com autenticação e CRUD',
      'App mobile com login, registro e dashboard',
      'Arquitetura modular e escalável',
      'Design system moderno com tema claro/escuro',
    ],
  },

  {
    id: 'leve-saude-mobile',
    slug: 'leve-saude-mobile',
    title: 'Leve Saúde Mobile',
    description: 'App mobile de gestão de saúde',
    longDescription:
      'Aplicativo mobile desenvolvido com React Native para gestão de informações de saúde, com navegação intuitiva e design moderno.',
    category: 'mobile',
    status: 'completed',
    featured: true,
    order: 2,
    thumbnail: {
      url: '/assets/images/projects/mobile/project-leve-saude-mobile/main.png',
      alt: 'Leve Saúde Mobile',
    },
    images: [],
    tags: [
      { id: 'react-native', label: 'React Native', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
      { id: 'expo', label: 'Expo', color: 'bg-gray-800' },
    ],
    technologies: [
      'React Native',
      'TypeScript',
      'Expo',
      'Styled Components',
      'React Navigation',
    ],
    githubUrl: 'https://github.com/Jeffinp/test-mobile-leve-saude',
    teamSize: 1,
    endDate: '2024-10',
    startDate: '2024-08',
    challenges: [
      'Navegação intuitiva entre telas',
      'Persistência de dados local',
      'Design responsivo para múltiplos dispositivos',
    ],
    results: [
      'App funcional com navegação fluida',
      'Interface moderna e intuitiva',
      'Performance otimizada',
    ],
  },
]

/**
 * Helper: Obter projetos por categoria
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category)
}

/**
 * Helper: Obter projetos em destaque
 */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

/**
 * Helper: Obter projeto por slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/**
 * Helper: Obter categorias únicas
 */
export function getProjectCategories(): ProjectCategory[] {
  const categories = new Set(projects.map((p) => p.category))
  return Array.from(categories)
}
