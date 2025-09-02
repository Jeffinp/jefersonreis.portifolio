// Performance Configuration
// FIXED TO MEDIUM MODE - All settings optimized for medium performance

export const PERFORMANCE_CONFIG = {
  // Image optimization settings
  images: {
    // Quality FIXED to medium (80) for all modes
    quality: {
      'ultra-low': 80,
      'low': 80,
      'medium': 80,
      'high': 80,
    },
    // Blur placeholder for images
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  },
  
  // Animation settings per performance mode
  animations: {
    'ultra-low': {
      enabled: false,
      duration: 0,
      stagger: 0,
    },
    'low': {
      enabled: true,
      duration: 0.3,
      stagger: 0.02,
    },
    'medium': {
      enabled: true,
      duration: 0.5,
      stagger: 0.05,
    },
    'high': {
      enabled: true,
      duration: 0.6,
      stagger: 0.1,
    },
  },
  
  // Particle settings FIXED to medium values
  particles: {
    'ultra-low': {
      count: 40,
      animated: true,
      fps: 30,
    },
    'low': {
      count: 40,
      animated: true,
      fps: 30,
    },
    'medium': {
      count: 40,
      animated: true,
      fps: 30,
    },
    'high': {
      count: 40,
      animated: true,
      fps: 30,
    },
  },
  
  // Lazy loading settings
  lazyLoading: {
    // Intersection Observer settings
    rootMargin: {
      'ultra-low': '50px',
      'low': '100px',
      'medium': '200px',
      'high': '300px',
    },
    threshold: {
      'ultra-low': 0.5,
      'low': 0.3,
      'medium': 0.2,
      'high': 0.1,
    },
  },
  
  // Component loading priorities
  componentPriorities: {
    hero: 'critical',
    about: 'high',
    skills: 'medium',
    services: 'medium',
    projects: 'low',
    timeline: 'low',
    testimonials: 'low',
    contact: 'medium',
  },
  
  // Preload settings
  preload: {
    fonts: [
      '/fonts/inter-var.woff2',
    ],
    criticalImages: [
      '/assets/images/profile.jpg',
      '/assets/images/logo.png',
    ],
  },
  
  // Performance thresholds
  thresholds: {
    fps: {
      critical: 20,
      low: 30,
      medium: 45,
      high: 60,
    },
    memory: {
      critical: 90,
      high: 80,
      medium: 60,
      low: 40,
    },
  },
  
  // Debounce/Throttle delays
  delays: {
    scroll: 100,
    resize: 200,
    mousemove: 50,
    input: 300,
  },
}

// Helper function to get config based on performance mode
export const getPerformanceConfig = (mode: 'ultra-low' | 'low' | 'medium' | 'high') => {
  return {
    imageQuality: PERFORMANCE_CONFIG.images.quality[mode],
    animations: PERFORMANCE_CONFIG.animations[mode],
    particles: PERFORMANCE_CONFIG.particles[mode],
    lazyLoadingRootMargin: PERFORMANCE_CONFIG.lazyLoading.rootMargin[mode],
    lazyLoadingThreshold: PERFORMANCE_CONFIG.lazyLoading.threshold[mode],
  }
}

// Device detection utilities - ALWAYS RETURNS MEDIUM
export const getDevicePerformanceMode = (): 'ultra-low' | 'low' | 'medium' | 'high' => {
  // FIXED: Always return medium regardless of device
  return 'medium'
}

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return
  
  // Preload fonts
  PERFORMANCE_CONFIG.preload.fonts.forEach(font => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = font
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
  
  // Preload critical images
  PERFORMANCE_CONFIG.preload.criticalImages.forEach(image => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = image
    link.as = 'image'
    document.head.appendChild(link)
  })
}

export default PERFORMANCE_CONFIG