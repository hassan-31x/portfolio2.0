"use client"

import Image from 'next/image'
import React from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeading from './section-heading'

type Props = {
  blogs: any
}

const Blogs = ({ blogs }: Props) => {
  return (
    <div className="my-4 border-y border-neutral-100 px-4 py-6 shadow-[0px_1px_4px_0px_var(--color-neutral-100)_inset,0px_-1px_4px_0px_var(--color-neutral-100)_inset]">
      <SectionHeading delay={0.2}>Sharing knowledge as I learn</SectionHeading>
      <div className="py-4 flex flex-col gap-4">
        {blogs.map((blog: any, idx: number) => (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: idx * 0.1,
              ease: "easeInOut",
            }}
            key={blog.title}
            className="relative mb-4 w-full"
          >
            <Link href={`/blogs/${blog.slug}`} className='group w-full flex flex-col md:flex-row space-x-0 md:space-x-4 mb-10'>
              <img
                src={`/media/${blog.heroImage.filename}`}
                className="rounded-md w-72 mb-4 md:mb-0 transition duration-200 group-hover:scale-[1.02]"
              />
              <div className="flex flex-col justify-between">
                <div className='w-full md:w-3/4'>
                  <h4 className="font-bold text-base md:text-xl tracking-tight text-black dark:text-white">
                    {blog.title}
                  </h4>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm line-clamp-4 py-2">
                    {blog.description}
                  </p>
                </div>
                {blog.publishedAt && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
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

export default Blogs;
