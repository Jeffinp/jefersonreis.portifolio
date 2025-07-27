import React from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import SEOHead from '@/components/SEOHead'
import StructuredData from '@/components/StructuredData'
import Hero from '@/containers/Hero'
import About from '@/containers/About'

// Carregamento dinâmico de seções não-críticas (abaixo da dobra)
const Skills = dynamic(() => import('@/containers/Skills'), {
  loading: () => (
    <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
})
const Services = dynamic(() => import('@/containers/Services'), {
  loading: () => (
    <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
})
const Projects = dynamic(() => import('@/containers/Projects'), {
  loading: () => (
    <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
})
const Timeline = dynamic(() => import('@/containers/Timeline'), {
  loading: () => (
    <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
})
const Testimonials = dynamic(() => import('@/containers/Testimonials'), {
  loading: () => (
    <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
})
const Contact = dynamic(() => import('@/containers/Contact'), {
  loading: () => (
    <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
})

export default function Home() {
  const router = useRouter()
  const currentLang = router.locale || 'pt'

  return (
    <>
      <SEOHead lang={currentLang} />
      <StructuredData lang={currentLang} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Timeline />
        <Testimonials />
        <Contact />
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
