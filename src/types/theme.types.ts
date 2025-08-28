export type Theme = 'light' | 'dark' | 'system'

export type ResolvedTheme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  mounted: boolean
}

export interface ThemeProviderProps {
  children: React.ReactNode
}
