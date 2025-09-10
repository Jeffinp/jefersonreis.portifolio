import React, { useState, useEffect, useMemo } from 'react'
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
}

const SocialProofNotifications: React.FC = () => {
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [currentNotification, setCurrentNotification] =
    useState<Notification | null>(null)
  const [showUsersOnline, setShowUsersOnline] = useState(true)
  const [recentSales, setRecentSales] = useState<Sale[]>([])
  const [currentSaleNotification, setCurrentSaleNotification] =
    useState<Sale | null>(null)
  const [saleIndex, setSaleIndex] = useState(0)

  // Lista de cidades brasileiras para randomizar
  const cities = useMemo(
    () => [
      'São Paulo',
      'Rio de Janeiro',
      'Salvador',
      'Brasília',
      'Fortaleza',
      'Belo Horizonte',
      'Manaus',
      'Curitiba',
      'Recife',
      'Porto Alegre',
      'Camaçari',
      'Lauro de Freitas',
      'Feira de Santana',
      'Vitória da Conquista',
      'Itabuna',
      'Ilhéus',
      'Juazeiro',
      'Aracaju',
      'Maceió',
      'João Pessoa',
    ],
    [],
  )

  // Lista de serviços para randomizar
  const services = useMemo(
    () => [
      'Landing Page',
      'Site Profissional',
      'Automação com IA',
      'App Mobile',
      'SaaS',
      'Sistema Personalizado',
    ],
    [],
  )

  // Gerar número aleatório de usuários online entre 90-150
  useEffect(() => {
    const generateOnlineUsers = () => {
      const min = 90
      const max = 150
      const users = Math.floor(Math.random() * (max - min + 1)) + min
      setOnlineUsers(users)
    }

    generateOnlineUsers()
    const interval = setInterval(generateOnlineUsers, 30000) // Atualiza a cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  // Gerar notificações aleatórias
  useEffect(() => {
    const notificationTemplates = [
      {
        type: 'contact' as const,
        icon: MessageSquare,
        color: 'bg-blue-500',
        messages: [
          'Visitante de {city} solicitou informações',
          'Interesse em {service} - {city}',
          'Nova consulta de {city}',
        ],
      },
      {
        type: 'view' as const,
        icon: Clock,
        color: 'bg-gray-500',
        messages: [
          'Alguém de {city} está navegando',
          'Visitante de {city} no portfólio',
          '{city} - visualizando projetos',
        ],
      },
    ]

    const generateNotification = () => {
      const template =
        notificationTemplates[
          Math.floor(Math.random() * notificationTemplates.length)
        ]
      const messageTemplate =
        template.messages[Math.floor(Math.random() * template.messages.length)]
      const city = cities[Math.floor(Math.random() * cities.length)]
      const service = services[Math.floor(Math.random() * services.length)]

      const message = messageTemplate
        .replace('{city}', city)
        .replace('{service}', service)

      const notification: Notification = {
        id: Date.now(),
        type: template.type,
        message,
        icon: template.icon,
        color: template.color,
      }

      setCurrentNotification(notification)

      // Remove a notificação após 6 segundos
      setTimeout(() => {
        setCurrentNotification(null)
      }, 6000)
    }

    // Primeira notificação após 15 segundos
    const firstTimeout = setTimeout(generateNotification, 15000)

    // Depois, a cada 45-90 segundos (mais espaçado e natural)
    const interval = setInterval(
      () => {
        generateNotification()
      },
      Math.random() * 45000 + 45000,
    )

    return () => {
      clearTimeout(firstTimeout)
      clearInterval(interval)
    }
  }, [cities, services])

  // Mostrar usuários online constantemente (sem alternar)
  useEffect(() => {
    setShowUsersOnline(true)
  }, [])

  // Gerar vendas recentes com nomes de pessoas
  useEffect(() => {
    const products = [
      'Landing Page Premium',
      'Site Institucional',
      'Automação WhatsApp',
      'App Mobile iOS/Android',
      'Plataforma SaaS',
      'E-commerce Completo',
      'Sistema Personalizado',
      'Dashboard Analytics',
    ]

    const customers = [
      'João Silva',
      'Maria Santos',
      'Pedro Oliveira',
      'Ana Costa',
      'Carlos Ferreira',
      'Juliana Lima',
      'Roberto Alves',
      'Fernanda Souza',
      'Lucas Pereira',
      'Patricia Rodrigues',
      'Marcos Gomes',
      'Camila Martins',
      'Rafael Barbosa',
      'Larissa Campos',
      'Bruno Nascimento',
      'Beatriz Carvalho',
      'Thiago Mendes',
      'Amanda Dias',
      'Gabriel Santos',
      'Mariana Freitas',
      'Fernando Costa',
      'Isabela Ribeiro',
      'André Teixeira',
      'Letícia Vieira',
      'Ricardo Lopes',
    ]

    const timeOptions = [
      'agora mesmo',
      'há 2 minutos',
      'há 5 minutos',
      'há 10 minutos',
      'há 15 minutos',
      'há 30 minutos',
      'há 1 hora',
      'há 2 horas',
    ]

    const generateSales = () => {
      const salesList: Sale[] = []
      for (let i = 0; i < 30; i++) {
        salesList.push({
          id: i,
          product: products[Math.floor(Math.random() * products.length)],
          city: cities[Math.floor(Math.random() * cities.length)],
          time: timeOptions[Math.floor(Math.random() * timeOptions.length)],
          customer: customers[Math.floor(Math.random() * customers.length)],
        })
      }
      setRecentSales(salesList)
    }

    generateSales()
  }, [cities])

  // Mostrar notificações de vendas - primeira em 4s, depois a cada 10s
  useEffect(() => {
    if (recentSales.length === 0) return

    let index = 0

    // Primeira notificação após 4 segundos
    const firstTimeout = setTimeout(() => {
      setCurrentSaleNotification(recentSales[index])
      setSaleIndex(index)

      // Remove a notificação após 3 segundos
      setTimeout(() => {
        setCurrentSaleNotification(null)
      }, 3000)

      index = (index + 1) % recentSales.length
    }, 4000)

    // Depois, a cada 10 segundos
    const interval = setInterval(() => {
      setCurrentSaleNotification(recentSales[index])
      setSaleIndex(index)

      // Remove a notificação após 3 segundos
      setTimeout(() => {
        setCurrentSaleNotification(null)
      }, 3000)

      index = (index + 1) % recentSales.length
    }, 10000)

    return () => {
      clearTimeout(firstTimeout)
      clearInterval(interval)
    }
  }, [recentSales])

  return (
    <>
      {/* Contador de usuários online - Ajustado para mobile */}
      <AnimatePresence>
        {showUsersOnline && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed top-20 left-2 z-40 sm:top-24 sm:left-4"
          >
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 shadow-md sm:gap-2 sm:px-3 sm:py-2 dark:border-gray-700 dark:bg-gray-800">
              <div className="relative">
                <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div className="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-gray-700 sm:text-sm dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {onlineUsers}
                </span>{' '}
                <span className="hidden sm:inline">visitantes</span> ativos
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notificação de Venda Recente - Popup individual */}
      <AnimatePresence>
        {currentSaleNotification && (
          <motion.div
            key={currentSaleNotification.id}
            initial={{ opacity: 0, x: -100, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-32 left-2 z-40 max-w-[280px] sm:top-36 sm:left-4 sm:max-w-sm"
          >
            <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-white p-2 shadow-xl sm:gap-3 sm:p-3 dark:border-green-800 dark:bg-gray-800">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                <ShoppingCart className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Nova venda realizada!
                </p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">
                    {currentSaleNotification.customer}
                  </span>{' '}
                  comprou
                </p>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  {currentSaleNotification.product}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {currentSaleNotification.city} •{' '}
                  {currentSaleNotification.time}
                </p>
              </div>
              <div className="absolute top-2 right-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notificações popup - Canto inferior esquerdo */}
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            key={currentNotification.id}
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: -50 }}
            className="fixed bottom-20 left-2 z-40 max-w-[280px] sm:bottom-24 sm:left-4 sm:max-w-sm"
          >
            <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-2xl sm:gap-3 sm:p-4 dark:border-gray-700 dark:bg-gray-800">
              <div
                className={`rounded-full p-2 ${currentNotification.color} text-white`}
              >
                <currentNotification.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {currentNotification.message}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Há alguns segundos
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SocialProofNotifications
