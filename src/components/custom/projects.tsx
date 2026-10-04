'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Github } from 'lucide-react'
import SectionHeading from './section-heading'
import { ProjectTypes } from '@/constants/project'
import StackItem from './stack-item'
import { projectAnchor } from '@/utilities/projectAnchor'

type Props = { projects: ProjectTypes; showAllLink?: boolean }

export default function Projects({ projects, showAllLink = false }: Props) {
  const reduceMotion = useReducedMotion()
  return (
    <section className="portfolio-section" aria-label="Selected projects">
      <div className="px-4 pt-2">
        <SectionHeading>Selected projects</SectionHeading>
      </div>
      <div className="project-grid grid grid-cols-1 sm:grid-cols-2">
        {projects.map((project, index) => {
          const live = project.href !== '#'
          const primaryHref = live ? project.href : project.repository
          const preview = project.src ? (
            <Image
              src={project.src}
              alt={project.imageAlt || `${project.title} preview`}
              width={600}
              height={340}
              sizes="(max-width: 639px) 100vw, 324px"
              className="h-44 w-full object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03] sm:h-48"
            />
          ) : null
          return (
            <motion.article
              key={project.title}
              id={projectAnchor(project.title)}
              className="flex min-w-0 scroll-mt-20 flex-col gap-2 p-4"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index % 2) * 0.08 }}
            >
              {preview && (primaryHref ? (
                <a
                  href={primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${live ? 'Visit' : 'Source code for'} ${project.title}`}
                  className="group block overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800"
                >
                  {preview}
                </a>
              ) : (
                <div className="overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
                  {preview}
                </div>
              ))}
              <div className="flex items-center justify-between gap-3">
                <h3 className="min-w-0 text-[15px] font-semibold leading-snug text-primary">
                  {primaryHref ? (
                    <a
                      href={primaryHref}
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
                <div className="flex shrink-0 items-center gap-1.5">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Source code: ${project.title}`}
                      className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium text-primary hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
                    >
                      <Github className="size-3" aria-hidden />
                      Code
                    </a>
                  )}
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
              </div>
              <p
                title={project.description}
                className="line-clamp-2 text-[13px] leading-snug text-secondary"
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
              {/* {project.details && (
                <details className="text-[13px] leading-relaxed text-secondary">
                  <summary
                    aria-label={`Details about ${project.title}`}
                    className="w-fit cursor-pointer text-xs text-secondary hover:text-primary"
                  >
                    Details
                  </summary>
                  <div className="space-y-2 pt-2">
                    {project.details.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                </details>
              )} */}
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
