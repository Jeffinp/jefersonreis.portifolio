# 🚀 ROADMAP - TRANSFORMAÇÃO COMERCIAL DO PORTFOLIO

## 📋 RESUMO EXECUTIVO

Transformamos seu portfolio técnico em uma **máquina de vendas** otimizada para capturar clientes através de Google Ads e Meta Ads. Com investimento de R$ 150/mês em ads, a meta é gerar 5-10 leads qualificados por mês.

---

## 🎯 COMO ACESSAR E TESTAR

### 1. **INICIAR O SERVIDOR DE DESENVOLVIMENTO**

```bash
npm run dev
```

### 2. **ACESSAR AS PÁGINAS**

#### **Portfolio com Modo Comercial (Página Principal)**

```
http://localhost:3000?mode=commercial
```

- Hero otimizada com preços
- Seção de serviços com valores
- Chat Widget WhatsApp
- Formulário qualificador

#### **Landing Page Específica para Ads**

```
http://localhost:3000/lp/site-profissional
```

- Página focada em conversão
- Ideal para campanhas Google Ads
- Form modal integrado
- FAQ e depoimentos

---

## 🛠️ O QUE FOI IMPLEMENTADO

### ✅ **COMPONENTES COMERCIAIS**

| Componente             | Localização                                  | Função                         |
| ---------------------- | -------------------------------------------- | ------------------------------ |
| **HeroCommercial**     | `src/containers/HeroCommercial.tsx`          | Hero com preços e CTAs diretos |
| **ServicesCommercial** | `src/containers/ServicesCommercial.tsx`      | Cards de serviços com valores  |
| **LeadQualifierForm**  | `src/components/forms/LeadQualifierForm.tsx` | Form qualificador 3 etapas     |
| **ChatWidget**         | `src/components/ChatWidget.tsx`              | Chat flutuante WhatsApp        |
| **Analytics**          | `src/components/Analytics.tsx`               | Tracking GA4 + Pixel           |

### ✅ **SISTEMA DE TRACKING**

| Arquivo                  | Função                             |
| ------------------------ | ---------------------------------- |
| `src/utils/tracking.ts`  | Funções de rastreamento de eventos |
| `src/pages/api/leads.ts` | API para salvar leads              |
| `.env.local`             | Configurações de ambiente          |

### ✅ **LANDING PAGES**

| URL                     | Arquivo                              | Para usar em               |
| ----------------------- | ------------------------------------ | -------------------------- |
| `/lp/site-profissional` | `src/pages/lp/site-profissional.tsx` | Google Ads - Sites         |
| `/lp/landing-page`      | A criar                              | Google Ads - Landing Pages |
| `/lp/automacao-ia`      | A criar                              | Google Ads - Automação     |

---

## 📱 CONFIGURAÇÃO RÁPIDA DO WHATSAPP

### 1. Abra o arquivo `.env.local`

### 2. Atualize o número:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+55 75 SEU_NUMERO_AQUI
```

### 3. Reinicie o servidor:

```bash
# Ctrl+C para parar
npm run dev
```

---

## 📊 CONFIGURAR ANALYTICS (OBRIGATÓRIO!)

### **GOOGLE ANALYTICS 4**

1. Acesse: https://analytics.google.com
2. Criar Conta > Criar Propriedade
3. Configurar fluxo de dados > Web
4. Copiar ID de Medição (G-XXXXXXXXXX)
5. Colar em `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### **FACEBOOK PIXEL**

1. Acesse: https://business.facebook.com
2. Menu > Eventos > Pixels
3. Criar Pixel > Copiar ID
4. Colar em `.env.local`:

```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXXXXXXX
```

### **GOOGLE ADS**

1. Acesse: https://ads.google.com
2. Ferramentas > Medição > Conversões
3. - Nova conversão > Site
4. Configurar e copiar IDs
5. Colar em `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX/XXXXXXXXXX
```

---

## 🎯 ESTRATÉGIA DE CAMPANHAS (R$ 150/MÊS)

### **DIVISÃO DO BUDGET**

| Canal              | Budget | Objetivo       | CPC Esperado |
| ------------------ | ------ | -------------- | ------------ |
| **Google Ads**     | R$ 100 | Captura direta | R$ 3-5       |
| **Facebook/Insta** | R$ 50  | Remarketing    | R$ 1-3       |

### **CAMPANHAS GOOGLE ADS**

#### **Campanha 1: Sites Profissionais**

- Budget: R$ 50/mês
- Landing: `/lp/site-profissional`
- Palavras-chave:
  - "criar site empresa camaçari"
  - "fazer site profissional bahia"
  - "desenvolvedor site salvador"
- CPC médio: R$ 3,50
- Leads esperados: 3-5/mês

#### **Campanha 2: Landing Pages**

- Budget: R$ 30/mês
- Landing: Portfolio principal
- Palavras-chave:
  - "landing page que converte"
  - "criar landing page barata"
- CPC médio: R$ 2,50
- Leads esperados: 2-3/mês

#### **Campanha 3: Automação WhatsApp**

