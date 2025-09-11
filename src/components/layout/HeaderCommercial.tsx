import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Star,
  Shield,
  Clock,
  ChevronRight,
  Code,
  Rocket,
  Users,
  Briefcase,
  Mail,
  CheckCircle,
} from 'lucide-react'

interface HeaderCommercialProps {
  transparent?: boolean
}

export const HeaderCommercial: React.FC<HeaderCommercialProps> = ({
  transparent = false,
}) => {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    const message =
      'Olá! Gostaria de saber mais sobre seus serviços de desenvolvimento web.'
    const whatsappNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55718174-7099'
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const navigation = [
    { name: 'Sobre', href: '#about', icon: Users },
    { name: 'Serviços', href: '#services', icon: Code },
    { name: 'Projetos', href: '#projects', icon: Briefcase },
    { name: 'Depoimentos', href: '#testimonials', icon: Star },
    { name: 'Contato', href: '#contact', icon: Mail },
  ]

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled || !transparent
            ? 'bg-white/95 shadow-lg backdrop-blur-md dark:bg-gray-900/95'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg transition-shadow group-hover:shadow-xl">
                <span className="text-xl font-bold text-white">JR</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-base font-bold text-gray-900 dark:text-white">
                  Jeferson Reis
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Full-Stack Developer
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 md:flex">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(item.href)
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              {/* Email - Desktop only */}
              <a
                href="mailto:Jefersonreisalmeida8356@gmail.com"
                className="hidden items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 lg:flex dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden xl:inline">
                  Jefersonreisalmeida8356@gmail.com
                </span>
                <span className="xl:hidden">Email</span>
              </a>

              {/* WhatsApp CTA */}
              <motion.button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Falar no WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-900"
            >
              <nav className="space-y-2 px-4 py-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.querySelector(item.href)
                      element?.scrollIntoView({ behavior: 'smooth' })
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <item.icon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}

                {/* Mobile Email Link */}
                <a
                  href="mailto:Jefersonreisalmeida8356@gmail.com"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">
                    Jefersonreisalmeida8356@gmail.com
                  </span>
                </a>

                {/* Mobile WhatsApp Link */}
                <a
                  href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55718174-7099').replace(/\D/g, '')}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre seus serviços.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">Falar no WhatsApp</span>
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}

export default HeaderCommercial
