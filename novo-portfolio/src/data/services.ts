/**
 * Serviços oferecidos (para modo Freelance/Comercial)
 */

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price?: {
    from: number
    currency: string
  }
  popular?: boolean
}

export const services: Service[] = [
  {
    id: 'website',
    title: 'Website Profissional',
    description:
      'Site institucional moderno, responsivo e otimizado para conversão',
    icon: '🌐',
    features: [
      'Design responsivo',
      'SEO otimizado',
      'Performance alta',
      'Integração com redes sociais',
      'Formulário de contato',
    ],
    price: {
      from: 2500,
      currency: 'BRL',
    },
    popular: true,
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Completo',
    description: 'Loja virtual com carrinho, pagamento e painel administrativo',
    icon: '🛒',
    features: [
      'Carrinho de compras',
      'Gateway de pagamento',
      'Painel administrativo',
      'Gestão de estoque',
      'Relatórios de vendas',
    ],
    price: {
      from: 5000,
      currency: 'BRL',
    },
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Página de vendas focada em alta conversão e captura de leads',
    icon: '🎯',
    features: [
      'Design de alta conversão',
      'Integração com CRM',
      'Analytics avançado',
      'A/B Testing',
      'Formulários otimizados',
    ],
    price: {
      from: 1500,
      currency: 'BRL',
    },
  },
  {
    id: 'app-mobile',
    title: 'App Mobile',
    description: 'Aplicativo nativo para iOS e Android com React Native',
    icon: '📱',
    features: [
      'iOS e Android',
      'Notificações push',
      'Integração com backend',
      'Design nativo',
      'Publicação nas stores',
    ],
    price: {
      from: 8000,
      currency: 'BRL',
    },
  },
  {
    id: 'dashboard',
    title: 'Dashboard & Admin',
    description: 'Painel administrativo com gráficos, relatórios e gestão',
    icon: '📊',
    features: [
      'Gráficos interativos',
      'Exportação de dados',
      'Gestão de usuários',
      'Permissões customizadas',
      'API integrada',
    ],
    price: {
      from: 4000,
      currency: 'BRL',
    },
  },
  {
    id: 'api',
    title: 'API & Backend',
    description: 'API RESTful escalável com autenticação e documentação',
    icon: '⚙️',
    features: [
      'Autenticação JWT',
      'Documentação automática',
      'Banco de dados otimizado',
      'Cache Redis',
      'Escalável e segura',
    ],
    price: {
      from: 3500,
      currency: 'BRL',
    },
  },
]

/**
 * Helper: Formatar preço
 */
export function formatPrice(price: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(price)
}

/**
 * Helper: Obter serviços populares
 */
export function getPopularServices(): Service[] {
  return services.filter((service) => service.popular)
}
