import type { Metadata } from 'next'
import { mergeOpenGraph } from './mergeOpenGraph'

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: mergeOpenGraph({ title, description, url: path }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@hassan_dev31',
      images: ['/opengraph-image'],
    },
  }
}
