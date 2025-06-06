"use client"

import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: string;
  delay?: number; 
}

const SectionHeading = ({ children, delay=0 }: Props) => {
  return (
  <h2 className="max-w-lg relative mt-4 w-fit text-sm font-normal md:text-sm">
    <Background />
    {children.split(" ").map((word, idx) => (
      <motion.span
        initial={{
          opacity: 0,
          y: 5,
          filter: "blur(2px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
        }} 
        transition={{
          delay: 0.05 * idx,
          duration: 0.3,
          ease: "easeInOut",
        }}
        key={word + idx}
        className="inline-block"
      >
        {word}&nbsp;
      </motion.span>
    ))}
  </h2>
  )
}

const Background = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        delay: 1,
      }}
      className="absolute inset-0 h-full w-full scale-[1.04] bg-neutral-100"
    >
      <div className="absolute animate-pulse -top-px -left-px h-1 w-1 rounded-full bg-neutral-200"></div>
      <div className="absolute animate-pulse -top-px -right-px h-1 w-1 rounded-full bg-neutral-200"></div>
      <div className="absolute animate-pulse -bottom-px -left-px h-1 w-1 rounded-full bg-neutral-200"></div>
      <div className="absolute animate-pulse -right-px -bottom-px h-1 w-1 rounded-full bg-neutral-200"></div>
    </motion.div>
  )
}

export default SectionHeading