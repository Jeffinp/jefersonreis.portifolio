'use client'

import { motion } from 'framer-motion'
import { SectionWrapper, SectionHeader } from '@/components/common'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { services, formatPrice } from '@/data'
import { staggerContainer, staggerItem } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export function ServicesSection() {
  return (
    <SectionWrapper id="services" animate={false}>
      <SectionHeader
        subtitle="Serviços"
        title="Soluções Sob Medida"
        description="Escolha o serviço ideal para o seu projeto e objetivos de negócio"
      />

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={staggerItem}>
            <Card className="group hover:border-primary/50 h-full transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex items-start justify-between">
                  <div className="bg-primary/10 rounded-lg p-3 text-4xl">
                    {service.icon}
                  </div>
                  {service.popular && <Badge variant="default">Popular</Badge>}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-muted-foreground mb-2 text-sm font-medium">
                    Inclui:
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <ArrowRight className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-4">
                  <div className="mb-4">
                    {service.price ? (
                      <>
                        <span className="text-muted-foreground text-sm">
                          A partir de
                        </span>
                        <div className="text-3xl font-bold">
                          {formatPrice(
                            service.price.from,
                            service.price.currency
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-2xl font-bold">Sob Consulta</div>
                    )}
                  </div>
                  <Button
                    className="w-full"
                    variant={service.popular ? 'default' : 'outline'}
                  >
                    Solicitar Orçamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
