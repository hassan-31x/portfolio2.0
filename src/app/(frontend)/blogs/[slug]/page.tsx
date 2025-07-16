import type { Metadata } from 'next'

import { Container } from "@/components/custom/container"
import { Heading } from "@/components/custom/heading"
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { Post } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <div className="flex min-h-screen items-start justify-start">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <Container className="min-h-screen px-10 md:pt-20 md:pb-10">
        <div className="mb-8">
          <Heading as="h1" className="mb-4">
            {post.title}
          </Heading>

          {post.description && (
            <p className="text-secondary px-4 max-w-3xl text-base md:text-lg leading-relaxed">
              {post.description}
            </p>
          )}

          {post.publishedAt && (
            <p className="px-4 mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              Published on {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}

          {post.categories && post.categories.length > 0 && (
            <div className="px-4 mt-4 flex flex-wrap gap-2">
              {post.categories.map((category: any) => (
                <span
                  key={category.id || category}
                  className="inline-block px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full"
                >
                  {typeof category === 'object' ? category.title : category}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.heroImage && (
          <div className="mb-8 px-4">
            <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden">
              <Media
                resource={post.heroImage}
                imgClassName="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <article className="px-4">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <RichText data={post.content} enableGutter={false} />
          </div>
        </article>

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16 px-4">
            <h3 className="text-xl font-semibold mb-6 text-neutral-700 dark:text-neutral-300">
              Related Posts
            </h3>
            <RelatedPosts
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          </div>
        )}
      </Container>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
