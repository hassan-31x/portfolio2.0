import { pageMetadata } from '@/utilities/pageMetadata'
import type { Metadata } from 'next/types'

import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading'
import { Subheading } from '@/components/custom/subheading'
import { Pagination } from '@/components/Pagination'
import { getArticles } from '@/utilities/getArticles'
import React from 'react'
import PageClient from './page.client'
import Blogs from '@/components/custom/blogs'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const posts = await getArticles()
  const totalPages = Math.ceil(posts.length / 12)

  return (
    <div className="flex min-h-screen items-start justify-start">
      <PageClient />
      <Container className="min-h-screen pt-6 pb-10 md:pt-6 md:pb-10">
        <Heading>Blog Posts</Heading>
        <Subheading>
          Notes from building AI systems and software products, with lessons from experiments,
          implementation, and the work behind them.
        </Subheading>

        <Blogs blogs={posts.slice(0, 12)} />

        {totalPages > 1 && (
          <div className="px-4 mt-8">
            <Pagination page={1} totalPages={totalPages} />
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
