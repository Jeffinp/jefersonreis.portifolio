import { NextRequest, NextResponse } from 'next/server'

interface LeadFormData {
  // Dados básicos
  name: string
  whatsapp: string
  email: string
  empresa?: string

  // Projeto
  tipoServico: string
  descricaoProjeto?: string
  orcamento?: string
  prazo?: string

  // Qualificação
  objetivoPrincipal?: string
  temSite?: boolean
  temLogo?: boolean
  urgencia?: string
  decisor?: boolean
  comoConheceu?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadFormData

    // Validação de campos obrigatórios
    const requiredFields = ['name', 'whatsapp', 'email', 'tipoServico']
    const missingFields = requiredFields.filter(
      (field) => !body[field as keyof LeadFormData]
    )

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Campos obrigatórios faltando',
          missing: missingFields,
        },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // Validação de WhatsApp (apenas números, mínimo 10 dígitos)
    const whatsappClean = body.whatsapp.replace(/\D/g, '')
    if (whatsappClean.length < 10) {
      return NextResponse.json({ error: 'WhatsApp inválido' }, { status: 400 })
    }

    // Captura de metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      referer: request.headers.get('referer') || 'direct',
    }

    // Geração de ID único
    const leadId = `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const leadData = {
      id: leadId,
      ...body,
      whatsapp: whatsappClean,
      ...metadata,
      status: 'new',
    }

    // TODO: Implementar integrações reais
    // await saveToGoogleSheets(leadData)
    // await sendEmailNotification(leadData)
    // await sendWhatsAppNotification(leadData)
    // await sendToSlack(leadData)

    // Em desenvolvimento, salva em arquivo local
    if (process.env.NODE_ENV === 'development') {
      console.log('💰 Novo lead capturado:', leadData)
      // Poderia salvar em leads.json se necessário
    } else {
      // Em produção, apenas log (por enquanto)
      console.log('💰 Lead ID:', leadId, 'Tipo:', body.tipoServico)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead registrado com sucesso!',
        leadId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao processar lead:', error)
    return NextResponse.json(
      { error: 'Erro ao processar seu cadastro' },
      { status: 500 }
    )
  }
}

// Rate limiting simples (pode ser melhorado com Redis/Upstash)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  // Limpar cache antigo
  const now = Date.now()
  for (const [key, value] of requestCounts.entries()) {
    if (now > value.resetTime) {
      requestCounts.delete(key)
    }
  }

  const data = requestCounts.get(ip)
  const limit = 10
  const windowMs = 60000 // 1 minuto

  if (!data) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
    return NextResponse.json({ remaining: limit - 1 })
  }

  if (data.count >= limit) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  data.count++
  return NextResponse.json({ remaining: limit - data.count })
}

// Configuração da API Route
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
