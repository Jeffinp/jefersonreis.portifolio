/**
 * Depoimentos de clientes reais com suporte a i18n
 */

export type TestimonialLocale = 'pt' | 'en'

interface LocalizedText {
  pt: string
  en: string
}

interface TestimonialEntry {
  id: string
  name: string
  role: LocalizedText
  company: string
  avatar?: string
  content: LocalizedText
  rating: number
  date?: string
}

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

const testimonialEntries: TestimonialEntry[] = [
  {
    id: '1',
    name: 'Marina Costa',
    role: {
      pt: 'App nativo de planejamento de estudos para iOS, Android e Web',
      en: 'Native study-planning app for iOS, Android, and Web',
    },
    company: 'Jeferson Reis Dev',
    content: {
      pt: 'O Jeferson entregou o aplicativo funcional conforme combinado. O resultado ficou responsivo, muito bonito e pronto para uso em diferentes plataformas.',
      en: 'Jeferson delivered the app as agreed. The final product was responsive, polished, and ready to run across multiple platforms.',
    },
    rating: 5,
    date: '2026-02',
  },
  {
    id: '2',
    name: 'Rafael Mendes',
    role: {
      pt: 'Ajustes em app Android e iOS',
      en: 'Adjustments to Android and iOS app',
    },
    company: 'Jeferson Reis Dev',
    content: {
      pt: 'Jeferson é extremamente competente, rápido na execução e muito fácil de alinhar. Certamente voltarei a contratar seus serviços.',
      en: 'Jeferson is highly skilled, fast in execution, and very easy to work with. I would definitely hire him again.',
    },
    rating: 5,
    date: '2025-11',
  },
  {
    id: '3',
    name: 'Camila Torres',
    role: {
      pt: 'Desenvolvimento de site em Bootstrap',
      en: 'Bootstrap website development',
    },
    company: 'Jeferson Reis Dev',
    content: {
      pt: 'O site foi entregue com visual profissional, boa responsividade e código bem organizado. A comunicação durante o projeto foi objetiva e eficiente.',
      en: 'The website was delivered with a professional look, strong responsiveness, and well-organized code. Communication throughout the project was clear and efficient.',
    },
    rating: 5,
    date: '2025-09',
  },
  {
    id: '4',
    name: 'Eduardo Nogueira',
    role: {
      pt: 'Otimização de imagens para site mobile',
      en: 'Image optimization for mobile website',
    },
    company: 'Jeferson Reis Dev',
    content: {
      pt: 'O Jeferson fez um trabalho excelente na otimização do meu site. Foi rápido, cuidadoso e entregou um resultado que melhorou bastante a experiência no mobile.',
      en: 'Jeferson did an excellent job optimizing my website. He was fast, careful, and delivered a result that significantly improved the mobile experience.',
    },
    rating: 5,
    date: '2025-09',
  },
  {
    id: '5',
    name: 'Patricia Albuquerque',
    role: {
      pt: 'Sistema para checagem de textos jurídicos',
      en: 'System for reviewing legal texts',
    },
    company: 'Jeferson Reis Dev',
    content: {
      pt: 'Profissional muito atencioso, dedicado e sempre disposto a ajudar. A comunicação foi excelente e a entrega aconteceu dentro do prazo combinado.',
      en: 'A very attentive and dedicated professional who was always willing to help. Communication was excellent and delivery happened on schedule.',
    },
    rating: 4,
    date: '2025-08',
  },
  {
    id: '6',
    name: 'Lucas Ferraz',
    role: {
      pt: 'Fluxo n8n + Evolution para agendamentos',
      en: 'n8n + Evolution booking automation flow',
    },
    company: 'Jeferson Reis Dev',
    content: {
      pt: 'A automação ficou estável, bem estruturada e resolveu nosso processo de agendamentos com clareza. Projeto entregue com rapidez e boa comunicação do início ao fim.',
      en: 'The automation was stable, well structured, and solved our booking workflow clearly. The project was delivered quickly with strong communication from start to finish.',
    },
    rating: 5,
    date: '2025-08',
  },
]

export function getTestimonials(locale: string): Testimonial[] {
  const normalizedLocale: TestimonialLocale = locale === 'pt' ? 'pt' : 'en'

  return testimonialEntries.map((testimonial) => ({
    id: testimonial.id,
    name: testimonial.name,
    role: testimonial.role[normalizedLocale],
    company: testimonial.company,
    avatar: testimonial.avatar,
    content: testimonial.content[normalizedLocale],
    rating: testimonial.rating,
    date: testimonial.date,
  }))
}

/**
 * Helper: Obter média de rating
 */
export function getAverageRating(): number {
  const total = testimonialEntries.reduce((sum, t) => sum + t.rating, 0)
  return total / testimonialEntries.length
}

/**
 * Helper: Obter total de clientes satisfeitos
 */
export function getTotalClients(): number {
  return testimonialEntries.length
}
