'use client'

import { motion } from 'framer-motion'
import { SectionWrapper, SectionHeader } from '@/components/common'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/data'
import { staggerContainer, staggerItem } from '@/lib/utils'

export function FAQSection() {
  return (
    <SectionWrapper id="faq" animate={false}>
      <SectionHeader
        subtitle="FAQ"
        title="Perguntas Frequentes"
        description="Respostas para as dúvidas mais comuns sobre meus serviços"
      />

      <motion.div
        className="mx-auto max-w-3xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <motion.div key={faq.id} variants={staggerItem}>
              <AccordionItem value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </SectionWrapper>
  )
}
