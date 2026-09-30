import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import { Inter } from 'next/font/google'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { Navbar } from '@/components/custom/navbar'
import Footer from '@/components/custom/footer'
import StructuredData from '@/components/custom/structured-data'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-black`}>
        <StructuredData />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {/* <Header /> */}
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'Muhammad Hassan · Full Stack Engineer',
  description: 'Full Stack Engineer building scalable web products and AI-powered systems. Explore projects, experience, and writing by Muhammad Hassan.',
  authors: [{ name: 'Muhammad Hassan' }],
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '32x32' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@hassan_dev31',
    images: ['/og-image.png'],
  },
}
