import React, { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SEOHead, StructuredData, SchemaOrg } from '@/components/seo'
import { LoadingSkeleton } from '@/components/ui'
import { useViewportLazyLoad } from '@/hooks/ui/useViewportLazyLoad'
import { useTargetAudience } from '@/hooks/useTargetAudience'
import AudienceSelector from '@/components/landing/AudienceSelector'

// Portfolio Components (Empresas/Recrutadores)
const HeroPortfolio = dynamic(() => import('@/containers/portfolio/Hero'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSkeleton variant="skills" />
    </div>
  ),
  ssr: false,
})
const AboutPortfolio = dynamic(() => import('@/containers/portfolio/About'), {
  loading: () => <LoadingSkeleton variant="skills" />,
  ssr: true,
})
const Skills = dynamic(() => import('@/containers/portfolio/Skills'), {
  loading: () => <LoadingSkeleton variant="skills" />,
  ssr: true,
})
const Timeline = dynamic(() => import('@/containers/portfolio/Timeline'), {
  loading: () => <LoadingSkeleton variant="timeline" />,
  ssr: true,
})
const Contact = dynamic(() => import('@/containers/portfolio/Contact'), {
  loading: () => <LoadingSkeleton variant="contact" />,
  ssr: true,
})

// Commercial Components (Freelancers/Clientes)
const HeroCommercial = dynamic(() => import('@/containers/commercial/HeroCommercial'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSkeleton variant="skills" />
    </div>
  ),
  ssr: false,
})
const AboutCommercial = dynamic(() => import('@/containers/commercial/AboutCommercial'), {
  loading: () => <LoadingSkeleton variant="skills" />,
  ssr: true,
})
const ServicesCommercial = dynamic(
  () => import('@/containers/commercial/ServicesCommercial'),
  {
    loading: () => <LoadingSkeleton variant="services" />,
    ssr: true,
  },
)
const FAQCommercial = dynamic(() => import('@/containers/commercial/FAQCommercial'), {
  loading: () => <LoadingSkeleton variant="services" />,
  ssr: true,
})

// Shared Components
const Projects = dynamic(() => import('@/containers/shared/Projects'), {
  loading: () => <LoadingSkeleton variant="projects" />,
  ssr: false,
})
const Services = dynamic(() => import('@/containers/shared/Services'), {
  loading: () => <LoadingSkeleton variant="services" />,
  ssr: true,
})
const Testimonials = dynamic(() => import('@/containers/shared/Testimonials'), {
  loading: () => <LoadingSkeleton variant="testimonials" />,
  ssr: false,
})
// Quantum Hero for visual mode
const LiteQuantumHero = dynamic(
  () => import('@/containers/quantum/LiteQuantumHero'),
  {
    loading: () => <LoadingSkeleton variant="skills" />,
    ssr: false,
  },
)
// Dynamic imports já definidos acima
const LiteQuantumSkills = dynamic(
  () => import('@/containers/quantum/LiteQuantumSkills'),
  {
    loading: () => <LoadingSkeleton variant="skills" />,
    ssr: false,
  },
)
// Dynamic imports já definidos acima
const LiteQuantumProjects = dynamic(
  () => import('@/containers/quantum/LiteQuantumProjects'),
  {
    loading: () => <LoadingSkeleton variant="projects" />,
    ssr: false,
  },
)
// Dynamic imports já definidos acima

// Componente wrapper para lazy loading com Intersection Observer
// Mantém os IDs das seções no DOM para permitir navegação por atalhos
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

