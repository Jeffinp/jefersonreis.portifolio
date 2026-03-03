import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData

    // Validação de campos obrigatórios
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // Captura de metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    }

    const contactData = {
      ...body,
      ...metadata,
      id: `CONTACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }

    // TODO: Implementar integrações reais
    // await sendEmailNotification(contactData)
    // await saveToGoogleSheets(contactData)
    // await sendToSlack(contactData)

    // Por enquanto, apenas log
    console.log('📧 Novo contato recebido:', contactData)

    return NextResponse.json(
      {
        success: true,
        message: 'Mensagem enviada com sucesso!',
        id: contactData.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao processar contato:', error)
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem' },
      { status: 500 }
    )
  }
}

// Configuração da API Route
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
