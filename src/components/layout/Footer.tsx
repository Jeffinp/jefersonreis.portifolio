import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Linkedin,
  Github,
  Instagram,
  MessageCircle,
  ExternalLink,
} from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'
import { PrivacyPolicyModal } from '@/components/ui'
import { motion, useAnimation, useInView } from 'framer-motion'
import { SectionBackground } from '@/components/common'
import { useTranslation } from 'next-i18next'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

// Componente para animações de entrada
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SocialLink {
  icon: React.ReactNode
  href: string
  title: string
  label: string
  hoverColor: string
  delay: number
}

interface FooterLink {
  label: string
  href: string
}

const Footer: React.FC = () => {
  const { t } = useTranslation('common')
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] =
    useState(false)

  const socialLinks: SocialLink[] = [
    {
      icon: (
        <Linkedin className="h-5 w-5 text-blue-600 md:h-6 md:w-6 dark:text-blue-400" />
      ),
      href: `https://${process.env.NEXT_PUBLIC_LINKEDIN_URL}`,
      title: t('footer.linkedin'),
      label: 'LinkedIn',
      hoverColor: 'hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600',
      delay: 0.1,
    },
    {
      icon: (
        <Github className="h-5 w-5 text-gray-800 md:h-6 md:w-6 dark:text-gray-200" />
      ),
      href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/jeffinp',
      title: t('footer.github'),
      label: 'GitHub',
      hoverColor: 'hover:bg-gray-800 hover:text-white dark:hover:bg-gray-700',
      delay: 0.2,
    },
    {
      icon: (
        <Instagram className="h-5 w-5 text-pink-600 md:h-6 md:w-6 dark:text-pink-400" />
      ),
      href: 'https://www.instagram.com/jeffinx___/',
      title: t('footer.instagram'),
      label: 'Instagram',
      hoverColor:
        'hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white',
      delay: 0.3,
    },
    {
      icon: (
        <MessageCircle className="h-5 w-5 text-green-600 md:h-6 md:w-6 dark:text-green-400" />
      ),
      href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}`,
      title: t('footer.whatsapp'),
      label: 'WhatsApp',
      hoverColor: 'hover:bg-green-500 hover:text-white dark:hover:bg-green-600',
      delay: 0.4,
    },
    {
      icon: (
        <FaDiscord className="h-5 w-5 text-indigo-600 md:h-6 md:w-6 dark:text-indigo-400" />
      ),
      href:
        process.env.NEXT_PUBLIC_DISCORD_INVITE ||
        'https://discord.com/users/563186981962776577',
      title: t('footer.discord'),
      label: 'Discord',
      hoverColor:
        'hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-700',
      delay: 0.5,
    },
  ]

  const quickLinks: FooterLink[] = [
    { label: t('footer.menu.home'), href: '#home' },
    { label: t('footer.menu.about'), href: '#about' },
    { label: t('footer.menu.services'), href: '#services' },
    { label: t('footer.menu.portfolio'), href: '#portfolio' },
    { label: t('footer.menu.contact'), href: '#contact' },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-white pt-12 pb-8 dark:border-gray-800 dark:bg-gradient-to-b dark:from-slate-900/60 dark:to-slate-900/60">
      {/* Top gradient accent - apenas no modo escuro */}
      <div className="absolute inset-x-0 top-0 hidden h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:block" />

      <SectionBackground variant="default" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <AnimatedSection className="space-y-6 lg:col-span-2">
            <div className="group perspective">
              <div className="relative transform-gpu transition-all duration-300 hover:scale-[1.02] hover:-rotate-y-2">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  <a href="#" className="group">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                      {'<'}Jeferson Reis{'/>'}
                    </span>
                    <span className="animate-blink ml-2 inline-block h-6 w-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                  </a>
                </h2>
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            </div>
            <p className="max-w-md leading-relaxed text-gray-600 dark:text-gray-300">
              {t('footer.tagline')}
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <motion.a
                href="mailto:Jefersonreisalmeida8356@gmail.com"
                className="flex items-center text-sm text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Image
                  src="/assets/images/icons/mail-heart-svgrepo-com.svg"
                  alt={t('aria.emailIcon')}
                  width={16}
                  height={16}
                  className="mr-2 h-4 w-4"
                />
                Jefersonreisalmeida8356@gmail.com
              </motion.a>
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection delay={0.1} className="space-y-6">
            <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    <span className="mr-2.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Social Connections */}
          <AnimatedSection delay={0.2} className="space-y-6">
            <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
              {t('footer.connectWithMe')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.title}
                  className={`transform rounded-full border border-gray-200 bg-white/80 p-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 ${link.hoverColor}`}
                  aria-label={link.label}
                  style={{
                    minWidth: 40,
                    minHeight: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow:
                      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Copyright */}
        <AnimatedSection
          delay={0.3}
          className="border-t border-gray-200 pt-8 dark:border-gray-800"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <motion.p
              className="text-center text-sm text-gray-600 sm:text-left dark:text-gray-300"
              whileHover={{
                color: '#3B82F6',
                transition: { duration: 0.3 },
              }}
            >
              © {new Date().getFullYear()} Jeferson Reis.{' '}
              {t('footer.allRightsReserved')}
            </motion.p>

            <motion.button
              onClick={() => setIsPrivacyPolicyModalOpen(true)}
              className="flex items-center text-sm text-gray-500 transition-colors duration-300 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              whileHover={{ scale: 1.05 }}
            >
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              {t('footer.privacyPolicy')}
            </motion.button>
          </div>

          <motion.div
            className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 sm:mx-0"
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </AnimatedSection>
      </div>

      {/* Modal de Política de Privacidade */}
      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyModalOpen}
        onClose={() => setIsPrivacyPolicyModalOpen(false)}
      />
    </footer>
  )
}

export default Footer
