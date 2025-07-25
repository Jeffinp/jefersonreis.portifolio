/**
 * Script para inicialização do tema
 * Previne flash de conteúdo não estilizado (FOUC)
 */
;(function () {
  function getInitialTheme() {
    try {
      // Verificar tema salvo
      const saved = localStorage.getItem('portfolio-theme')
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        if (saved !== 'system') return saved
      }

      // Usar preferência do sistema como fallback
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    } catch {
      return 'light'
    }
  }

  function applyTheme(theme) {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    // Atualizar meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#0f172a' : '#ffffff',
      )
    }
  }

  // Aplicar tema inicial
  const initialTheme = getInitialTheme()
  applyTheme(initialTheme)
})()
