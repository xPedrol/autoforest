import './globals.scss'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
const atlassianFont = localFont({ src: './atlassian-sans.woff2' })
export const metadata: Metadata = {
  title: 'Auto Forest',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={atlassianFont.className}>{children}</body>
    </html>
  )
}
