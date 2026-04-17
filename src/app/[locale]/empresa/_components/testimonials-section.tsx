'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { SectionWrapper, SectionHeader } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { getTestimonials, getAverageRating } from '@/data'
import { staggerContainer, staggerItem } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/ui/use-reduced-motion'

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`Avaliação: ${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-4 w-4 ${
            i < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const locale = useLocale()
  const t = useTranslations('testimonials')
  const avg = getAverageRating()
  const reduced = useReducedMotion()
  const testimonials = getTestimonials(locale)

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    const date = new Date(Number(year), Number(month) - 1)
    return date.toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <SectionWrapper id="testimonials">
      <SectionHeader
        subtitle={t('subtitle')}
        title={t('title')}
        description={t('description', {
          count: testimonials.length,
          rating: avg.toFixed(1),
        })}
      />

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={reduced ? undefined : staggerContainer}
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={reduced ? undefined : staggerItem}
          >
            <Card className="liquid-card card-glow h-full transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none">
              <CardContent className="flex h-full flex-col justify-between p-7">
                <blockquote className="space-y-5">
                  <div className="flex items-start justify-between">
                    <Quote
                      aria-hidden="true"
                      className="text-primary/25 h-7 w-7 shrink-0"
                    />
                    <StarRating rating={testimonial.rating} />
                  </div>

                  <p className="text-foreground/85 text-[15px] leading-[1.7]">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </blockquote>

                <footer className="border-border/40 mt-6 border-t pt-4">
                  <cite className="text-sm font-bold not-italic">
                    {testimonial.name}
                  </cite>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                  {testimonial.date && (
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      {formatDate(testimonial.date)}
                    </p>
                  )}
                </footer>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
