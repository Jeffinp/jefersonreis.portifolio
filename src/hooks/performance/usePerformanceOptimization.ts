import { useEffect, useCallback, useState } from 'react'

// Hook para otimização de performance geral
export const usePerformanceOptimization = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fcp: 0, // First Contentful Paint
    lcp: 0, // Largest Contentful Paint
    fid: 0, // First Input Delay
    cls: 0, // Cumulative Layout Shift
  })

  // Função para medir Web Core Vitals
  const measureWebVitals = useCallback(() => {
    if (typeof window === 'undefined') return

    // First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint')
    const fcpEntry = paintEntries.find(
      (entry) => entry.name === 'first-contentful-paint',
    )
    if (fcpEntry) {
      setPerformanceMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }))
    }

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        setPerformanceMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }))
      })

      try {
        lcpObserver.observe({
          type: 'largest-contentful-paint',
          buffered: true,
        })
      } catch (e) {
        console.warn('LCP observation not supported')
      }

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          setPerformanceMetrics((prev) => ({
            ...prev,
            fid: entry.processingStart - entry.startTime,
          }))
        })
      })

      try {
        fidObserver.observe({ type: 'first-input', buffered: true })
      } catch (e) {
        console.warn('FID observation not supported')
      }

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        setPerformanceMetrics((prev) => ({ ...prev, cls: clsValue }))
      })

      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true })
      } catch (e) {
        console.warn('CLS observation not supported')
      }
    }
  }, [])

  useEffect(() => {
    measureWebVitals()
  }, [measureWebVitals])

  return performanceMetrics
}

// Hook para debounce de funções
export const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): T => {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  )

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      const timer = setTimeout(() => {
        func(...args)
      }, delay)

      setDebounceTimer(timer)
    },
    [func, delay, debounceTimer],
  ) as T

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [debounceTimer])

  return debouncedFunction
}

// Hook para throttle de funções
export const useThrottle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): T => {
  const [isThrottled, setIsThrottled] = useState(false)

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      if (!isThrottled) {
        func(...args)
        setIsThrottled(true)
        setTimeout(() => setIsThrottled(false), delay)
      }
    },
    [func, delay, isThrottled],
  ) as T

  return throttledFunction
}

// Hook para prefetch de recursos
export const usePrefetch = (urls: string[]) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    urls.forEach((url) => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = url
      document.head.appendChild(link)
    })

    return () => {
      urls.forEach((url) => {
        const existingLink = document.querySelector(`link[href="${url}"]`)
        if (existingLink) {
          document.head.removeChild(existingLink)
        }
      })
    }
  }, [urls])
}

// Hook para preload de recursos críticos
export const usePreload = (
  resources: Array<{ href: string; as: string; type?: string }>,
) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    resources.forEach((resource) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource.href
      link.as = resource.as
      if (resource.type) {
        link.type = resource.type
      }
      document.head.appendChild(link)
    })

    return () => {
      resources.forEach((resource) => {
        const existingLink = document.querySelector(
          `link[href="${resource.href}"]`,
        )
        if (existingLink) {
          document.head.removeChild(existingLink)
        }
      })
    }
  }, [resources])
}

// Hook para detectar conexão lenta
export const useConnectionSpeed = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection

    if (connection) {
      const checkConnection = () => {
        // Considera conexão lenta se for 2G ou effective type slow-2g
        const slowConnections = ['slow-2g', '2g']
        setIsSlowConnection(
          slowConnections.includes(connection.effectiveType) ||
            connection.downlink < 1.5,
        )
      }

      checkConnection()
      connection.addEventListener('change', checkConnection)

      return () => {
        connection.removeEventListener('change', checkConnection)
      }
    }
  }, [])

  return isSlowConnection
}

// Hook para otimizar renderização baseada na viewport
export const useViewportOptimization = () => {
  const [viewportInfo, setViewportInfo] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet:
      typeof window !== 'undefined'
        ? window.innerWidth >= 768 && window.innerWidth < 1024
        : false,
    isDesktop:
      typeof window !== 'undefined' ? window.innerWidth >= 1024 : false,
  })

  const throttledResize = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight

    setViewportInfo({
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(throttledResize, 250)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [throttledResize])

  return viewportInfo
}

// Hook para reduzir animações em dispositivos com baixa performance
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}
