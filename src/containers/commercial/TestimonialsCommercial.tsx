import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  ArrowDown,
  Calendar,
  Target,
  Award,
  Heart,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle,
  Play,
  ExternalLink,
} from 'lucide-react'
import {
  testimonialsCommercial,
  getFeaturedTestimonials,
  getAggregatedMetrics,
} from '@/data/testimonialsCommercial'
import Image from 'next/image'

// Mapeamento de ícones
const iconMap: { [key: string]: React.ElementType } = {
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  ArrowDown,
  Calendar,
  Target,
  Award,
  Heart,
  ShoppingCart: DollarSign,
  Package: DollarSign,
  Zap: TrendingUp,
  Home: Users,
  GraduationCap: Users,
  ShoppingBag: DollarSign,
  MessageCircle: Users,
  Truck: TrendingUp,
  Gift: Heart,
  Briefcase: Users,
  FileCheck: CheckCircle,
  RefreshCw: TrendingUp,
  UserCheck: Users,
  Download: TrendingUp,
}

export const TestimonialsCommercial: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const featuredTestimonials = getFeaturedTestimonials()
  const metrics = getAggregatedMetrics()

  const industries = [
    'all',
    ...new Set(testimonialsCommercial.map((t) => t.industry)),
  ]

  const filteredTestimonials =
    selectedIndustry === 'all'
      ? testimonialsCommercial
      : testimonialsCommercial.filter((t) => t.industry === selectedIndustry)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length,
    )
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-transparent py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
            Resultados{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Comprovados
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 lg:text-lg dark:text-gray-300">
            Empresas reais, resultados reais
          </p>
        </motion.div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-lg sm:grid-cols-4 sm:gap-4 sm:p-5"
        >
          <div className="text-center">
            <p className="text-2xl font-bold sm:text-3xl">{metrics.totalProjects}+</p>
            <p className="text-xs opacity-90 sm:text-sm">Projetos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold sm:text-3xl">
              {metrics.averageRating.toFixed(1)}★
            </p>
            <p className="text-xs opacity-90 sm:text-sm">Avaliação</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold sm:text-3xl">{metrics.satisfactionRate}</p>
            <p className="text-xs opacity-90 sm:text-sm">Satisfação</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold sm:text-3xl">{metrics.totalIndustries}+</p>
            <p className="text-xs opacity-90 sm:text-sm">Setores</p>
          </div>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="relative rounded-xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm shadow-lg dark:border-gray-700 dark:bg-gray-800/80">
            <Quote className="absolute top-4 left-4 h-6 w-6 text-blue-200 dark:text-blue-800" />

            <AnimatePresence mode="wait">
              {featuredTestimonials.length > 0 && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="mb-6 flex flex-col items-center gap-6 sm:flex-row">
                    {/* Avatar and Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                          {featuredTestimonials[currentIndex].name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {featuredTestimonials[currentIndex].name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {featuredTestimonials[currentIndex].role} •{' '}
                          {featuredTestimonials[currentIndex].company}
                        </p>
                        <div className="mt-1 flex gap-1">
                          {[
                            ...Array(featuredTestimonials[currentIndex].rating),
                          ].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 text-center sm:text-right">
                      <span className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {featuredTestimonials[currentIndex].projectType}
                      </span>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {featuredTestimonials[currentIndex].industry} •{' '}
                        {featuredTestimonials[currentIndex].projectDuration}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
                    &ldquo;{featuredTestimonials[currentIndex].testimonial}
                    &rdquo;
                  </p>

                  {/* Results Grid */}
                  <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {featuredTestimonials[currentIndex].results.map(
                      (result, idx) => {
                        const Icon = iconMap[result.icon] || TrendingUp
                        return (
                          <div
                            key={idx}
                            className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700"
                          >
                            <Icon className="mx-auto mb-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {result.value}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {result.metric}
                            </p>
                          </div>
                        )
                      },
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Investimento:{' '}
                        <strong className="text-blue-600 dark:text-blue-400">
                          {featuredTestimonials[currentIndex].investment}
                        </strong>
                      </span>
                      {featuredTestimonials[currentIndex].websiteUrl && (
                        <a
                          href={featuredTestimonials[currentIndex].websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Ver site
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {featuredTestimonials[currentIndex].date}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 right-4 left-4 flex -translate-y-1/2 justify-between">
              <button
                onClick={prevTestimonial}
                className="rounded-full bg-white/90 p-2 shadow-lg backdrop-blur transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="rounded-full bg-white/90 p-2 shadow-lg backdrop-blur transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Industry Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  selectedIndustry === industry
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {industry === 'all' ? 'Todos' : industry}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5"
        >
          {filteredTestimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white/80 p-4 backdrop-blur-sm shadow-md transition-all hover:shadow-lg sm:p-5 dark:border-gray-700 dark:bg-gray-800/80"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Company and Project */}
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {testimonial.company}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {testimonial.projectType} • {testimonial.industry}
                </p>
              </div>

              {/* Testimonial */}
              <p className="mb-3 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
                &ldquo;{testimonial.testimonial}&rdquo;
              </p>

              {/* Key Results */}
              <div className="space-y-1.5 border-t border-gray-200 pt-3 dark:border-gray-700">
                {testimonial.results.slice(0, 2).map((result, idx) => {
                  const Icon = iconMap[result.icon] || TrendingUp
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Icon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        {result.metric}
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {result.value}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
            Junte-se a 100+ empresas que transformaram seus negócios
          </p>
          <button
            onClick={() => {
              const message =
                'Olá! Vi os casos de sucesso e quero transformar meu negócio também!'
              const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
              window.open(whatsappUrl, '_blank')
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:px-8 sm:py-3 sm:text-lg"
          >
            Quero Resultados Assim
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsCommercial
