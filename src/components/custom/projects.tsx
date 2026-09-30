'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './section-heading'
import { ProjectTypes } from '@/constants/project'
import StackItem from './stack-item'

type Props = { projects: ProjectTypes; showAllLink?: boolean }

export default function Projects({ projects, showAllLink = false }: Props) {
  const reduceMotion = useReducedMotion()
  return (
    <section className="portfolio-section" aria-label="Selected projects">
      <div className="px-4 pt-2">
        <SectionHeading>I love building things</SectionHeading>
      </div>
      <div className="project-grid grid grid-cols-1 sm:grid-cols-2">
        {projects.map((project, index) => {
          const live = project.href !== '#'
          const preview = (
            <Image
              src={project.src}
              alt={`${project.title} preview`}
              width={600}
              height={340}
              sizes="(max-width: 639px) 100vw, 420px"
              className="h-44 w-full object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03] sm:h-48"
            />
          )
          return (
            <motion.article
              key={project.title}
              className="flex min-w-0 flex-col gap-2 p-4"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index % 2) * 0.08 }}
            >
              {live ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title}`}
                  className="group block overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800"
                >
                  {preview}
                </a>
              ) : (
                <div className="overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
                  {preview}
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <h3 className="min-w-0 text-[15px] font-semibold leading-snug text-primary">
                  {live ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                {live && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live site: ${project.title}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium text-primary hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
                  >
                    Live
                    <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                )}
              </div>
              <p
                title={project.description}
                className="truncate text-[13px] leading-snug text-secondary"
              >
                {project.description}
              </p>
              <div className="mt-2 flex max-w-[14rem] flex-wrap gap-1">
                <LayoutGroup>
                  {project.stack.map((stack) => (
                    <StackItem key={stack} technology={stack} className="-mr-3 hover:z-10" />
                  ))}
                </LayoutGroup>
              </div>
            </motion.article>
          )
        })}
      </div>
      {showAllLink && (
        <div className="flex justify-center border-t border-neutral-200 p-3 dark:border-neutral-800">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-2 py-1 text-xs text-primary hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            See all projects
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}
    </section>
  )
}
