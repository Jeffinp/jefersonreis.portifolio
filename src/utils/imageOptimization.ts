// Utility for advanced image optimization and lazy loading
import { useState, useEffect, useCallback } from 'react'

export interface ImageOptimizationOptions {
  quality?: number
  format?: 'webp' | 'avif' | 'auto'
  sizes?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

// Hook para lazy loading de imagens com Intersection Observer
export const useImageLazyLoad = (threshold = 0.1, rootMargin = '50px') => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imageRef, setImageRef] = useState<HTMLElement | null>(null)

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) setImageRef(node)
  }, [])

  useEffect(() => {
    if (!imageRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(imageRef)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(imageRef)
    return () => observer.disconnect()
  }, [imageRef, threshold, rootMargin])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return { ref, isInView, isLoaded, handleLoad }
}

// Função para gerar URLs otimizadas do Next.js Image
export const getOptimizedImageUrl = (
  src: string,
  width: number,
  quality = 75,
): string => {
  if (src.startsWith('http') || src.startsWith('//')) {
    return src
  }

  // Para imagens locais, usar o otimizador do Next.js
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: quality.toString(),
  })

  return `/_next/image?${params.toString()}`
}

// Função para gerar blur placeholder base64
export const generateBlurPlaceholder = (width = 10, height = 10): string => {
  if (typeof document === 'undefined') return ''

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Gradiente suave para placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#f3f4f6')
  gradient.addColorStop(1, '#e5e7eb')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL('image/jpeg', 0.1)
}

// Configurações responsivas para diferentes tamanhos de tela
export const getResponsiveSizes = (
  breakpoints: Record<string, number>,
): string => {
  const entries = Object.entries(breakpoints).sort(([, a], [, b]) => a - b)

  return entries
    .map(([screen, size], index) => {
      if (index === entries.length - 1) {
        return `${size}px`
      }
      const nextBreakpoint = entries[index + 1][1]
      return `(max-width: ${nextBreakpoint - 1}px) ${size}px`
    })
    .join(', ')
}

// Configurações padrão para diferentes tipos de imagem
export const imageConfigs = {
  hero: {
    quality: 90,
    format: 'webp' as const,
    sizes: getResponsiveSizes({
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      large: 1280,
    }),
    priority: true,
    placeholder: 'blur' as const,
  },
  project: {
    quality: 80,
    format: 'webp' as const,
    sizes: getResponsiveSizes({
      mobile: 320,
      tablet: 400,
      desktop: 500,
    }),
    priority: false,
    placeholder: 'blur' as const,
  },
  skill: {
    quality: 85,
    format: 'webp' as const,
    sizes: getResponsiveSizes({
      mobile: 48,
      tablet: 56,
      desktop: 64,
    }),
    priority: false,
    placeholder: 'empty' as const,
  },
  avatar: {
    quality: 90,
    format: 'webp' as const,
    sizes: getResponsiveSizes({
      mobile: 80,
      tablet: 96,
      desktop: 112,
    }),
    priority: false,
    placeholder: 'blur' as const,
  },
  background: {
    quality: 70,
    format: 'webp' as const,
    sizes: getResponsiveSizes({
      mobile: 768,
      tablet: 1024,
      desktop: 1920,
    }),
    priority: false,
    placeholder: 'blur' as const,
  },
}

// Função para detectar se o browser suporta formatos modernos
export const getBrowserSupportedFormat = (): 'webp' | 'avif' | 'jpeg' => {
  if (typeof window === 'undefined') return 'webp'

  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1

  // Testar suporte AVIF
  if (canvas.toDataURL('image/avif').startsWith('data:image/avif')) {
    return 'avif'
  }

  // Testar suporte WebP
  if (canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
    return 'webp'
  }

  return 'jpeg'
}

// Hook para preload de imagens críticas
export const useImagePreload = (urls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    urls.forEach((url) => {
      const img = new Image()
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(url))
      }
      img.src = url
    })
  }, [urls])

  return loadedImages
}
