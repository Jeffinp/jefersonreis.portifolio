'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'home', href: '#home' },
  { name: 'skills', href: '#skills' },
  { name: 'projects', href: '#projects' },
  { name: 'contact', href: '#contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations('navigation')
  const tc = useTranslations('common')

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur dark:border-white/8 dark:bg-white/4 dark:shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.2)] dark:backdrop-blur-xl dark:backdrop-saturate-[1.8]">
      <nav
        aria-label={t('mainNav')}
        className="container-width flex h-16 items-center justify-between"
      >
        {/* Logo — hit target aumentado para ≥44×44 */}
        <Link
          href="/"
          aria-label="Home"
          className="focus-visible:ring-ring flex h-11 w-11 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Image
            src="/assets/icon/apple-icon.png"
            alt=""
            width={64}
            height={64}
            className="h-9 w-9 rounded-full object-cover"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={cn(
                  'hover:text-foreground focus-visible:text-foreground focus-visible:ring-ring relative text-sm font-medium transition-colors focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  'text-muted-foreground',
                  'after:bg-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:transition-all after:duration-300 hover:after:w-full'
                )}
              >
                {t(item.name)}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-md p-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="menu"
            aria-label={mobileMenuOpen ? tc('closeMenu') : tc('openMenu')}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          role="menu"
          className="border-border border-t md:hidden"
        >
          <ul className="space-y-1 px-4 pt-2 pb-3">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  role="menuitem"
                  href={item.href}
                  className="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring block rounded-md px-3 py-2 text-base font-medium focus-visible:ring-2 focus-visible:outline-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.name)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
