import type { NextApiRequest, NextApiResponse } from 'next'

interface LeadData {
  nome: string
  whatsapp: string
  email: string
  empresa?: string
  tipoServico: string
  descricaoProjeto?: string
  orcamento?: string
  prazo?: string
  temSite?: string
  temLogo?: string
  objetivoPrincipal?: string
  comoConheceu?: string
  urgencia?: string
  decisor?: string
  source: string
  timestamp: string
}

interface ApiResponse {
  success: boolean
  message: string
  leadId?: string
  error?: string
}

// Função para gerar ID único para o lead
const generateLeadId = (): string => {
  return `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Função para salvar no Google Sheets (implementar depois se necessário)
async function saveToGoogleSheets(leadData: LeadData): Promise<void> {
  // TODO: Implementar integração com Google Sheets API
  console.log('Lead data to save:', leadData)
}

// Função para enviar notificação por email (implementar depois se necessário)
async function sendEmailNotification(leadData: LeadData): Promise<void> {
  // TODO: Implementar envio de email
  console.log('Email notification for:', leadData)
}

// Função para enviar notificação WhatsApp (implementar depois se necessário)
async function sendWhatsAppNotification(leadData: LeadData): Promise<void> {
  // TODO: Implementar integração com WhatsApp Business API
  console.log('WhatsApp notification for:', leadData)
}

// Função para salvar no banco de dados local (JSON temporário)
async function saveToDatabase(
  leadData: LeadData & { leadId: string },
): Promise<void> {
  // Em produção, usar um banco de dados real (Supabase, Firebase, MongoDB, etc.)
  // Por enquanto, vamos apenas logar
  console.log('Saving lead to database:', leadData)

  // Se você quiser salvar em um arquivo JSON temporário (apenas desenvolvimento)
  if (process.env.NODE_ENV === 'development') {
    const fs = await import('fs').then((m) => m.promises)
    const path = await import('path')

    try {
      const leadsFile = path.join(process.cwd(), 'leads.json')
      let leads = []

      try {
        const fileContent = await fs.readFile(leadsFile, 'utf-8')
        leads = JSON.parse(fileContent)
      } catch (error) {
        // File doesn't exist yet, will create new one
      }

      leads.push(leadData)
      await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2))
    } catch (error) {
      console.error('Error saving to file:', error)
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  try {
    // Validate required fields
    const requiredFields = ['nome', 'whatsapp', 'email', 'tipoServico']
    const missingFields = requiredFields.filter((field) => !req.body[field])

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      })
    }

    // Generate lead ID
    const leadId = generateLeadId()

    // Prepare lead data
    const leadData: LeadData & {
      leadId: string
      ip?: string
      userAgent?: string
    } = {
      leadId,
      ...req.body,
      timestamp: new Date().toISOString(),
      ip:
        (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    }

    // Save to database
    await saveToDatabase(leadData)

    // Send notifications (async, don't wait)
    Promise.all([
      saveToGoogleSheets(leadData),
      sendEmailNotification(leadData),
      sendWhatsAppNotification(leadData),
    ]).catch((error) => {
      console.error('Error sending notifications:', error)
    })

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Lead captured successfully',
      leadId,
    })
  } catch (error) {
    console.error('Error processing lead:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
}

// Export config to handle larger payloads if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
