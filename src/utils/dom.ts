// DOM manipulation utilities

/**
 * Safely gets an element by ID
 * @param id Element ID
 * @returns Element or null
 */
export const getElementById = (id: string): HTMLElement | null => {
  return document.getElementById(id)
}

/**
 * Safely queries for an element
 * @param selector CSS selector
 * @returns Element or null
 */
export const querySelector = (selector: string): Element | null => {
  return document.querySelector(selector)
}

/**
 * Safely queries for multiple elements
 * @param selector CSS selector
 * @returns NodeList
 */
export const querySelectorAll = (selector: string): NodeListOf<Element> => {
  return document.querySelectorAll(selector)
}

/**
 * Checks if element is in viewport
 * @param element Element to check
 * @param threshold Intersection threshold (0-1)
 * @returns True if element is visible
 */
export const isElementInViewport = (
  element: HTMLElement,
  threshold: number = 0.1,
): boolean => {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  const verticalVisible =
    rect.top < windowHeight * (1 - threshold) &&
    rect.bottom > windowHeight * threshold

  const horizontalVisible =
    rect.left < windowWidth * (1 - threshold) &&
    rect.right > windowWidth * threshold

  return verticalVisible && horizontalVisible
}

/**
 * Smoothly scrolls to an element
 * @param element Element to scroll to
 * @param offset Optional offset from top
 */
export const scrollToElement = (
  element: HTMLElement,
  offset: number = 0,
): void => {
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.scrollY - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

/**
 * Scrolls to top of page
 */
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

/**
 * Gets scroll position
 * @returns Object with scroll coordinates
 */
export const getScrollPosition = () => {
  return {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset,
  }
}

/**
 * Gets element dimensions and position
 * @param element Element to measure
 * @returns Object with dimensions and position
 */
export const getElementBounds = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
  }
}

/**
 * Adds event listener with cleanup
 * @param element Element to attach listener to
 * @param event Event name
 * @param handler Event handler
 * @param options Event listener options
 * @returns Cleanup function
 */
export const addEventListener = (
  element: HTMLElement | Window | Document,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions,
): (() => void) => {
  element.addEventListener(event, handler, options)

  return () => {
    element.removeEventListener(event, handler, options)
  }
}

/**
 * Debounced window resize handler
 * @param callback Callback to execute on resize
 * @param delay Debounce delay in ms
 * @returns Cleanup function
 */
export const onWindowResize = (
  callback: () => void,
  delay: number = 100,
): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout>

  const debouncedCallback = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(callback, delay)
  }

  return addEventListener(window, 'resize', debouncedCallback)
}

/**
 * Throttled scroll handler
 * @param callback Callback to execute on scroll
 * @param delay Throttle delay in ms
 * @returns Cleanup function
 */
export const onWindowScroll = (
  callback: () => void,
  delay: number = 16,
): (() => void) => {
  let ticking = false

  const throttledCallback = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback()
        ticking = false
      })
      ticking = true
    }
  }

  return addEventListener(window, 'scroll', throttledCallback, {
    passive: true,
  })
}

/**
 * Copies text to clipboard
 * @param text Text to copy
 * @returns Promise that resolves when text is copied
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'absolute'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'

      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error)
    throw error
  }
}

/**
 * Gets current browser theme preference
 * @returns 'dark' | 'light'
 */
export const getBrowserThemePreference = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return 'light'
}
