'use client'

import { useEffect, useRef } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { cancelFrame, frame } from 'framer-motion'
import { useReducedMotion } from '@/hooks/ui/use-reduced-motion'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const reduced = useReducedMotion()

  // Sincroniza Lenis com o RAF do Framer Motion para evitar dois loops concorrentes
  useEffect(() => {
    if (reduced) return
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp)
    }
    frame.update(update, true)
    return () => cancelFrame(update)
  }, [reduced])

  // Respeitar prefers-reduced-motion: desliga smooth scroll e retorna nativo
  if (reduced) return <>{children}</>

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
