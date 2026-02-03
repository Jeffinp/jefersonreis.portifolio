import type { Project } from '@/types'

export const projectsMobile: Project[] = [
  {
    id: 'stashy',
    slug: 'stashy',
    title: 'Stashy',
    description:
      'Aplicativo mobile de gestão financeira pessoal com interface moderna',
    longDescription:
      'Stashy é um aplicativo de controle financeiro pessoal desenvolvido com React Native, oferecendo uma experiência intuitiva para gerenciar receitas, despesas e metas financeiras.',
    category: 'mobile',
    status: 'completed',
    tags: [
      { id: 'react-native', label: 'React Native', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
      { id: 'expo', label: 'Expo', color: 'bg-gray-800' },
    ],
    images: [
      {
        url: '/assets/images/projects/mobile/stashy/main.png',
        alt: 'Stashy App',
      },
    ],
    thumbnail: {
      url: '/assets/images/projects/mobile/stashy/main.png',
      alt: 'Stashy App',
    },
    technologies: [
      'React Native',
      'TypeScript',
      'Expo',
      'Styled Components',
      'AsyncStorage',
    ],
    featured: true,
    order: 1,
  },
  {
    id: 'leve-saude-mobile',
    slug: 'leve-saude-mobile',
    title: 'Leve Saúde Mobile',
    description: 'Aplicativo mobile de teste para Leve Saúde',
    longDescription:
      'App mobile com navegação intuitiva e interface moderna desenvolvido como teste técnico para a empresa Leve Saúde. Projeto demonstra domínio completo do ecossistema React Native com TypeScript e boas práticas de desenvolvimento mobile.',
    category: 'mobile',
    status: 'completed',
    tags: [
      { id: 'react-native', label: 'React Native', color: 'bg-blue-500' },
      { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
      { id: 'expo', label: 'Expo', color: 'bg-gray-800' },
      {
        id: 'styled-components',
        label: 'Styled Components',
        color: 'bg-purple-500',
      },
      {
        id: 'react-navigation',
        label: 'React Navigation',
        color: 'bg-green-600',
      },
    ],
    images: [
      {
        url: '/assets/images/projects/mobile/project-leve-saude-mobile/main.png',
        alt: 'Leve Saúde Mobile',
      },
    ],
    thumbnail: {
      url: '/assets/images/projects/mobile/project-leve-saude-mobile/main.png',
      alt: 'Leve Saúde Mobile',
    },
    technologies: [
      'React Native',
      'TypeScript',
      'Expo',
      'Styled Components',
      'React Navigation',
      'Async Storage',
      'Vector Icons',
      'React Hook Form',
    ],
    githubUrl: 'https://github.com/Jeffinp/test-mobile-leve-saude',
    startDate: '2024-08-01',
    endDate: '2024-10-01',
    teamSize: 1,
    role: 'Desenvolvedor Full Stack Mobile',
    challenges: [
      'Criação de navegação intuitiva entre telas',
      'Implementação de persistência de dados local',
      'Design responsivo para múltiplos tamanhos de dispositivos',
      'Otimização de performance para listas grandes',
      'Adaptação de design responsivo para diferentes tamanhos de tela',
    ],
    results: [
      'App funcional com navegação fluida',
      'Interface moderna e intuitiva',
      'Performance otimizada para listas de dados',
      'Código bem estruturado e documentado',
    ],
    featured: true,
    order: 2,
  },
]
