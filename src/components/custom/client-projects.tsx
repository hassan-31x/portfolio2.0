import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { clientProjectGroups } from '@/constants/client-projects'
import { projectAnchor } from '@/utilities/projectAnchor'
import SectionHeading from './section-heading'

export default function ClientProjects() {
  return (
    <section
      id="client-projects"
      className="portfolio-section scroll-mt-20"
      aria-label="Client projects"
    >
      <div className="bg-neutral-50 px-4 py-6 dark:bg-neutral-950">
        <SectionHeading>Client projects</SectionHeading>
        <p className="mt-3 max-w-lg text-sm text-secondary">
          Platforms, storefronts, and websites built for businesses. From dealership operations to
          jewelry retail and independent freelance work.
        </p>
      </div>
      {clientProjectGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-heading`}
          className="scroll-mt-20"
        >
          <div className="border-y border-neutral-200 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 id={`${group.id}-heading`} className="text-sm font-semibold text-primary">
              {group.title}
            </h3>
            <p className="mt-1 text-sm text-secondary">{group.description}</p>
          </div>
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {group.projects.map((project) => (
              <article
                key={project.slug}
                id={projectAnchor(project.title)}
                className="grid min-w-0 scroll-mt-20 gap-4 p-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-6 sm:py-6"
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Preview ${project.title} live site`}
                  className="group block self-start overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <Image
                    src={`/images/projects/clients/${project.slug}.webp`}
                    alt={`${project.title} website homepage`}
                    width={1280}
                    height={800}
                    sizes="(max-width: 639px) calc(100vw - 32px), 300px"
                    className="aspect-[8/5] w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover:scale-[1.03]"
                  />
                </a>
                <div className="flex min-w-0 flex-col items-start">
                  <p className="text-xs text-secondary">{project.category}</p>
                  <h4 className="mt-1 text-base font-semibold text-primary">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {project.title}
                    </a>
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {project.description}
                  </p>
                  <ul
                    aria-label={`${project.title} features`}
                    className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-secondary"
                  >
                    {project.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title} live site`}
                    className="mt-4 inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-xs font-medium text-primary hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
                  >
                    Visit website <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  )
}
