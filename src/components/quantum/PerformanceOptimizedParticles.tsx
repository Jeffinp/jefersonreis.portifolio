import React, { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

interface OptimizedParticleFieldProps {
  enabled?: boolean
  performanceMode?: 'ultra-low' | 'low' | 'medium' | 'high'
}

export const PerformanceOptimizedParticles: React.FC<
  OptimizedParticleFieldProps
> = ({ enabled = true, performanceMode = 'low' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }>
  >([])

  // Performance settings based on mode
  const settings = useMemo(() => {
    switch (performanceMode) {
      case 'ultra-low':
        return {
          particleCount: 10,
          useCanvas: true,
          animated: false,
          fps: 15,
        }
      case 'low':
        return {
          particleCount: 20,
          useCanvas: true,
          animated: true,
          fps: 30,
        }
      case 'medium':
        return {
          particleCount: 40,
          useCanvas: true,
          animated: true,
          fps: 30,
        }
      case 'high':
        return {
          particleCount: 60,
          useCanvas: false,
          animated: true,
          fps: 60,
        }
      default:
        return {
          particleCount: 20,
          useCanvas: true,
          animated: true,
          fps: 30,
        }
    }
  }, [performanceMode])

  // Initialize particles
  useEffect(() => {
    if (!enabled || !settings.useCanvas) return

    particlesRef.current = Array.from(
      { length: settings.particleCount },
      () => ({
        x: Math.random() * (window.innerWidth || 1920),
        y: Math.random() * (window.innerHeight || 1080),
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
      }),
    )
  }, [enabled, settings])

  // Canvas animation with throttled FPS
  useEffect(() => {
    if (
      !enabled ||
      !canvasRef.current ||
      !settings.useCanvas ||
      !settings.animated
    )
      return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let lastTime = 0
    const targetFPS = settings.fps
    const frameDelay = 1000 / targetFPS

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameDelay) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.y -= particle.speed
        if (particle.y < -10) {
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
        }

        // Draw particle
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [enabled, settings])

  // Handle window resize
  useEffect(() => {
    if (!canvasRef.current) return

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!enabled) return null

  // Ultra-low performance mode: static CSS stars
  if (performanceMode === 'ultra-low') {
    return (
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="stars-static" />
        <style jsx>{`
          .stars-static {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image:
              radial-gradient(2px 2px at 20% 30%, white, transparent),
              radial-gradient(2px 2px at 60% 70%, white, transparent),
              radial-gradient(1px 1px at 50% 50%, white, transparent);
            background-size: 300px 300px;
            opacity: 0.3;
          }
        `}</style>
      </div>
    )
  }

  // Canvas-based rendering for better performance
  if (settings.useCanvas) {
    return (
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ opacity: 0.5 }}
      />
    )
  }

  // CSS-based particles for medium/high mode
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      {Array.from({ length: settings.particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [-20, -window.innerHeight - 20],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 20,
          }}
        />
      ))}
    </div>
  )
}

export default PerformanceOptimizedParticles
