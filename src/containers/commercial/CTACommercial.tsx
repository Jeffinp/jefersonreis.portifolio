import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Clock, Shield } from 'lucide-react'

const CTACommercial: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center text-white"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>Oferta Especial - Vagas Limitadas</span>
          </motion.div>

          {/* Title */}
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Pronto para transformar sua ideia em realidade?
          </h2>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Comece seu projeto hoje e tenha sua solução digital profissional em
            poucas semanas.
          </p>

          {/* Benefits */}
          <div className="mb-10 grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
            >
              <Clock className="mx-auto mb-2 h-8 w-8" />
              <div className="font-semibold">Entrega Rápida</div>
              <div className="text-sm text-blue-100">2-8 semanas</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
            >
              <Shield className="mx-auto mb-2 h-8 w-8" />
              <div className="font-semibold">Garantia Total</div>
              <div className="text-sm text-blue-100">Satisfação garantida</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
            >
              <Sparkles className="mx-auto mb-2 h-8 w-8" />
              <div className="font-semibold">Suporte Premium</div>
              <div className="text-sm text-blue-100">60 dias grátis</div>
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={() => {
                const message =
                  'Olá! Gostaria de solicitar um orçamento para meu projeto.'
                const whatsappNumber =
                  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55718174-7099'
                const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, '_blank')
              }}
              className="group flex transform items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Solicitar Orçamento Grátis
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Agendar Consultoria
            </button>
          </motion.div>

          {/* Urgency */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm text-blue-100"
          >
            ⚡ Apenas 3 vagas disponíveis este mês • Resposta em até 24 horas
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default CTACommercial
