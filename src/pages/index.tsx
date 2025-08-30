import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import SEOHead from '@/components/SEOHead'
import StructuredData from '@/components/StructuredData'
import SchemaOrg from '@/components/SchemaOrg'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { useViewportLazyLoad } from '@/hooks/ui/useViewportLazyLoad'
import Hero from '@/containers/Hero'
import About from '@/containers/About'

// Carregamento dinâmico de seções não-críticas com lazy loading avançado
const Skills = dynamic(() => import('@/containers/Skills'), {
  loading: () => <LoadingSkeleton variant="skills" />,
  ssr: true, // Mantém SSR para SEO
})
const Services = dynamic(() => import('@/containers/Services'), {
  loading: () => <LoadingSkeleton variant="services" />,
  ssr: true,
})
const Projects = dynamic(() => import('@/containers/Projects'), {
  loading: () => <LoadingSkeleton variant="projects" />,
  ssr: false, // Desabilita SSR para componentes interativos pesados
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

  return (
    <>
      <SEOHead lang={currentLang} />
      <StructuredData lang={currentLang} />
      <SchemaOrg lang={currentLang} />
      <main>
        {/* Seções críticas carregadas imediatamente */}
        <Hero />
        <About />

        {/* Seções não-críticas com lazy loading inteligente e Suspense */}
        <LazySection
          sectionId="skills"
          fallback={<LoadingSkeleton variant="skills" />}
          threshold={0.2}
          rootMargin="400px"
        >
          <Suspense fallback={<LoadingSkeleton variant="skills" />}>
            <Skills />
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
            <Projects />
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
