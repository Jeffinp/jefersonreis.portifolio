import React from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import SEOHead from '@/components/SEOHead'
import StructuredData from '@/components/StructuredData'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { useViewportLazyLoad } from '@/hooks/useViewportLazyLoad'
import Hero from '@/containers/Hero'
import About from '@/containers/About'

// Carregamento dinâmico de seções não-críticas com lazy loading avançado
const Skills = dynamic(() => import('@/containers/Skills'), {
  loading: () => <LoadingSkeleton variant="skills" />,
})
const Services = dynamic(() => import('@/containers/Services'), {
  loading: () => <LoadingSkeleton variant="services" />,
})
const Projects = dynamic(() => import('@/containers/Projects'), {
  loading: () => <LoadingSkeleton variant="projects" />,
})
const Timeline = dynamic(() => import('@/containers/Timeline'), {
  loading: () => <LoadingSkeleton variant="timeline" />,
})
const Testimonials = dynamic(() => import('@/containers/Testimonials'), {
  loading: () => <LoadingSkeleton variant="testimonials" />,
})
const Contact = dynamic(() => import('@/containers/Contact'), {
  loading: () => <LoadingSkeleton variant="contact" />,
})

// Componente wrapper para lazy loading com Intersection Observer
const LazySection: React.FC<{
  children: React.ReactNode
  fallback: React.ReactNode
  threshold?: number
  rootMargin?: string
}> = ({ children, fallback, threshold = 0.1, rootMargin = '300px' }) => {
  const { ref, isIntersecting } = useViewportLazyLoad({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  return <div ref={ref}>{isIntersecting ? children : fallback}</div>
}

export default function Home() {
  const router = useRouter()
  const currentLang = router.locale || 'pt'

  return (
    <>
      <SEOHead lang={currentLang} />
      <StructuredData lang={currentLang} />
      <main>
        {/* Seções críticas carregadas imediatamente */}
        <Hero />
        <About />

        {/* Seções não-críticas com lazy loading inteligente */}
        <LazySection
          fallback={<LoadingSkeleton variant="skills" />}
          threshold={0.2}
          rootMargin="400px"
        >
          <Skills />
        </LazySection>

        <LazySection
          fallback={<LoadingSkeleton variant="services" />}
          threshold={0.2}
          rootMargin="400px"
        >
          <Services />
        </LazySection>

        <LazySection
          fallback={<LoadingSkeleton variant="projects" />}
          threshold={0.2}
          rootMargin="300px"
        >
          <Projects />
        </LazySection>

        <LazySection
          fallback={<LoadingSkeleton variant="timeline" />}
          threshold={0.2}
          rootMargin="200px"
        >
          <Timeline />
        </LazySection>

        <LazySection
          fallback={<LoadingSkeleton variant="testimonials" />}
          threshold={0.2}
          rootMargin="200px"
        >
          <Testimonials />
        </LazySection>

        <LazySection
          fallback={<LoadingSkeleton variant="contact" />}
          threshold={0.2}
          rootMargin="100px"
        >
          <Contact />
        </LazySection>
      </main>
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
