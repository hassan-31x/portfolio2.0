import type { Metadata } from 'next'
import type { Media, Page, Post, Config } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  const source = image && typeof image === 'object' ? image.sizes?.og?.url || image.url : null
  return new URL(source || '/opengraph-image', serverUrl).href
}

export const generateMeta = async ({
  doc,
  path: requestedPath,
}: {
  doc: Partial<Page> | Partial<Post> | null
  path?: string
}): Promise<Metadata> => {
  const path = requestedPath || (doc?.slug && doc.slug !== 'home' ? `/${doc.slug}` : '/')
  const image = getImageURL(doc?.meta?.image)
  const sourceTitle = doc?.meta?.title || doc?.title || 'Muhammad Hassan · AI Engineer'
  const title = sourceTitle.includes('Muhammad Hassan')
    ? sourceTitle
    : `${sourceTitle} | Muhammad Hassan`
  const description =
    doc?.meta?.description ||
    (doc && 'description' in doc ? doc.description : '') ||
    'AI projects and engineering writing by Muhammad Hassan.'
  const article = path.startsWith('/blogs/') ? (doc as Partial<Post> | null) : null

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(doc?._status === 'draft' ? { robots: { index: false, follow: false } } : {}),
    openGraph: mergeOpenGraph({
      title,
      description,
      url: path,
      images: [{ url: image, alt: sourceTitle }],
      ...(article
        ? {
            type: 'article',
            publishedTime: article.publishedAt || undefined,
            modifiedTime: article.updatedAt,
            authors: ['Muhammad Hassan'],
          }
        : {}),
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@hassan_dev31',
      images: [image],
    },
  }
}
