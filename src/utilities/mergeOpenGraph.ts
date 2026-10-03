import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'AI Product Engineer building agentic and multimodal systems, RAG pipelines, and real-time voice agents.',
  images: [
    {
      url: `${getServerSideURL()}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: 'Muhammad Hassan, AI Product Engineer',
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
