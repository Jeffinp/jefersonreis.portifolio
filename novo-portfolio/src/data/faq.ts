export interface FAQ {
  id: string
  question: string
  answer: string
  category?: 'geral' | 'tecnico' | 'processo' | 'preco'
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Quanto tempo leva para desenvolver um projeto?',
    answer:
      'O prazo varia de acordo com a complexidade do projeto. Um site institucional simples pode ficar pronto em 2-3 semanas, enquanto sistemas mais complexos podem levar de 1 a 3 meses. Sempre defino prazos realistas no início do projeto.',
    category: 'processo',
  },
  {
    id: 'faq-2',
    question: 'Quais tecnologias você utiliza?',
    answer:
      'Trabalho principalmente com Next.js, React, TypeScript, Node.js e bancos de dados modernos. Escolho as tecnologias mais adequadas para cada projeto, priorizando performance, escalabilidade e facilidade de manutenção.',
    category: 'tecnico',
  },
  {
    id: 'faq-3',
    question: 'Você oferece suporte após a entrega?',
    answer:
      'Sim! Todos os projetos incluem 30 dias de suporte gratuito após a entrega. Após esse período, ofereço planos de manutenção mensal com diferentes níveis de cobertura.',
    category: 'processo',
  },
  {
    id: 'faq-4',
    question: 'Como funciona o processo de pagamento?',
    answer:
      'Geralmente divido o pagamento em 3 etapas: 30% no início, 40% na entrega do protótipo/MVP e 30% na entrega final. Para projetos menores, posso oferecer condições diferentes.',
    category: 'preco',
  },
  {
    id: 'faq-5',
    question: 'Você desenvolve aplicativos mobile?',
    answer:
      'Sim, desenvolvo aplicativos mobile usando React Native, que permite criar apps para iOS e Android simultaneamente com código compartilhado, reduzindo custos e tempo de desenvolvimento.',
    category: 'tecnico',
  },
  {
    id: 'faq-6',
    question: 'Posso solicitar alterações durante o desenvolvimento?',
    answer:
      'Sim, mudanças são naturais em projetos de software. Pequenos ajustes são incluídos no escopo. Para alterações maiores, avalio o impacto no prazo e orçamento e ajustamos o acordo se necessário.',
    category: 'processo',
  },
  {
    id: 'faq-7',
    question: 'Você faz a hospedagem do site/sistema?',
    answer:
      'Auxilio na escolha e configuração da melhor solução de hospedagem para seu projeto (Vercel, AWS, etc.). Posso gerenciar a infraestrutura ou treinar sua equipe para fazer isso.',
    category: 'tecnico',
  },
  {
    id: 'faq-8',
    question: 'Meu projeto já existe, você faz manutenção?',
    answer:
      'Sim, faço manutenção, correção de bugs e implementação de novas funcionalidades em projetos existentes. Primeiro faço uma análise do código para entender a arquitetura e propor melhorias.',
    category: 'geral',
  },
]

export function getFAQsByCategory(category?: FAQ['category']) {
  if (!category) return faqs
  return faqs.filter((faq) => faq.category === category)
}

export function getFAQById(id: string) {
  return faqs.find((faq) => faq.id === id)
}
