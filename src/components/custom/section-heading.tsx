"use client"

import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: string;
  delay?: number; 
}

const SectionHeading = ({ children, delay=0 }: Props) => {
  return (
  <h2 className="max-w-lg pt-4 text-sm font-normal md:text-sm">
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

export default SectionHeading