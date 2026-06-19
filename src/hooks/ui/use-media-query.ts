'use client'

import { useSyncExternalStore } from 'react'

/**
 * Hook genérico para media queries via matchMedia.
 * Usa useSyncExternalStore para evitar mismatch de hidratação.
 * SSR retorna `false` (assume o caminho mais leve por padrão).
 */
export function useMediaQuery(query: string): boolean {
  function subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return () => {}
    }
    const mql = window.matchMedia(query)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
  }

  function getSnapshot(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  }

  function getServerSnapshot(): boolean {
    return false
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * Hook para detectar visibilidade da aba/página (document.visibilityState).
 * Usado para pausar animações/shaders quando a aba está em background,
 * economizando bateria — crítico em mobile.
 */
export function usePageVisible(): boolean {
  function subscribe(callback: () => void): () => void {
    if (typeof document === 'undefined') return () => {}
    document.addEventListener('visibilitychange', callback)
    return () => document.removeEventListener('visibilitychange', callback)
  }

  function getSnapshot(): boolean {
    if (typeof document === 'undefined') return true
    return document.visibilityState === 'visible'
  }

  function getServerSnapshot(): boolean {
    return true
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
