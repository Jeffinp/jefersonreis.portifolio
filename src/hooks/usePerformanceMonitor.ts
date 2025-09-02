import { useEffect, useState, useRef, useCallback } from 'react'

interface PerformanceMetrics {
  fps: number
  memory?: number
  isLowPerformance: boolean
  suggestedMode: 'ultra-low' | 'low' | 'medium' | 'high'
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    isLowPerformance: false,
    suggestedMode: 'medium'
  })
  
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const fpsHistory = useRef<number[]>([])
  const animationId = useRef<number>()

  // FPS Monitor
  const measureFPS = useCallback(() => {
    frameCount.current++
    const currentTime = performance.now()
    
    if (currentTime >= lastTime.current + 1000) {
      const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current))
      
      // Keep history of last 5 seconds
      fpsHistory.current.push(fps)
      if (fpsHistory.current.length > 5) {
        fpsHistory.current.shift()
      }
      
      // Calculate average FPS
      const avgFps = fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length
      
      // Memory usage (if available)
      let memoryUsage = 0
      if ('memory' in performance) {
        const memory = (performance as any).memory
        memoryUsage = Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
      }
      
      // Determine performance mode
      let suggestedMode: 'ultra-low' | 'low' | 'medium' | 'high' = 'medium'
      let isLowPerformance = false
      
      if (avgFps < 20) {
        suggestedMode = 'ultra-low'
        isLowPerformance = true
      } else if (avgFps < 30) {
        suggestedMode = 'low'
        isLowPerformance = true
      } else if (avgFps < 45) {
        suggestedMode = 'medium'
      } else {
        suggestedMode = 'high'
      }
      
      // Check memory pressure
      if (memoryUsage > 80) {
        isLowPerformance = true
        if (suggestedMode === 'high') suggestedMode = 'medium'
        if (suggestedMode === 'medium') suggestedMode = 'low'
      }
      
      setMetrics({
        fps: avgFps,
        memory: memoryUsage,
        isLowPerformance,
        suggestedMode
      })
      
      frameCount.current = 0
      lastTime.current = currentTime
    }
    
    animationId.current = requestAnimationFrame(measureFPS)
  }, [])

  useEffect(() => {
    // Start monitoring
    animationId.current = requestAnimationFrame(measureFPS)
    
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [measureFPS])

  return metrics
}

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

// Request idle callback with fallback
export const requestIdleCallback = 
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? (window as any).requestIdleCallback
    : (callback: (deadline: any) => void) => {
        const start = Date.now()
        return setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
          })
        }, 1)
      }

// Check if device is low-end
export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false
  
  // Check hardware concurrency
  const cores = navigator.hardwareConcurrency || 2
  if (cores <= 2) return true
  
  // Check device memory (if available)
  if ('deviceMemory' in navigator) {
    const memory = (navigator as any).deviceMemory
    if (memory <= 2) return true
  }
  
  // Check connection speed
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
      return true
    }
  }
  
  // Check for mobile devices
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile && cores <= 4) return true
  
  return false
}