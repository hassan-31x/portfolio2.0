'use client'

import React from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

type Props = { children: string; delay?: number }

const SectionHeading = ({ children, delay = 0 }: Props) => {
  const ref = React.useRef<HTMLHeadingElement>(null)
  const entered = useInView(ref, { once: true, amount: 'some' })
  const reduceMotion = useReducedMotion()
  const visible = entered || !!reduceMotion

  return (
    <h2 ref={ref} className="relative isolate mt-2 mb-2 w-fit max-w-lg text-sm font-normal">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : delay + 0.15 }}
        aria-hidden
        className="absolute inset-0 -z-10 scale-[1.04] bg-neutral-100 dark:bg-neutral-700"
      >
        {[
          '-top-px -left-px',
          '-top-px -right-px',
          '-bottom-px -left-px',
          '-bottom-px -right-px',
        ].map((corner) => (
          <div
            key={corner}
            className={`absolute h-1 w-1 rounded-full bg-neutral-200 motion-safe:animate-pulse dark:bg-neutral-500 ${corner}`}
          />
        ))}
      </motion.div>
      {children.split(' ').map((word, idx) => (
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 5, filter: 'blur(2px)' }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 5,
            filter: visible ? 'blur(0px)' : 'blur(2px)',
          }}
          transition={{
            delay: reduceMotion ? 0 : delay + 0.05 * idx,
            duration: reduceMotion ? 0 : 0.3,
            ease: 'easeInOut',
          }}
          key={word + idx}
          className="inline-block"
        >
          {word}
          {idx < children.split(' ').length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </h2>
  )
}

export default SectionHeading
