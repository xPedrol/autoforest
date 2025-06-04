import './globals.scss'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import localFont from 'next/font/local'
const atlassianFont = localFont({ src: './atlassian-sans.woff2' })
export const metadata: Metadata = {
  title: {
    default: 'AI Forest - Inventário Florestal Inteligente',
    template: '%s - AI Forest',
  },
  description:
    'O AI Forest é um sistema inteligente e autônomo para processamento de dados de inventário florestal, desenvolvido com foco em produtividade, precisão e automação.',
  keywords: [
    'inventário florestal',
    'inteligência artificial',
    'machine learning',
    'estimativa de volume',
    'estimativa de altura',
    'engenharia florestal',
    'florestas',
    'dados florestais',
    'relatórios florestais',
    'processamento de dados florestais',
    'tecnologia florestal',
    'sistema florestal',
    'autonomia florestal',
    'precisão florestal',
    'produtividade florestal',
    'automação florestal',
  ],
  authors: [
    {
      name: 'AI Forest',
      url: 'https://aiforest.com.br',
    },
  ],
  creator: 'AI Forest',
  openGraph: {
    title: 'AI Forest - Inventário Florestal Inteligente',
    description:
      'O AI Forest é um sistema inteligente e autônomo para processamento de dados de inventário florestal, desenvolvido com foco em produtividade, precisão e automação.',
    url: 'https://aiforest.com.br',
    siteName: 'AI Forest',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Forest - Inventário Florestal Inteligente',
      },
    ],
    locale: 'pt-BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Forest - Inventário Florestal Inteligente',
    description:
      'O AI Forest é um sistema inteligente e autônomo para processamento de dados de inventário florestal, desenvolvido com foco em produtividade, precisão e automação.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={atlassianFont.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
