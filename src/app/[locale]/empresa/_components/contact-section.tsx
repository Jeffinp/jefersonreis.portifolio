'use client'

import { useState, FormEvent } from 'react'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { trackFormStart, trackFormSubmit } from '@/lib/utils/tracking'

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
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    trackFormStart('contact_empresa')

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
      trackFormSubmit('contact_empresa', true, data)
      e.currentTarget.reset()

      // Reset success message after 5s
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Erro ao enviar mensagem empresa', error)
      setStatus('error')
      trackFormSubmit('contact_empresa', false, data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeader
        subtitle="Entre em Contato"
        title="Vamos Trabalhar Juntos"
        description="Tem um projeto em mente? Adoraria ouvir sobre ele!"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Informações de Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-primary h-5 w-5" />
                <a
                  href="mailto:jefersonreisalmeida8356@gmail.com"
                  className="hover:text-primary transition-colors hover:underline"
                >
                  jefersonreisalmeida8356@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary h-5 w-5" />
                <span>+55 (71) 98439-3235</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-primary h-5 w-5" />
                <span>Camaçari, Bahia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Seu nome"
                required
                disabled={isSubmitting}
              />
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
                placeholder="Sua mensagem..."
                rows={5}
                required
                disabled={isSubmitting}
              />
            </div>

            {status === 'success' && (
              <div className="flex items-center gap-2 rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Mensagem enviada com sucesso!
              </div>
            )}

            {status === 'error' && (
              <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                Erro ao enviar mensagem. Tente novamente.
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
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
