import React, { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { SEOHead, StructuredData, SchemaOrg } from '@/components/seo'
import { LoadingSkeleton } from '@/components/ui'
import { useViewportLazyLoad } from '@/hooks/ui/useViewportLazyLoad'

// Quantum Hero or Regular Hero based on mode - Use Lite version for better performance
const LiteQuantumHero = dynamic(() => import('@/containers/quantum/LiteQuantumHero'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><LoadingSkeleton variant="skills" /></div>,
  ssr: false
})
import Hero from '@/containers/Hero'
import About from '@/containers/About'

// Carregamento dinâmico de seções não-críticas com lazy loading avançado
const Skills = dynamic(() => import('@/containers/Skills'), {
  loading: () => <LoadingSkeleton variant="skills" />,
  ssr: true, // Mantém SSR para SEO
})
const LiteQuantumSkills = dynamic(() => import('@/containers/quantum/LiteQuantumSkills'), {
  loading: () => <LoadingSkeleton variant="skills" />,
  ssr: false,
})
const Services = dynamic(() => import('@/containers/Services'), {
  loading: () => <LoadingSkeleton variant="services" />,
  ssr: true,
})
const Projects = dynamic(() => import('@/containers/Projects'), {
  loading: () => <LoadingSkeleton variant="projects" />,
  ssr: false, // Desabilita SSR para componentes interativos pesados
})
const LiteQuantumProjects = dynamic(() => import('@/containers/quantum/LiteQuantumProjects'), {
  loading: () => <LoadingSkeleton variant="projects" />,
  ssr: false,
})
const Timeline = dynamic(() => import('@/containers/Timeline'), {
  loading: () => <LoadingSkeleton variant="timeline" />,
  ssr: true,
})
const Testimonials = dynamic(() => import('@/containers/Testimonials'), {
  loading: () => <LoadingSkeleton variant="testimonials" />,
  ssr: false, // Carousel é client-side
})
const Contact = dynamic(() => import('@/containers/Contact'), {
  loading: () => <LoadingSkeleton variant="contact" />,
  ssr: true,
})

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

export default function Home() {
  const router = useRouter()
  const currentLang = router.locale || 'pt'
  const [quantumMode, setQuantumMode] = useState(false)
  
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

  return (
    <>
      <SEOHead lang={currentLang} />
      <StructuredData lang={currentLang} />
      <SchemaOrg lang={currentLang} />
      <main>
        {/* Use Lite Quantum Hero if enabled, otherwise regular Hero */}
        {quantumMode ? <LiteQuantumHero /> : <Hero />}
        <About />

        {/* Seções não-críticas com lazy loading inteligente e Suspense */}
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

        <LazySection
          sectionId="services"
          fallback={<LoadingSkeleton variant="services" />}
          threshold={0.2}
          rootMargin="400px"
        >
          <Suspense fallback={<LoadingSkeleton variant="services" />}>
            <Services />
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
      </main>
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
