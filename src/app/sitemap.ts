import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'
import { researchProjects } from '@/constants/research-projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getServerSideURL()
  const routes = [
    '',
    '/projects',
    '/about',
    '/blogs',
    '/contact',
    ...researchProjects.map(({ slug }) => `/projects/${slug}`),
  ]

  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.7,
  }))
}
