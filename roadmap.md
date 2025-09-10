# PROMPT COMPLETO PARA CLAUDE CODE - OTIMIZAÇÃO PORTFOLIO COMERCIAL

## 🎯 CONTEXTO E OBJETIVO

Você está analisando o portfolio de Jeferson Reis (jefersonreis.dev), um desenvolvedor full-stack de 19 anos especializado em IA. O objetivo é transformar este portfolio técnico em uma MÁQUINA DE CONVERSÃO para capturar clientes pagantes através de campanhas Google Ads e Meta Ads.

**SERVIÇOS E PREÇOS ATUAIS:**

- Landing Page: R$ 800 - 1.500 (prazo: 5-7 dias)
- Site Profissional: R$ 2.000 - 2.500 (prazo: 10-15 dias)
- IA + WhatsApp: R$ 3.500 - 4.000 (prazo: 10-15 dias)
- App Mobile: R$ 7.000 - 8.000 (prazo: 30-45 dias)
- SaaS: R$ 6.000+ (prazo: 20-30 dias)

**ORÇAMENTO MARKETING:** R$ 150/mês para ads
**LOCALIZAÇÃO:** Camaçari, Bahia, Brasil
**WHATSAPP:** (75) 99999-9999 (SUBSTITUA pelo número real)

---

## 📋 ANÁLISE E IMPLEMENTAÇÃO COMPLETA

### TAREFA 1: ANÁLISE INICIAL DO SITE ATUAL

1. **Examine toda a estrutura do site atual:**
   - Quais páginas existem?
   - Qual o design/framework utilizado?
   - Tem sistema de roteamento?
   - Tem formulários de contato?
   - Tem analytics configurado?

2. **Identifique pontos fracos para conversão:**
   - Falta de CTAs claros?
   - Ausência de preços?
   - Sem formulário qualificador?
   - Projetos não comercializados?
   - Falta de depoimentos?

### TAREFA 2: OTIMIZAR PÁGINA PRINCIPAL (/)

**2.1 HERO SECTION OTIMIZADA**

Substitua ou melhore a seção hero atual com:

```jsx
// Componente Hero otimizado para conversão
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          Desenvolvedor Full-Stack
          <br />
          <span className="text-yellow-400">Especialista em IA</span>
        </h1>
        <p className="mb-8 text-xl opacity-90 md:text-2xl">
          Sites que <strong>VENDEM</strong> + Automações que{' '}
          <strong>ECONOMIZAM</strong> seu tempo
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <span className="rounded-full bg-white/20 px-4 py-2">
            19 anos, mentalidade sênior
          </span>
          <span className="rounded-full bg-white/20 px-4 py-2">
            React • Node • Python • IA
          </span>
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() =>
              document
                .getElementById('contato')
                .scrollIntoView({ behavior: 'smooth' })
            }
            className="rounded-lg bg-yellow-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-yellow-600"
          >
            Quero uma Proposta Personalizada 🚀
          </button>
          <button
            onClick={() =>
              document
                .getElementById('servicos')
                .scrollIntoView({ behavior: 'smooth' })
            }
            className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-blue-800"
          >
            Ver Serviços e Preços
          </button>
        </div>
        <p className="mt-4 text-sm opacity-75">
          ⚡ Resposta em até 2 horas • 💡 Orçamento sem compromisso
        </p>
      </div>
    </section>
  )
}
```

**2.2 SEÇÃO DE SERVIÇOS COMERCIAIS**

Adicione nova seção após o portfolio existente:

