import { getServerSideURL } from '@/utilities/getURL'
import { getServerSideSitemap } from 'next-sitemap'
import { getArticles } from '@/utilities/getArticles'
import { unstable_cache } from 'next/cache'

const getPostsSitemap = unstable_cache(
  async () => {
    const SITE_URL = getServerSideURL()

    const posts = await getArticles()

    const dateFallback = new Date().toISOString()

    const sitemap = posts
      ? posts
          .filter((post) => Boolean(post?.slug))
          .map((post) => ({
            loc: `${SITE_URL}/blogs/${post?.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
