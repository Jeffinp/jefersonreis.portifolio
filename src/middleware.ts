import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')

  // Add performance headers
  const pathname = request.nextUrl.pathname

  // Cache static assets more aggressively
  if (
    pathname.match(
      /\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot|otf|css|js)$/,
    )
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Add Vary header for better caching
  response.headers.set('Vary', 'Accept-Encoding, Accept-Language')

  // Add security headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
