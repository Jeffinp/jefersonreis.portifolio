interface Ebook {
  id: string
  title: string
  description: string
  coverImage: string
  downloadUrl: string
  tags: string[]
  featured: boolean
}

export const featuredEbooks: Ebook[] = [
  {
    id: 'guia-ganhar-online',
    title: 'Guia Definitivo para Ganhar Online em 2024',
    description:
      'Descubra as melhores estratégias para gerar renda na internet através de diversas plataformas e métodos.',
    coverImage:
      '/assets/images/Ebooks_imagens/Guia_Definitivo_para_Ganhar_Online.png',
    downloadUrl: '#download-link',
    tags: ['Marketing', 'Renda'],
    featured: true,
  },
]

export default featuredEbooks
