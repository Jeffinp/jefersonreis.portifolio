// Utility functions for conversion tracking and analytics

interface WindowWithDataLayer extends Window {
  dataLayer?: any[]
  gtag?: (...args: any[]) => void
  fbq?: (...args: any[]) => void
}

declare const window: WindowWithDataLayer

/**
 * Track lead generation event
 */
export const trackLead = (serviceType: string, value: number) => {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'BRL',
      value: value,
      service_type: serviceType,
      event_category: 'engagement',
      event_label: 'lead_form'
    })

    // Google Ads conversion tracking
    window.gtag('event', 'conversion', {
      'send_to': process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
      'value': value,
      'currency': 'BRL'
    })
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      value: value,
      currency: 'BRL',
      content_name: serviceType
    })
  }
}

/**
 * Track form start event
 */
export const trackFormStart = (formType: string) => {
  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: 0,
      form_type: formType,
      event_category: 'engagement',
      event_label: 'form_start'
    })
  }
  
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout')
  }
}

/**
 * Track WhatsApp click event
 */
export const trackWhatsAppClick = (source: string) => {
  if (window.gtag) {
    window.gtag('event', 'contact_whatsapp', {
      source: source,
      event_category: 'engagement',
      event_label: 'whatsapp_click'
    })
  }
  
  if (window.fbq) {
    window.fbq('track', 'Contact', {
      contact_method: 'whatsapp',
      source: source
    })
  }
}

/**
 * Track page view with custom parameters
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle
    })
  }

  if (window.fbq) {
    window.fbq('track', 'PageView')
  }
}

/**
 * Track custom event
 */
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      event_category: parameters?.category || 'engagement',
      event_label: parameters?.label || eventName
    })
  }

  if (window.fbq && parameters?.fbEvent) {
    window.fbq('track', parameters.fbEvent, parameters)
  }
}

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number) => {
  if (window.gtag) {
    window.gtag('event', 'scroll', {
      percent_scrolled: percentage,
      event_category: 'engagement',
      event_label: `${percentage}%`
    })
  }
}

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds: number) => {
  if (window.gtag) {
    window.gtag('event', 'time_on_page', {
      value: seconds,
      event_category: 'engagement',
      event_label: `${seconds} seconds`
    })
  }
}

/**
 * Track service view
 */
export const trackServiceView = (serviceId: string, serviceName: string, price: string) => {
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'BRL',
      value: parseFloat(price.replace(/[^0-9]/g, '')) || 0,
      items: [{
        item_id: serviceId,
        item_name: serviceName,
        price: price,
        quantity: 1
      }]
    })
  }

  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [serviceId],
      content_name: serviceName,
      content_type: 'product',
      value: parseFloat(price.replace(/[^0-9]/g, '')) || 0,
      currency: 'BRL'
    })
  }
}

/**
 * Track form submission
 */
export const trackFormSubmission = (formName: string, data?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', 'form_submit', {
      form_name: formName,
      ...data,
      event_category: 'engagement',
      event_label: formName
    })
  }

  if (window.fbq) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: formName,
      ...data
    })
  }
}

/**
 * Track CTA click
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_name: ctaName,
      location: location,
      event_category: 'engagement',
      event_label: `${ctaName}_${location}`
    })
  }
}

/**
 * Track download
 */
export const trackDownload = (fileName: string, fileType: string) => {
  if (window.gtag) {
    window.gtag('event', 'file_download', {
      file_name: fileName,
      file_type: fileType,
      event_category: 'engagement',
      event_label: fileName
    })
  }
}

/**
 * Get service value for tracking
 */
export const getServiceValue = (serviceType: string): number => {
  const serviceValues: Record<string, number> = {
    'landing': 1150,
    'site': 2250,
    'ia': 3750,
    'app': 7500,
    'saas': 6000,
    'custom': 5000
  }
  
  return serviceValues[serviceType] || 1000
}

/**
 * Initialize tracking scripts
 */
export const initializeTracking = () => {
  // Google Analytics 4
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer?.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
  }

  // Facebook Pixel
  if (process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) {
    !function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    
    window.fbq?.('init', process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID)
    window.fbq?.('track', 'PageView')
  }
}

/**
 * Track bounce rate
 */
export const trackBounceRate = () => {
  let engaged = false
  
  // Track engagement after 15 seconds
  setTimeout(() => {
    if (!engaged) {
      engaged = true
      trackEvent('user_engagement', {
        engagement_time_msec: 15000,
        category: 'engagement',
        label: 'engaged_user'
      })
    }
  }, 15000)

  // Track on scroll
  const handleScroll = () => {
    if (!engaged && window.scrollY > 100) {
      engaged = true
      trackEvent('user_engagement', {
        trigger: 'scroll',
        category: 'engagement',
        label: 'engaged_user'
      })
      window.removeEventListener('scroll', handleScroll)
    }
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
}

/**
 * Generate UTM URL
 */
export const generateUTMUrl = (
  baseUrl: string,
  source: string,
  medium: string,
  campaign: string,
  term?: string,
  content?: string
): string => {
  const url = new URL(baseUrl)
  url.searchParams.set('utm_source', source)
  url.searchParams.set('utm_medium', medium)
  url.searchParams.set('utm_campaign', campaign)
  if (term) url.searchParams.set('utm_term', term)
  if (content) url.searchParams.set('utm_content', content)
  return url.toString()
}