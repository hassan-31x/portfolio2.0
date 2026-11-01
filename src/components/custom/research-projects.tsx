import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ResearchProject } from '@/constants/research-projects'
import { projectAnchor } from '@/utilities/projectAnchor'
import SectionHeading from './section-heading'

export default function ResearchProjects({ projects }: { projects: ResearchProject[] }) {
  return (
    <section className="portfolio-section" aria-label="AI research and model engineering">
      <div className="px-4 pt-2 pb-4">
        <SectionHeading>AI research & model engineering</SectionHeading>
        <p className="max-w-xl text-sm leading-6 text-secondary">
          Training models, building the underlying machinery, and testing what they actually learn.
        </p>
      </div>
      <div className="project-grid grid grid-cols-1 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            id={projectAnchor(project.title)}
            className="flex min-w-0 scroll-mt-20 flex-col p-4"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group block overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800"
              aria-label={`Read the ${project.title} research overview`}
            >
              <Image
                src={project.src}
                alt={project.imageAlt || project.title}
                width={1200}
                height={750}
                sizes="(max-width: 639px) 100vw, 340px"
                className="aspect-[8/5] w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
              />
            </Link>
            <p className="mt-4 text-xs leading-5 text-secondary">{project.field}</p>
            <h3 className="mt-1 text-base font-semibold text-primary">
              <Link href={`/projects/${project.slug}`} className="hover:underline">
                {project.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-6 text-secondary">{project.description}</p>
            <ul
              className="my-4 space-y-1.5 text-xs leading-5 text-primary"
              aria-label="Technical scope"
            >
              {project.evidence.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-secondary">
                    ↳
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-secondary">{project.status}</span>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary underline decoration-neutral-300 underline-offset-4 hover:decoration-current dark:decoration-neutral-700"
              >
                Research notes <ArrowUpRight className="size-3" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
