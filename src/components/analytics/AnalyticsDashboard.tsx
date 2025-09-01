import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Users,
  Clock,
  Globe,
  TrendingUp,
  Monitor,
  Smartphone,
  Eye,
  MousePointer,
  Activity,
} from 'lucide-react'
import { InteractiveCard } from '@/components/ui/MicroInteractions'

interface AnalyticsData {
  pageviews: number
  visitors: number
  averageTime: string
  bounceRate: number
  topPages: Array<{ page: string; views: number }>
  deviceTypes: Array<{ device: string; percentage: number }>
  countries: Array<{ country: string; visits: number }>
  realTimeVisitors: number
}

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: number
  format?: 'number' | 'percentage' | 'time'
  className?: string
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  format = 'number',
  className = '',
}) => {
  const formatValue = (val: string | number) => {
    if (format === 'percentage') {
      return `${val}%`
    }
    if (format === 'number' && typeof val === 'number') {
      return val.toLocaleString()
    }
    return val
  }

  const getTrendColor = (trend?: number) => {
    if (!trend) return ''
    return trend > 0 ? 'text-green-600' : 'text-red-600'
  }

  return (
    <InteractiveCard className={`p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatValue(value)}
            </p>
            {trend !== undefined && (
              <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
                {trend > 0 ? '+' : ''}
                {trend}%
              </span>
            )}
          </div>
        </div>
        <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
          {icon}
        </div>
      </div>
    </InteractiveCard>
  )
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Simulate analytics data (in a real implementation, this would fetch from Vercel Analytics API)
  useEffect(() => {
    const simulateAnalyticsData = (): AnalyticsData => ({
      pageviews: 15420,
      visitors: 8750,
      averageTime: '2m 34s',
      bounceRate: 32.5,
      topPages: [
        { page: '/', views: 5240 },
        { page: '/portfolio', views: 3180 },
        { page: '/blog', views: 2340 },
        { page: '/contact', views: 1890 },
        { page: '/about', views: 1560 },
      ],
      deviceTypes: [
        { device: 'Desktop', percentage: 65 },
        { device: 'Mobile', percentage: 30 },
        { device: 'Tablet', percentage: 5 },
      ],
      countries: [
        { country: 'Brasil', visits: 4200 },
        { country: 'Estados Unidos', visits: 2800 },
        { country: 'Portugal', visits: 890 },
        { country: 'Reino Unido', visits: 540 },
        { country: 'Alemanha', visits: 320 },
      ],
      realTimeVisitors: 23,
    })

    if (isVisible) {
      // Simulate API delay
      const timer = setTimeout(() => {
        setAnalyticsData(simulateAnalyticsData())
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById('analytics-dashboard')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  if (!analyticsData) {
    return (
      <div id="analytics-dashboard" className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Activity className="h-8 w-8 animate-pulse text-blue-600" />
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Carregando dados de analytics...
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      id="analytics-dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Insights de performance e engagement do portfolio
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricCard
          title="Page Views"
          value={analyticsData.pageviews}
          icon={<Eye className="h-6 w-6 text-blue-600" />}
          trend={12.5}
          format="number"
        />
        <MetricCard
          title="Visitantes Únicos"
          value={analyticsData.visitors}
          icon={<Users className="h-6 w-6 text-green-600" />}
          trend={8.3}
          format="number"
        />
        <MetricCard
          title="Tempo Médio"
          value={analyticsData.averageTime}
          icon={<Clock className="h-6 w-6 text-purple-600" />}
          trend={5.7}
          format="time"
        />
        <MetricCard
          title="Taxa de Rejeição"
          value={analyticsData.bounceRate}
          icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
          trend={-3.2}
          format="percentage"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Top Pages */}
        <motion.div variants={itemVariants}>
          <InteractiveCard className="p-6">
            <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Páginas Mais Visitadas
            </h4>
            <div className="space-y-3">
              {analyticsData.topPages.map((page, index) => (
                <div
                  key={page.page}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 dark:bg-blue-900/30">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {page.page === '/' ? 'Home' : page.page.replace('/', '')}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </InteractiveCard>
        </motion.div>

        {/* Device Types */}
        <motion.div variants={itemVariants}>
          <InteractiveCard className="p-6">
            <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Dispositivos
            </h4>
            <div className="space-y-4">
              {analyticsData.deviceTypes.map((device) => (
                <div key={device.device} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {device.device === 'Desktop' && (
                        <Monitor className="h-4 w-4 text-gray-600" />
                      )}
                      {device.device === 'Mobile' && (
                        <Smartphone className="h-4 w-4 text-gray-600" />
                      )}
                      {device.device === 'Tablet' && (
                        <Monitor className="h-4 w-4 text-gray-600" />
                      )}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.device}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {device.percentage}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </InteractiveCard>
        </motion.div>
      </div>

      {/* Real-time Activity */}
      <motion.div variants={itemVariants}>
        <InteractiveCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Atividade em Tempo Real
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visitantes ativos agora
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
              <span className="text-2xl font-bold text-green-600">
                {analyticsData.realTimeVisitors}
              </span>
            </div>
          </div>
        </InteractiveCard>
      </motion.div>

      {/* Performance Insights */}
      <motion.div variants={itemVariants}>
        <InteractiveCard className="p-6">
          <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Performance Insights
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">95</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Lighthouse Score
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1.2s</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Load Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0.1s</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                First Input Delay
              </div>
            </div>
          </div>
        </InteractiveCard>
      </motion.div>
    </motion.div>
  )
}

export default AnalyticsDashboard
