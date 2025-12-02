import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Claude Relay Service - Admin',
  description: 'Admin dashboard for Claude Relay Service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="stylesheet" href="/lily-ui/output.css" />
      </head>
      <body>
        {children}
        <Script src="/lily-ui/alpine.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
