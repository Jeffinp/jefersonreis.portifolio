'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { FaWhatsapp, FaDiscord, FaTwitter } from 'react-icons/fa'
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
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-border border-t">
      <div className="container-width py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="gradient-text text-xl font-bold">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Habilidades
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Redes Sociais</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          <p>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
