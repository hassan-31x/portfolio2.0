import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { socialImage } from '@/constants/social-image'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'AI Product Engineer building agentic and multimodal systems, RAG pipelines, and real-time voice agents.',
  images: [
    {
      ...socialImage,
      url: new URL(socialImage.url, getServerSideURL()).href,
      type: 'image/png',
    },
  ],
  siteName: 'Muhammad Hassan',
  title: 'Muhammad Hassan · AI Product Engineer',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
