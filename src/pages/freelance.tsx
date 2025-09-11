import React, { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SEOHead, StructuredData, SchemaOrg } from '@/components/seo'
import { LoadingSkeleton } from '@/components/ui'
import { useViewportLazyLoad } from '@/hooks/ui/useViewportLazyLoad'
import HeaderCommercial from '@/components/layout/HeaderCommercial'
import FooterCommercial from '@/components/layout/FooterCommercial'

// Commercial Components (Freelancers/Clientes)
const HeroCommercial = dynamic(
  () => import('@/containers/commercial/HeroCommercial'),
  {
    loading: () => (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSkeleton variant="skills" />
      </div>
    ),
    ssr: false,
  },
)
const AboutCommercial = dynamic(
  () => import('@/containers/commercial/AboutCommercial'),
  {
    loading: () => <LoadingSkeleton variant="skills" />,
    ssr: true,
  },
)
const ServicesCommercial = dynamic(
  () => import('@/containers/commercial/ServicesCommercial'),
  {
    loading: () => <LoadingSkeleton variant="services" />,
    ssr: true,
  },
)
const FAQCommercial = dynamic(
  () => import('@/containers/commercial/FAQCommercial'),
  {
    loading: () => <LoadingSkeleton variant="services" />,
    ssr: true,
  },
)

// Shared Components
const Projects = dynamic(() => import('@/containers/shared/Projects'), {
  loading: () => <LoadingSkeleton variant="projects" />,
  ssr: false,
})
const Testimonials = dynamic(() => import('@/containers/shared/Testimonials'), {
  loading: () => <LoadingSkeleton variant="testimonials" />,
  ssr: false,
})

// Widgets
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
})
const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
})
const SocialProofNotifications = dynamic(
  () => import('@/components/SocialProofNotificationsEnhanced'),
  {
    ssr: false,
  },
)
const ConversionSystem = dynamic(
  () => import('@/components/conversion/ConversionSystem'),
  {
    ssr: false,
  },
)

// Componente wrapper para lazy loading com Intersection Observer
const LazySection: React.FC<{
  children: React.ReactNode
  fallback: React.ReactNode
  sectionId: string
  threshold?: number
  rootMargin?: string
}> = ({
  children,
  fallback,
  sectionId,
  threshold = 0.1,
  rootMargin = '300px',
}) => {
  const { ref, isIntersecting } = useViewportLazyLoad({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  return (
    <div ref={ref} id={sectionId}>
      {isIntersecting ? children : fallback}
    </div>
  )
}

export default function ComercialPage() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const currentLang = router.locale || 'pt'

  // Set target for this page
  useEffect(() => {
    localStorage.setItem('portfolioTarget', 'freelance')
  }, [])

  return (
    <>
      <SEOHead
        lang={currentLang}
        title="Sites que Vendem 3x Mais | Jeferson Reis - Desenvolvimento Web"
        description="Landing pages que convertem 3x mais. Automações que economizam 20h/semana. Apps que geram receita real. Garantia de 7 dias."
      />
      <StructuredData lang={currentLang} />
      <SchemaOrg lang={currentLang} />
      <Analytics />

      <HeaderCommercial />

      <main>
        {/* Hero Commercial */}
        <HeroCommercial />

        {/* About Commercial */}
        <AboutCommercial />

        {/* Services Commercial */}
        <LazySection
          sectionId="services"
          fallback={<LoadingSkeleton variant="services" />}
          threshold={0.2}
          rootMargin="400px"
        >
          <Suspense fallback={<LoadingSkeleton variant="services" />}>
            <ServicesCommercial />
          </Suspense>
        </LazySection>

        {/* Projects */}
        <LazySection
          sectionId="projects"
          fallback={<LoadingSkeleton variant="projects" />}
          threshold={0.2}
          rootMargin="300px"
        >
          <Suspense fallback={<LoadingSkeleton variant="projects" />}>
            <Projects />
          </Suspense>
        </LazySection>

        {/* Testimonials */}
        <LazySection
          sectionId="testimonials"
          fallback={<LoadingSkeleton variant="testimonials" />}
          threshold={0.2}
          rootMargin="200px"
        >
          <Suspense fallback={<LoadingSkeleton variant="testimonials" />}>
            <Testimonials />
          </Suspense>
        </LazySection>

        {/* FAQ */}
        <LazySection
          sectionId="faq"
          fallback={<LoadingSkeleton variant="services" />}
          threshold={0.2}
          rootMargin="200px"
        >
          <Suspense fallback={<LoadingSkeleton variant="services" />}>
            <FAQCommercial />
          </Suspense>
        </LazySection>
      </main>

      <FooterCommercial />

      {/* Conversion Widgets */}
      <ChatWidget />
      <SocialProofNotifications
        maxNotifications={7}
        pauseOnFormFocus={true}
        section="general"
      />
      <ConversionSystem
        enabled={true}
        features={{
          exitIntent: true,
          readingProgress: false,
          quiz: true,
          roiCalculator: true,
        }}
        exitIntentVariant="discount"
        onConversion={(data) => {
          console.log('Conversion event:', data)
          // Track conversion events
          if (typeof window !== 'undefined' && (window as any).gtag) {
            ;(window as any).gtag('event', 'conversion', {
              event_category: 'engagement',
              event_label: data.type,
              value: data.value,
            })
          }
        }}
      />
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'main',
        'sections/header',
        'sections/hero',
        'sections/testimonials',
        'projects/web-projects',
        'projects/mobile-projects',
        'projects/design-projects',
        'projects/3d-projects',
      ])),
    },
  }
}
