import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppProviders from '@/features/common/components/AppProviders'

const inter = Inter({ subsets: ['latin'] })

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
        <body className={inter.className}>{children}</body>
      </html>
    </AppProviders>
  )
}
