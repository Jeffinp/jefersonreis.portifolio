import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina classes CSS de forma inteligente
 * Resolve conflitos do Tailwind e mescla classes condicionais
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
