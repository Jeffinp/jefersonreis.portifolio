'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
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

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
}

export function TestimonialsSection() {
  const avg = getAverageRating()

  return (
    <SectionWrapper id="testimonials">
      <SectionHeader
        subtitle="Depoimentos"
        title="O que dizem sobre meu trabalho"
        description={`${testimonials.length} clientes atendidos com nota média de ${avg.toFixed(1)}/5`}
      />

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((t) => (
          <motion.div key={t.id} variants={staggerItem}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col justify-between p-6">
                {/* Quote + rating */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Quote className="text-primary/20 h-8 w-8 shrink-0" />
                    <StarRating rating={t.rating} />
                  </div>

                  <p className="text-foreground/80 leading-relaxed italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div className="border-border mt-5 border-t pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                  {t.date && (
                    <p className="text-muted-foreground/60 mt-1 text-xs">
                      {formatDate(t.date)}
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
