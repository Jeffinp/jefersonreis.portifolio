import type { Project } from '@/types'

export const designProjects: Project[] = [
  {
    id: 'art-2d-alastor',
    titleKey: 'portfolio.projects.art2DAlastor.title',
    descriptionKey: 'portfolio.projects.art2DAlastor.description',
    image: {
      src: '/assets/images/projects/2d/art-2d-alastor.webp',
      alt: 'Alastor 2D Art',
      width: 800,
      height: 1000,
    },
    tags: [
      { name: 'Character Design', color: 'bg-red-600 text-white' },
      { name: 'Traditional Drawing', color: 'bg-yellow-600 text-white' },
      { name: 'Digital Coloring', color: 'bg-purple-600 text-white' },
    ],
    category: 'design',
    type: 'personal',
    technologies: ['Traditional Drawing', 'Adobe Photoshop'],
  },
  {
    id: 'design-brasil-piscinas',
    titleKey: 'portfolio.projects.designBrasilPiscinas.title',
    descriptionKey: 'portfolio.projects.designBrasilPiscinas.description',
    image: {
      src: '/assets/images/projects/design/project-design-brasil-piscinas.png',
      alt: 'Design Gráfico Brasil Piscinas',
      width: 800,
      height: 600,
    },
    tags: [
      { name: 'Graphic Design', color: 'bg-pink-500 text-white' },
      { name: 'Branding', color: 'bg-purple-600 text-white' },
      { name: 'Adobe Creative', color: 'bg-red-600 text-white' },
    ],
    category: 'design',
    type: 'contracted',
    technologies: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
  },
  {
    id: 'design-pizza-insta',
    titleKey: 'portfolio.projects.designPizzaInsta.title',
    descriptionKey: 'portfolio.projects.designPizzaInsta.description',
    image: {
      src: '/assets/images/projects/design/project-design-pizza-insta.webp',
      alt: 'Design Instagram Pizza',
      width: 1080,
      height: 1080,
    },
    tags: [
      {
        name: 'Social Media',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      },
      { name: 'Instagram', color: 'bg-pink-600 text-white' },
      { name: 'Food Design', color: 'bg-orange-500 text-white' },
    ],
    category: 'design',
    type: 'contracted',
    technologies: ['Adobe Photoshop', 'Canva', 'Figma'],
  },
  {
    id: 'design-clickteam-logo',
    titleKey: 'portfolio.projects.designClickteamLogo.title',
    descriptionKey: 'portfolio.projects.designClickteamLogo.description',
    image: {
      src: '/assets/images/projects/design/project-design-clickteam-logo.webp',
      alt: 'ClickTeam Logo Design',
      width: 500,
      height: 500,
    },
    tags: [
      { name: 'Logo Design', color: 'bg-blue-600 text-white' },
      { name: 'Branding', color: 'bg-purple-600 text-white' },
      { name: 'Vector Graphics', color: 'bg-green-600 text-white' },
    ],
    category: 'design',
    type: 'personal',
    technologies: ['Adobe Illustrator', 'Adobe Photoshop'],
  },
]
