import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { SEOHead, StructuredData, SchemaOrg } from '@/components/seo'
import AudienceSelector from '@/components/landing/AudienceSelector'

export default function Home() {
  const router = useRouter()
  const currentLang = router.locale || 'pt'

  return (
    <>
      <SEOHead
        lang={currentLang}
        title="Jeferson Reis - Desenvolvedor Full-Stack & Especialista em Soluções Digitais"
        description="Desenvolvimento web moderno, automações inteligentes e apps mobile. Disponível para projetos freelance e oportunidades CLT/PJ."
      />
      <StructuredData lang={currentLang} />
      <SchemaOrg lang={currentLang} />

      {/* Always show the audience selector on home page */}
      <AudienceSelector />
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
