import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Meta tags para tema */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />

        {/* Prevenção de FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  try {
                    const saved = localStorage.getItem('portfolio-theme')
                    if (saved && ['light', 'dark', 'system'].includes(saved)) {
                      if (saved !== 'system') return saved
                    }
                    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                  } catch {
                    return 'light'
                  }
                }

                function applyTheme(theme) {
                  const root = document.documentElement
                  root.classList.remove('light', 'dark')
                  root.classList.add(theme)
                  
                  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
                  if (metaThemeColor) {
                    metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff')
                  }
                }

                const initialTheme = getInitialTheme()
                applyTheme(initialTheme)
              })()
            `,
          }}
        />
      </Head>
      <body className="bg-white text-gray-900 antialiased transition-colors duration-300 dark:bg-slate-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
