import { pageMetadata } from '@/utilities/pageMetadata'
import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { getArticles } from '@/utilities/getArticles'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1) notFound()

  const posts = await getArticles()
  const totalPages = Math.max(1, Math.ceil(posts.length / 12))
  if (sanitizedPageNumber > totalPages) notFound()

  return (
    <div className="pt-6 pb-10">
      <PageClient />
      <div className="px-4 mb-6">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-xl font-medium md:text-2xl">Blogs</h1>
        </div>
      </div>

      <div className="px-4 mb-4">
        <PageRange
          collection="posts"
          currentPage={sanitizedPageNumber}
          limit={12}
          totalDocs={posts.length}
        />
      </div>

      <CollectionArchive posts={posts.slice((sanitizedPageNumber - 1) * 12, sanitizedPageNumber * 12)} />

      <div className="px-4">
        {totalPages > 1 && (
          <Pagination page={sanitizedPageNumber} totalPages={totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return pageMetadata(
    `Blogs | Muhammad Hassan | Page ${pageNumber}`,
    `Software development articles by Muhammad Hassan, page ${pageNumber}.`,
    Number(pageNumber) === 1 ? '/blogs' : `/blogs/page/${pageNumber}`,
  )
}

export async function generateStaticParams() {
  const posts = await getArticles()
  const totalPages = Math.ceil(posts.length / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
