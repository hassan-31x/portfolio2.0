import { getArticles } from '@/utilities/getArticles'
import { unstable_cache } from 'next/cache'

const publishedArticles = unstable_cache(
  async () => {
    const posts = await getArticles()
    return posts
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