```jsx
const ServicosComerciais = () => {
  const servicos = [
    {
      id: 'landing',
      icon: '🚀',
      titulo: 'Landing Page',
      preco: 'R$ 800 - 1.500',
      prazo: '5-7 dias',
      descricao: 'Página que converte visitantes em clientes',
      beneficios: [
        'Design que converte',
        'Mobile perfect',
        'WhatsApp integrado',
        'SEO básico',
      ],
      popular: false,
    },
    {
      id: 'site',
      icon: '🌐',
      titulo: 'Site Profissional',
      preco: 'R$ 2.000 - 2.500',
      prazo: '10-15 dias',
      descricao: 'Presença digital completa para sua empresa',
      beneficios: [
        'Até 8 páginas',
        'Design exclusivo',
        'SEO avançado',
        'Blog integrado',
      ],
      popular: true,
    },
    {
      id: 'ia',
      icon: '🤖',
      titulo: 'IA + WhatsApp',
      preco: 'R$ 3.500 - 4.000',
      prazo: '10-15 dias',
      descricao: 'Chatbot que vende 24/7 automaticamente',
      beneficios: [
        'Atendimento 24h',
        'Qualifica leads',
        'Agenda reuniões',
        'CRM incluído',
      ],
      popular: false,
    },
    {
      id: 'app',
      icon: '📱',
      titulo: 'App Mobile',
      preco: 'R$ 7.000 - 8.000',
      prazo: '30-45 dias',
      descricao: 'Aplicativo nativo iOS + Android',
      beneficios: [
        'iOS + Android',
        'Design UI/UX',
        'Backend incluído',
        'Publicação lojas',
      ],
      popular: false,
    },
  ]

  return (
    <section id="servicos" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Como posso ajudar seu negócio
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {servicos.map((servico) => (
            <div
              key={servico.id}
              className={`relative rounded-xl bg-white p-6 shadow-lg ${
                servico.popular ? 'border-2 border-blue-500' : 'border'
              }`}
            >
              {servico.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                  <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-white">
                    MAIS POPULAR
                  </span>
                </div>
              )}
              <div className="mb-4 text-center">
                <div className="mb-3 text-3xl">{servico.icon}</div>
                <h3 className="text-xl font-bold">{servico.titulo}</h3>
              </div>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                {servico.beneficios.map((beneficio, index) => (
                  <li key={index}>✓ {beneficio}</li>
                ))}
              </ul>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-blue-600">
                  {servico.preco}
                </div>
                <div className="mb-4 text-sm text-gray-500">
                  Entrega: {servico.prazo}
                </div>
                <button
                  onClick={() => openModalOrcamento(servico.id)}
                  className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
                >
                  Solicitar Orçamento
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**2.3 TRANSFORMAR PROJETOS EM CASES COMERCIAIS**

Modifique a seção de portfolio existente para incluir:

```jsx
const ProjetoComercial = ({ projeto }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
      <div className="relative">
        <img
          src={projeto.imagem}
          alt={projeto.titulo}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-4 right-4 rounded-full bg-green-500 px-3 py-1 text-sm font-bold text-white">
          {projeto.resultado}
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{projeto.titulo}</h3>
        <p className="mb-4 text-gray-600">{projeto.descricao}</p>

        <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Cliente:</strong> {projeto.cliente}
          </div>
          <div>
            <strong>Prazo:</strong> {projeto.prazo}
          </div>
          <div>
            <strong>Investimento:</strong> {projeto.investimento}
          </div>
          <div>
            <strong>Resultado:</strong> {projeto.resultado}
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          {projeto.tecnologias.map((tech) => (
            <span key={tech} className="rounded bg-gray-100 px-2 py-1 text-xs">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <button className="flex-1 rounded bg-gray-200 py-2 text-gray-800 transition hover:bg-gray-300">
            Ver Detalhes
          </button>
          <button
            onClick={() => openModalOrcamento('similar')}
            className="flex-1 rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          >
            Quero Similar
          </button>
        </div>
      </div>
    </div>
  )
}

// Dados dos projetos (SUBSTITUA pelos projetos reais)
const projetos = [
  {
    titulo: 'E-commerce Moda',
    cliente: 'Loja feminina',
    descricao: 'Site completo com sistema de vendas e automações',
    resultado: '+200% vendas',
    prazo: '15 dias',
    investimento: 'R$ 2.500',
    tecnologias: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    imagem: '/projetos/ecommerce-moda.jpg', // ADICIONE imagens reais
  },
  {
    titulo: 'Clínica Odontológica IA',
    cliente: 'Clínica dental',
    descricao: 'Chatbot WhatsApp que agenda consultas automaticamente',
    resultado: '+300% agendamentos',
    prazo: '12 dias',
    investimento: 'R$ 3.800',
    tecnologias: ['Python', 'WhatsApp API', 'IA', 'CRM'],
    imagem: '/projetos/clinica-ia.jpg',
  },
  {
    titulo: 'App Delivery Local',
    cliente: 'Restaurante',
    descricao: 'Aplicativo completo para delivery com pagamento integrado',
    resultado: '5.000+ downloads',
    prazo: '35 dias',
    investimento: 'R$ 7.500',
    tecnologias: ['React Native', 'Node.js', 'MongoDB', 'PayPal'],
    imagem: '/projetos/app-delivery.jpg',
  },
]
```

### TAREFA 3: FORMULÁRIO QUALIFICADOR AVANÇADO

Implemente um sistema completo de captura e qualificação de leads:

```jsx
const FormularioOrcamento = () => {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    empresa: '',
    tipoServico: '',
    descricaoProjeto: '',
    orcamento: '',
    prazo: '',
    temSite: '',
    temLogo: '',
    objetivoPrincipal: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Analytics tracking
    gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID',
      value: getValueByService(formData.tipoServico),
      currency: 'BRL',
    })

    fbq('track', 'Lead', {
      value: getValueByService(formData.tipoServico),
      currency: 'BRL',
    })

    // Enviar para backend/CRM
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'website',
          timestamp: new Date().toISOString(),
        }),
      })

      // Redirect para WhatsApp com dados preenchidos
      const whatsappMessage = `Olá! Acabei de preencher o formulário no seu site.

📋 Dados do projeto:
Nome: ${formData.nome}
Empresa: ${formData.empresa}
Serviço: ${formData.tipoServico}
Orçamento: ${formData.orcamento}
Prazo: ${formData.prazo}

Descrição: ${formData.descricaoProjeto}

Pode fazer uma proposta personalizada?`

      const whatsappURL = `https://wa.me/5575999999999?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappURL, '_blank')

      // Mostrar mensagem de sucesso
      setShowSuccess(true)
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      alert(
        'Erro ao enviar. Tente novamente ou chame no WhatsApp: (75) 99999-9999',
      )
    }
  }

  return (
    <section id="contato" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            Solicitar Orçamento Personalizado
          </h2>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-white p-8 shadow-lg"
          >
            {/* Dados Básicos */}
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="(75) 99999-9999"
                />
              </div>
            </div>

            {/* E-mail e Empresa */}
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Empresa/Negócio
                </label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) =>
                    setFormData({ ...formData, empresa: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  placeholder="Nome da sua empresa"
                />
              </div>
            </div>

            {/* Tipo de Serviço */}
            <div className="mb-6">
              <label className="mb-2 block font-semibold text-gray-700">
                Tipo de Projeto *
              </label>
              <select
                required
                value={formData.tipoServico}
                onChange={(e) =>
                  setFormData({ ...formData, tipoServico: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Selecione uma opção</option>
                <option value="landing">Landing Page (R$ 800-1.500)</option>
                <option value="site">Site Profissional (R$ 2.000-2.500)</option>
                <option value="ia">IA + WhatsApp (R$ 3.500-4.000)</option>
                <option value="app">App Mobile (R$ 7.000-8.000)</option>
                <option value="saas">Sistema SaaS (R$ 6.000+)</option>
                <option value="outro">Outro projeto</option>
              </select>
            </div>

            {/* Orçamento e Prazo */}
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Orçamento Disponível
                </label>
                <select
                  value={formData.orcamento}
                  onChange={(e) =>
                    setFormData({ ...formData, orcamento: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Prefiro não informar</option>
                  <option value="ate-1500">Até R$ 1.500</option>
                  <option value="1500-3000">R$ 1.500 - R$ 3.000</option>
                  <option value="3000-5000">R$ 3.000 - R$ 5.000</option>
                  <option value="5000-8000">R$ 5.000 - R$ 8.000</option>
                  <option value="8000+">Acima de R$ 8.000</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Prazo Desejado
                </label>
                <select
                  value={formData.prazo}
                  onChange={(e) =>
                    setFormData({ ...formData, prazo: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Não tenho pressa</option>
                  <option value="urgente">Urgente (até 7 dias)</option>
                  <option value="rapido">Rápido (15 dias)</option>
                  <option value="normal">Normal (30 dias)</option>
                  <option value="flexivel">Flexível (foco na qualidade)</option>
                </select>
              </div>
            </div>

            {/* Perguntas Qualificadoras */}
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Já tem site atual?
                </label>
                <select
                  value={formData.temSite}
                  onChange={(e) =>
                    setFormData({ ...formData, temSite: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim (quero melhorar)</option>
                  <option value="nao">Não (primeiro site)</option>
                  <option value="basico">Sim, mas muito básico</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Tem logo e materiais?
                </label>
                <select
                  value={formData.temLogo}
                  onChange={(e) =>
                    setFormData({ ...formData, temLogo: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="completo">Sim, tenho tudo</option>
                  <option value="basico">Tenho logo, falta conteúdo</option>
                  <option value="nada">Não tenho nada</option>
                </select>
              </div>
            </div>

            {/* Objetivo Principal */}
            <div className="mb-6">
              <label className="mb-2 block font-semibold text-gray-700">
                Objetivo Principal
              </label>
              <select
                value={formData.objetivoPrincipal}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    objetivoPrincipal: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Selecione o objetivo</option>
                <option value="vendas">Aumentar vendas online</option>
                <option value="leads">Capturar mais leads</option>
                <option value="credibilidade">Melhorar credibilidade</option>
                <option value="automatizar">Automatizar processos</option>
                <option value="expandir">Expandir o negócio</option>
                <option value="outro">Outro objetivo</option>
              </select>
            </div>

            {/* Descrição do Projeto */}
            <div className="mb-6">
              <label className="mb-2 block font-semibold text-gray-700">
                Descreva seu projeto
              </label>
              <textarea
                rows="4"
                value={formData.descricaoProjeto}
                onChange={(e) =>
                  setFormData({ ...formData, descricaoProjeto: e.target.value })
                }
                placeholder="Conte-me mais sobre o que você precisa, suas expectativas e qualquer detalhe importante..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Solicitar Proposta Personalizada 🚀
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              📱 Ou chame direto no WhatsApp:
              <a
                href="https://wa.me/5575999999999"
                className="font-semibold text-blue-600 hover:underline"
                target="_blank"
              >
                (75) 99999-9999
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
```

