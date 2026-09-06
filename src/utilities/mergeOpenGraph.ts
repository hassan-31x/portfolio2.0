import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Full Stack Engineer with a passion for building scalable and efficient systems.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Muhammad Hassan, Full Stack Engineer',
    },
  ],
  siteName: 'Muhammad Hassan',
  title: 'Muhammad Hassan - Software Engineer',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
