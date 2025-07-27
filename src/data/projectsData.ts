interface ProjectImage {
  src: string
  alt: string
  width?: number
  height?: number
}

interface ProjectTag {
  name: string
  color?: string
}

interface Project {
  id: string
  titleKey: string
  descriptionKey: string
  fullDescriptionKey?: string
  image: ProjectImage
  images?: ProjectImage[]
  link?: string
  githubUrl?: string
  tags: ProjectTag[]
  featured?: boolean
  date?: string
  client?: string
  category?: string
  restricted?: boolean
  type?: 'contracted' | 'personal'
  technologies?: string[]
  completionDate?: string
  teamSize?: number
  duration?: string
  challenges?: string[]
  results?: string[]
  testimonial?: {
    text: string
    author: string
    role: string
    company: string
  }
}

export const projects: Project[] = [
  // MOBILE PROJECT (React Native)
  {
    id: 'leve-saude-mobile',
    titleKey: 'portfolio.projects.leveSaudeMobile.title',
    descriptionKey: 'portfolio.projects.leveSaudeMobile.description',
    fullDescriptionKey: 'portfolio.projects.leveSaudeMobile.fullDescription',
    image: {
      src: '/assets/images/test-web-leve-saude.vercel.app.png',
      alt: 'Leve Saúde Mobile App',
      width: 1200,
      height: 800,
    },
    link: 'https://test-web-leve-saude.vercel.app/',
    githubUrl: 'https://github.com/jefersonreis-dev/leve-saude-mobile',
    tags: [
      { name: 'React Native', color: 'bg-blue-500 text-white' },
      { name: 'TypeScript', color: 'bg-blue-600 text-white' },
      { name: 'Mobile', color: 'bg-green-600 text-white' },
      { name: 'Technical Test', color: 'bg-purple-600 text-white' },
    ],
    featured: true,
    category: 'mobile',
    type: 'personal',
    technologies: [
      'React Native',
      'TypeScript',
      'Mobile Development',
      'Technical Test',
    ],
    completionDate: '2025',
    teamSize: 1,
    duration: '1 semanas',
    challenges: [
      'Desenvolvimento em React Native para primeira experiência mobile',
      'Implementação de navegação complexa com React Navigation',
      'Otimização de performance em listas grandes',
      'Adaptação de design responsivo para diferentes tamanhos de tela',
    ],
    results: [
      'App funcional com navegação fluida',
      'Interface moderna e intuitiva',
      'Performance otimizada para listas de dados',
      'Código bem estruturado e documentado',
    ],
  },

  // COMMERCIAL PROJECTS (Listed first)
  {
    id: 'itamir-gestao-juridica',
    titleKey: 'portfolio.projects.itamir.title',
    descriptionKey: 'portfolio.projects.itamir.description',
    fullDescriptionKey: 'portfolio.projects.itamir.fullDescription',
    image: {
      src: '/assets/images/gestaojuridica.png',
      alt: 'Gestão Jurídica',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'React 19', color: 'bg-blue-500 text-white' },
      { name: 'Vite', color: 'bg-purple-500 text-white' },
      { name: 'Python', color: 'bg-green-600 text-white' },
      { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
      { name: 'PostgreSQL', color: 'bg-blue-600 text-white' },
    ],
    featured: true,
    restricted: true,
    category: 'web',
    type: 'contracted',
    technologies: [
      'React 19',
      'Vite',
      'Python',
      'Tailwind CSS 4.0',
      'PostgreSQL',
      'Framer Motion',
      'Shadcn/UI',
      'React Router DOM',
      'argon2-cffi',
      'Axios',
      'React Hook Form',
      'Material-UI (MUI)',
    ],
    completionDate: '2024',
    teamSize: 3,
    duration: '6 meses',
    challenges: [
      'Migração de sistema legado para arquitetura moderna',
      'Implementação de sistema de autenticação e autorização robusto',
      'Integração com APIs do Poder Judiciário',
      'Otimização de consultas complexas no banco de dados',
      'Interface responsiva para diferentes dispositivos',
    ],
    results: [
      'Redução de 70% no tempo de processamento de dados',
      'Interface moderna e intuitiva para advogados',
      'Sistema de backup automático implementado',
      'Melhoria significativa na experiência do usuário',
      'Integração completa com sistemas externos',
    ],
    testimonial: {
      text: 'O sistema desenvolvido pelo Jeferson superou nossas expectativas. A interface é moderna e intuitiva, e conseguimos otimizar nossos processos jurídicos significativamente.',
      author: 'Dr. Itamir Santos',
      role: 'Advogado Sócio',
      company: 'Escritório Itamir & Associados',
    },
  },
  {
    id: 'flyserv-drones',
    titleKey: 'portfolio.projects.flyservDrones.title',
    descriptionKey: 'portfolio.projects.flyservDrones.description',
    fullDescriptionKey: 'portfolio.projects.flyservDrones.fullDescription',
    image: {
      src: '/assets/images/flyserv.webp',
      alt: 'FlyServ Drones',
      width: 1200,
      height: 800,
    },
    link: 'https://flyservdrones.com.br/',
    tags: [
      { name: 'React 19', color: 'bg-blue-500 text-white' },
      { name: 'TypeScript', color: 'bg-blue-600 text-white' },
      { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
      { name: 'Framer Motion', color: 'bg-purple-600 text-white' },
    ],
    featured: true,
    client: 'FlyServ Drones',
    category: 'web',
    type: 'contracted',
    technologies: [
      'React 19',
      'TypeScript',
      'Tailwind CSS 4.0',
      'Framer Motion',
      'Headless UI',
      'React Router DOM',
      'PHP',
      'Vite',
      'React Helmet',
    ],
    completionDate: '2024',
    teamSize: 2,
    duration: '3 semanas',
    challenges: [
      'Criação de landing page moderna e responsiva',
      'Implementação de animações sofisticadas',
      'Otimização para performance e SEO',
      'Integração com formulários de contato',
    ],
    results: [
      'Landing page moderna e atrativa',
      'Animações fluidas e profissionais',
      'Performance otimizada (90+ Lighthouse)',
      'Aumento significativo na conversão de leads',
    ],
  },
  {
    id: 'meu-shop',
    titleKey: 'portfolio.projects.meuShop.title',
    descriptionKey: 'portfolio.projects.meuShop.description',
    fullDescriptionKey: 'portfolio.projects.meuShop.fullDescription',
    image: {
      src: '/assets/images/MeuShop.png',
      alt: 'Meu Shop E-commerce',
      width: 1200,
      height: 800,
    },
    link: 'https://meu-ecommerce.vercel.app/',
    tags: [
      { name: 'Angular', color: 'bg-red-600 text-white' },
      { name: 'TypeScript', color: 'bg-blue-600 text-white' },
      { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
      { name: 'Python', color: 'bg-green-600 text-white' },
      { name: 'PostgreSQL', color: 'bg-blue-600 text-white' },
    ],
    category: 'web',
    type: 'personal',
    technologies: [
      'Angular',
      'TypeScript',
      'Tailwind CSS 4.0',
      'Python',
      'PostgreSQL',
      'Axios',
      'argon2-cffi',
    ],
    completionDate: '2024',
    teamSize: 1,
    duration: '1 mês',
    challenges: [
      'Desenvolvimento full-stack com Angular e Python',
      'Implementação de carrinho de compras funcional',
      'Sistema de autenticação e autorização',
      'Integração com banco de dados PostgreSQL',
    ],
    results: [
      'E-commerce completo e funcional',
      'Sistema de gestão de produtos eficiente',
      'Interface de usuário moderna e responsiva',
      'Backend robusto com APIs RESTful',
    ],
  },
  {
    id: 'gestao_financeira',
    titleKey: 'portfolio.projects.gestaoFinanceira.title',
    descriptionKey: 'portfolio.projects.gestaoFinanceira.description',
    fullDescriptionKey: 'portfolio.projects.gestaoFinanceira.fullDescription',
    image: {
      src: '/assets/images/Gestao_financeira.png',
      alt: 'Gestão Financeira',
      width: 1200,
      height: 800,
    },
    link: 'https://gestao-financeira-three.vercel.app/',
    tags: [
      { name: 'React', color: 'bg-blue-500 text-white' },
      { name: 'TypeScript', color: 'bg-blue-600 text-white' },
      { name: 'Framer Motion', color: 'bg-purple-600 text-white' },
      { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
    ],
    category: 'web',
    type: 'personal',
    technologies: ['React', 'TypeScript', 'Framer-motion', 'Tailwind CSS'],
  },
  {
    id: 'online-drawing-course',
    titleKey: 'portfolio.projects.onlineDrawingCourse.title',
    descriptionKey: 'portfolio.projects.onlineDrawingCourse.description',
    fullDescriptionKey:
      'portfolio.projects.onlineDrawingCourse.fullDescription',
    image: {
      src: '/assets/images/Screenshot_987.webp',
      alt: 'Curso de Desenho Online',
      width: 1200,
      height: 800,
    },
    link: 'https://www.desenhosricardodias.com.br/',
    tags: [
      { name: 'HTML', color: 'bg-orange-500 text-white' },
      { name: 'CSS', color: 'bg-blue-400 text-white' },
      { name: 'JavaScript', color: 'bg-yellow-500 text-black' },
    ],
    featured: true,
    client: 'Ricardo Dias',
    category: 'web',
    type: 'contracted',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    completionDate: '2023',
    teamSize: 1,
    duration: '2 semanas',
    challenges: [
      'Criação de site educacional atrativo',
      'Design responsivo para diferentes dispositivos',
      'Integração com sistema de pagamentos',
      'Otimização para mecanismos de busca',
    ],
    results: [
      'Website educacional profissional',
      'Aumento de 150% nas inscrições do curso',
      'Interface intuitiva para estudantes',
      'Sistema de vendas online funcional',
    ],
    testimonial: {
      text: 'O site ficou exatamente como imaginei. O Jeferson entendeu perfeitamente minha visão e criou algo que realmente representa meu trabalho como artista.',
      author: 'Ricardo Dias',
      role: 'Artista e Instrutor',
      company: 'Curso de Desenho Online',
    },
  },
  {
    id: 'weight-loss-program',
    titleKey: 'portfolio.projects.weightLossProgram.title',
    descriptionKey: 'portfolio.projects.weightLossProgram.description',
    fullDescriptionKey: 'portfolio.projects.weightLossProgram.fullDescription',
    image: {
      src: '/assets/images/Screenshot_1023.webp',
      alt: 'Programa de Emagrecimento',
      width: 1200,
      height: 800,
    },
    link: 'https://secaedefine.vercel.app',
    tags: [
      { name: 'HTML', color: 'bg-orange-500 text-white' },
      { name: 'CSS', color: 'bg-blue-400 text-white' },
      { name: 'JavaScript', color: 'bg-yellow-500 text-black' },
    ],
    featured: true,
    client: 'Seca e Define',
    category: 'web',
    type: 'contracted',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    completionDate: '2023',
    teamSize: 1,
    duration: '1 semana',
    challenges: [
      'Landing page persuasiva para programa de emagrecimento',
      'Design que transmita confiança e resultados',
      'Integração com WhatsApp para conversão',
      'Otimização para conversão de leads',
    ],
    results: [
      'Landing page de alta conversão',
      'Aumento de 200% na geração de leads',
      'Design profissional e confiável',
      'Taxa de conversão acima da média do mercado',
    ],
  },

  // PERSONAL WEB PROJECTS (Listed after commercial projects)
  {
    id: 'sistema-solar',
    titleKey: 'portfolio.projects.systemSolar.title',
    descriptionKey: 'portfolio.projects.systemSolar.description',
    fullDescriptionKey: 'portfolio.projects.systemSolar.fullDescription',
    image: {
      src: '/assets/images/SistemaSolar.png',
      alt: 'Sistema Solar',
      width: 1200,
      height: 800,
    },
    link: 'https://sistema-solar-puce.vercel.app/',
    tags: [
      { name: 'React', color: 'bg-blue-500 text-white' },
      { name: 'TypeScript', color: 'bg-blue-600 text-white' },
      { name: 'Three.js', color: 'bg-black text-white' },
      { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
    ],
    category: 'web',
    type: 'personal',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Three.js',
      'Shadcn/UI',
    ],
  },
  {
    id: 'python-chatbot',
    titleKey: 'portfolio.projects.pythonChatbot.title',
    descriptionKey: 'portfolio.projects.pythonChatbot.description',
    fullDescriptionKey: 'portfolio.projects.pythonChatbot.fullDescription',
    image: {
      src: '/assets/images/Chatbot.webp',
      alt: 'Chatbot',
      width: 1200,
      height: 800,
    },
    link: `${process.env.NEXT_PUBLIC_GITHUB_URL}/ProjetoPython`,
    tags: [
      { name: 'Python', color: 'bg-green-600 text-white' },
      { name: 'Machine Learning', color: 'bg-purple-700 text-white' },
      { name: 'NLP', color: 'bg-blue-700 text-white' },
    ],
    category: 'web',
    type: 'personal',
    technologies: ['Python', 'Machine Learning', 'Natural Language Processing'],
  },
  {
    id: 'file-manager',
    titleKey: 'portfolio.projects.fileManager.title',
    descriptionKey: 'portfolio.projects.fileManager.description',
    fullDescriptionKey: 'portfolio.projects.fileManager.fullDescription',
    image: {
      src: '/assets/images/Screenshot_1051.webp',
      alt: 'Gerenciador de Arquivos',
      width: 1200,
      height: 800,
    },
    link: `${process.env.NEXT_PUBLIC_GITHUB_URL}/file_organizer`,
    tags: [
      { name: 'Python', color: 'bg-green-600 text-white' },
      { name: 'HTML', color: 'bg-orange-500 text-white' },
      { name: 'CSS', color: 'bg-blue-400 text-white' },
      { name: 'JavaScript', color: 'bg-yellow-500 text-black' },
    ],
    category: 'web',
    type: 'personal',
    technologies: ['Python', 'File Management', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'platform-game',
    titleKey: 'portfolio.projects.platformGame.title',
    descriptionKey: 'portfolio.projects.platformGame.description',
    fullDescriptionKey: 'portfolio.projects.platformGame.fullDescription',
    image: {
      src: '/assets/images/jogoplataforma.webp',
      alt: 'Jogo de Plataforma',
      width: 1200,
      height: 800,
    },
    link: 'https://plataforma-chatgpt-main.vercel.app/',
    tags: [
      { name: 'JavaScript', color: 'bg-yellow-500 text-black' },
      { name: 'HTML', color: 'bg-orange-500 text-white' },
      { name: 'CSS', color: 'bg-blue-400 text-white' },
      { name: 'Game Development', color: 'bg-gray-700 text-white' },
    ],
    category: 'web',
    type: 'personal',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Game Development'],
  },
  {
    id: 'personal-portfolio',
    titleKey: 'portfolio.projects.portfolio.title',
    descriptionKey: 'portfolio.projects.portfolio.description',
    fullDescriptionKey: 'portfolio.projects.portfolio.fullDescription',
    image: {
      src: '/assets/images/site.webp',
      alt: 'Personal Portfolio',
      width: 1200,
      height: 800,
    },
    link: 'https://jefersonreis-github-io.vercel.app/index.html',
    tags: [
      { name: 'Next.js', color: 'bg-black text-white' },
      { name: 'TypeScript', color: 'bg-blue-600 text-white' },
      { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
    ],
    featured: true,
    category: 'web',
    type: 'personal',
    technologies: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS 4.0',
      'Framer Motion',
      'Next-i18next',
    ],
    completionDate: '2024',
    teamSize: 1,
    duration: '3 semanas',
    challenges: [
      'Portfolio moderno e performático',
      'Sistema de internacionalização completo',
      'Animações sofisticadas com Framer Motion',
      'SEO otimizado e acessibilidade',
    ],
    results: [
      'Portfolio de alta performance (95+ Lighthouse)',
      'Suporte completo a português e inglês',
      'Design responsivo e moderno',
      'Experiência de usuário excepcional',
    ],
  },
  {
    id: 'christmas-gift',
    titleKey: 'portfolio.projects.christmasGift.title',
    descriptionKey: 'portfolio.projects.christmasGift.description',
    fullDescriptionKey: 'portfolio.projects.christmasGift.fullDescription',
    image: {
      src: '/assets/images/Presente-Natal.webp',
      alt: 'Presente de Natal',
      width: 1200,
      height: 800,
    },
    link: 'https://aterrsagemresponsiva.netlify.app/',
    tags: [
      { name: 'HTML', color: 'bg-orange-500 text-white' },
      { name: 'CSS', color: 'bg-blue-400 text-white' },
      { name: 'JavaScript', color: 'bg-yellow-500 text-black' },
      { name: 'Responsive Design', color: 'bg-indigo-500 text-white' },
    ],
    category: 'web',
    type: 'personal',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  },

  // DESIGN PROJECTS
  {
    id: 'brasil-piscinas',
    titleKey: 'portfolio.projects.brasilPiscinas.title',
    descriptionKey: 'portfolio.projects.brasilPiscinas.description',
    fullDescriptionKey: 'portfolio.projects.brasilPiscinas.fullDescription',
    image: {
      src: '/assets/images/Artes/DesignGráfico_Brasil_piscinas.png',
      alt: 'Brasil Piscinas',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Canva', color: 'bg-purple-500 text-white' },
      { name: 'Design Gráfico', color: 'bg-pink-500 text-white' },
    ],
    category: 'design',
    type: 'personal',
    technologies: ['Canva'],
  },
  {
    id: 'terror-duo',
    titleKey: 'portfolio.projects.terrorDuo.title',
    descriptionKey: 'portfolio.projects.terrorDuo.description',
    fullDescriptionKey: 'portfolio.projects.terrorDuo.fullDescription',
    image: {
      src: '/assets/images/Artes/DuplaDoTerror.webp',
      alt: 'Dupla do Terror',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Adobe Photoshop', color: 'bg-blue-800 text-white' },
      { name: 'Clip Studio', color: 'bg-red-500 text-white' },
      { name: 'Illustration', color: 'bg-amber-600 text-white' },
    ],
    category: 'design',
    type: 'personal',
    technologies: ['Adobe Photoshop', 'Clip Studio', 'Illustration'],
  },
  {
    id: 'olive-brand-design',
    titleKey: 'portfolio.projects.oliveBrandDesign.title',
    descriptionKey: 'portfolio.projects.oliveBrandDesign.description',
    fullDescriptionKey: 'portfolio.projects.oliveBrandDesign.fullDescription',
    image: {
      src: '/assets/images/Artes/Azete.webp',
      alt: 'Design de Marca de Azeite',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Adobe Photoshop', color: 'bg-blue-800 text-white' },
      { name: 'Branding', color: 'bg-indigo-600 text-white' },
      { name: 'Product Design', color: 'bg-amber-500 text-white' },
    ],
    featured: true,
    client: 'Marca de Azeite',
    category: 'design',
    type: 'contracted',
    technologies: ['Adobe Photoshop', 'Branding', 'Product Design'],
    completionDate: '2023',
    teamSize: 1,
    duration: '1 semana',
    challenges: [
      'Criação de identidade visual premium',
      'Design de embalagem atrativo e funcional',
      'Transmitir qualidade e tradição do produto',
      'Diferenciação no mercado competitivo',
    ],
    results: [
      'Identidade visual distintiva e elegante',
      'Embalagem que destaca nas prateleiras',
      'Aumento de 80% no reconhecimento da marca',
      'Design premiado em concurso local',
    ],
  },
  {
    id: 'stylized-flag',
    titleKey: 'portfolio.projects.stylizedFlag.title',
    descriptionKey: 'portfolio.projects.stylizedFlag.description',
    fullDescriptionKey: 'portfolio.projects.stylizedFlag.fullDescription',
    image: {
      src: '/assets/images/Artes/BandeiraEstilosaBrasil.webp',
      alt: 'Bandeira Estilizada do Brasil',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Clip Studio', color: 'bg-red-500 text-white' },
      { name: 'Digital Art', color: 'bg-pink-600 text-white' },
    ],
    category: 'design',
    type: 'contracted',
    technologies: ['Clip Studio', 'Digital Art', 'Illustration'],
  },
  {
    id: 'gamer-case',
    titleKey: 'portfolio.projects.gamerCase.title',
    descriptionKey: 'portfolio.projects.gamerCase.description',
    fullDescriptionKey: 'portfolio.projects.gamerCase.fullDescription',
    image: {
      src: '/assets/images/Artes/DesignComputador.webp',
      alt: 'Design de Gabinete Gamer',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Adobe Photoshop', color: 'bg-blue-800 text-white' },
      { name: 'Product Design', color: 'bg-amber-500 text-white' },
    ],
    category: 'design',
    type: 'contracted',
    technologies: ['Adobe Photoshop', 'Product Design', 'Graphic Design'],
  },
  {
    id: 'environment-shirt',
    titleKey: 'portfolio.projects.environmentShirt.title',
    descriptionKey: 'portfolio.projects.environmentShirt.description',
    fullDescriptionKey: 'portfolio.projects.environmentShirt.fullDescription',
    image: {
      src: '/assets/images/Artes/Estampa.webp',
      alt: 'Estampa Ambiental',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Adobe Photoshop', color: 'bg-blue-800 text-white' },
      { name: 'Graphic Design', color: 'bg-emerald-500 text-white' },
    ],
    category: 'design',
    type: 'contracted',
    technologies: ['Adobe Photoshop', 'Graphic Design'],
  },
  {
    id: 'parasite-notebook',
    titleKey: 'portfolio.projects.parasiteNotebook.title',
    descriptionKey: 'portfolio.projects.parasiteNotebook.description',
    fullDescriptionKey: 'portfolio.projects.parasiteNotebook.fullDescription',
    image: {
      src: '/assets/images/Artes/ParasitaCaderno.webp',
      alt: 'Caderno Parasita',
      width: 1200,
      height: 800,
    },
    tags: [{ name: 'Illustration', color: 'bg-amber-600 text-white' }],
    category: 'design',
    type: 'personal',
    technologies: ['Illustration'],
  },
  {
    id: 'giratina-art',
    titleKey: 'portfolio.projects.giratinaArt.title',
    descriptionKey: 'portfolio.projects.giratinaArt.description',
    fullDescriptionKey: 'portfolio.projects.giratinaArt.fullDescription',
    image: {
      src: '/assets/images/Artes/giratina.webp',
      alt: 'Arte do Giratina',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Illustration', color: 'bg-amber-600 text-white' },
      { name: 'Adobe Photoshop', color: 'bg-blue-800 text-white' },
    ],
    category: 'design',
    type: 'personal',
    technologies: ['Illustration', 'Adobe Photoshop'],
  },
  {
    id: 'burger-design',
    titleKey: 'portfolio.projects.burgerDesign.title',
    descriptionKey: 'portfolio.projects.burgerDesign.description',
    fullDescriptionKey: 'portfolio.projects.burgerDesign.fullDescription',
    image: {
      src: '/assets/images/Artes/hamburguer.webp',
      alt: 'Design de Hambúrguer',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Adobe Photoshop', color: 'bg-blue-800 text-white' },
      { name: 'Food Design', color: 'bg-red-600 text-white' },
    ],
    client: 'Hamburgueria',
    category: 'design',
    type: 'contracted',
    technologies: ['Adobe Photoshop', 'Food Design'],
  },

  // MOTION GRAPHICS PROJECTS
  {
    id: 'bratails-animated',
    titleKey: 'portfolio.projects.bratailsAnimated.title',
    descriptionKey: 'portfolio.projects.bratailsAnimated.description',
    fullDescriptionKey: 'portfolio.projects.bratailsAnimated.fullDescription',
    image: {
      src: '/assets/images/Artes/BratailsAnim.gif',
      alt: 'Bratails Animado',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Clip Studio', color: 'bg-red-500 text-white' },
      { name: 'Motion Graphics', color: 'bg-blue-600 text-white' },
      { name: '2D Animation', color: 'bg-green-500 text-white' },
    ],
    category: 'motion',
    type: 'personal',
    technologies: ['Clip Studio', 'Motion Graphics', '2D Animation'],
  },

  // 3D MODELING PROJECTS
  {
    id: 'bratails-spaceship',
    titleKey: 'portfolio.projects.bratailsSpaceship.title',
    descriptionKey: 'portfolio.projects.bratailsSpaceship.description',
    fullDescriptionKey: 'portfolio.projects.bratailsSpaceship.fullDescription',
    image: {
      src: '/assets/images/Artes/BratailsNave.webp',
      alt: 'Nave do Bratails',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Blender', color: 'bg-orange-600 text-white' },
      { name: '3D Modeling', color: 'bg-blue-600 text-white' },
      { name: 'Sci-Fi Design', color: 'bg-purple-600 text-white' },
    ],
    category: 'modelagem',
    type: 'contracted',
    technologies: ['Blender', '3D Modeling', 'Sci-Fi Design'],
  },
  {
    id: 'asteroid-3d',
    titleKey: 'portfolio.projects.asteroid3d.title',
    descriptionKey: 'portfolio.projects.asteroid3d.description',
    fullDescriptionKey: 'portfolio.projects.asteroid3d.fullDescription',
    image: {
      src: '/assets/images/Artes/Asteroide.webp',
      alt: 'Asteroide 3D',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Blender', color: 'bg-orange-600 text-white' },
      { name: '3D Modeling', color: 'bg-blue-600 text-white' },
      { name: 'Space Design', color: 'bg-indigo-800 text-white' },
    ],
    category: 'modelagem',
    type: 'personal',
    technologies: ['Blender', '3D Modeling', 'Space Design'],
  },
  {
    id: 'render-test',
    titleKey: 'portfolio.projects.renderTest.title',
    descriptionKey: 'portfolio.projects.renderTest.description',
    fullDescriptionKey: 'portfolio.projects.renderTest.fullDescription',
    image: {
      src: '/assets/images/Artes/Cubos.webp',
      alt: 'Teste de Render',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Blender', color: 'bg-orange-600 text-white' },
      { name: '3D Rendering', color: 'bg-blue-600 text-white' },
      { name: 'Geometric Design', color: 'bg-green-600 text-white' },
    ],
    category: 'modelagem',
    type: 'personal',
    technologies: ['Blender', '3D Rendering', 'Geometric Design'],
  },
  {
    id: 'donut-3d',
    titleKey: 'portfolio.projects.donut3d.title',
    descriptionKey: 'portfolio.projects.donut3d.description',
    fullDescriptionKey: 'portfolio.projects.donut3d.fullDescription',
    image: {
      src: '/assets/images/Artes/cycles.webp',
      alt: 'Donut 3D',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Blender', color: 'bg-orange-600 text-white' },
      { name: '3D Rendering', color: 'bg-blue-600 text-white' },
      { name: 'Texturing', color: 'bg-pink-600 text-white' },
    ],
    category: 'modelagem',
    type: 'personal',
    technologies: ['Blender', '3D Rendering', 'Texturing'],
  },
  {
    id: 'skull-3d',
    titleKey: 'portfolio.projects.skull3d.title',
    descriptionKey: 'portfolio.projects.skull3d.description',
    fullDescriptionKey: 'portfolio.projects.skull3d.fullDescription',
    image: {
      src: '/assets/images/Artes/cranio.webp',
      alt: 'Crânio 3D',
      width: 1200,
      height: 800,
    },
    tags: [
      { name: 'Blender', color: 'bg-orange-600 text-white' },
      { name: '3D Modeling', color: 'bg-blue-600 text-white' },
      { name: 'Anatomical Alien', color: 'bg-green-700 text-white' },
    ],
    category: 'modelagem',
    type: 'personal',
    technologies: ['Blender', '3D Modeling', 'Anatomical Alien Rendering'],
  },
]

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured)
}

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter((project) => project.category === category)
}
