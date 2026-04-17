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
  title: 'Jeferson Reis — Desenvolvedor Full Stack',
  description:
    'Desenvolvedor Full Stack com 9+ anos de experiência. Projetos em React, Next.js, TypeScript e Node.js. Base em Camaçari, BA — trabalho remoto.',
  keywords: [
    'portfolio desenvolvedor',
    'full stack developer',
    'react developer',
    'nextjs developer',
    'typescript developer',
    'projetos web',
  ],
  openGraph: {
    title: 'Jeferson Reis — Desenvolvedor Full Stack',
    description:
      'Desenvolvedor Full Stack com 9+ anos de experiência em React, Next.js e Node.js.',
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
