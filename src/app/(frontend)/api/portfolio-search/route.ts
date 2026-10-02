import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

const publishedArticles = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      depth: 0,
      limit: 200,
      pagination: false,
      overrideAccess: false,
      where: { _status: { equals: 'published' } },
      select: { title: true, slug: true, meta: { description: true } },
    })
    return posts.docs
      .filter((post) => post.slug)
      .map((post) => ({
        title: post.title,
        href: `/blogs/${encodeURIComponent(post.slug!)}`,
        kind: 'Article' as const,
        keywords: post.meta?.description || '',
      }))
  },
  ['portfolio-search-articles'],
  { revalidate: 60, tags: ['portfolio-search-articles'] },
)

export async function GET() {
  try {
    return Response.json(await publishedArticles())
  } catch {
    // Local project/page search still works if the CMS is unavailable.
    return Response.json([], { status: 503 })
  }
}
