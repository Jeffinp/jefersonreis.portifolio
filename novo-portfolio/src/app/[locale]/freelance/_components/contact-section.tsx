'use client'

import { useState, FormEvent } from 'react'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  trackFormStart,
  trackFormSubmit,
  trackLead,
} from '@/lib/utils/tracking'

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    trackFormStart('contact_freelance')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      trackFormSubmit('contact_freelance', true)
      trackLead('contact', 0)
      e.currentTarget.reset()

      // Reset success message after 5s
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Erro ao enviar mensagem freelance', error)
      setStatus('error')
      trackFormSubmit('contact_freelance', false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeader
        subtitle="Entre em Contato"
        title="Vamos Conversar Sobre Seu Projeto"
        description="Preencha o formulário ou entre em contato diretamente"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Informações de Contato
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:contato@jefersonreis.dev"
                className="hover:text-primary flex items-center gap-3 transition-colors"
              >
                <div className="bg-primary/10 rounded-lg p-3">
                  <Mail className="text-primary h-5 w-5" />
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Email</div>
                  <div className="font-medium">contato@jefersonreis.dev</div>
                </div>
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary flex items-center gap-3 transition-colors"
              >
                <div className="bg-primary/10 rounded-lg p-3">
                  <Phone className="text-primary h-5 w-5" />
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">WhatsApp</div>
                  <div className="font-medium">+55 (11) 99999-9999</div>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-3">
                  <MapPin className="text-primary h-5 w-5" />
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">
                    Localização
                  </div>
                  <div className="font-medium">São Paulo, Brasil</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-6">
            <h4 className="mb-2 font-semibold">Horário de Atendimento</h4>
            <p className="text-muted-foreground text-sm">
              Segunda a Sexta: 9h às 18h
              <br />
              Sábado: 9h às 13h
              <br />
              Respondo emails em até 24h úteis
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="subject">Assunto *</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Sobre o que você quer falar?"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="message">Mensagem *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Descreva seu projeto ou dúvida..."
                rows={5}
                required
                disabled={isSubmitting}
              />
            </div>

            {status === 'success' && (
              <div className="flex items-center gap-2 rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Mensagem enviada! Entrarei em contato em breve.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                Erro ao enviar mensagem. Tente novamente.
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  )
}
