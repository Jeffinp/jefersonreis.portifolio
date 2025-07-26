import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import SEOHead from '@/components/SEOHead'
import StructuredData from '@/components/StructuredData'
import Hero from '@/containers/Hero'
import About from '@/containers/About'
import Skills from '@/containers/Skills'
import Projects from '@/containers/Projects'
import ExpertiseAreas from '@/containers/ExpertiseAreas'
import Services from '@/containers/Services'
import Timeline from '@/containers/Timeline'
import Testimonials from '@/containers/Testimonials'
import Contact from '@/containers/Contact'

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
        <ExpertiseAreas />
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