### TAREFA 4: CRIAR LANDING PAGES ESPECÍFICAS

Crie arquivos separados para cada serviço:

**4.1 /servicos/landing-page.jsx**
**4.2 /servicos/site-profissional.jsx**
**4.3 /servicos/automacao-ia.jsx**
**4.4 /servicos/app-mobile.jsx**

Cada uma deve seguir a estrutura da landing page que criei anteriormente, mas personalizada para o serviço específico.

### TAREFA 5: SISTEMA DE ANALYTICS E TRACKING

**5.1 Google Analytics 4**

```jsx
// components/Analytics.jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Analytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return null;
};

export default Analytics;

// Adicionar no _app.jsx ou _document.jsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: window.location.pathname,
      });
    `,
  }}
/>
```

**5.2 Facebook Pixel**

```jsx
// components/FacebookPixel.jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const FacebookPixel = () => {
  const router = useRouter()

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('YOUR_PIXEL_ID')
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  return null
}

export default FacebookPixel
```

**5.3 Eventos de Conversão**

```jsx
// utils/tracking.js
export const trackLead = (serviceType, value) => {
  // Google Analytics
  gtag('event', 'generate_lead', {
    currency: 'BRL',
    value: value,
    service_type: serviceType,
  })

  // Google Ads
  gtag('event', 'conversion', {
    send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
    value: value,
    currency: 'BRL',
  })

  // Facebook Pixel
  fbq('track', 'Lead', {
    value: value,
    currency: 'BRL',
    content_name: serviceType,
  })
}