- Budget: R$ 20/mês
- Landing: Portfolio principal
- Palavras-chave:
  - "chatbot whatsapp empresa"
  - "automação atendimento whatsapp"
- CPC médio: R$ 4,00
- Leads esperados: 1-2/mês

### **CAMPANHAS META (FACEBOOK/INSTAGRAM)**

#### **Campanha 1: Tráfego Inicial**

- Budget: R$ 30/mês
- Objetivo: Tráfego
- Público: Empresários 25-45 anos, Camaçari/Salvador
- Criativo: Carrossel de projetos

#### **Campanha 2: Remarketing**

- Budget: R$ 20/mês
- Objetivo: Conversões
- Público: Visitantes últimos 30 dias
- Criativo: Depoimentos + Oferta

---

## 📝 CHECKLIST DE LANÇAMENTO

### **SEMANA 1 - CONFIGURAÇÃO**

- [ ] Configurar Google Analytics 4
- [ ] Instalar Facebook Pixel
- [ ] Configurar Google Ads conversões
- [ ] Atualizar número WhatsApp em `.env.local`
- [ ] Testar formulário em mobile e desktop
- [ ] Testar Chat Widget
- [ ] Criar conta Google Ads
- [ ] Criar conta Facebook Business

### **SEMANA 2 - CAMPANHAS**

- [ ] Criar campanha Google Ads - Sites
- [ ] Criar campanha Google Ads - Landing Pages
- [ ] Configurar públicos no Facebook
- [ ] Criar anúncios no Facebook/Instagram
- [ ] Configurar remarketing
- [ ] Instalar Google Tag Manager

### **SEMANA 3 - OTIMIZAÇÃO**

- [ ] Analisar primeiros resultados
- [ ] Ajustar lances e orçamentos
- [ ] Criar mais landing pages específicas
- [ ] A/B testing nos anúncios
- [ ] Otimizar palavras-chave negativas

### **SEMANA 4 - ESCALA**

- [ ] Identificar campanhas vencedoras
- [ ] Aumentar budget das melhores
- [ ] Pausar campanhas ruins
- [ ] Criar lookalike audiences
- [ ] Implementar automação de email

---

## 📈 MÉTRICAS PARA ACOMPANHAR

### **DIARIAMENTE**

- Leads capturados
- Custo por lead
- Taxa de conversão
- WhatsApp clicks

### **SEMANALMENTE**

- ROI das campanhas
- Quality Score (Google Ads)
- Relevance Score (Facebook)
- Taxa de bounce

### **MENSALMENTE**

- Vendas fechadas
- Ticket médio
- CAC (Custo de Aquisição)
- LTV (Lifetime Value)

---

## 🔧 TROUBLESHOOTING

### **Problema: Site não carrega**

```bash
# Parar servidor (Ctrl+C)
npm install
npm run dev
```

### **Problema: Chat não aparece**

- Verificar se está em modo comercial
- Adicionar `?mode=commercial` na URL
- Ou no console: `localStorage.setItem('commercialMode', 'true')`

### **Problema: Analytics não trackeia**

- Verificar IDs em `.env.local`
- Instalar extensão Google Tag Assistant
- Verificar no GA4 > Tempo Real

### **Problema: WhatsApp não abre**

- Verificar número em `.env.local`
- Formato: `+55 75 99999-9999`
- Testar: https://wa.me/5575999999999

---

## 🚀 PRÓXIMOS PASSOS (APÓS VALIDAÇÃO)

### **MÊS 2**

- [ ] Criar mais 3 landing pages específicas
- [ ] Implementar CRM (HubSpot free)
- [ ] Adicionar blog para SEO
- [ ] Criar funil de email marketing

### **MÊS 3**

- [ ] Implementar chat com IA
- [ ] Criar área de cliente
- [ ] Sistema de agendamento online
- [ ] Programa de indicação

### **MÊS 6**

- [ ] Escalar para R$ 500/mês em ads
- [ ] Contratar VA para atendimento
- [ ] Criar curso/infoproduto
- [ ] Expandir para outras cidades

---

## 📞 SUPORTE E CONTATO

**Problemas técnicos:**

- Email: jefersonreisalmeida8356@gmail.com
- WhatsApp: (71) 8174-7099

**Documentação:**

- Guia de Otimização: `OPTIMIZATION_GUIDE.md`
- Configuração: `.env.example`
- Este arquivo: `ROADMAP_COMERCIAL.md`

---

## 💡 DICAS DE OURO

1. **Responda leads em < 5 minutos** (taxa de conversão 8x maior)
2. **Use áudio no WhatsApp** (mais pessoal e rápido)
3. **Ofereça desconto para fechar na hora** (10% urgência)
4. **Peça depoimento após entrega** (social proof)
5. **Remarketing é OURO** (custo 70% menor)

---

**LEMBRE-SE:**

> O sucesso não está no tráfego, mas na CONVERSÃO.
> Melhor 10 visitantes que convertem do que 1000 que não compram.

---

**Última atualização:** Dezembro 2024
**Versão:** 1.0.0
**Por:** Jeferson Reis - Full Stack Developer & Growth Hacker 🚀
