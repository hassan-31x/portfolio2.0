"use client"

import Image from 'next/image'
import React from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeading from './section-heading'
import { Media } from '@/components/Media'

type BlogPost = {
    id: string
    title: string
    slug?: string | null
    description?: string
    heroImage?: any
    categories?: any[] | null
    meta?: {
        title?: string | null
        description?: string | null
        image?: any
    }
    publishedAt?: string | null
}

type Props = {
    posts: BlogPost[]
}

const BlogPosts = ({ posts }: Props) => {
    return (
        <div className="my-4 border-y border-neutral-100 px-4 py-6 shadow-[0px_1px_4px_0px_var(--color-neutral-100)_inset,0px_-1px_4px_0px_var(--color-neutral-100)_inset]">
            <SectionHeading delay={0.2}>Sharing knowledge as I learn</SectionHeading>
            <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
                {posts.map((post, idx) => (
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: idx * 0.1,
                            ease: "easeInOut",
                        }}
                        key={post.id}
                        className="relative mb-4"
                    >
                        <Link href={`/blogs/${post.slug || post.id}`} className='group'>
                            {post.heroImage && (
                                <div className="w-full h-48 rounded-xl overflow-hidden">
                                    {typeof post.heroImage === 'string' ? (
                                        <Image
                                            src={post.heroImage}
                                            alt={post.title}
                                            width={300}
                                            height={200}
                                            className="w-full h-full object-cover transition duration-200 group-hover:scale-[1.02]"
                                        />
                                    ) : (
                                        <Media
                                            resource={post.heroImage}
                                            imgClassName="w-full h-full object-cover transition duration-200 group-hover:scale-[1.02]"
                                        />
                                    )}
                                </div>
                            )}
                            <h2 className='z-20 mt-2 font-medium tracking-tight text-neutral-500 dark:text-neutral-400'>
                                {post.title}
                            </h2>
                            <p className="max-w-xs mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3">
                                {post.description || post.meta?.description || 'No description available'}
                            </p>
                            {post.categories && post.categories.length > 0 && (
                                <div className='mt-2 flex max-w-[14rem] flex-wrap gap-1'>
                                    <LayoutGroup>
                                        {post.categories.slice(0, 3).map((category: any) => (
                                            <span
                                                key={category.id || category}
                                                className="inline-block px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                                            >
                                                {typeof category === 'object' ? category.title : category}
                                            </span>
                                        ))}
                                    </LayoutGroup>
                                </div>
                            )}
                            {post.publishedAt && (
                                <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )}
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default BlogPosts
