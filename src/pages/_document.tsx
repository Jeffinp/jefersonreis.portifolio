import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Meta tags para tema */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />

        {/* Preload recursos críticos para performance */}
        <link
          rel="preload"
          href="/assets/fonts/nunito-sans-v15-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//vercel.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preconnect para recursos críticos */}
        <link rel="preconnect" href="https://vitals.vercel-analytics.com" />

        {/* Google tag (gtag.js) para medição de conversões */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17550897920"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17550897920');
            `,
          }}
        />

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

        {/* Script de otimização de performance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Otimizar carregamento de imagens
              if ('loading' in HTMLImageElement.prototype) {
                document.documentElement.classList.add('native-lazy-loading')
              }
              
              // Detectar suporte a IntersectionObserver
              if ('IntersectionObserver' in window) {
                document.documentElement.classList.add('intersection-observer')
              }
              
              // Detectar connection API para otimizações baseadas na conexão
              if (navigator.connection && navigator.connection.effectiveType) {
                document.documentElement.classList.add('connection-' + navigator.connection.effectiveType)
                // Reduzir qualidade de imagens em conexões lentas
                if (['slow-2g', '2g'].includes(navigator.connection.effectiveType)) {
                  document.documentElement.classList.add('low-bandwidth')
                }
              }
              
              // Detectar preferência por movimento reduzido
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.classList.add('reduce-motion')
              }
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
