// API utilities and helpers

export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
  message?: string
}

/**
 * Generic fetch wrapper with error handling
 * @param url URL to fetch
 * @param options Fetch options
 * @returns Promise with standardized response
 */
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        error: data.message || 'Request failed',
        status: response.status,
        message: data.message,
      }
    }

    return {
      data,
      status: response.status,
      message: 'Success',
    }
  } catch (error) {
    console.error('API Request Error:', error)
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
      message: 'Network error',
    }
  }
}

/**
 * POST request helper
 * @param url URL to post to
 * @param data Data to send
 * @returns Promise with response
 */
export async function apiPost<T, U>(
  url: string,
  data: T,
): Promise<ApiResponse<U>> {
  return apiRequest<U>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * GET request helper
 * @param url URL to fetch from
 * @param params Query parameters
 * @returns Promise with response
 */
export async function apiGet<T>(
  url: string,
  params: Record<string, string> = {},
): Promise<ApiResponse<T>> {
  const urlWithParams = new URL(url, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    urlWithParams.searchParams.append(key, value)
  })

  return apiRequest<T>(urlWithParams.toString())
}

/**
 * Contact form submission
 * @param formData Contact form data
 * @returns Promise with submission result
 */
export async function submitContactForm(formData: {
  name: string
  email: string
  message: string
  subject?: string
}): Promise<ApiResponse<{ success: boolean }>> {
  return apiPost('/api/contact', formData)
}

/**
 * Analytics event tracking
 * @param eventName Event name
 * @param properties Event properties
 * @returns Promise with tracking result
 */
export async function trackEvent(
  eventName: string,
  properties: Record<string, any> = {},
): Promise<ApiResponse<{ tracked: boolean }>> {
  return apiPost('/api/analytics', {
    event: eventName,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    },
  })
}

/**
 * Error reporting utility
 * @param error Error object or string
 * @param context Additional context
 */
export async function reportError(
  error: Error | string,
  context: Record<string, any> = {},
): Promise<void> {
  try {
    const errorData = {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      context: {
        ...context,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      },
    }

    await apiPost('/api/errors', errorData)
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError)
  }
}

/**
 * Retry mechanism for failed requests
 * @param fn Function to retry
 * @param retries Number of retries
 * @param delay Delay between retries in ms
 * @returns Promise with result
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      return withRetry(fn, retries - 1, delay * 2) // Exponential backoff
    }
    throw error
  }
}
