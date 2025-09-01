import React, { useState, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'
import {
  useImageLazyLoad,
  generateBlurPlaceholder,
  imageConfigs,
  ImageOptimizationOptions,
} from '@/utils/imageOptimization'

interface OptimizedImageProps
  extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  variant?: keyof typeof imageConfigs
  fallbackSrc?: string
  showLoader?: boolean
  optimizationOptions?: ImageOptimizationOptions
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  variant = 'project',
  fallbackSrc,
  showLoader = true,
  optimizationOptions,
  className = '',
  ...props
}) => {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Configurações baseadas na variante
  const config = { ...imageConfigs[variant], ...optimizationOptions }

  // Lazy loading hook (apenas se não for priority)
  const { ref, isInView, isLoaded, handleLoad } = useImageLazyLoad(
    0.1,
    config.priority ? '0px' : '100px',
  )

  const handleImageLoad = useCallback(() => {
    setIsLoading(false)
    handleLoad()
  }, [handleLoad])

  const handleImageError = useCallback(() => {
    setError(true)
    setIsLoading(false)
  }, [])

  // Não renderizar até estar na viewport (exceto para priority)
  if (!config.priority && !isInView) {
    return (
      <div
        ref={ref}
        className={`bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{
          aspectRatio:
            props.width && props.height
              ? `${props.width}/${props.height}`
              : undefined,
        }}
      />
    )
  }

  // Renderizar imagem de fallback em caso de erro
  if (error && fallbackSrc) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        {...props}
      />
    )
  }

  // Gerar blur placeholder se necessário
  const blurDataURL =
    config.placeholder === 'blur' && !optimizationOptions?.blurDataURL
      ? generateBlurPlaceholder()
      : optimizationOptions?.blurDataURL

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loader */}
      {showLoader && isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </div>
      )}

      {/* Imagem otimizada */}
      <Image
        src={src}
        alt={alt}
        quality={config.quality}
        sizes={config.sizes}
        priority={config.priority}
        placeholder={config.placeholder}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />

      {/* Overlay com gradiente sutil para melhor legibilidade */}
      {variant === 'hero' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      )}
    </div>
  )
}

export default OptimizedImage
