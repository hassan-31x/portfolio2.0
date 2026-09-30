import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import localFont from 'next/font/local'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { Navbar } from '@/components/custom/navbar'
import Footer from '@/components/custom/footer'
import StructuredData from '@/components/custom/structured-data'

const satoshi = localFont({
  src: '../../../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  weight: '300 900',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, satoshi.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${satoshi.className} antialiased bg-white dark:bg-black`}>
        <StructuredData />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-black"
          >
            Skip to content
          </a>
          <Navbar />
          <div className="portfolio-shell mx-auto w-full max-w-[715px] border-x border-neutral-200 dark:border-neutral-800">
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'Muhammad Hassan · Full Stack Engineer',
  description:
    'Full Stack Engineer building scalable web products and AI-powered systems. Explore projects, experience, and writing by Muhammad Hassan.',
  authors: [{ name: 'Muhammad Hassan' }],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@hassan_dev31',
    images: ['/og-image.png'],
  },
}
