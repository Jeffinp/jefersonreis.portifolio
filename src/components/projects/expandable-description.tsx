'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ExpandableDescriptionProps {
  text: string
  maxLines?: number
  className?: string
}

export function ExpandableDescription({
  text,
  maxLines = 4,
  className,
}: ExpandableDescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  const [needsToggle, setNeedsToggle] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setExpanded(false)
    setNeedsToggle(false)
  }, [text])

  useEffect(() => {
    const el = ref.current
    if (!el || expanded) return
    const id = requestAnimationFrame(() => {
      setNeedsToggle(el.scrollHeight > el.clientHeight + 2)
    })
    return () => cancelAnimationFrame(id)
  }, [text, expanded])

  const paragraphs = text.split('\n\n').filter(Boolean)

  return (
    <div className={cn('space-y-2', className)}>
      <div
        ref={ref}
        className="text-muted-foreground space-y-3 leading-relaxed"
        style={
          !expanded
            ? {
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
            : undefined
        }
      >
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-primary text-sm font-medium hover:underline focus:outline-none"
        >
          {expanded ? 'Ler menos' : 'Ler mais'}
        </button>
      )}
    </div>
  )
}
