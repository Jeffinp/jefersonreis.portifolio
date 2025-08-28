// Validation utilities

/**
 * Validates an email address
 * @param email Email string to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates a Brazilian phone number
 * @param phone Phone string to validate
 * @returns True if phone is valid
 */
export const isValidBrazilianPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '')
  return cleanPhone.length === 10 || cleanPhone.length === 11
}

/**
 * Validates a URL
 * @param url URL string to validate
 * @returns True if URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validates that a string is not empty (after trimming)
 * @param value String to validate
 * @returns True if string is not empty
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0
}

/**
 * Validates minimum length
 * @param value String to validate
 * @param minLength Minimum required length
 * @returns True if string meets minimum length
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength
}

/**
 * Validates maximum length
 * @param value String to validate
 * @param maxLength Maximum allowed length
 * @returns True if string doesn't exceed maximum length
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength
}

/**
 * Validates if value is a valid JSON string
 * @param value String to validate
 * @returns True if valid JSON
 */
export const isValidJson = (value: string): boolean => {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}

/**
 * Validates file extension
 * @param filename Filename to validate
 * @param allowedExtensions Array of allowed extensions
 * @returns True if file extension is allowed
 */
export const hasValidExtension = (
  filename: string,
  allowedExtensions: string[],
): boolean => {
  const extension = filename.toLowerCase().split('.').pop()
  return extension ? allowedExtensions.includes(extension) : false
}

/**
 * Validates file size
 * @param file File object to validate
 * @param maxSizeInBytes Maximum allowed size in bytes
 * @returns True if file size is within limits
 */
export const hasValidFileSize = (
  file: File,
  maxSizeInBytes: number,
): boolean => {
  return file.size <= maxSizeInBytes
}

/**
 * Contact form validation
 */
export const validateContactForm = (data: {
  name: string
  email: string
  message: string
}) => {
  const errors: { [key: string]: string } = {}

  if (!isNotEmpty(data.name)) {
    errors.name = 'Nome é obrigatório'
  } else if (!hasMinLength(data.name, 2)) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres'
  }

  if (!isNotEmpty(data.email)) {
    errors.email = 'Email é obrigatório'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Email inválido'
  }

  if (!isNotEmpty(data.message)) {
    errors.message = 'Mensagem é obrigatória'
  } else if (!hasMinLength(data.message, 10)) {
    errors.message = 'Mensagem deve ter pelo menos 10 caracteres'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
