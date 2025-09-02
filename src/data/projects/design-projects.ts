import type { Project } from '@/types'

export const designProjects: Project[] = [
  {
    id: 'art-2d-alastor',
    titleKey: 'portfolio.projects.art2DAlastor.title',
    descriptionKey: 'portfolio.projects.art2DAlastor.description',
    images: [
      {
        src: '/assets/images/projects/2d/art-2d-alastor.webp',
        alt: 'Art 2D Alastor - Tela principal',
        width: 1200,
        height: 800,
      },
    ],
    completionDate: '2024-01-01',
    teamSize: 1,
    duration: '1 mês',
    challenges: [
      'Criação de personagem 2D',
      'Desenho tradicional',
      'Colorização digital',
    ],
    results: [
      'Personagem 2D criado com estilo clássico',
      'Desenho tradicional com técnicas de animação',
      'Colorização digital com software de edição de imagem',
    ],
    category: 'design',
    type: 'personal',
    technologies: ['Adobe Photoshop', 'Adobe Illustrator'],
    tags: [
      { name: '2D Art', color: 'bg-pink-600 text-white' },
      { name: 'Photoshop', color: 'bg-blue-600 text-white' },
      { name: 'Illustrator', color: 'bg-orange-600 text-white' },
    ],
  },
  {
    id: 'design-brasil-piscinas',
    titleKey: 'portfolio.projects.designBrasilPiscinas.title',
    descriptionKey: 'portfolio.projects.designBrasilPiscinas.description',
    images: [
      {
        src: '/assets/images/projects/design/project-design-brasil-piscinas.png',
        alt: 'Design Brasil Piscinas - Tela principal',
        width: 1200,
        height: 800,
      },
    ],
    completionDate: '2023-06-01',
    teamSize: 1,
    duration: '1 mês',
    challenges: [
      'Criação de identidade visual para marca',
      'Design de cartão de visita',
      'Criação de logotipo',
    ],
    results: [
      'Identidade visual criada com estilo moderno',
      'Cartão de visita com design atrativo',
      'Logotipo criado com software de edição de imagem',
    ],
    category: 'design',
    type: 'contracted',
    technologies: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
    tags: [
      { name: 'Identidade Visual', color: 'bg-blue-600 text-white' },
      { name: 'Cartão de Visita', color: 'bg-green-600 text-white' },
      { name: 'Logotipo', color: 'bg-yellow-600 text-white' },
    ],
  },
  {
    id: 'design-pizza-insta',
    titleKey: 'portfolio.projects.designPizzaInsta.title',
    descriptionKey: 'portfolio.projects.designPizzaInsta.description',
    images: [
      {
        src: '/assets/images/projects/design/project-design-pizza-insta.webp',
        alt: 'Design Pizza Insta - Tela principal',
        width: 1200,
        height: 800,
      },
    ],
    completionDate: '2023-03-01',
    teamSize: 1,
    duration: '1 mês',
    challenges: [
      'Criação de identidade visual para marca',
      'Design de cartão de visita',
      'Criação de logotipo',
    ],
    results: [
      'Identidade visual criada com estilo moderno',
      'Cartão de visita com design atrativo',
      'Logotipo criado com software de edição de imagem',
    ],
    category: 'design',
    type: 'contracted',
    technologies: ['Adobe Photoshop', 'Canva', 'Figma'],
    tags: [
      { name: 'Identidade Visual', color: 'bg-blue-600 text-white' },
      { name: 'Cartão de Visita', color: 'bg-green-600 text-white' },
      { name: 'Figma', color: 'bg-purple-600 text-white' },
    ],
  },
  {
    id: 'design-clickteam-logo',
    titleKey: 'portfolio.projects.designClickteamLogo.title',
    descriptionKey: 'portfolio.projects.designClickteamLogo.description',
    images: [
      {
        src: '/assets/images/projects/design/project-design-clickteam-logo.webp',
        alt: 'Design Clickteam Logo - Tela principal',
        width: 1200,
        height: 800,
      },
    ],
    completionDate: '2023-02-01',
    teamSize: 1,
    duration: '1 mês',
    challenges: [
      'Criação de identidade visual para marca',
      'Design de cartão de visita',
      'Criação de logotipo',
    ],
    category: 'design',
    type: 'personal',
    technologies: ['Adobe Illustrator', 'Adobe Photoshop'],
    tags: [
      { name: 'Logo Design', color: 'bg-blue-600 text-white' },
      { name: 'Branding', color: 'bg-purple-600 text-white' },
      { name: 'Vector Graphics', color: 'bg-green-600 text-white' },
    ],
  },
]
