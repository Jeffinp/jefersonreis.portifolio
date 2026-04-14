'use client'

import { useState, useEffect, type RefObject } from 'react'

/**
 * Mede a altura de um elemento via ResizeObserver.
 * Retorna a altura atual em px (atualiza em resize).
 */
export function useContainerHeight(ref: RefObject<HTMLElement | null>): number {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ro = new ResizeObserver(([entry]) => {
      if (entry) setHeight(entry.contentRect.height)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])

  return height
}
