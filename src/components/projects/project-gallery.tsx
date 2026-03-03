'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProjectImage } from '@/types'

interface ProjectGalleryProps {
  images: ProjectImage[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  if (images.length === 0) return null

  const showControls = images.length > 1

  return (
    <div className="bg-muted relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-muted/60 relative aspect-video min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={image.url}
                alt={image.alt || `${title} — imagem ${index + 1}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 768px"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Slide counter */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}
