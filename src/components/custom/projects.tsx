"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {}

const Projects = (props: Props) => {

  const projects = [
    {
      title: 'E-commerce Platform',
      src: 'https://images.unsplash.com/photo-1661956602116-aa6865609028',
      href: 'https://example.com/ecommerce',
      description: 'A platform for buying and selling products online',
    },
    {
      title: 'Task Management App',
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      href: 'https://example.com/taskmanager',
      description: 'A platform for managing tasks and projects',
    },
    {
      title: 'Social Media Dashboard',
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      href: 'https://example.com/dashboard',
      description: 'A platform for managing social media accounts',
    },
    {
      title: 'Weather Forecast App',
      src: 'https://images.unsplash.com/photo-1592210454359-9043f067919b',
      href: 'https://example.com/weather',
      description: 'A platform for getting the weather forecast',
    }
  ]
  return (
    <div className="py-10">
  <p className="text-secondary max-w-lg pt-4 text-sm md:text-sm">
    I love building web apps and products that can impact millions of lives
  </p>
  <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
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