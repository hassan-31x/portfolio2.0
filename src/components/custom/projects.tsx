"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeading from './section-heading'
import { ProjectTypes } from '@/constants/project'

type Props = {
  projects: ProjectTypes
}

const Projects = ({ projects }: Props) => {

  
  return (
    // TODO: add more box shadow from the end of video
  <div className="my-4 border-y border-neutral-100 px-4 shadow-[0px_1px_4px_0px_var(--color-neutral-100)_inset,0px_-1px_4px_0px_var(--color-neutral-100)_inset]">
  <SectionHeading delay={0.2}>A lifetime in Projects</SectionHeading>
  <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
    {projects.map((project, idx) => (
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{
          duration: 0.3,
          delay: idx * 0.1,
          ease: "easeInOut",
        }}
        key={project.title}
        className="relative mb-4"
      >
        <Link href={project.href}>
        <Image
          src={project.src}
          alt={project.title}
          width={300}
          height={300}
          className="w-full rounded-xl object-cover transition duration-200 group-hover:scale-[1.02]"
        />
        <h2 className='z-20 mt-2 font-medium tracking-tight text-neutral-500 dark:text-neutral-400'>
          {project.title}
        </h2>
        <p className="max-w-xs mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {project.description}
        </p>
        </Link>

      </motion.div>
    ))}
  </div>
</div>
  )
}

export default Projects