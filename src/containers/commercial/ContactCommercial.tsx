import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react'

const ContactCommercial: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Prepare WhatsApp message with form data
    const whatsappMessage = `
*Nova Solicitação de Orçamento*
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}
Empresa: ${formData.company}
Tipo de Projeto: ${formData.projectType}
Orçamento: ${formData.budget}
Mensagem: ${formData.message}
    `.trim()

    const whatsappNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55718174-7099'
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="bg-gray-50 py-20 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Vamos conversar sobre seu projeto
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Entre em contato para discutir suas necessidades e receber um
            orçamento personalizado.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-1"
          >
            {/* Contact Methods */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
              <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Informações de Contato
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:jeferson@jefersonreis.dev"
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      E-mail
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      jeferson@jefersonreis.dev
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55718174-7099'}`}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 transition-colors group-hover:bg-green-200 dark:bg-green-900/30 dark:group-hover:bg-green-900/50">
                    <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      WhatsApp
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
                        '+55 71 8174-7099'}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Localização
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Salvador, Bahia, Brasil
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <Clock className="mb-4 h-8 w-8" />
              <h4 className="mb-2 font-bold">Resposta Rápida</h4>
              <p className="text-sm text-blue-100">
                Respondemos todas as mensagens em até 24 horas úteis.
              </p>
            </div>

            {/* FAQ Link */}
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
              <MessageSquare className="mb-4 h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
                Perguntas Frequentes
              </h4>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Encontre respostas rápidas para suas dúvidas.
              </p>
              <button
                onClick={() => {
                  const faqSection = document.getElementById('faq')
                  faqSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Ver FAQ →
              </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="(71) 8174-7099"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Nome da empresa"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label
                    htmlFor="projectType"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tipo de Projeto *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="Site Institucional">
                      Site Institucional
                    </option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Aplicação Web">Aplicação Web</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Consultoria">Consultoria</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Orçamento Estimado
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="R$ 2.000 - R$ 5.000">
                      R$ 2.000 - R$ 5.000
                    </option>
                    <option value="R$ 5.000 - R$ 10.000">
                      R$ 5.000 - R$ 10.000
                    </option>
                    <option value="R$ 10.000 - R$ 20.000">
                      R$ 10.000 - R$ 20.000
                    </option>
                    <option value="Acima de R$ 20.000">
                      Acima de R$ 20.000
                    </option>
                    <option value="A definir">A definir</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="Descreva seu projeto e objetivos..."
                />
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="group flex w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl md:w-auto"
                >
                  Enviar Mensagem
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactCommercial
