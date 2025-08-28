import type { Project } from '@/types'

export const mobileProjects: Project[] = [
  {
    id: 'leve-saude-mobile',
    titleKey: 'portfolio.projects.leveSaudeMobile.title',
    descriptionKey: 'portfolio.projects.leveSaudeMobile.description',
    fullDescriptionKey: 'portfolio.projects.leveSaudeMobile.fullDescription',
    image: {
      src: '/assets/images/projects/mobile/project-leve-saude.png',
      alt: 'Leve Saúde Mobile App',
      width: 400,
      height: 800,
    },
    githubUrl: 'https://github.com/Jeffinp/test-mobile-leve-saude',
    tags: [
      { name: 'React Native', color: 'bg-blue-500 text-white' },
      { name: 'TypeScript', color: 'bg-blue-600 text-white' },
      { name: 'Expo', color: 'bg-gray-800 text-white' },
      { name: 'Styled Components', color: 'bg-purple-500 text-white' },
      { name: 'React Navigation', color: 'bg-green-600 text-white' },
    ],
    featured: true,
    category: 'mobile',
    type: 'personal',
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
    completionDate: 'Outubro 2024',
    teamSize: 1,
    duration: '2 meses',
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
  },
]
