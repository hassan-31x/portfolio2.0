import { pageMetadata } from '@/utilities/pageMetadata'
import type { Metadata } from 'next/types'

import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading'
import BlogPosts from '@/components/custom/blog-posts'
import { Subheading } from '@/components/custom/subheading'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import Blogs from '@/components/custom/blogs'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      description: true,
      heroImage: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <div className="flex min-h-screen items-start justify-start">
      <PageClient />
      <Container className="min-h-screen pt-6 pb-10 md:pt-6 md:pb-10">
        <Heading>Blog Posts</Heading>
        <Subheading>
          Notes from building AI systems and software products, with lessons from experiments,
          implementation, and the work behind them.
        </Subheading>

        {/* <div className="mb-8 px-4">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div> */}

        <Blogs blogs={posts?.docs} />

        {posts.totalPages > 1 && posts.page && (
          <div className="px-4 mt-8">
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          </div>
        )}
      </Container>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return pageMetadata(
    'Blogs | Muhammad Hassan',
    'Writing on AI systems, software products, and engineering lessons by Muhammad Hassan.',
    '/blogs',
  )
}
