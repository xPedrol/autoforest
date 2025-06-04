import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { protectedPages, authPages } from './configs/pages'
import { loginUser } from './configs/requests'
import { NextResponse } from 'next/server'
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/entrar',
    signOut: '/sair',
    error: '/entrar',
  },
  debug: true,
  trustHost: true,
  providers: [
    Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        const res = await loginUser({
          email: credentials?.email,
          senha: credentials?.password,
        })
        if (!res || !res.access_token) {
          throw new Error('Invalid credentials')
        }
        return {
          id: res.id || undefined,
          name: res.nome || undefined,
          email: res.email || undefined,
          access_token: res.access_token || undefined,
        }
      },
    }),
  ],
  callbacks: {
    async authorized({ auth, request }) {
      if (protectedPages.includes(request.nextUrl.pathname) && !auth?.user)
        return false
      if (authPages.includes(request.nextUrl.pathname) && auth?.user) {
        return NextResponse.redirect(
          new URL('/painel-de-controle', request.url),
        )
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.jwt = (user as any).access_token
      }
      return token
    },
  },
})
