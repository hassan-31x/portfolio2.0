'use client'

import React, { useRef } from 'react'
import { cn } from '@/utilities/ui'
import { useInView, motion, useReducedMotion } from 'motion/react'
import { IconCircleCheckFilled } from '@tabler/icons-react'

type Data = {
  title: string
  content: {
    title: string
    description: string | React.ReactNode
  }[]
}[]

export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null)
  const entered = useInView(ref, { once: true, amount: "some" })
  const reduceMotion = useReducedMotion()
  const isInView = entered || !!reduceMotion

  const data: Data = [
    {
      title: '2024–Present',
      content: [
        {
          title: 'AI Product Engineer at Useryze',
          description:
            'Joined in December 2024. Built a RAG content system connecting source ingestion, semantic retrieval, generation, editing, and export.',
        },
      ],
    },
    {
      title: '2024–2025',
      content: [
        {
          title: 'Full-Stack Engineer at GT Solutions USA',
          description:
            'Built role-based CRM and mobile systems for US daycares serving 1,000+ staff, alongside tools for Aga Khan Hospital’s food survey research.',
        },
      ],
    },
    {
      title: '2024',
      content: [
        {
          title: 'Full-Stack Hackathon Winner, Zabefest ’24',
          description:
            'Won at SZABIST in May with a cashier-less checkout app built in 48 hours, including QR and manual product entry, location verification, authentication, and protected routes.',
        },
        {
          title: 'Web Development Runner-Up, Developer’s Day ’24',
          description:
            'Placed at FAST–NUCES in April with a version-control platform supporting repositories, organizations, commits, history tracking, and admin rollback.',
        },
      ],
    },
    {
      title: '2023',
      content: [
        {
          title: 'Junior Full-Stack Developer at Xeverse.io',
          description:
            'Worked from June to November on the responsive DataPlus frontend, communicating the quality and model readiness of AI training datasets.',
        },
      ],
    },
  ]

  return (
    <div
      ref={ref}
      className="shadow-[0px_1px_4px_0px_var(--color-neutral-100)_inset,0px_-1px_4px_0px_var(--color-neutral-100)_inset] border-y border-neutral-100 dark:border-neutral-700 my-4 px-4 py-4"
    >
      {data.map((year, index) => (
        <div key={year.title} className="mb-4">
          <motion.h2
            initial={{
              filter: 'blur(10px)',
              opacity: 0,
            }}
            animate={{
              filter: isInView ? 'blur(0px)' : 'blur(10px)',
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              delay: 0.1 * index,
            }}
            className="font-bold text-black dark:text-neutral-200 w-fit rounded-md px-2 py-0.5 mb-2"
            style={{
              boxShadow: 'var(--shadow-custom)',
            }}
          >
            {year.title}
          </motion.h2>
          <div className="flex flex-col gap-4">
            {year.content.map((item, idx) => (
              <div key={item.title} className="pl-4">
                <Step isInView={isInView} idx={idx}>
                  <motion.h3
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : -10,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                      delay: 0.2 * idx,
                    }}
                    className="text-neutral-500 dark:text-neutral-400 text-sm"
                  >
                    {item.title}
                  </motion.h3>
                </Step>
                {item.description && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : -10,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                      delay: 0.3 * idx,
                    }}
                    className="text-neutral-500 dark:text-neutral-400 pt-1 pl-6 text-sm"
                  >
                    {item.description}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const Step = ({
  className,
  children,
  isInView,
  idx,
}: {
  className?: string
  children: React.ReactNode
  isInView: boolean
  idx: number
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: -10,
    }}
    animate={{
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : -10,
    }}
    transition={{
      duration: 0.3,
      ease: 'easeInOut',
      delay: 0.2 * idx,
    }}
    className={cn('flex items-start gap-2', className)}
  >
    <IconCircleCheckFilled className="mt-[3px] h-4 w-4 text-neutral-500" />
    {children}
  </motion.div>
)
