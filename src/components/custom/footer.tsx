'use client'

import { motion, useReducedMotion } from 'motion/react'
import { profile } from '@/constants/profile'

export default function Footer() {
  const reduceMotion = useReducedMotion()
  return (
    <motion.footer
      initial={reduceMotion ? false : { opacity: 0.4, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : 0.3,
        ease: 'easeOut',
      }}
      className="mx-auto w-full px-4 py-16"
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-sm text-secondary">
          Design &amp; Developed by <b>{profile.name}</b>
          <br />
          &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}
