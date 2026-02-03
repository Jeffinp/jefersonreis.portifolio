import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import { SchemaOrg } from '@/components/seo'
import { HeroSection } from './_components/hero-section'
import { ServicesSection } from './_components/services-section'
import { TestimonialsSection } from './_components/testimonials-section'
import { FAQSection } from './_components/faq-section'
import { CTASection } from './_components/cta-section'
import { ContactSection } from './_components/contact-section'

interface FreelancePageProps {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Desenvolvimento Web Profissional | Freelancer Full Stack',
  description:
    'Desenvolvimento de sites, sistemas e aplicativos sob medida. Landing pages, e-commerce, dashboards e APIs. Tecnologia moderna com foco em resultados.',
  keywords: [
    'desenvolvedor freelancer',
    'desenvolvimento web',
    'criação de sites',
    'landing page',
    'e-commerce',
    'aplicativo mobile',
    'react native',
    'nextjs',
  ],
  openGraph: {
    title: 'Desenvolvimento Web Profissional - Jeferson Reis',
    description: 'Sites, sistemas e apps modernos sob medida',
    type: 'website',
  },
}

export default async function FreelancePage({ params }: FreelancePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <SchemaOrg type="service" />
      <SchemaOrg type="faq" />
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
