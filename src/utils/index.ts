// Export all utilities from their respective modules
export * from './constants'
export * from './validators'
export * from './formatters'
export * from './api'
export * from './dom'
export * from './animations'
export * from './imageOptimization'

/**
 * Função debounce para limitar a frequência de execução de funções
 * Especialmente útil em eventos como resize e scroll
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>): void {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Gera um ID aleatório com prefixo opcional
 */
export function generateId(prefix: string = 'id'): string {
  const randomPart = Math.random().toString(36).substring(2, 9)
  return `${prefix}_${randomPart}`
}

/**
 * Remove acentos e caracteres especiais de uma string
 */
export const removeAccents = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
}
