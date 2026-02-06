import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

function checkBasicAuth(request: NextRequest): NextResponse | null {
  const password = process.env.AUTH_PASSWORD
  if (!password) return null

  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded)
      const [, pwd] = decoded.split(':')
      if (pwd === password) return null
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Learning Quest Board"' },
  })
}

export default function middleware(request: NextRequest) {
  const authResponse = checkBasicAuth(request)
  if (authResponse) return authResponse

  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(zh|en)/:path*', '/api/:path*']
}
