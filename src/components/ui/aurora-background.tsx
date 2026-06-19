'use client'

import type React from 'react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { NeuroNoise } from '@paper-design/shaders-react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/ui/use-reduced-motion'
import { useMediaQuery, usePageVisible } from '@/hooks/ui/use-media-query'

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  speed?: number
}

// Cores do shader, reaproveitadas no fallback estático para manter a identidade.
const SHADER_COLORS = {
  front: '#1d4ed8',
  mid: '#0a0f2e',
  back: '#020617',
} as const

// Gradiente CSS estático que imita o NeuroNoise sem custo de GPU/WebGL.
// Usado em mobile, reduced-motion ou aba oculta.
const STATIC_BACKGROUND =
  `radial-gradient(ellipse 80% 60% at 30% 20%, ${SHADER_COLORS.front}33 0%, transparent 55%),` +
  `radial-gradient(ellipse 70% 70% at 75% 80%, ${SHADER_COLORS.mid} 0%, transparent 60%),` +
  `linear-gradient(160deg, ${SHADER_COLORS.back} 0%, ${SHADER_COLORS.mid} 100%)`

export const AuroraBackground = ({
  className,
  children,
  speed = 0.4,
  ...props
}: AuroraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const reduced = useReducedMotion()
  const pageVisible = usePageVisible()
  // Mobile e ponteiros grossos (touch): não há mouse-parallax e a bateria é
  // o recurso mais escasso — trocamos o shader WebGL por um gradiente estático.
  const isMobile = useMediaQuery('(max-width: 768px), (pointer: coarse)')

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

  // Só monta o shader WebGL quando realmente vale: desktop, com movimento
  // permitido. Evita instanciar contexto WebGL em mobile (maior dreno de bateria).
  const shaderMounted = !reduced && !isMobile

  // WCAG 2.3.3/2.2.2 + economia: congela o shader fora da tela ou com a aba oculta.
  const effectiveSpeed = visible && pageVisible ? speed : 0

  return (
    <div
      ref={containerRef}
      className={cn(
        'bg-background text-foreground relative flex flex-col items-center justify-center overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Fundo decorativo — dark mode only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden dark:block"
      >
        {shaderMounted ? (
          <NeuroNoise
            colorFront={SHADER_COLORS.front}
            colorMid={SHADER_COLORS.mid}
            colorBack={SHADER_COLORS.back}
            speed={effectiveSpeed}
            brightness={0.7}
            contrast={1.6}
            scale={0.6}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          // Fallback estático sem WebGL (mobile / reduced-motion)
          <div
            className="absolute inset-0"
            style={{ background: STATIC_BACKGROUND }}
          />
        )}
        {/* scrim radial no centro para legibilidade do texto */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.3) 60%, transparent 100%)',
          }}
        />
        {/* fade bottom para transição suave com a próxima seção */}
        <div className="to-background absolute inset-0 bg-linear-to-b from-transparent via-transparent" />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
