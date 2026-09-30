'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export default function RoleCycle({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || paused || roles.length < 2) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((value) => (value + 1) % roles.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [roles.length, reduceMotion, paused])

  return (
    <button
      type="button"
      onClick={() => setPaused((value) => !value)}
      aria-label={`${paused ? 'Resume' : 'Pause'} rotating titles`}
      aria-pressed={paused}
      className="block text-left text-sm font-medium text-secondary md:text-base"
    >
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden className="relative block h-6 overflow-hidden md:h-7">
        <span className="invisible block">
          {roles.reduce((a, b) => (a.length > b.length ? a : b), '')}
        </span>
        <AnimatePresence initial={false}>
          <motion.span
            key={roles[index]}
            className="absolute inset-0 flex items-center"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  )
}
