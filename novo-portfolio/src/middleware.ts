import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './lib/i18n'

export default createMiddleware({
  // Lista de todos os locales suportados
  locales,

  // Locale padrão quando nenhum corresponder
  defaultLocale,

  // Sempre usar prefixo de locale, mesmo para o padrão
  localePrefix: 'always',
})

export const config = {
  // Aplicar middleware apenas em rotas relevantes
  matcher: [
    // Habilitar redirect para locale
    '/',

    // Habilitar rotas com locale
    '/(pt|en)/:path*',

    // Não aplicar em:
    // - API routes
    // - Arquivos estáticos (_next/static)
    // - Imagens (_next/image)
    // - Assets (images, fonts, etc.)
    // - Favicon, robots, etc.
    '/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
