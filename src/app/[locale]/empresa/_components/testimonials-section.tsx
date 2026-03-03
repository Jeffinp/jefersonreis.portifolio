'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { SectionWrapper, SectionHeader } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { testimonials, getAverageRating } from '@/data'
import { staggerContainer, staggerItem } from '@/lib/utils'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
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
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.id} variants={staggerItem}>
            <Card className="liquid-card card-glow h-full">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Quote className="text-primary/20 h-8 w-8 shrink-0" />
                    <StarRating rating={testimonial.rating} />
                  </div>

                  <p className="text-foreground/80 leading-relaxed italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                <div className="border-border mt-5 border-t pt-4">
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                  {testimonial.date && (
                    <p className="text-muted-foreground/60 mt-1 text-xs">
                      {formatDate(testimonial.date)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
