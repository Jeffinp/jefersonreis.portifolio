import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  ShoppingCart,
  Package,
  CheckCircle,
  Building,
  Briefcase,
} from 'lucide-react'

interface Notification {
  id: number
  type: 'users' | 'contact' | 'purchase' | 'view'
  message: string
  icon: React.ElementType
  color: string
}

interface Sale {
  id: number
  product: string
  city: string
  time: string
  customer: string
  company?: string
  value?: string
}

interface SocialProofNotificationsProps {
  maxNotifications?: number
  pauseOnFormFocus?: boolean
  section?: string
}

const SocialProofNotificationsEnhanced: React.FC<SocialProofNotificationsProps> = ({
  maxNotifications = 7,
  pauseOnFormFocus = true,
  section = 'general',
}) => {
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null)
  const [showUsersOnline, setShowUsersOnline] = useState(true)
  const [currentSaleNotification, setCurrentSaleNotification] = useState<Sale | null>(null)
  const [notificationCount, setNotificationCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [userIsActive, setUserIsActive] = useState(true)
  const [timeOnPage, setTimeOnPage] = useState(0)
  const notificationTimeoutRef = useRef<NodeJS.Timeout>()
  const saleTimeoutRef = useRef<NodeJS.Timeout>()

  // Lista de cidades brasileiras com pesos (mais realista)
  const citiesWithWeight = useMemo(
    () => [
      { city: 'São Paulo', weight: 3 },
      { city: 'Rio de Janeiro', weight: 2 },
      { city: 'Salvador', weight: 2 },
      { city: 'Brasília', weight: 2 },
      { city: 'Belo Horizonte', weight: 2 },
      { city: 'Fortaleza', weight: 1 },
      { city: 'Curitiba', weight: 1 },
      { city: 'Recife', weight: 1 },
      { city: 'Porto Alegre', weight: 1 },
      { city: 'Campinas', weight: 1 },
      { city: 'Santos', weight: 1 },
      { city: 'Vitória', weight: 1 },
      { city: 'Florianópolis', weight: 1 },
    ],
    [],
  )

  // Função para escolher cidade com peso
  const getRandomCity = useCallback(() => {
    const expanded = citiesWithWeight.flatMap(({ city, weight }) =>
      Array(weight).fill(city)
    )
    return expanded[Math.floor(Math.random() * expanded.length)]
  }, [citiesWithWeight])

  // Lista de serviços com contexto
  const servicesWithContext = useMemo(
    () => [
      { service: 'Landing Page', price: 'R$ 997', time: '7 dias' },
      { service: 'Site Institucional', price: 'R$ 2.497', time: '15 dias' },
      { service: 'E-commerce', price: 'R$ 4.997', time: '30 dias' },
      { service: 'Automação com IA', price: 'R$ 3.997', time: '20 dias' },
      { service: 'App Mobile', price: 'R$ 9.997', time: '45 dias' },
      { service: 'Dashboard Analytics', price: 'R$ 2.997', time: '15 dias' },
    ],
    [],
  )

  // Clientes com empresas (mais realista)
  const customersWithCompanies = useMemo(
    () => [
      { name: 'João Silva', company: 'Tech Solutions' },
      { name: 'Maria Santos', company: 'Consultoria MS' },
      { name: 'Pedro Oliveira', company: 'Oliveira & Associados' },
      { name: 'Ana Costa', company: 'Costa Marketing' },
      { name: 'Carlos Ferreira', company: 'Ferreira Imports' },
      { name: 'Juliana Lima', company: 'JL Design' },
      { name: 'Roberto Alves', company: 'Alves Engenharia' },
      { name: 'Fernanda Souza', company: 'FS Contabilidade' },
      { name: 'Lucas Pereira', company: 'Pereira Tech' },
      { name: 'Patricia Rodrigues', company: 'PR Advocacia' },
      { name: 'Dr. Marcos Gomes', company: 'Clínica Gomes' },
      { name: 'Camila Martins', company: 'CM Arquitetura' },
      { name: 'Rafael Barbosa', company: 'Barbosa Log' },
      { name: 'Dra. Larissa Campos', company: 'Campos Odonto' },
      { name: 'Bruno Nascimento', company: 'BN Fitness' },
    ],
    [],
  )

  // Rastrear tempo na página
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Detectar atividade do usuário
  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout

    const handleActivity = () => {
      setUserIsActive(true)
      clearTimeout(inactivityTimeout)
      inactivityTimeout = setTimeout(() => {
        setUserIsActive(false)
      }, 30000) // Considera inativo após 30s sem interação
    }

    window.addEventListener('mousemove', handleActivity)
    window.addEventListener('keypress', handleActivity)
    window.addEventListener('scroll', handleActivity)
    window.addEventListener('click', handleActivity)

    return () => {
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('keypress', handleActivity)
      window.removeEventListener('scroll', handleActivity)
      window.removeEventListener('click', handleActivity)
      clearTimeout(inactivityTimeout)
    }
  }, [])

  // Pausar quando formulário está em foco
  useEffect(() => {
    if (!pauseOnFormFocus) return

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        setIsPaused(true)
      }
    }

    const handleBlur = () => {
      setIsPaused(false)
    }

    document.addEventListener('focusin', handleFocus)
    document.addEventListener('focusout', handleBlur)

    return () => {
      document.removeEventListener('focusin', handleFocus)
      document.removeEventListener('focusout', handleBlur)
    }
  }, [pauseOnFormFocus])

  // Gerar número realista de usuários online (baseado em horário)
  useEffect(() => {
    const generateOnlineUsers = () => {
      const hour = new Date().getHours()
      let min, max

      // Variação baseada no horário do dia
      if (hour >= 9 && hour <= 12) {
        min = 120
        max = 180 // Manhã: mais movimento
      } else if (hour >= 14 && hour <= 18) {
        min = 100
        max = 160 // Tarde: movimento médio-alto
      } else if (hour >= 19 && hour <= 22) {
        min = 80
        max = 140 // Noite: movimento médio
      } else {
        min = 40
        max = 80 // Madrugada: menos movimento
      }

      const users = Math.floor(Math.random() * (max - min + 1)) + min
      setOnlineUsers(users)
    }

    generateOnlineUsers()
    const interval = setInterval(generateOnlineUsers, 45000) // Atualiza a cada 45s

    return () => clearInterval(interval)
  }, [])

  // Sistema inteligente de notificações
  const generateSmartNotification = useCallback(() => {
    // Para se já atingiu o limite
    if (notificationCount >= maxNotifications) return
    
    // Para se está pausado ou usuário inativo
    if (isPaused || !userIsActive) return

    const templates = {
      services: [
        {
          type: 'contact' as const,
          icon: MessageSquare,
          color: 'bg-blue-500',
          messages: [
            '{customer} de {city} solicitou orçamento para {service}',
            'Empresa de {city} interessada em {service}',
            'Consulta recebida: {service} - {company}',
          ],
        },
        {
          type: 'view' as const,
          icon: Clock,
          color: 'bg-purple-500',
          messages: [
            '{company} está analisando portfólio',
            'Visitante de {city} há {time} no site',
            'Gestor visualizando projetos - {city}',
          ],
        },
      ],
      pricing: [
        {
          type: 'purchase' as const,
          icon: CheckCircle,
          color: 'bg-green-500',
          messages: [
            'Fechamento: {service} para {company}',
            '{customer} aprovou proposta de {service}',
            'Novo projeto iniciado - {city}',
          ],
        },
      ],
    }

    // Escolher template baseado na seção
    const templateGroup = section === 'pricing' ? templates.pricing : templates.services
    const template = templateGroup[Math.floor(Math.random() * templateGroup.length)]
    const messageTemplate = template.messages[Math.floor(Math.random() * template.messages.length)]
    
    const customer = customersWithCompanies[Math.floor(Math.random() * customersWithCompanies.length)]
    const service = servicesWithContext[Math.floor(Math.random() * servicesWithContext.length)]
    const city = getRandomCity()
    const timeOnSite = Math.floor(Math.random() * 10) + 2

    const message = messageTemplate
      .replace('{city}', city)
      .replace('{service}', service.service)
      .replace('{customer}', customer.name)
      .replace('{company}', customer.company)
      .replace('{time}', `${timeOnSite} minutos`)

    const notification: Notification = {
      id: Date.now(),
      type: template.type,
      message,
      icon: template.icon,
      color: template.color,
    }

    setCurrentNotification(notification)
    setNotificationCount((prev) => prev + 1)

    // Remove após 5 segundos
    setTimeout(() => {
      setCurrentNotification(null)
    }, 5000)
  }, [
    notificationCount,
    maxNotifications,
    isPaused,
    userIsActive,
    section,
    customersWithCompanies,
    servicesWithContext,
    getRandomCity,
  ])

  // Gerar vendas com timing inteligente
  const generateSmartSale = useCallback(() => {
    // Para se já atingiu o limite
    if (notificationCount >= maxNotifications) return
    
    // Para se está pausado
    if (isPaused) return

    const customer = customersWithCompanies[Math.floor(Math.random() * customersWithCompanies.length)]
    const service = servicesWithContext[Math.floor(Math.random() * servicesWithContext.length)]
    const city = getRandomCity()

    // Tempos mais realistas
    const timeOptions = [
      'agora mesmo',
      'há 3 minutos',
      'há 8 minutos',
      'há 15 minutos',
      'há 25 minutos',
      'há 40 minutos',
      'há 1 hora',
    ]

    const sale: Sale = {
      id: Date.now(),
      product: service.service,
      city,
      time: timeOptions[Math.floor(Math.random() * timeOptions.length)],
      customer: customer.name,
      company: customer.company,
      value: service.price,
    }

    setCurrentSaleNotification(sale)
    setNotificationCount((prev) => prev + 1)

    // Remove após 4 segundos
    setTimeout(() => {
      setCurrentSaleNotification(null)
    }, 4000)
  }, [
    notificationCount,
    maxNotifications,
    isPaused,
    customersWithCompanies,
    servicesWithContext,
    getRandomCity,
  ])

  // Sistema de timing adaptativo baseado em comportamento
  useEffect(() => {
    if (notificationCount >= maxNotifications) return

    // Timing baseado no tempo na página
    let delay: number
    if (timeOnPage < 10) {
      delay = 8000 // Primeira notificação após 8s
    } else if (timeOnPage < 30) {
      delay = Math.random() * 20000 + 20000 // 20-40s
    } else if (timeOnPage < 60) {
      delay = Math.random() * 30000 + 30000 // 30-60s
    } else {
      delay = Math.random() * 45000 + 45000 // 45-90s (menos frequente após 1 min)
    }

    // Primeira venda após 5s, outras notificações após delay calculado
    if (notificationCount === 0) {
      saleTimeoutRef.current = setTimeout(generateSmartSale, 5000)
      notificationTimeoutRef.current = setTimeout(generateSmartNotification, delay)
    } else {
      // Alternar entre vendas e outras notificações
      const showSale = Math.random() > 0.6 // 40% chance de ser venda
      
      if (showSale) {
        saleTimeoutRef.current = setTimeout(generateSmartSale, delay)
      } else {
        notificationTimeoutRef.current = setTimeout(generateSmartNotification, delay)
      }
    }

    return () => {
      if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current)
      if (saleTimeoutRef.current) clearTimeout(saleTimeoutRef.current)
    }
  }, [
    notificationCount,
    maxNotifications,
    timeOnPage,
    generateSmartNotification,
    generateSmartSale,
  ])

  return (
    <>
      {/* Contador de usuários online - Sempre visível */}
      <AnimatePresence>
        {showUsersOnline && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed z-40 top-20 left-2 sm:top-24 sm:left-4"
          >
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:gap-2 sm:px-3 sm:py-2">
              <div className="relative">
                <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div className="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 sm:text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {onlineUsers}
                </span>{' '}
                <span className="hidden sm:inline">pessoas</span> online
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notificação de Venda Recente - Com mais detalhes */}
      <AnimatePresence>
        {currentSaleNotification && !isPaused && (
          <motion.div
            key={currentSaleNotification.id}
            initial={{ opacity: 0, x: -100, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed z-40 max-w-[300px] sm:max-w-sm top-32 left-2 sm:top-36 sm:left-4"
          >
            <div className="relative overflow-hidden rounded-lg border border-green-200 bg-white p-3 shadow-xl dark:border-green-800 dark:bg-gray-800 sm:p-4">
              {/* Barra de progresso animada no topo */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-100 dark:bg-green-900">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4 }}
                  className="h-full bg-gradient-to-r from-green-500 to-green-600"
                />
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                  <ShoppingCart className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Nova contratação! 🎉
                  </p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{currentSaleNotification.customer}</span>
                    {currentSaleNotification.company && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {' '}• {currentSaleNotification.company}
                      </span>
                    )}
                  </p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {currentSaleNotification.product}
                    {currentSaleNotification.value && (
                      <span className="ml-2 text-xs font-normal">
                        {currentSaleNotification.value}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin className="h-3 w-3" />
                    {currentSaleNotification.city} • {currentSaleNotification.time}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outras notificações - Canto inferior esquerdo */}
      <AnimatePresence>
        {currentNotification && !isPaused && (
          <motion.div
            key={currentNotification.id}
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: -50 }}
            className="fixed z-40 max-w-[300px] sm:max-w-sm bottom-20 left-2 sm:bottom-24 sm:left-4"
          >
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow-2xl dark:border-gray-700 dark:bg-gray-800 sm:p-4">
              {/* Indicador de urgência */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
              
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-2 ${currentNotification.color} text-white`}>
                  <currentNotification.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentNotification.message}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    Agora mesmo
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de limite atingido (sutil) */}
      {notificationCount >= maxNotifications && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              🔕 Notificações pausadas para sua melhor experiência
            </p>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default SocialProofNotificationsEnhanced