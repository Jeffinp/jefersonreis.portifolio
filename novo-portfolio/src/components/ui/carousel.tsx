'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

interface CarouselProps {
  children: React.ReactNode[]
  options?: EmblaOptionsType
  showControls?: boolean
  showDots?: boolean
}

export function Carousel({
  children,
  options = { loop: true, align: 'start' },
  showControls = true,
  showDots = true,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const frameId = requestAnimationFrame(() => {
      onSelect()
      setScrollSnaps(emblaApi.scrollSnapList())
    })
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      cancelAnimationFrame(frameId)
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {children.map((child, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
            onClick={scrollPrev}
            aria-label="Projeto anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
            onClick={scrollNext}
            aria-label="Próximo projeto"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots */}
      {showDots && scrollSnaps.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
