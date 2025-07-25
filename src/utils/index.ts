/**
 * Função debounce para limitar a frequência de execução de funções
 * Especialmente útil em eventos como resize e scroll
 *
 * @param func Função a ser executada após o delay
 * @param wait Tempo de espera em milissegundos
 * @returns Função com debounce aplicado
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
 * Formata um valor para moeda brasileira
 * @param value Valor a ser formatado
 * @returns String formatada em BRL
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Formata uma data no formato ISO para exibição localizada
 *
 * @param dateString String de data em formato ISO ou compatível com Date
 * @param locale Localidade para formatação (padrão: pt-BR)
 * @returns String formatada da data
 */
export function formatDate(
  dateString: string,
  locale: string = 'pt-BR',
): string {
  try {
    const date = new Date(dateString)

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return dateString
  }
}

/**
 * Trunca um texto para um tamanho máximo e adiciona reticências se necessário
 *
 * @param text Texto a ser truncado
 * @param maxLength Tamanho máximo desejado
 * @returns Texto truncado
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength).trim()}...`
}

/**
 * Remove acentos e caracteres especiais de uma string
 * @param text Texto a ser processado
 * @returns Texto sem acentos ou caracteres especiais
 */
export const removeAccents = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
}

/**
 * Converte uma string em slug (URL friendly)
 * @param text Texto a ser convertido
 * @returns String no formato slug
 */
export const slugify = (text: string): string => {
  return removeAccents(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

/**
 * Gera um ID aleatório com prefixo opcional
 *
 * @param prefix Prefixo opcional para o ID
 * @returns String com ID único
 */
export function generateId(prefix: string = 'id'): string {
  const randomPart = Math.random().toString(36).substring(2, 9)
  return `${prefix}_${randomPart}`
}

/**
 * Converte primeira letra de cada palavra para maiúscula
 *
 * @param text Texto a ser capitalizado
 * @returns Texto com palavras capitalizadas
 */
export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