export const trackFormStart = (formType) => {
  gtag('event', 'begin_checkout', {
    currency: 'BRL',
    value: 0,
    form_type: formType,
  })

  fbq('track', 'InitiateCheckout')
}

export const trackWhatsAppClick = (source) => {
  gtag('event', 'contact_whatsapp', {
    source: source,
  })

  fbq('track', 'Contact')
}
```

### TAREFA 6: SISTEMA DE LEADS E CRM

**6.1 API para Captura de Leads**

```javascript
// pages/api/leads.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const leadData = {
    ...req.body,
    timestamp: new Date().toISOString(),
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
  }

  try {
    // Salvar no banco de dados (Supabase/Firebase/MongoDB)
    // const saved = await saveToDatabase(leadData);

    // Enviar notificação WhatsApp (opcional)
    // await sendWhatsAppNotification(leadData);

    // Enviar email de notificação
    // await sendEmailNotification(leadData);

    // Salvar no Google Sheets como backup
    await saveToGoogleSheets(leadData)

    res.status(200).json({
      success: true,
      message: 'Lead capturado com sucesso',
      leadId: generateLeadId(),
    })
  } catch (error) {
    console.error('Erro ao processar lead:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    })
  }
}

async function saveToGoogleSheets(leadData) {
  // Implementar integração com Google Sheets
  const sheets = google.sheets({ version: 'v4', auth: serviceAccountAuth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: 'YOUR_SHEET_ID',
    range: 'Leads!A:Z',
    valueInputOption: 'RAW',
    resource: {
      values: [
        [
          leadData.timestamp,
          leadData.nome,
          leadData.whatsapp,
          leadData.email,
          leadData.empresa,
          leadData.tipoServico,
          leadData.orcamento,
          leadData.prazo,
          leadData.descricaoProjeto,
          leadData.source,
        ],
      ],
    },
  })
}
```

**6.2 Dashboard Simples de Leads**

```jsx
// pages/admin/leads.jsx (proteger com autenticação)
const LeadsDashboard = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads')
      const data = await response.json()
      setLeads(data.leads)
    } catch (error) {
      console.error('Erro ao buscar leads:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard de Leads</h1>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold">Total de Leads</h3>
          <div className="text-3xl font-bold text-blue-600">{leads.length}</div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold">Este Mês</h3>
          <div className="text-3xl font-bold text-green-600">
            {leads.filter((lead) => isThisMonth(lead.timestamp)).length}
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold">Valor Potencial</h3>
          <div className="text-3xl font-bold text-purple-600">
            R$ {calculatePotentialValue(leads).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Data</th>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Serviço</th>
              <th className="px-6 py-3 text-left">Orçamento</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t">
                <td className="px-6 py-4">{formatDate(lead.timestamp)}</td>
                <td className="px-6 py-4 font-medium">{lead.nome}</td>
                <td className="px-6 py-4">{lead.tipoServico}</td>
                <td className="px-6 py-4">{lead.orcamento}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
                    Novo
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    className="text-green-600 hover:text-green-800"
                  >
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

### TAREFA 7: SEO E PERFORMANCE

**7.1 Meta Tags Otimizadas**

```jsx
// components/SEOHead.jsx
import Head from 'next/head'

const SEOHead = ({
  title = 'Jeferson Reis - Desenvolvedor Full-Stack | Sites que Vendem',
  description = 'Desenvolvedor Full-Stack especialista em IA. Sites que convertem, automações inteligentes e apps móveis. Portfolio comprovado, resultados reais.',
  keywords = 'desenvolvedor full stack, sites que vendem, automação IA, app mobile, landing page, react developer, bahia',
  canonical = 'https://jefersonreis.dev',
  ogImage = 'https://jefersonreis.dev/og-image.jpg',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Jeferson Reis" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Jeferson Reis',
            jobTitle: 'Desenvolvedor Full-Stack',
            description: 'Especialista em desenvolvimento web, IA e automações',
            url: 'https://jefersonreis.dev',
            sameAs: [
              'https://linkedin.com/in/jefersonreis',
              'https://github.com/jefersonreis',
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Camaçari',
              addressRegion: 'BA',
              addressCountry: 'BR',
            },
            offers: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Desenvolvimento de Landing Pages',
                  description:
                    'Landing pages que convertem visitantes em clientes',
                },
                price: '800-1500',
                priceCurrency: 'BRL',
              },
            ],
          }),
        }}
      />
    </Head>
  )
}
```

**7.2 Otimizações de Performance**

```jsx
// components/ImageOptimized.jsx
import Image from 'next/image'

const ImageOptimized = ({ src, alt, ...props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7/2Q=="
      {...props}
    />
  )
}
```

### TAREFA 8: CONFIGURAR CAMPANHAS GOOGLE ADS

**8.1 Estrutura de URLs para Tracking**

Crie um sistema de UTM parameters:

```javascript
// utils/utm.js
export const generateUTMUrl = (
  baseUrl,
  source,
  medium,
  campaign,
  term = '',
  content = '',
) => {
  const url = new URL(baseUrl)
  url.searchParams.set('utm_source', source)
  url.searchParams.set('utm_medium', medium)
  url.searchParams.set('utm_campaign', campaign)
  if (term) url.searchParams.set('utm_term', term)
  if (content) url.searchParams.set('utm_content', content)
  return url.toString()
}

// Exemplos de URLs para Google Ads:
// jefersonreis.dev/servicos/landing-page?utm_source=google&utm_medium=cpc&utm_campaign=landing_pages&utm_term=landing_page_profissional
// jefersonreis.dev/servicos/site-profissional?utm_source=google&utm_medium=cpc&utm_campaign=sites_profissionais&utm_term=criar_site_empresa
```

**8.2 Landing Pages Específicas para Ads**

Para cada palavra-chave, criar URL específica:

- `/google-ads/desenvolvedor-freelancer`
- `/google-ads/criar-site-profissional`
- `/google-ads/landing-page-conversao`
- `/google-ads/automacao-whatsapp`

### TAREFA 9: IMPLEMENTAR CHAT/SUPORTE

```jsx
// components/ChatWidget.jsx
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const quickMessages = [
    'Quero um orçamento',
    'Quanto custa um site?',
    'Prazo para landing page?',
    'Como funciona a IA?',
  ]

  const sendToWhatsApp = (msg) => {
    const whatsappUrl = `https://wa.me/5575999999999?text=${encodeURIComponent(msg)}`
    window.open(whatsappUrl, '_blank')
    trackWhatsAppClick('chat_widget')
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 rounded-full bg-green-500 p-4 text-white shadow-lg transition hover:bg-green-600"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.53 4.036 1.462 5.749L0 24l6.441-1.687c1.634.85 3.491 1.334 5.576 1.334 6.621 0 11.987-5.367 11.987-11.987C23.987 5.339 18.638.001 12.017.001z" />
        </svg>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed right-6 bottom-24 z-50 w-80 rounded-lg border bg-white shadow-xl">
          <div className="rounded-t-lg bg-green-500 p-4 text-white">
            <h3 className="font-semibold">💬 Fale com Jeferson</h3>
            <p className="text-sm opacity-90">Resposta em até 2 horas</p>
          </div>

          <div className="p-4">
            <p className="mb-4 text-gray-700">Oi! Como posso ajudar?</p>

            <div className="mb-4 space-y-2">
              {quickMessages.map((msg) => (
                <button
                  key={msg}
                  onClick={() => sendToWhatsApp(msg)}
                  className="w-full rounded bg-gray-100 p-2 text-left text-sm transition hover:bg-gray-200"
                >
                  {msg}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 rounded border px-3 py-2 focus:border-green-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && sendToWhatsApp(message)}
              />
              <button
                onClick={() => sendToWhatsApp(message)}
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
```

### TAREFA 10: TESTES E OTIMIZAÇÃO

**10.1 Configurar A/B Tests**

```jsx
// hooks/useABTest.js
import { useState, useEffect } from 'react'

export const useABTest = (testName, variants) => {
  const [variant, setVariant] = useState(null)

  useEffect(() => {
    const savedVariant = localStorage.getItem(`ab_test_${testName}`)

    if (savedVariant && variants.includes(savedVariant)) {
      setVariant(savedVariant)
    } else {
      const randomVariant =
        variants[Math.floor(Math.random() * variants.length)]
      setVariant(randomVariant)
      localStorage.setItem(`ab_test_${testName}`, randomVariant)

      // Track experiment
      gtag('event', 'experiment_impression', {
        experiment_id: testName,
        variant_id: randomVariant,
      })
    }
  }, [testName, variants])

  return variant
}

// Exemplo de uso:
const HeroSection = () => {
  const variant = useABTest('hero_headline', ['A', 'B'])

  const headlines = {
    A: 'Desenvolvedor Full-Stack Especialista em IA',
    B: 'Sites que Vendem + Automações Inteligentes',
  }

  return <h1>{headlines[variant]}</h1>
}
```

---

## 🎯 CHECKLIST DE IMPLEMENTAÇÃO

### ✅ PRIORIDADE MÁXIMA (Implementar HOJE):

- [ ] Hero section otimizada
- [ ] Seção de serviços comerciais com preços
- [ ] Formulário qualificador completo
- [ ] Google Analytics + Facebook Pixel
- [ ] Sistema básico de captura de leads
- [ ] Chat widget WhatsApp

### ✅ PRIORIDADE ALTA (Esta semana):

- [ ] Landing pages específicas por serviço
- [ ] Transformar portfolio em cases comerciais
- [ ] Sistema de tracking de conversões
- [ ] Depoimentos e social proof
- [ ] Mobile optimization completo

### ✅ PRIORIDADE MÉDIA (Próximas 2 semanas):

- [ ] Dashboard de leads
- [ ] Sistema de A/B testing
- [ ] API de leads + notificações
- [ ] SEO completo
- [ ] Performance optimization

### ✅ CONFIGURAÇÕES OBRIGATÓRIAS:

- [ ] Trocar número WhatsApp: 5575999999999 → número real
- [ ] Configurar Google Analytics ID
- [ ] Configurar Facebook Pixel ID
- [ ] Configurar Google Ads Conversion IDs
- [ ] Adicionar imagens reais dos projetos
- [ ] Atualizar depoimentos com clientes reais

---

## 🚀 PRÓXIMOS PASSOS APÓS IMPLEMENTAÇÃO

1. **Testar** tudo em dispositivos móveis
2. **Configurar** campanhas Google Ads com URLs específicas
3. **Criar** conta Google Tag Manager
4. **Implementar** remarketing Facebook
5. **Configurar** Google Search Console
6. **Otimizar** velocidade de carregamento
7. **Criar** backup automático dos leads
8. **Monitorar** métricas de conversão diariamente

---

**IMPORTANTE:** Após implementar, teste TODOS os formulários, tracking e integrações. O sucesso das campanhas depende de cada pixel funcionando perfeitamente.
