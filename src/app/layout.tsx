import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import AppProviders from '@/features/common/components/AppProviders'

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AWVRE | Quick Links',
  description: "It's AWVRE b*tch! Are you AWVRE?\nQuick links for AWVRE music and more.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProviders>
      <html lang="en">
        <body className={notoSansJp.className}>{children}</body>
      </html>
    </AppProviders>
  )
}
