// Formatting utilities

/**
 * Formats a number as Brazilian currency
 * @param value Number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Formats a date string for display
 * @param dateString Date string to format
 * @param locale Locale for formatting
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  locale: string = 'pt-BR',
): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}

/**
 * Formats a date as relative time (e.g., "2 days ago")
 * @param dateString Date string to format
 * @param locale Locale for formatting
 * @returns Relative time string
 */
export const formatRelativeTime = (
  dateString: string,
  locale: string = 'pt-BR',
): string => {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMilliseconds = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Hoje'
    if (diffInDays === 1) return 'Ontem'
    if (diffInDays < 7) return `${diffInDays} dias atrás`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} semanas atrás`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} meses atrás`

    return `${Math.floor(diffInDays / 365)} anos atrás`
  } catch (error) {
    console.error('Error formatting relative time:', error)
    return dateString
  }
}

/**
 * Formats a phone number for display
 * @param phone Phone number to format
 * @returns Formatted phone string
 */
export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '')

  if (cleanPhone.length === 10) {
    // Format: (XX) XXXX-XXXX
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else if (cleanPhone.length === 11) {
    // Format: (XX) 9XXXX-XXXX
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  return phone
}

/**
 * Formats file size in human-readable format
 * @param bytes File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Formats a number with thousand separators
 * @param num Number to format
 * @param locale Locale for formatting
 * @returns Formatted number string
 */
export const formatNumber = (num: number, locale: string = 'pt-BR'): string => {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Formats a percentage
 * @param value Decimal value to format as percentage
 * @param decimals Number of decimal places
 * @returns Formatted percentage string
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1,
): string => {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Capitalizes the first letter of a string
 * @param text String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Capitalizes first letter of each word
 * @param text String to title case
 * @returns Title cased string
 */
export const toTitleCase = (text: string): string => {
  return text
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ')
}

/**
 * Truncates text to specified length with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @param suffix Suffix to add (default: '...')
 * @returns Truncated text
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = '...',
): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length).trim() + suffix
}

/**
 * Creates a URL-friendly slug from text
 * @param text Text to slugify
 * @returns URL slug
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
