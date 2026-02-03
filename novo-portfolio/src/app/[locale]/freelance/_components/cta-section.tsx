'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { SectionWrapper } from '@/components/common'
import { Button } from '@/components/ui/button'
import { fadeInUp } from '@/lib/utils'

export function CTASection() {
  return (
    <SectionWrapper id="cta" animate={false}>
      <motion.div
        className="glass mx-auto max-w-4xl rounded-2xl p-8 text-center md:p-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
          Pronto Para Começar Seu Projeto?
        </h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
          Entre em contato agora e vamos transformar sua ideia em realidade.
          Respondo em até 24 horas úteis.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a href="#contact">
              <MessageCircle className="mr-2 h-5 w-5" />
              Solicitar Orçamento Gratuito
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#services">
              Ver Serviços
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
