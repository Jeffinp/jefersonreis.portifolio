'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

interface CarouselProps {
  children: React.ReactNode
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
  const slides = React.Children.toArray(children)
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

  const syncState = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    syncState()
    emblaApi.on('select', syncState)
    emblaApi.on('reInit', syncState)
    return () => {
      emblaApi.off('select', syncState)
      emblaApi.off('reInit', syncState)
    }
  }, [emblaApi, syncState])

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((child, index) => (
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
            className="bg-background/75 border-border/70 hover:bg-background absolute top-1/2 left-3 -translate-y-1/2 rounded-full shadow-lg backdrop-blur"
            onClick={scrollPrev}
            aria-label="Projeto anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-background/75 border-border/70 hover:bg-background absolute top-1/2 right-3 -translate-y-1/2 rounded-full shadow-lg backdrop-blur"
            onClick={scrollNext}
            aria-label="Próximo projeto"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots */}
      {showDots && scrollSnaps.length > 1 && (
        <div className="mt-8 flex justify-center gap-2.5">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === selectedIndex
                  ? 'bg-primary w-7'
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
