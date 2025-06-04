export { auth as middleware } from '@/auth'
export const config = {
  matcher: [
    // Exclude API routes, static files, and files with extensions
    '/((?!api|static|.*\\..*|_next).*)',
  ],
}
