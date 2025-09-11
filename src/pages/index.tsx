import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import HeaderCommercial from '@/components/layout/HeaderCommercial'
import FooterCommercial from '@/components/layout/FooterCommercial'
import TestimonialsCommercial from '@/containers/commercial/TestimonialsCommercial'
import { SEOHead } from '@/components/seo'

// Dynamic import for ChatWidget
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
})

// Dynamic imports for heavy components
const HeroCommercial = dynamic(
  () => import('@/containers/commercial/HeroCommercial'),
  {
    ssr: true,
  },
)
const AboutCommercial = dynamic(
  () => import('@/containers/commercial/AboutCommercial'),
  {
    ssr: true,
  },
)
const ServicesCommercial = dynamic(
  () => import('@/containers/commercial/ServicesCommercial'),
  {
    ssr: true,
  },
)
const ProcessCommercial = dynamic(
  () => import('@/containers/commercial/ProcessCommercial'),
  {
    ssr: true,
  },
)
const CTACommercial = dynamic(
  () => import('@/containers/commercial/CTACommercial'),
  {
    ssr: true,
  },
)
const ContactCommercial = dynamic(
  () => import('@/containers/commercial/ContactCommercial'),
  {
    ssr: true,
  },
)

export default function Home() {
  const router = useRouter()
  const currentLang = router.locale || 'pt'

  return (
    <>
      <SEOHead
        title="Jeferson Reis - Desenvolvimento Web Profissional | Sites e Aplicações"
        description="Transforme sua visão em realidade digital. Desenvolvimento de sites modernos, e-commerces, aplicações web e soluções personalizadas com foco em resultados."
        lang={currentLang}
      />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        <HeaderCommercial />

        <main>
          <HeroCommercial />
          <AboutCommercial />
          <ServicesCommercial />
          <ProcessCommercial />
          <TestimonialsCommercial />
          <CTACommercial />
          <ContactCommercial />
        </main>

        <FooterCommercial />
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'sections/header'])),
    },
  }
}
