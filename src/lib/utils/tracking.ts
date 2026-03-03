/**
 * Utilitários para tracking e analytics
 * Integração com Google Analytics, Facebook Pixel, etc.
 */

// Tipos de eventos
export type EventName =
  | 'page_view'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'lead_generated'
  | 'whatsapp_click'
  | 'download_cv'
  | 'project_view'
  | 'service_view'

interface EventParams {
  [key: string]: string | number | boolean | undefined
}

/**
 * Envia evento para Google Analytics
 */
export function trackEvent(eventName: EventName, params?: EventParams): void {
  if (typeof window === 'undefined') return

  // Google Analytics (gtag)
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params)
  }

  // Facebook Pixel
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', eventName, params)
  }

  // Console em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, params)
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: title || document.title,
  })
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location,
  })
}

/**
 * Track form start
 */
export function trackFormStart(formName: string): void {
  trackEvent('form_start', {
    form_name: formName,
  })
}

/**
 * Track form submission
 */
export function trackFormSubmit(
  formName: string,
  success: boolean,
  data?: EventParams
): void {
  trackEvent('form_submit', {
    form_name: formName,
    success,
    ...data,
  })
}

/**
 * Track lead generation
 */
export function trackLead(
  serviceType: string,
  value?: number,
  data?: EventParams
): void {
  trackEvent('lead_generated', {
    service_type: serviceType,
    value: value || 0,
    currency: 'BRL',
    ...data,
  })
}

/**
 * Track WhatsApp click
 */
export function trackWhatsAppClick(source: string): void {
  trackEvent('whatsapp_click', {
    source,
  })
}

/**
 * Track CV download
 */
export function trackCVDownload(): void {
  trackEvent('download_cv', {
    file_type: 'pdf',
  })
}

/**
 * Track project view
 */
export function trackProjectView(projectId: string, projectName: string): void {
  trackEvent('project_view', {
    project_id: projectId,
    project_name: projectName,
  })
}

/**
 * Track service view
 */
export function trackServiceView(
  serviceId: string,
  serviceName: string,
  price?: number
): void {
  trackEvent('service_view', {
    service_id: serviceId,
    service_name: serviceName,
    value: price,
    currency: 'BRL',
  })
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number): void {
  if (typeof window === 'undefined') return

  // Only track at 25%, 50%, 75%, 100%
  if (percentage % 25 === 0 && window.gtag) {
    window.gtag('event', 'scroll', {
      percent_scrolled: percentage,
    })
  }
}

/**
 * Track time on page
 */
export function trackTimeOnPage(seconds: number): void {
  if (typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('event', 'engagement', {
      engagement_time_msec: seconds * 1000,
    })
  }
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string, label?: string): void {
  if (typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: label || url,
      transport_type: 'beacon',
    })
  }
}

/**
 * Track download
 */
export function trackDownload(fileName: string, fileType: string): void {
  if (typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('event', 'file_download', {
      file_name: fileName,
      file_extension: fileType,
    })
  }
}

// Tipos globais para Window
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}
