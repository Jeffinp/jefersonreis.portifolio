/**
 * Depoimentos de clientes reais
 */

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar?: string
  content: string
  rating: number
  date?: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Cliente',
    role: 'Ajustes em app Android e iOS',
    company: 'Jeferson Reis Dev',
    content:
      'Jeferson é um profissional extremamente competente, rápido na execução e de fácil comunicação! Certamente voltarei a contratar os seus serviços! Podem contratar sem medo!!',
    rating: 5,
    date: '2025-11',
  },
  {
    id: '2',
    name: 'Cliente',
    role: 'Otimização de imagens para site no mobile',
    company: 'Jeferson Reis Dev',
    content:
      'O Jeferson fez um trabalho ótimo na otimização do meu site. Foi muito rápido e entregou um resultado excelente. Recomendo!',
    rating: 5,
    date: '2025-09',
  },
  {
    id: '3',
    name: 'Cliente',
    role: 'Sistema para checar textos jurídicos',
    company: 'Jeferson Reis Dev',
    content:
      'Profissional muito atencioso, dedicado e sempre disposto a ajudar. Comunicação excelente e entrega dentro do prazo.',
    rating: 4,
    date: '2025-08',
  },
  {
    id: '4',
    name: 'Cliente',
    role: 'Desenvolver site em Bootstrap',
    company: 'Jeferson Reis Dev',
    content: 'Trabalho entregue com excelência e dentro do prazo acordado.',
    rating: 5,
    date: '2025-09',
  },
  {
    id: '5',
    name: 'Cliente',
    role: 'Criar fluxo n8n + Evolution para agendamentos',
    company: 'Jeferson Reis Dev',
    content:
      'Excelente implementação de automação, resolveu perfeitamente nossa necessidade de agendamentos.',
    rating: 5,
    date: '2025-08',
  },
]

/**
 * Helper: Obter média de rating
 */
export function getAverageRating(): number {
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0)
  return total / testimonials.length
}

/**
 * Helper: Obter total de clientes satisfeitos
 */
export function getTotalClients(): number {
  return testimonials.length
}
