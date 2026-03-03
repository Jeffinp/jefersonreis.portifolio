'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { Button } from './button'
import { localeFlags } from '@/lib/i18n'
import type { Locale } from '@/types'

export function LocaleSwitcher() {
  const currentLocale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('locale')

  const nextLocale = currentLocale === 'pt' ? 'en' : 'pt'

  const switchLocale = () => {
    // Replace the locale segment in the pathname
    const segments = pathname.split('/')
    segments[1] = nextLocale
    router.push(segments.join('/'))
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={switchLocale}
      aria-label={t('change')}
      title={`${localeFlags[nextLocale]} ${t(nextLocale)}`}
    >
      <Globe className="h-5 w-5" />
    </Button>
  )
}
