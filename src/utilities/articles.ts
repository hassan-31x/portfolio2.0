import type { Post } from '@/payload-types'
import articleData from '@/content/articles.json'

// Generated from the reviewed Markdown by scripts/build-articles.mjs.
export const bundledArticles: Post[] = articleData.map((article) => ({
  ...article,
  content: article.content as Post['content'],
  _status: 'published',
}))

export function mergeArticles(cmsPosts: Post[]): Post[] {
  const posts = new Map(bundledArticles.map((post) => [post.slug, post]))
  for (const post of cmsPosts) posts.set(post.slug || post.id, post)
  return [...posts.values()].sort(
    (a, b) => Date.parse(b.publishedAt || b.createdAt) - Date.parse(a.publishedAt || a.createdAt),
  )
}
