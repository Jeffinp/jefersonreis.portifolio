export interface TestimonialCommercial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  testimonial: string
  results: {
    metric: string
    value: string
    icon: string
  }[]
  projectType: string
  projectDuration: string
  investment: string
  industry: string
  featured?: boolean
  videoUrl?: string
  websiteUrl?: string
  date: string
}

export const testimonialsCommercial: TestimonialCommercial[] = [
  {
    id: '1',
    name: 'Carlos Eduardo Silva',
    role: 'CEO',
    company: 'TechSolutions Brasil',
    avatar: '/assets/images/testimonials/carlos-eduardo.jpg',
    rating: 5,
    testimonial:
      'A landing page criada pelo Jeferson transformou completamente nosso funil de vendas. O design moderno e as otimizações de conversão superaram todas as expectativas. Em apenas 2 meses, triplicamos nossos leads qualificados.',
    results: [
      { metric: 'Aumento em conversões', value: '+287%', icon: 'TrendingUp' },
      { metric: 'Leads qualificados/mês', value: '450+', icon: 'Users' },
      { metric: 'ROI do investimento', value: '12x', icon: 'DollarSign' },
      { metric: 'Taxa de bounce', value: '-65%', icon: 'ArrowDown' },
    ],
    projectType: 'Landing Page + Automação',
    projectDuration: '10 dias',
    investment: 'R$ 2.800',
    industry: 'Tecnologia',
    featured: true,
    websiteUrl: 'https://techsolutions.com.br',
    date: '2024-01',
  },
  {
    id: '2',
    name: 'Mariana Costa',
    role: 'Diretora de Marketing',
    company: 'Bella Estética',
    avatar: '/assets/images/testimonials/mariana-costa.jpg',
    rating: 5,
    testimonial:
      'O sistema de agendamento com IA que o Jeferson desenvolveu revolucionou nosso atendimento. Reduzimos 80% do tempo gasto com agendamentos manuais e aumentamos significativamente nossa taxa de ocupação.',
    results: [
      { metric: 'Tempo economizado/semana', value: '32h', icon: 'Clock' },
      { metric: 'Taxa de ocupação', value: '+45%', icon: 'Calendar' },
      { metric: 'Clientes atendidos/mês', value: '+120', icon: 'Users' },
      { metric: 'Faturamento mensal', value: '+68%', icon: 'TrendingUp' },
    ],
    projectType: 'Sistema de Agendamento com IA',
    projectDuration: '20 dias',
    investment: 'R$ 4.500',
    industry: 'Estética e Beleza',
    featured: true,
    date: '2024-02',
  },
  {
    id: '3',
    name: 'Pedro Henrique Almeida',
    role: 'Fundador',
    company: 'FitLife Academia',
    avatar: '/assets/images/testimonials/pedro-henrique.jpg',
    rating: 5,
    testimonial:
      'O app mobile desenvolvido pelo Jeferson superou todas as minhas expectativas. Interface intuitiva, performance excelente e os alunos adoraram. Tivemos 85% de adesão no primeiro mês!',
    results: [
      { metric: 'Downloads primeiro mês', value: '2.3k', icon: 'Download' },
      { metric: 'Taxa de retenção', value: '92%', icon: 'UserCheck' },
      { metric: 'Avaliação na loja', value: '4.9★', icon: 'Star' },
      { metric: 'Churn rate', value: '-70%', icon: 'ArrowDown' },
    ],
    projectType: 'Aplicativo Mobile iOS/Android',
    projectDuration: '45 dias',
    investment: 'R$ 8.500',
    industry: 'Fitness',
    featured: true,
    date: '2023-12',
  },
  {
    id: '4',
    name: 'Ana Paula Ferreira',
    role: 'Proprietária',
    company: 'Doce Sabor Confeitaria',
    avatar: '/assets/images/testimonials/ana-paula.jpg',
    rating: 5,
    testimonial:
      'A loja virtual que o Jeferson criou aumentou nossas vendas em 340% no primeiro trimestre. O sistema de pedidos é perfeito e a integração com WhatsApp facilitou muito nosso atendimento.',
    results: [
      { metric: 'Vendas online', value: '+340%', icon: 'ShoppingCart' },
      { metric: 'Ticket médio', value: '+85%', icon: 'DollarSign' },
      { metric: 'Pedidos/dia', value: '45+', icon: 'Package' },
      { metric: 'Tempo de atendimento', value: '-60%', icon: 'Clock' },
    ],
    projectType: 'E-commerce + WhatsApp',
    projectDuration: '15 dias',
    investment: 'R$ 3.200',
    industry: 'Alimentação',
    featured: false,
    websiteUrl: 'https://docesabor.com.br',
    date: '2024-01',
  },
  {
    id: '5',
    name: 'Roberto Santos',
    role: 'Diretor Comercial',
    company: 'ImobPrime Imóveis',
    avatar: '/assets/images/testimonials/roberto-santos.jpg',
    rating: 5,
    testimonial:
      'O CRM com IA desenvolvido pelo Jeferson otimizou completamente nosso processo de vendas. A qualificação automática de leads nos economiza 20 horas semanais e aumentou nossa taxa de conversão drasticamente.',
    results: [
      { metric: 'Taxa de conversão', value: '+156%', icon: 'Target' },
      { metric: 'Leads qualificados', value: '300+/mês', icon: 'Users' },
      { metric: 'Tempo de resposta', value: '-90%', icon: 'Zap' },
      { metric: 'Vendas mensais', value: '+8', icon: 'Home' },
    ],
    projectType: 'CRM com IA + Automação',
    projectDuration: '30 dias',
    investment: 'R$ 6.000',
    industry: 'Imobiliário',
    featured: false,
    date: '2023-11',
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    role: 'CMO',
    company: 'EduTech Pro',
    avatar: '/assets/images/testimonials/fernanda-lima.jpg',
    rating: 5,
    testimonial:
      'A plataforma de cursos online criada pelo Jeferson é simplesmente incrível. Interface moderna, fácil de usar e com recursos que nossos alunos amam. Dobramos nossa base de alunos em 3 meses.',
    results: [
      { metric: 'Base de alunos', value: '+2.5k', icon: 'GraduationCap' },
      { metric: 'Taxa de conclusão', value: '78%', icon: 'Award' },
      { metric: 'NPS Score', value: '92', icon: 'Heart' },
      { metric: 'Faturamento recorrente', value: '+180%', icon: 'TrendingUp' },
    ],
    projectType: 'Plataforma SaaS',
    projectDuration: '60 dias',
    investment: 'R$ 12.000',
    industry: 'Educação',
    featured: true,
    videoUrl: 'https://youtube.com/testimonial-edutech',
    date: '2023-10',
  },
  {
    id: '7',
    name: 'Lucas Oliveira',
    role: 'Gerente de E-commerce',
    company: 'ModaStyle',
    avatar: '/assets/images/testimonials/lucas-oliveira.jpg',
    rating: 5,
    testimonial:
      'O redesign do nosso e-commerce foi um divisor de águas. A nova interface aumentou drasticamente nossas conversões e o checkout simplificado reduziu o abandono de carrinho em 70%.',
    results: [
      { metric: 'Taxa de conversão', value: '+225%', icon: 'ShoppingBag' },
      { metric: 'Abandono de carrinho', value: '-70%', icon: 'ArrowDown' },
      { metric: 'Valor médio pedido', value: '+95%', icon: 'DollarSign' },
      { metric: 'Vendas mensais', value: 'R$ 180k+', icon: 'TrendingUp' },
    ],
    projectType: 'E-commerce Redesign',
    projectDuration: '25 dias',
    investment: 'R$ 5.500',
    industry: 'Moda',
    featured: false,
    websiteUrl: 'https://modastyle.com.br',
    date: '2024-03',
  },
  {
    id: '8',
    name: 'Juliana Mendes',
    role: 'Coordenadora de Marketing',
    company: 'Clínica Saúde+',
    avatar: '/assets/images/testimonials/juliana-mendes.jpg',
    rating: 5,
    testimonial:
      'O chatbot com IA para WhatsApp transformou nosso atendimento. Agora conseguimos responder instantaneamente, 24/7, e nossa equipe foca apenas em casos complexos. Pacientes satisfeitos e equipe mais produtiva!',
    results: [
      { metric: 'Atendimentos/dia', value: '+450', icon: 'MessageCircle' },
      { metric: 'Satisfação pacientes', value: '96%', icon: 'Heart' },
      { metric: 'Agendamentos online', value: '+180%', icon: 'Calendar' },
      { metric: 'Tempo de resposta', value: 'Instantâneo', icon: 'Zap' },
    ],
    projectType: 'Chatbot IA WhatsApp',
    projectDuration: '15 dias',
    investment: 'R$ 3.800',
    industry: 'Saúde',
    featured: false,
    date: '2024-02',
  },
  {
    id: '9',
    name: 'André Rodrigues',
    role: 'CEO',
    company: 'LogTech Express',
    avatar: '/assets/images/testimonials/andre-rodrigues.jpg',
    rating: 5,
    testimonial:
      'O sistema de rastreamento desenvolvido revolucionou nossa operação. Clientes podem acompanhar entregas em tempo real e nossa eficiência operacional aumentou significativamente.',
    results: [
      { metric: 'Satisfação cliente', value: '+94%', icon: 'Star' },
      { metric: 'Reclamações', value: '-82%', icon: 'ArrowDown' },
      { metric: 'Entregas/dia', value: '+65%', icon: 'Truck' },
      { metric: 'Eficiência operacional', value: '+40%', icon: 'TrendingUp' },
    ],
    projectType: 'Sistema de Rastreamento',
    projectDuration: '35 dias',
    investment: 'R$ 7.200',
    industry: 'Logística',
    featured: false,
    date: '2023-09',
  },
  {
    id: '10',
    name: 'Beatriz Campos',
    role: 'Diretora',
    company: 'Instituto Crescer',
    avatar: '/assets/images/testimonials/beatriz-campos.jpg',
    rating: 5,
    testimonial:
      'A landing page para captação de doações superou todas as metas. Design emocional e persuasivo que realmente conecta com nossos apoiadores. Aumentamos as doações mensais em 420%!',
    results: [
      { metric: 'Doações mensais', value: '+420%', icon: 'Heart' },
      { metric: 'Doadores recorrentes', value: '+180', icon: 'Users' },
      { metric: 'Ticket médio doação', value: '+65%', icon: 'Gift' },
      { metric: 'Taxa de conversão', value: '12%', icon: 'Target' },
    ],
    projectType: 'Landing Page ONG',
    projectDuration: '7 dias',
    investment: 'R$ 1.500',
    industry: 'Terceiro Setor',
    featured: false,
    date: '2024-01',
  },
  {
    id: '11',
    name: 'Rafael Martins',
    role: 'Sócio-Diretor',
    company: 'Martins Advocacia',
    avatar: '/assets/images/testimonials/rafael-martins.jpg',
    rating: 5,
    testimonial:
      'O site institucional elevou completamente nossa imagem profissional. Clientes elogiam constantemente e recebemos muito mais consultas qualificadas. Investimento que se pagou em 2 meses.',
    results: [
      { metric: 'Consultas/mês', value: '+320%', icon: 'Briefcase' },
      { metric: 'Taxa de conversão', value: '18%', icon: 'Target' },
      { metric: 'Autoridade online', value: '10x', icon: 'Award' },
      { metric: 'Casos fechados', value: '+12/mês', icon: 'FileCheck' },
    ],
    projectType: 'Site Institucional',
    projectDuration: '12 dias',
    investment: 'R$ 2.800',
    industry: 'Jurídico',
    featured: false,
    websiteUrl: 'https://martinsadvocacia.com.br',
    date: '2023-12',
  },
  {
    id: '12',
    name: 'Gabriela Torres',
    role: 'Proprietária',
    company: 'GT Personal Trainer',
    avatar: '/assets/images/testimonials/gabriela-torres.jpg',
    rating: 5,
    testimonial:
      'A automação do WhatsApp mudou meu negócio! Consigo atender 10x mais pessoas, enviar treinos personalizados automaticamente e manter todos os alunos engajados. Meu faturamento triplicou!',
    results: [
      { metric: 'Alunos ativos', value: '+85', icon: 'Users' },
      { metric: 'Faturamento', value: '3x', icon: 'DollarSign' },
      { metric: 'Tempo economizado', value: '25h/semana', icon: 'Clock' },
      { metric: 'Taxa de renovação', value: '94%', icon: 'RefreshCw' },
    ],
    projectType: 'Automação WhatsApp',
    projectDuration: '10 dias',
    investment: 'R$ 2.200',
    industry: 'Fitness',
    featured: false,
    date: '2024-03',
  },
]

// Função para obter testimonials em destaque
export const getFeaturedTestimonials = () => {
  return testimonialsCommercial.filter((t) => t.featured)
}

// Função para obter testimonials por indústria
export const getTestimonialsByIndustry = (industry: string) => {
  return testimonialsCommercial.filter((t) => t.industry === industry)
}

// Função para obter métricas agregadas
export const getAggregatedMetrics = () => {
  const totalProjects = testimonialsCommercial.length
  const averageRating =
    testimonialsCommercial.reduce((acc, t) => acc + t.rating, 0) / totalProjects
  const industries = [...new Set(testimonialsCommercial.map((t) => t.industry))]

  return {
    totalProjects,
    averageRating,
    totalIndustries: industries.length,
    satisfactionRate: '98%',
  }
}
