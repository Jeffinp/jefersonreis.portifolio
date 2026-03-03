'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ComponentProps } from 'react'

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>

/**
 * Provider de tema que envolve a aplicação
 * Usa next-themes para gerenciar light/dark/system themes
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
