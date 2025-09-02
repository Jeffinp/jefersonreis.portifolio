import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface QuantumCursorProps {
  enabled?: boolean
}

export const QuantumCursor: React.FC<QuantumCursorProps> = ({ enabled = true }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Particle trail for quantum effect
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([])
  const particleIdRef = useRef(0)

  useEffect(() => {
    if (!enabled) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Add particle occasionally for quantum trail
      if (Math.random() > 0.8) {
        const newParticle = {
          x: e.clientX,
          y: e.clientY,
          id: particleIdRef.current++,
        }
        setParticles((prev) => [...prev.slice(-10), newParticle])
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Detect interactive elements
      if (target.matches('a, button')) {
        setIsHovering(true)
        setCursorText('')
        
        // Add special text for specific elements
        if (target.matches('[data-warp]')) {
          setCursorText('WARP')
        } else if (target.matches('a[href^="http"]')) {
          setCursorText('LINK')
        }
      } else if (target.matches('input, textarea')) {
        setIsHovering(true)
        setCursorText('TYPE')
      } else if (target.matches('[data-planet], .project-card')) {
        setIsHovering(true)
        setCursorText('VIEW')
      } else {
        setIsHovering(false)
        setCursorText('')
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorText('')
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enabled, cursorX, cursorY])

  // Clean up particles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 1000))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Quantum Particles Trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-[49]"
          style={{
            left: particle.x,
            top: particle.y,
            x: '-50%',
            y: '-50%',
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="h-1 w-1 rounded-full bg-blue-400" />
        </motion.div>
      ))}

      {/* Main Cursor - Quantum Style */}
      <motion.div
        className="pointer-events-none fixed z-[50]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute"
          style={{
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            scale: isClicking ? 0.75 : isHovering ? 1.5 : 1,
            opacity: isHovering ? 1 : 0.5,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        >
          <div
            className={`h-8 w-8 rounded-full border-2 ${
              isHovering ? 'border-blue-400' : 'border-gray-400'
            }`}
            style={{
              boxShadow: isHovering 
                ? '0 0 20px rgba(59, 130, 246, 0.5)' 
                : '0 0 10px rgba(156, 163, 175, 0.3)',
            }}
          />
        </motion.div>

        {/* Center Dot - Classic Cursor Point */}
        <motion.div
          className="absolute"
          style={{
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            scale: isClicking ? 0.5 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        >
          <div
            className={`h-2 w-2 rounded-full ${
              isHovering ? 'bg-blue-400' : 'bg-white'
            }`}
            style={{
              boxShadow: isHovering
                ? '0 0 10px rgba(59, 130, 246, 0.8)'
                : '0 0 5px rgba(255, 255, 255, 0.8)',
            }}
          />
        </motion.div>

        {/* Crosshair Lines - For Precision */}
        {!isHovering && (
          <>
            {/* Horizontal Line */}
            <motion.div
              className="absolute h-[1px] w-4 bg-gradient-to-r from-transparent via-gray-400 to-transparent"
              style={{
                left: '-8px',
                top: '0px',
                x: '-50%',
                y: '-50%',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            {/* Vertical Line */}
            <motion.div
              className="absolute h-4 w-[1px] bg-gradient-to-b from-transparent via-gray-400 to-transparent"
              style={{
                left: '0px',
                top: '-8px',
                x: '-50%',
                y: '-50%',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}

        {/* Hover Text Label */}
        {cursorText && (
          <motion.div
            className="absolute left-8 top-8"
            initial={{ opacity: 0, scale: 0.8, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-md bg-blue-500/20 px-2 py-1 backdrop-blur-sm">
              <span className="text-[10px] font-bold tracking-wider text-blue-400">
                {cursorText}
              </span>
            </div>
          </motion.div>
        )}

        {/* Click Ripple Effect */}
        {isClicking && (
          <motion.div
            className="absolute"
            style={{
              x: '-50%',
              y: '-50%',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="h-8 w-8 rounded-full border-2 border-blue-400" />
          </motion.div>
        )}

        {/* Quantum Glow Effect */}
        {isHovering && (
          <motion.div
            className="absolute"
            style={{
              x: '-50%',
              y: '-50%',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div
              className="h-12 w-12 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default QuantumCursor