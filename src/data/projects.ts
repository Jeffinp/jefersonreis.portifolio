import type { Project, ProjectCategory } from '@/types'

/**
 * Todos os projetos do portfólio - Apenas programação (Web, Mobile, Systems)
 * Migrados do portfolio antigo com transformações de tipo completas
 */

export const projects: Project[] = [

  // ==========================================
  // CLIENT PRODUCT — NFC
  // ==========================================

  {
    id: 'tag-social-nfc',
    slug: 'tag-social-nfc',
    title: 'Tag Social NFC',
    description:
      'Ecossistema completo para gravação e gestão de tags NFC com perfis sociais — app Flutter, API NestJS e painel admin Next.js',
    longDescription:
      'Produto SaaS desenvolvido para o cliente Marcelo Guimarães, composto por três camadas integradas: um aplicativo mobile cross-platform (Flutter) que permite ao usuário configurar seus links de redes sociais e gravá-los em tags NFC físicas por aproximação; uma API backend serverless (NestJS + Firebase Functions) responsável pelas regras de negócio, ativação de tags e geração de métricas; e um painel administrativo web (Next.js + Tailwind + Recharts) para gestão de usuários, controle de códigos/tags emitidos e visualização de estatísticas.\n\nA solução usa NDEF, o padrão universal de NFC, permitindo que qualquer smartphone Android ou iOS leia os dados sem instalar app adicional. O módulo de Códigos garante que apenas clientes pagantes ativem suas tags, tornando o sistema pronto para comercialização.',
    category: 'mobile',
    status: 'completed',
    featured: true,
    order: 6,
    client: 'Marcelo Guimarães',
    role: 'Arquiteto e Desenvolvedor Full Stack',
    thumbnail: {
      url: '/assets/images/projects/mobile/project-nfc-social/main.png',
      alt: 'Tag Social NFC — App e Painel Administrativo',
    },
    images: [
      {
        url: '/assets/images/projects/mobile/project-nfc-social/main.png',
        alt: 'Tela principal do app Flutter',
      },
      {
        url: '/assets/images/projects/mobile/project-nfc-social/nfc-write.png',
        alt: 'Interface de gravação da tag NFC por aproximação',
      },
      {
        url: '/assets/images/projects/mobile/project-nfc-social/admin-dashboard.png',
        alt: 'Painel administrativo com métricas e gráficos',
      },
      {
        url: '/assets/images/projects/mobile/project-nfc-social/admin-codes.png',
        alt: 'Gestão de códigos e tags emitidas',
      },
    ],
    tags: [
      { id: 'flutter', label: 'Flutter', color: 'bg-blue-500' },
      { id: 'nestjs', label: 'NestJS', color: 'bg-red-600' },
      { id: 'firebase', label: 'Firebase', color: 'bg-yellow-500' },
      { id: 'nextjs', label: 'Next.js', color: 'bg-black' },
      { id: 'nfc', label: 'NFC / NDEF', color: 'bg-emerald-600' },
    ],
    technologies: [
      'Flutter',
      'Dart',
      'NestJS',
      'TypeScript',
      'Firebase (Firestore, Auth, Functions)',
      'Next.js',
      'Tailwind CSS',
      'Recharts',
      'NFC Manager (NDEF)',
    ],
    teamSize: 1,
    endDate: '2025',
    challenges: [
      'Compatibilidade NFC cross-platform: suporte confiável a Android e iOS com patching customizado do nfc_manager para tags virgens/vazias',
      'Arquitetura serverless com Firebase Functions — escalabilidade sem gerenciamento de servidor',
      'Modelo de ativação por código: garantir que apenas clientes pagantes ativem suas tags via CodesModule na API',
      'Sincronização em tempo real entre app mobile, API e painel admin usando Firestore como fonte única de verdade',
    ],
    results: [
      'App Flutter compilado para Android e iOS a partir de um único código-fonte',
      'API NestJS serverless com módulos de Auth, Users, Codes e Stats',
      'Painel admin web com gráficos interativos (Recharts) e gestão completa de tags',
      'Produto pronto para comercialização com controle de ativação por código',
    ],
  },
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

  // ==========================================
  // SAAS GLOBAL — ORKA IoT
  // ==========================================

  {
    id: 'orka-iot',
    slug: 'orka-iot',
    title: 'Orka — Plataforma SaaS IoT',
    description:
      'Plataforma SaaS global de monitoramento e controle de sensores IoT em tempo real — Go, Angular 19 e TimescaleDB',
    longDescription:
      'O Orka é uma plataforma SaaS de alto desempenho para controle e monitoramento de hardwares IoT. Recebe milhões de pontos de telemetria em tempo real (pH, temperatura, ORP) via MQTT, e permite que usuários enviem comandos de calibração e alterem parâmetros de sensores remotamente a partir de qualquer lugar do mundo. Atende ativamente o Brasil, Estados Unidos e países hispânicos, com arquitetura Multi-tenant que isola completamente os dados por empresa.\n\nO backend em Go implementa execução síncrona sobre MQTT com channels correlacionados (req_id + timeout), padrão Unit of Work sobre GORM para transações atômicas, Sentinel Errors com domínio, código e tradução automática, e TimescaleDB com hypertables para compressão e agregação on-the-fly de séries temporais.\n\nO frontend Angular 19 usa o padrão Slice/Updater/Store com Signals para reatividade de granulação fina, Feature-Sliced Design, withRequestStatus() reutilizável e Silent Refresh com cookies HttpOnly para sessão resiliente.',
    category: 'web',
    status: 'completed',
    featured: true,
    order: 7,
    role: 'Arquiteto e Desenvolvedor Full Stack',
    thumbnail: {
      url: '/assets/images/projects/web/project-orka/main.png',
      alt: 'Orka — Dashboard SaaS IoT',
    },
    images: [
      {
        url: '/assets/images/projects/web/project-orka/main.png',
        alt: 'Dashboard principal com mapa de equipamentos',
      },
      {
        url: '/assets/images/projects/web/project-orka/realtime.png',
        alt: 'Monitoramento de séries temporais em tempo real',
      },
      {
        url: '/assets/images/projects/web/project-orka/calibration.png',
        alt: 'Interface de calibração remota de sensores',
      },
      {
        url: '/assets/images/projects/web/project-orka/devices.png',
        alt: 'Gestão de dispositivos com heartbeat e status global',
      },
    ],
    tags: [
      { id: 'golang', label: 'Go', color: 'bg-cyan-600' },
      { id: 'angular', label: 'Angular 19', color: 'bg-red-600' },
      { id: 'timescaledb', label: 'TimescaleDB', color: 'bg-orange-500' },
      { id: 'mqtt', label: 'MQTT', color: 'bg-purple-600' },
      { id: 'postgresql', label: 'PostgreSQL', color: 'bg-blue-700' },
    ],
    technologies: [
      'Go 1.25',
      'Gin',
      'PostgreSQL',
      'TimescaleDB',
      'GORM',
      'MQTT (Eclipse Paho)',
      'JWT / RBAC',
      'Angular 19',
      'NgRx Signals',
      'Tailwind CSS v4',
      'Leaflet',
      'Highcharts',
      'Zod',
    ],
    teamSize: 1,
    endDate: '2025',
    challenges: [
      'Execução síncrona sobre MQTT: correlacionar req_id + Go channels para aguardar resposta de hardware físico com timeout via context.Context',
      'Processamento massivo de séries temporais: TimescaleDB hypertables com compressão automática e time_bucket para relatórios on-the-fly',
      'Multi-tenancy global: isolamento rigoroso por company_id e RBAC (Operator / Manager / Administrator) para dados de clientes em BR, US e países hispânicos',
      'Resiliência de sessão no frontend: Silent Refresh com tokens em memória e refresh_token em cookie HttpOnly evitando quedas em telas críticas',
    ],
    results: [
      'Backend Go com arquitetura Handler → Service → Repository e padrão Unit of Work para transações atômicas automáticas',
      'Sentinel Errors com domínio, código e tradução automática — API consistente para frontends globais',
      'Padrão Slice/Updater/Store com Angular Signals: DOM atualizado cirurgicamente sem boilerplate NgRx tradicional',
      'Sistema multi-tenant e timezone-aware em produção servindo Brasil, EUA e América Latina',
    ],
  },

  // ==========================================
  // HEALTH-TECH — CAREMATCH
  // ==========================================

  {
    id: 'carematch',
    slug: 'carematch',
    title: 'CareMatch — Marketplace Health-Tech',
    description:
      'Marketplace SaaS de saúde conectando pacientes a profissionais — NestJS 11, React Native, PostGIS, Stripe e GraphQL',
    longDescription:
      'O CareMatch é uma plataforma marketplace/SaaS na área de saúde que conecta pacientes a profissionais qualificados. O ecossistema é composto por um app mobile (React Native + Expo SDK 54) e um backend robusto (NestJS 11) em monorepo.\n\nO backend expõe APIs híbridas REST + GraphQL Code-First (Apollo), usa PostgreSQL 15 com PostGIS 3 para busca geoespacial de profissionais próximos via geography(Point,4326) em milissegundos, e Prisma ORM 6.19. Redis alimenta JWT Blacklist, rate-limiting e Pub/Sub para chat em tempo real via GraphQL Subscriptions. Integra Stripe para pagamentos com split e confirmação via webhook, Twilio para OTP/SMS e DiDiT para KYC/KYB de profissionais.\n\nO app mobile usa Zustand para estado fragmentado (authStore, appointmentStore, paymentStore, locationStore), Expo Router com file-based routing, expo-secure-store para credenciais criptografadas e Payment Sheet nativo do Stripe.\n\nObservabilidade enterprise com Prometheus + Terminus health checks monitorando latência do Postgres, heap, disco e conexão Redis.',
    category: 'mobile',
    status: 'in-progress',
    featured: true,
    order: 8,
    role: 'Arquiteto e Desenvolvedor Full Stack',
    thumbnail: {
      url: '/assets/images/projects/mobile/project-carematch/main.png',
      alt: 'CareMatch — Marketplace de Saúde',
    },
    images: [
      {
        url: '/assets/images/projects/mobile/project-carematch/main.png',
        alt: 'Tela principal do app com Smart Match',
      },
      {
        url: '/assets/images/projects/mobile/project-carematch/search.png',
        alt: 'Busca geoespacial de profissionais próximos',
      },
      {
        url: '/assets/images/projects/mobile/project-carematch/profile.png',
        alt: 'Perfil do profissional com avaliações e verificação KYC',
      },
      {
        url: '/assets/images/projects/mobile/project-carematch/payment.png',
        alt: 'Fluxo de pagamento com Stripe Payment Sheet nativo',
      },
    ],
    tags: [
      { id: 'nestjs', label: 'NestJS 11', color: 'bg-red-600' },
      { id: 'react-native', label: 'React Native', color: 'bg-blue-500' },
      { id: 'postgis', label: 'PostGIS', color: 'bg-emerald-600' },
      { id: 'graphql', label: 'GraphQL', color: 'bg-pink-600' },
      { id: 'stripe', label: 'Stripe', color: 'bg-indigo-600' },
    ],
    technologies: [
      'NestJS 11',
      'TypeScript',
      'PostgreSQL 15',
      'PostGIS 3',
      'Prisma ORM 6',
      'GraphQL (Apollo)',
      'Redis',
      'Stripe (Payments + Split)',
      'Twilio (OTP/SMS)',
      'DiDiT (KYC/KYB)',
      'React Native',
      'Expo SDK 54',
      'Zustand',
      'Expo Router',
      'Prometheus',
    ],
    teamSize: 1,
    endDate: '2025',
    challenges: [
      'Busca geoespacial com PostGIS: view materializada v_enderecos_completos com geography(Point,4326) para encontrar profissionais próximos em milissegundos',
      'API híbrida REST + GraphQL: REST para webhooks e fluxos lineares (Stripe, uploads), GraphQL com Dataloader para telas densas sem over-fetching',
      'Segurança financeira: JWT de vida curta (15min) + Refresh Token + Blacklist em Redis com TTL, confirmação de pagamento exclusivamente via webhook do Stripe',
      'Onboarding georreferenciado: validação de CEP via BrasilAPI → ViaCEP com geocodificação encadeada para consolidar coordenadas antes de persistir no banco',
    ],
    results: [
      'Backend NestJS 11 modular com domínios Auth, Professionals, Appointments, Payments e Search com separação estrita de responsabilidades',
      'Observabilidade enterprise: MetricsInterceptor + Prometheus + Terminus monitorando Postgres, Redis, heap e disco',
      'App React Native com arquitetura anti-flash (ThemeProvider + SystemUI nativo) e estado fragmentado via Zustand com persistência seletiva',
      'Conformidade KYC/KYB via DiDiT e documentação técnica no padrão Diátaxis (Tutorials, How-Tos, Reference, Explanation)',
    ],
  },

  // ==========================================
  // INSTITUCIONAL — ÁGATA MARTINS ADVOCACIA
  // ==========================================

  {
    id: 'agata-martins-advocacia',
    slug: 'agata-martins-advocacia',
    title: 'Ágata Martins Advocacia',
    description:
      'Website institucional de alta performance para escritório jurídico — Next.js 15, React 19, Design System customizado e foco em conversão',
    longDescription:
      'Website institucional moderno para o escritório Ágata Martins Advocacia, com forte atuação em Direito de Família e Cível. Construído do zero com Next.js 15.5 (App Router) e React 19, aproveitando React Server Components e geração estática para entregar HTML puro ao Google antes da hidratação.\n\nA identidade visual foi desenhada em torno de Marsala (#692046) e Dourado (#D4AF37), transmitindo seriedade e prestígio, com um Design System baseado em Design Tokens (variáveis CSS) que permite rebrand alterando um único arquivo.\n\nO compilador SWC remove console.logs em produção e minimiza cirurgicamente o bundle JS, acelerando o First Contentful Paint. Imagens são processadas em tempo real pelo Sharp para WebP/AVIF adaptado ao dispositivo do visitante.\n\nHeader sticky com dropdown de especialidades e CTAs estratégicos para WhatsApp, FAQ expandível e scroll suave em formato de funil guiam o usuário até a conversão. Integração com Google Analytics e Facebook SDK prepara o site para campanhas de tráfego pago com rastreamento completo de cliques e abandonos.',
    category: 'web',
    status: 'completed',
    featured: true,
    order: 9,
    client: 'Ágata Martins',
    role: 'Desenvolvedor Full Stack e Designer',
    thumbnail: {
      url: '/assets/images/projects/web/project-agata-martins/main.png',
      alt: 'Ágata Martins Advocacia — Website Institucional',
    },
    images: [
      {
        url: '/assets/images/projects/web/project-agata-martins/main.png',
        alt: 'Hero section com identidade visual Marsala e Dourado',
      },
      {
        url: '/assets/images/projects/web/project-agata-martins/services.png',
        alt: 'Seção de especialidades com dropdowns e CTAs',
      },
      {
        url: '/assets/images/projects/web/project-agata-martins/faq.png',
        alt: 'FAQ expandível com dúvidas frequentes',
      },
      {
        url: '/assets/images/projects/web/project-agata-martins/mobile.png',
        alt: 'Layout mobile-first otimizado para conversão',
      },
    ],
    tags: [
      { id: 'nextjs', label: 'Next.js 15', color: 'bg-black' },
      { id: 'react', label: 'React 19', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
      { id: 'tailwind', label: 'Tailwind CSS 4', color: 'bg-cyan-500' },
      { id: 'seo', label: 'SEO / Core Web Vitals', color: 'bg-green-600' },
    ],
    technologies: [
      'Next.js 15.5 (App Router)',
      'React 19 (RSC)',
      'TypeScript 5',
      'Tailwind CSS 4',
      'SWC Compiler',
      'Sharp (WebP/AVIF)',
      'Google Analytics',
      'Facebook SDK',
      'Lucide React',
    ],
    teamSize: 1,
    endDate: '2025',
    challenges: [
      'Design System escalável com Design Tokens: variáveis CSS (--marsala, --gold) com paletas light/dark e sombras soft/medium/hard — rebrand em um único arquivo',
      'SEO formidável para nicho jurídico: App Router com layouts aninhados, Metadata API dedicada por página e geração estática para HTML puro ao crawler do Google',
      'Otimização extrema de bundle: SWC minifier com remoção automática de console.logs em produção, processamento de imagens via Sharp para WebP/AVIF adaptado ao dispositivo',
      'UX guiada a conversão: funil de leitura com scroll suave, header sticky com dropdowns de especialidades e CTAs estratégicos para WhatsApp',
    ],
    results: [
      'Core Web Vitals otimizados com geração estática e imagens processadas em tempo real pelo Sharp',
      'Design System em Design Tokens com identidade Marsala + Dourado — tipografia Serif para títulos e Sans-Serif para corpo',
      'Integração com Google Analytics e Facebook SDK preparando o site para campanhas de tráfego pago com rastreamento completo',
      'Layout mobile-first com botões clicáveis pelo polegar e foco estrito em fazer o escritório converter visitantes em clientes',
    ],
  },

  // ==========================================
  // EDTECH — STUDYFLOW / CONCURSANDO 360
  // ==========================================

  {
    id: 'studyflow',
    slug: 'studyflow',
    title: 'StudyFlow — Concursando 360',
    description:
      'Plataforma B2C de gestão de estudos em monorepo — NestJS 11, Next.js 16, React Native (Expo 54), Docker e VPS',
    longDescription:
      'O StudyFlow (Concursando 360) é uma plataforma B2C completa de planejamento e gestão de estudos para concurseiros. O diferencial de engenharia é a estrutura em Monorepo: três aplicações independentes (backend, web e mobile) coexistem em um único repositório com padronização de código, deploy orquestrado e manutenção centralizada.\n\nO backend NestJS 11 utiliza PostgreSQL + TypeORM, autenticação JWT com hash Argon2 (vencedor do Password Hashing Competition, resistente a ataques GPU/ASIC), proteção com Helmet e Throttler contra força bruta, integração Stripe para assinaturas e Resend para emails transacionais.\n\nA plataforma web usa Next.js 16.1 com React 19.2 e Tailwind CSS v4, adotando React Server Components para enviar o mínimo de JavaScript ao navegador.\n\nO app mobile (React Native + Expo SDK 54) segue Feature-Sliced Design com domínios isolados (Cronograma, Estudos, etc.), Expo Router para file-based routing com deep-linking, expo-secure-store para tokens no cofre nativo do dispositivo, haptics, push notifications e monetização via Google Mobile Ads.\n\nA infraestrutura é totalmente dockerizada com scripts automatizados e deploy self-hosted em VPS Hostinger, eliminando dependência de PaaS caros e reduzindo custo operacional.',
    category: 'web',
    status: 'in-progress',
    featured: true,
    order: 10,
    role: 'Arquiteto e Desenvolvedor Full Stack',
    thumbnail: {
      url: '/assets/images/projects/web/project-studyflow/main.png',
      alt: 'StudyFlow — Plataforma de Gestão de Estudos',
    },
    images: [
      {
        url: '/assets/images/projects/web/project-studyflow/main.png',
        alt: 'Dashboard web com cronograma de estudos',
      },
      {
        url: '/assets/images/projects/web/project-studyflow/mobile.png',
        alt: 'App mobile com planejamento diário',
      },
      {
        url: '/assets/images/projects/web/project-studyflow/stats.png',
        alt: 'Métricas e progresso de estudos',
      },
      {
        url: '/assets/images/projects/web/project-studyflow/docker.png',
        alt: 'Infraestrutura Docker e deploy automatizado',
      },
    ],
    tags: [
      { id: 'nestjs', label: 'NestJS 11', color: 'bg-red-600' },
      { id: 'nextjs', label: 'Next.js 16', color: 'bg-black' },
      { id: 'react-native', label: 'React Native', color: 'bg-blue-500' },
      { id: 'docker', label: 'Docker', color: 'bg-blue-700' },
      { id: 'postgresql', label: 'PostgreSQL', color: 'bg-blue-600' },
    ],
    technologies: [
      'NestJS 11',
      'TypeScript',
      'PostgreSQL',
      'TypeORM',
      'JWT / Argon2',
      'Helmet / Throttler',
      'Stripe (Subscriptions)',
      'Resend',
      'Next.js 16.1',
      'React 19.2',
      'Tailwind CSS v4',
      'React Native',
      'Expo SDK 54',
      'Expo Router',
      'Docker',
      'VPS (Hostinger)',
    ],
    teamSize: 1,
    endDate: '2025',
    challenges: [
      'Monorepo com 3 aplicações independentes (backend, web, mobile) em um único repositório com padronização de código e deploy orquestrado',
      'Segurança avançada com Argon2 (resistente a GPU/ASIC), JWT de vida curta, Helmet e rate-limiting via Throttler contra força bruta',
      'Feature-Sliced Design no mobile: domínios isolados (Cronograma, Estudos) com UI, serviços e hooks colocalizados por feature',
      'Self-hosting dockerizado em VPS: eliminação de PaaS caros com scripts automatizados de build e deploy (docker-compose.prod.yml)',
    ],
    results: [
      'Backend NestJS 11 com arquitetura modular DI, monetização Stripe e emails transacionais via Resend',
      'Web Next.js 16 com React Server Components — mínimo de JS enviado ao navegador para performance máxima',
      'App React Native com Expo Router, secure-store nativo, haptics, push notifications e Google Mobile Ads',
      'Infraestrutura Docker completa com deploy self-hosted reduzindo custo operacional vs Vercel/Heroku',
    ],
  },

  // ==========================================
  // SYSTEMS ENGINEERING — STORMDB
  // ==========================================

  {
    id: 'stormdb',
    slug: 'stormdb',
    title: 'StormDB',
    description:
      'Banco de dados in-memory de alta performance escrito do zero em Rust — compatível com protocolo Redis (RESP2), 110k ops/s',
    longDescription:
      'O StormDB é um banco de dados in-memory construído do zero em Rust, 100% compatível com o protocolo Redis (RESP2). Clientes e bibliotecas do ecossistema Redis se conectam nativamente sem nenhuma adaptação.\n\nA arquitetura usa Cargo Workspaces com crates independentes: storage (engine de dados), protocol (parser Zero-Copy do RESP2), server (camada TCP + Tokio) e monitor/cli (clientes nativos de gerenciamento).\n\nA concorrência usa DashMap com sharding automático: leituras (GET) operam lock-free enquanto escritas (SET) bloqueiam apenas a fatia exata de memória acessada, alcançando ~110.000 ops/s em GET e ~30µs por PING. O parser Zero-Copy lê direto do buffer do socket TCP via Bytes sem alocar memória na Heap.\n\nPara durabilidade, implementei AOF (Append-Only File) com I/O assíncrono via Tokio e fsync controlado, permitindo crash recovery completo. A replicação Master-Slave usa Broadcast Stream assíncrono sobre TCP para read-scaling horizontal. O Pub/Sub em tempo real opera como message broker eficiente via canais multithread nativos do Rust.\n\nInclui TUI Dashboard integrado para monitoramento em tempo real via terminal e containerização Docker com docker-compose para cluster Master + Réplica em uma stormnet isolada.',
    category: 'system',
    status: 'completed',
    featured: true,
    order: 11,
    role: 'Criador e Engenheiro de Sistemas',
    thumbnail: {
      url: '/assets/images/projects/system/project-stormdb/main.png',
      alt: 'StormDB — Banco de Dados In-Memory em Rust',
    },
    images: [
      {
        url: '/assets/images/projects/system/project-stormdb/main.png',
        alt: 'Arquitetura do StormDB com crates separados',
      },
      {
        url: '/assets/images/projects/system/project-stormdb/tui.png',
        alt: 'TUI Dashboard de monitoramento em tempo real',
      },
      {
        url: '/assets/images/projects/system/project-stormdb/benchmark.png',
        alt: 'Benchmark de 110k ops/s em operações GET',
      },
      {
        url: '/assets/images/projects/system/project-stormdb/replication.png',
        alt: 'Replicação Master-Slave via TCP',
      },
    ],
    tags: [
      { id: 'rust', label: 'Rust', color: 'bg-orange-700' },
      { id: 'tokio', label: 'Tokio', color: 'bg-purple-600' },
      { id: 'resp2', label: 'RESP2 / Redis', color: 'bg-red-600' },
      { id: 'dashmap', label: 'DashMap', color: 'bg-emerald-600' },
      { id: 'docker', label: 'Docker', color: 'bg-blue-700' },
    ],
    technologies: [
      'Rust',
      'Tokio (Async Runtime)',
      'DashMap (Lock-Free Sharding)',
      'RESP2 Protocol',
      'Zero-Copy Parser (Bytes)',
      'AOF (Append-Only File)',
      'Master-Slave Replication',
      'Pub/Sub (tokio-stream)',
      'TUI Dashboard',
      'Docker / docker-compose',
    ],
    githubUrl: 'https://github.com/Jeffinp/stormdb',
    teamSize: 1,
    endDate: '2025',
    challenges: [
      'Concorrência extrema: DashMap com sharding automático para leituras lock-free em milhares de conexões simultâneas, sem Mutex global',
      'Parser Zero-Copy do protocolo RESP2: leitura direta do buffer TCP via Bytes sem alocação na Heap, alcançando ~30µs por PING',
      'Durabilidade AOF: interceptação de operações mutáveis com escrita assíncrona em disco via Tokio e fsync controlado para crash recovery',
      'Replicação distribuída Master-Slave: Broadcast Stream assíncrono sobre TCP sincronizando mutações para todas as réplicas em tempo real',
    ],
    results: [
      'Benchmark de ~110.000 GET/s comprovando que as decisões de arquitetura eliminaram overhead e operam no limite do hardware',
      'Compatibilidade total com protocolo Redis — qualquer cliente Redis (redis-cli, ioredis, Jedis) se conecta nativamente',
      'Cargo Workspaces com crates isolados (storage, protocol, server, monitor, cli) para testabilidade e manutenção independente',
      'Cluster Docker com Master + Réplica em stormnet isolada subindo em um único comando',
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
