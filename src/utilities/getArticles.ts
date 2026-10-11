import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { mergeArticles } from './articles'

/** Bundled articles and existing published CMS posts share the same renderers. */
export const getArticles = cache(async () => {
  try {
    const payload = await getPayload({ config })
    const posts = await payload.find({
      collection: 'posts', depth: 1, pagination: false, limit: 1000,
      overrideAccess: false, draft: false,
      where: { _status: { equals: 'published' } },
    })
    return mergeArticles(posts.docs)
  } catch (error) {
    console.error('CMS article query failed; serving bundled articles.', error instanceof Error ? error.name : 'UnknownError')
    return mergeArticles([])
  }
})
