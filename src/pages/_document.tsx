import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Meta tags para tema */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />

        {/* Prevenção de FOUC - Script de inicialização de tema */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Buscar tema salvo
                  let theme = 'light'
                  const saved = localStorage.getItem('portfolio-theme')
                  
                  if (saved && saved !== 'system') {
                    theme = saved
                  } else {
                    // Se for system ou não houver salvamento, usar preferência do sistema
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                  }
                  
                  // Aplicar tema imediatamente
                  const root = document.documentElement
                  const body = document.body
                  
                  root.classList.remove('light', 'dark')
                  root.classList.add(theme)
                  root.style.colorScheme = theme
                  
                  if (body) {
                    body.classList.remove('light', 'dark')
                    body.classList.add(theme)
                  }
                  
                  // Initial theme applied
                } catch (error) {
                  console.warn('Erro na inicialização do tema:', error)
                  // Fallback para modo claro
                  document.documentElement.classList.add('light')
                  document.documentElement.style.colorScheme = 'light'
                }
              })()
            `,
          }}
        />
      </Head>
      <body className="bg-white text-gray-900 antialiased transition-colors duration-300 dark:bg-slate-900 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
