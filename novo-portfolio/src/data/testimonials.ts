/**
 * Depoimentos de clientes
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
    name: 'João Silva',
    role: 'CEO',
    company: 'Tech Startup',
    content:
      'Trabalho excepcional! O site ficou exatamente como imaginamos. Profissional, rápido e com ótima comunicação durante todo o projeto.',
    rating: 5,
    date: '2024-01',
  },
  {
    id: '2',
    name: 'Maria Santos',
    role: 'Gerente de Marketing',
    company: 'E-commerce Brasil',
    content:
      'Aumentamos em 40% as conversões após o redesign. O trabalho foi impecável, desde o design até a implementação técnica.',
    rating: 5,
    date: '2024-02',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    role: 'Founder',
    company: 'Digital Agency',
    content:
      'Excelente desenvolvedor! Entregou antes do prazo e superou nossas expectativas. Recomendo fortemente.',
    rating: 5,
    date: '2023-12',
  },
  {
    id: '4',
    name: 'Ana Paula',
    role: 'Product Owner',
    company: 'SaaS Company',
    content:
      'A qualidade do código e atenção aos detalhes são impressionantes. O dashboard ficou perfeito e muito performático.',
    rating: 5,
    date: '2024-03',
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
