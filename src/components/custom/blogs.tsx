'use client'

import Image from 'next/image'
import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Post } from '@/payload-types'
import Link from 'next/link'
import SectionHeading from './section-heading'

type Props = {
  blogs: Pick<Post, 'id' | 'title' | 'slug' | 'description' | 'heroImage' | 'publishedAt'>[]
}

const Blogs = ({ blogs }: Props) => {
  const reduceMotion = useReducedMotion()
  return (
    <div className="portfolio-section my-4 border-y border-neutral-100 px-4 py-3 shadow-[0px_1px_4px_0px_var(--color-neutral-100)_inset,0px_-1px_4px_0px_var(--color-neutral-100)_inset]">
      <SectionHeading delay={0.2}>Sharing knowledge as I learn</SectionHeading>
      <div className="py-2 flex flex-col gap-3">
        {blogs.length === 0 && (
          <p className="text-sm text-secondary">New articles are on the way.</p>
        )}
        {blogs.map((blog, idx) => (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, filter: 'blur(10px)', y: 10 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{
              duration: 0.3,
              delay: idx * 0.1,
              ease: 'easeInOut',
            }}
            key={blog.title}
            className="relative w-full"
          >
            <Link
              href={`/blogs/${blog.slug}`}
              className="group w-full flex flex-col md:flex-row space-x-0 md:space-x-4 mb-3"
            >
              {blog.heroImage && typeof blog.heroImage === 'object' && blog.heroImage.url && (
                <Image
                  src={blog.heroImage.url}
                  alt={blog.heroImage.alt || blog.title}
                  width={192}
                  height={128}
                  sizes="(max-width: 767px) 100vw, 192px"
                  className="h-32 w-full shrink-0 rounded-md object-cover mb-4 md:w-48 md:mb-0 transition duration-200 motion-safe:group-hover:scale-[1.02]"
                />
              )}
              <div className="flex flex-col justify-between">
                <div className="w-full">
                  <h3 className="font-medium text-sm md:text-base tracking-tight text-black dark:text-white">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 dark:text-zinc-400 text-[13px] leading-5 line-clamp-3 py-1">
                    {blog.description}
                  </p>
                </div>
                {blog.publishedAt && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
