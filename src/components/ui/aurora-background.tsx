'use client'

import type React from 'react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { NeuroNoise } from '@paper-design/shaders-react'
import { cn } from '@/lib/utils'

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  speed?: number
}

export const AuroraBackground = ({
  className,
  children,
  speed = 0.4,
  ...props
}: AuroraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? true),
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden bg-background text-foreground',
        className
      )}
      {...props}
    >
      {/* Shader — dark mode only, pauses when off-screen */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <NeuroNoise
          colorFront="#1d4ed8"
          colorMid="#0a0f2e"
          colorBack="#020617"
          speed={visible ? speed : 0}
          brightness={0.7}
          contrast={1.6}
          scale={0.6}
          style={{ width: '100%', height: '100%' }}
        />
        {/* scrim radial no centro para legibilidade do texto */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.3) 60%, transparent 100%)',
          }}
        />
        {/* fade bottom para transição suave com a próxima seção */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
