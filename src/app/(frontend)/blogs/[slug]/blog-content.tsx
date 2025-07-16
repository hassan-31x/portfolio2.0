"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Heading } from "@/components/custom/heading"
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import type { Post } from '@/payload-types'

interface BlogContentProps {
    post: Post
}

export default function BlogContent({ post }: BlogContentProps) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
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
            </motion.div>

            {post.heroImage && (
                <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: 0.1,
                        ease: "easeInOut",
                    }}
                    className="mb-8 px-4"
                >
                    <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden">
                        <Media
                            resource={post.heroImage}
                            imgClassName="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            )}

            <motion.article
                initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                    duration: 0.3,
                    delay: 0.2,
                    ease: "easeInOut",
                }}
                className="px-4"
            >
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <RichText data={post.content} enableGutter={false} />
                </div>
            </motion.article>

            {post.relatedPosts && post.relatedPosts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: 0.3,
                        ease: "easeInOut",
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
