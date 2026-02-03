import { setRequestLocale } from 'next-intl/server'
import { AudienceSelector } from '@/components/common'
import { ThemeToggle } from '@/components/ui'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  // Habilitar static rendering
  setRequestLocale(locale)

  return (
    <main className="relative min-h-screen">
      {/* Theme Toggle no canto superior direito */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Audience Selector centralizado */}
      <div className="flex min-h-screen items-center justify-center">
        <AudienceSelector />
      </div>
    </main>
  )
}
