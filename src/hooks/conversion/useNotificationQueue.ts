import { useState, useEffect, useCallback, useRef } from 'react'

interface Notification {
  id: string
  priority: number // 1-10, higher is more important
  duration: number // milliseconds
  cooldown?: number // milliseconds before can show again
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  content: React.ReactNode
}

interface UseNotificationQueueOptions {
  maxConcurrent?: number
  defaultDuration?: number
  mobileMaxConcurrent?: number
}

export const useNotificationQueue = ({
  maxConcurrent = 3,
  defaultDuration = 5000,
  mobileMaxConcurrent = 1,
}: UseNotificationQueueOptions = {}) => {
  const [queue, setQueue] = useState<Notification[]>([])
  const [activeNotifications, setActiveNotifications] = useState<
    Notification[]
  >([])
  const [isMobile, setIsMobile] = useState(false)
  const cooldownsRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const id = `notification-${Date.now()}-${Math.random()}`
      const newNotification = { ...notification, id }

      // Check cooldown
      const lastShown = cooldownsRef.current.get(newNotification.id)
      if (lastShown && notification.cooldown) {
        const timeSinceLast = Date.now() - lastShown
        if (timeSinceLast < notification.cooldown) {
          return // Skip if still in cooldown
        }
      }

      setQueue((prev) => {
        // Sort by priority
        const updated = [...prev, newNotification]
        return updated.sort((a, b) => b.priority - a.priority)
      })
    },
    [],
  )

  const removeNotification = useCallback(
    (id: string) => {
      setActiveNotifications((prev) => prev.filter((n) => n.id !== id))

      // Record cooldown time
      const notification = activeNotifications.find((n) => n.id === id)
      if (notification?.cooldown) {
        cooldownsRef.current.set(notification.id, Date.now())
      }
    },
    [activeNotifications],
  )

  // Process queue
  useEffect(() => {
    const maxActive = isMobile ? mobileMaxConcurrent : maxConcurrent

    if (activeNotifications.length < maxActive && queue.length > 0) {
      const [next, ...rest] = queue

      // Check for position conflicts
      const hasPositionConflict = activeNotifications.some(
        (n) => n.position === next.position,
      )

      if (!hasPositionConflict || isMobile) {
        setQueue(rest)
        setActiveNotifications((prev) => [...prev, next])

        // Auto-remove after duration
        setTimeout(() => {
          removeNotification(next.id)
        }, next.duration || defaultDuration)
      }
    }
  }, [
    queue,
    activeNotifications,
    isMobile,
    maxConcurrent,
    mobileMaxConcurrent,
    defaultDuration,
    removeNotification,
  ])

  const clearAll = useCallback(() => {
    setQueue([])
    setActiveNotifications([])
  }, [])

  const pauseAll = useCallback(() => {
    // Implementation for pausing notifications
    setQueue([])
  }, [])

  return {
    activeNotifications,
    addNotification,
    removeNotification,
    clearAll,
    pauseAll,
    queueLength: queue.length,
    isMobile,
  }
}
