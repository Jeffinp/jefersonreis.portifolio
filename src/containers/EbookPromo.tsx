import React, { useState, useEffect, useRef, memo } from 'react'
import { Book, ChevronRight, BookOpen, Download } from 'lucide-react'
import { motion, useAnimation, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { featuredEbooks } from '@/data/featuredEbooks'

/**
 * Hook personalizado para gerenciar animações baseadas em visibilidade
 */
/**
 * Hook personalizado para gerenciar animações baseadas em visibilidade
 */
const useAnimatedVisibility = (threshold = 0.2, once = true) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)

  // FIX: Rename 'threshold' to 'amount' here
  const inView = useInView(ref, { once, amount: threshold })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return { ref, controls }
}

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Componente de seção animada
 */
const AnimatedSection = memo(
  ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
    const { ref, controls } = useAnimatedVisibility(0.2)

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
  },
)

AnimatedSection.displayName = 'AnimatedSection'

const EbookPromo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section
      id="ebooks-promo"
      className="relative w-full overflow-hidden bg-transparent py-16 md:py-24 lg:py-32"
    >
      {/* Background com quadrados */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
          backgroundSize: isMobile ? '40px 40px' : '80px 80px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text content */}
          <AnimatedSection className="max-w-xl">
            <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/60 dark:text-blue-200">
              <BookOpen size={16} className="mr-2" />
              E-books gratuitos
            </div>

            <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl dark:from-blue-400 dark:to-purple-400">
              Recursos para impulsionar sua carreira
            </h2>

            <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Acesse meus e-books gratuitos com estratégias, dicas e técnicas
              para se destacar no mercado digital e aprimorar suas habilidades.
            </p>

            <ul className="mb-8 space-y-3">
              {Array.from({ length: 6 }, (_, index) => (
                <li key={index} className="flex items-center">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/60">
                    <ChevronRight
                      size={14}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {getBenefit(index)}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/ebooks"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3.5 text-base font-medium text-white shadow-md transition-colors duration-300 hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
              aria-label="Ver todos os e-books"
            >
              Ver todos os e-books
              <Book size={18} className="ml-2" />
            </Link>
          </AnimatedSection>

          {/* eBooks preview */}
          <AnimatedSection delay={0.2} className="relative">
            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
              {featuredEbooks.map((ebook) => (
                <motion.div
                  key={ebook.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  style={{
                    transformOrigin: 'center bottom',
                  }}
                >
                  <div className="relative h-40 bg-blue-50 dark:bg-gray-700">
                    {ebook.coverImage ? (
                      <Image
                        src={ebook.coverImage}
                        alt={ebook.title}
                        className="h-full w-full object-cover"
                        width={200} // Placeholder width
                        height={280} // Placeholder height
                        loading="lazy"
                        quality={90}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Book size={36} className="text-blue-500/50" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 rounded-md bg-blue-600/90 px-2 py-1 text-xs font-medium text-white">
                      {ebook.tags.join(', ')}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 dark:text-white">
                      {ebook.title}
                    </h3>
                    <div className="mt-auto flex items-center pt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                      <Download size={14} className="mr-1" />
                      <Link href="/ebooks" aria-label="Ver detalhes">
                        Ver detalhes
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mensagem de aviso */}
            <div className="mt-4 flex justify-center">
              <div className="relative rounded-lg bg-blue-100 p-2 text-blue-800 shadow-lg dark:bg-blue-900 dark:text-blue-200">
                <p className="text-center text-sm">
                  E-books disponíveis gratuitamente para download
                </p>
                <div className="absolute -bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-6 border-r-6 border-l-6 border-transparent border-b-blue-100 dark:border-b-blue-900" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// Função auxiliar para os benefícios
function getBenefit(index: number): string {
  const benefits = [
    'Conteúdo exclusivo e atualizado regularmente',
    'Dicas práticas para aplicação imediata',
    'Recursos para otimização de processos',
    'Estratégias comprovadas para aumentar resultados',
    'Exemplos de casos de sucesso',
    'Atualizações gratuitas por tempo ilimitado',
  ]

  return benefits[index] || ''
}

export default EbookPromo
