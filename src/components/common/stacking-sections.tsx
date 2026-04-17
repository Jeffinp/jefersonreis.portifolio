'use client'

import { useRef, useState, useEffect, Children, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useContainerHeight } from '@/hooks/ui/use-container-height'
import { useReducedMotion } from '@/hooks/ui/use-reduced-motion'

interface StackingSectionsProps {
  children: ReactNode
}

export function StackingSections({ children }: StackingSectionsProps) {
  const items = Children.toArray(children)
  const count = items.length
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // WCAG 2.3.3: em reduced-motion, exibe as seções empilhadas verticalmente
  // sem scale/parallax/sticky — mantém a ordem lógica e a usabilidade.
  if (reduced) {
    return <div>{items}</div>
  }

  return (
    <div ref={containerRef} style={{ height: `${count * 100}vh` }}>
      {items.map((child, i) => (
        <StackingCard
          key={i}
          index={i}
          total={count}
          globalProgress={scrollYProgress}
          isFirst={i === 0}
          isLast={i === count - 1}
        >
          {child}
        </StackingCard>
      ))}
    </div>
  )
}

function useViewportHeight(): number {
  const [vh, setVh] = useState(0)
  useEffect(() => {
    const update = () => setVh(window.innerHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return vh
}

interface StackingCardProps {
  children: ReactNode
  index: number
  total: number
  globalProgress: MotionValue<number>
  isFirst: boolean
  isLast: boolean
}

function StackingCard({
  children,
  index,
  total,
  globalProgress,
  isFirst,
  isLast,
}: StackingCardProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const contentHeight = useContainerHeight(contentRef)
  const vh = useViewportHeight()

  const overflow = vh > 0 ? Math.max(0, contentHeight - vh) : 0

  const sliceStart = index / total
  const sliceEnd = (index + 1) / total

  // --- Efeitos no card sendo coberto ---

  // Scale: cards mais antigos encolhem mais (0.05 por nível)
  const targetScale = 1 - (total - 1 - index) * 0.05
  const scale = useTransform(
    globalProgress,
    [sliceStart, sliceEnd],
    [1, targetScale]
  )

  // Border-radius aumenta quando o card é empurrado para trás
  const borderRadius = useTransform(
    globalProgress,
    [sliceStart, sliceEnd],
    [isFirst ? 0 : 16, isLast ? (isFirst ? 0 : 16) : 28]
  )

  // Conteúdo sobe conforme o card entra + scroll interno para overflow
  // O innerY já cobre de 0 a -overflow durante a fatia de scroll deste card
  // Adicionamos um offset inicial de 50px para parallax de entrada nos cards 2+
  const enterOffset = isFirst ? 0 : 50
  const combinedY = useTransform(
    globalProgress,
    [sliceStart, sliceEnd],
    [enterOffset, -overflow]
  )

  // Peek offset: 25px por card
  const topOffset = index * 25

  return (
    <div className="sticky top-0 h-screen" style={{ zIndex: index + 1 }}>
      <motion.div
        className="h-full w-full origin-top overflow-hidden"
        style={{
          scale,
          borderRadius,
          willChange: 'transform',
        }}
      >
        {/* Rounded top + shadow para cards 2+ */}
        <div
          className={
            !isFirst
              ? 'bg-background h-full rounded-t-[2rem] shadow-[0_1px_2px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.1),0_24px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_16px_rgba(0,0,0,0.3),0_24px_48px_rgba(0,0,0,0.2)]'
              : 'bg-background h-full'
          }
          style={{ paddingTop: !isFirst ? topOffset : 0 }}
        >
          <motion.div
            ref={contentRef}
            style={{
              y: combinedY,
            }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