// Import Chat Widget, Analytics and Social Proof
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
})
const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
})
const SocialProofNotifications = dynamic(
  () => import('@/components/SocialProofNotifications'),
  {
    ssr: false,
  },
)
// Import Conversion System
const ConversionSystem = dynamic(
  () => import('@/components/conversion/ConversionSystem'),
  {
    ssr: false,
  },
)

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const currentLang = router.locale || 'pt'
  const [quantumMode, setQuantumMode] = useState(false)
  const [showSelector, setShowSelector] = useState(false)
  
  // Novo sistema de target
  const { target, isEmpresa, isFreelance, isDefault } = useTargetAudience()

  // Always show selector on index page
  useEffect(() => {
    // Index page should always show the selector
    // Users will be redirected to /empresa or /freelance
    setShowSelector(true)
  }, [])
  
  // Check if quantum mode is enabled
  useEffect(() => {
    const savedQuantumMode = localStorage.getItem('quantumMode')
    if (savedQuantumMode !== null) {
      setQuantumMode(JSON.parse(savedQuantumMode))
    } else {
      // Enable by default for desktop
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      setQuantumMode(!isMobile)
    }
  }, [])

  // Show selector if no target is chosen
  if (showSelector) {
    return (
      <>
        <SEOHead lang={currentLang} />
        <StructuredData lang={currentLang} />
        <SchemaOrg lang={currentLang} />
        <AudienceSelector />
      </>
    )
  }

  return (
    <>
      <SEOHead lang={currentLang} />
      <StructuredData lang={currentLang} />
      <SchemaOrg lang={currentLang} />
      <Analytics />
      <main>
        {/* Hero baseado no target */}
        {quantumMode ? (
          <LiteQuantumHero />
        ) : isFreelance ? (
          <HeroCommercial />
        ) : (
          <HeroPortfolio />
        )}
        
        {/* About - diferente para cada público */}
        {isFreelance ? <AboutCommercial /> : <AboutPortfolio />}

        {/* Seções não-críticas com lazy loading inteligente e Suspense */}
        {/* Skills section - Mostra para empresas e default */}
        {(isEmpresa || isDefault) && (
          <LazySection
            sectionId="skills"
            fallback={<LoadingSkeleton variant="skills" />}
            threshold={0.2}
            rootMargin="400px"
          >
            <Suspense fallback={<LoadingSkeleton variant="skills" />}>
              {quantumMode ? <LiteQuantumSkills /> : <Skills />}
            </Suspense>
          </LazySection>
        )}

        <LazySection
          sectionId="services"
          fallback={<LoadingSkeleton variant="services" />}
          threshold={0.2}
          rootMargin="400px"
        >
          <Suspense fallback={<LoadingSkeleton variant="services" />}>
            {isFreelance ? <ServicesCommercial /> : <Services />}
          </Suspense>
        </LazySection>

        <LazySection
          sectionId="projects"
          fallback={<LoadingSkeleton variant="projects" />}
          threshold={0.2}
          rootMargin="300px"
        >
          <Suspense fallback={<LoadingSkeleton variant="projects" />}>
            {quantumMode ? <LiteQuantumProjects /> : <Projects />}
          </Suspense>
        </LazySection>

        {/* Timeline section - Mostra para empresas e default */}
        {(isEmpresa || isDefault) && (
          <LazySection
            sectionId="timeline"
            fallback={<LoadingSkeleton variant="timeline" />}
            threshold={0.2}
            rootMargin="200px"
          >
            <Suspense fallback={<LoadingSkeleton variant="timeline" />}>
              <Timeline />
            </Suspense>
          </LazySection>
        )}

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

        {/* FAQ section - Apenas para freelance */}
        {isFreelance && (
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
        )}

        {/* Contact section - Mostra para empresas e default */}
        {(isEmpresa || isDefault) && (
          <LazySection
            sectionId="contact"
            fallback={<LoadingSkeleton variant="contact" />}
            threshold={0.2}
            rootMargin="100px"
          >
            <Suspense fallback={<LoadingSkeleton variant="contact" />}>
              <Contact />
            </Suspense>
          </LazySection>
        )}

      </main>

      {/* Chat Widget and Social Proof - Para freelance apenas */}
      {isFreelance && (
        <>
          <ChatWidget />
          <SocialProofNotifications />
          <ConversionSystem
            enabled={true}
            features={{
              exitIntent: true,
              readingProgress: true,
              quiz: true,
              roiCalculator: true,
            }}
            exitIntentVariant="discount"
            onConversion={(data) => {
              console.log('Conversion event:', data)
              // Track conversion events
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', {
                  event_category: 'engagement',
                  event_label: data.type,
                  value: data.value,
                })
              }
            }}
          />
        </>
      )}
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
        'sections/timeline',
        'projects/web-projects',
        'projects/mobile-projects',
        'projects/design-projects',
        'projects/3d-projects',
      ])),
    },
  }
}
