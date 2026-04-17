'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { FaWhatsapp, FaDiscord, FaTwitter } from 'react-icons/fa'
import { useLocale, useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config/site'

const socialLinks = [
  {
    name: 'GitHub',
    href: siteConfig.social.github,
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: siteConfig.social.linkedin,
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    href: siteConfig.social.instagram,
    icon: Instagram,
  },
  {
    name: 'Twitter',
    href: siteConfig.social.twitter,
    icon: FaTwitter,
  },
  {
    name: 'WhatsApp',
    href: siteConfig.whatsapp.link,
    icon: FaWhatsapp,
  },
  {
    name: 'Discord',
    href: siteConfig.social.discord,
    icon: FaDiscord,
  },
  {
    name: 'Email',
    href: `mailto:${siteConfig.contactEmail}`,
    icon: Mail,
  },
]

export function Footer() {
  const tNav = useTranslations('navigation')
  const locale = useLocale()
  const currentYear = new Date().getFullYear()
  const isPt = locale === 'pt'

  return (
    <footer className="border-border relative border-t">
      <div className="via-primary/30 absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent" />

      <div className="container-width py-14">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.9fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center">
              <span className="gradient-text text-2xl leading-tight font-bold">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md text-[15px] leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-muted-foreground border-border/70 hover:border-primary/40 hover:text-primary inline-flex rounded-full border px-3 py-1.5 text-xs transition-colors"
              >
                {siteConfig.contactEmail}
              </a>
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground border-border/70 hover:border-primary/40 hover:text-primary inline-flex rounded-full border px-3 py-1.5 text-xs transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-foreground/95 text-sm font-semibold tracking-wide">
              {isPt ? 'Links Rápidos' : 'Quick Links'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary inline-flex transition-colors"
                >
                  {tNav('projects')}
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground hover:text-primary inline-flex transition-colors"
                >
                  {tNav('skills')}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary inline-flex transition-colors"
                >
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-foreground/95 text-sm font-semibold tracking-wide">
              {isPt ? 'Redes Sociais' : 'Social'}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground border-border/70 hover:border-primary/40 hover:text-primary inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-border text-muted-foreground mt-10 border-t pt-6 text-center text-sm">
          <p>
            © {currentYear} {siteConfig.name}.{' '}
            {isPt ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
