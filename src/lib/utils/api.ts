/**
 * Utilitários para chamadas de API
 * Wrapper sobre fetch com retry e error handling
 */

interface ApiRequestOptions extends RequestInit {
  timeout?: number
}

interface ApiError extends Error {
  status?: number
  statusText?: string
}

/**
 * Erro customizado para APIs
 */
class ApiRequestError extends Error implements ApiError {
  status?: number
  statusText?: string

  constructor(message: string, status?: number, statusText?: string) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.statusText = statusText
  }
}

/**
 * Request genérico com timeout e error handling
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(endpoint, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new ApiRequestError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText
      )
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiRequestError('Request timeout', 408, 'Request Timeout')
    }

    throw error
  }
}

/**
 * GET request
 */
export async function apiGet<T = unknown>(
  endpoint: string,
  options?: ApiRequestOptions
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'GET',
  })
}

/**
 * POST request
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  data?: unknown,
  options?: ApiRequestOptions
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Retry wrapper para funções assíncronas
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, delay * (attempt + 1))
        )
      }
    }
  }

  throw lastError!
}

/**
 * Report error (console em dev, analytics em prod)
 */
export function reportError(
  error: Error,
  context?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === 'development') {
    console.error('[API Error]', error, context)
  } else {
    // Em produção, pode enviar para Sentry, LogRocket, etc.
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        ...context,
      })
    }
  }
}
