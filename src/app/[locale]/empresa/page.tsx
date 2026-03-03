import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import { SchemaOrg } from '@/components/seo'
import { HeroSection } from './_components/hero-section'
import { SkillsSection } from './_components/skills-section'
import { ProjectsSection } from './_components/projects-section'
import { TestimonialsSection } from './_components/testimonials-section'
import { ContactSection } from './_components/contact-section'

interface EmpresaPageProps {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Portfolio Técnico - Jeferson Reis | Full Stack Developer',
  description:
    'Portfolio técnico com projetos em React, Next.js, TypeScript e Node.js. Desenvolvedor Full Stack com 5+ anos de experiência em desenvolvimento web moderno.',
  keywords: [
    'portfolio desenvolvedor',
    'full stack developer',
    'react developer',
    'nextjs developer',
    'typescript developer',
    'projetos web',
  ],
  openGraph: {
    title: 'Portfolio Técnico - Jeferson Reis',
    description:
      'Desenvolvedor Full Stack especializado em React, Next.js e Node.js',
    type: 'profile',
  },
}

export default async function EmpresaPage({ params }: EmpresaPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <SchemaOrg type="person" />
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
