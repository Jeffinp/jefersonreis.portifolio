import { useEffect, useRef } from 'react'

/**
 * Hook to prevent automatic scroll jumps and maintain scroll position stability
 */
export const useScrollFix = () => {
  const lastScrollY = useRef(0)
  const isUserScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    let ticking = false
    let consecutiveScrollUps = 0
    const threshold = 5 // Number of consecutive upward scrolls to detect issue

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const delta = currentScrollY - lastScrollY.current

          // Detect unnatural scroll behavior (automatic scrolling up)
          if (delta < -10 && !isUserScrolling.current) {
            consecutiveScrollUps++
            
            // If we detect multiple consecutive unnatural upward scrolls, block them
            if (consecutiveScrollUps > threshold) {
              window.scrollTo(0, lastScrollY.current)
              console.warn('Blocked automatic scroll jump')
              consecutiveScrollUps = 0
              return
            }
          } else if (delta > 0 || Math.abs(delta) < 10) {
            // Reset counter on downward scroll or small movements
            consecutiveScrollUps = 0
          }

          lastScrollY.current = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    // Detect user interaction
    const handleUserInteraction = () => {
      isUserScrolling.current = true
      clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        isUserScrolling.current = false
      }, 150)
    }

    // Listen for user scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleUserInteraction, { passive: true })
    window.addEventListener('touchmove', handleUserInteraction, { passive: true })
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        handleUserInteraction()
      }
    })

    // Prevent scroll restoration on page load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleUserInteraction)
      window.removeEventListener('touchmove', handleUserInteraction)
      clearTimeout(scrollTimeout.current)
    }
  }, [])

  // Force scroll position reset if needed
  const resetScroll = () => {
    window.scrollTo(0, 0)
    lastScrollY.current = 0
  }

  return { resetScroll }
}