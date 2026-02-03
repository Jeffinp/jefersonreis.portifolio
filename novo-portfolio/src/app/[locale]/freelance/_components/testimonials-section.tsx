'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { testimonials } from '@/data'
import { staggerContainer, staggerItem } from '@/lib/utils'

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" animate={false}>
      <SectionHeader
        subtitle="Depoimentos"
        title="O Que Dizem Meus Clientes"
        description="Feedback real de empresas e profissionais que confiaram no meu trabalho"
      />

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.id} variants={staggerItem}>
            <Card className="h-full transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                {/* Quote icon */}
                <Quote className="text-primary/20 mb-4 h-8 w-8" />

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < testimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-muted-foreground mb-6">
                  {testimonial.content}
                </p>

                {/* Author info */}
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                    <span className="text-primary text-lg font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
