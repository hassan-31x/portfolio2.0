'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Heading } from '@/components/custom/heading'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import type { Post } from '@/payload-types'

interface BlogContentProps {
  post: Post
}

function articleText(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  const node = value as { text?: string; children?: unknown[]; root?: unknown }
  return [node.text || '', ...(node.children || []).map(articleText), articleText(node.root)].join(
    ' ',
  )
}

export default function BlogContent({ post }: BlogContentProps) {
  const minutes = Math.max(1, Math.ceil(articleText(post.content).trim().split(/\s+/).length / 200))
  return (
    <>
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="mb-8"
      >
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
            Muhammad Hassan · {minutes} min read ·{' '}
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}

        {post.categories && post.categories.length > 0 && (
          <div className="px-4 mt-4 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={typeof category === 'object' ? category.id : category}
                className="inline-block px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full"
              >
                {typeof category === 'object' ? category.title : category}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {post.heroImage && (
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: 'easeInOut',
          }}
          className="mb-8 px-4"
        >
          <div className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <Media resource={post.heroImage} imgClassName="w-full h-auto" priority />
          </div>
        </motion.div>
      )}

      <motion.article
        initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
          ease: 'easeInOut',
        }}
        className="px-4 min-w-0"
      >
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <RichText data={post.content} enableGutter={false} />
        </div>
      </motion.article>

      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.3,
            ease: 'easeInOut',
          }}
          className="mt-16 px-4"
        >
          <h3 className="text-xl font-semibold mb-6 text-neutral-700 dark:text-neutral-300">
            Related Posts
          </h3>
          <RelatedPosts
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            docs={post.relatedPosts.filter((post) => typeof post === 'object')}
          />
        </motion.div>
      )}
    </>
  )
}
