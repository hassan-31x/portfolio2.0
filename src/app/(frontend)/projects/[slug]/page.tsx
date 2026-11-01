import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import { researchProjects } from '@/constants/research-projects'
import { Container } from '@/components/custom/container'
import { pageMetadata } from '@/utilities/pageMetadata'

export function generateStaticParams() {
  return researchProjects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = researchProjects.find((project) => project.slug === slug)
  if (!project) return {}
  const metadata = pageMetadata(
    `${project.title} | Muhammad Hassan`,
    project.description,
    `/projects/${slug}`,
  )
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [{ url: project.src, width: 1200, height: 750, alt: project.imageAlt }],
    },
    twitter: { ...metadata.twitter, images: [project.src] },
  }
}

export default async function ResearchProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = researchProjects.find((project) => project.slug === slug)
  if (!project) notFound()

  return (
    <Container className="min-h-screen px-4 pt-8 pb-12 sm:px-6">
      <Link
        href="/projects#personal-projects"
        className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden /> All projects
      </Link>
      <article className="mt-8">
        <p className="text-xs text-secondary">
          {project.field} · {project.status}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-primary">{project.title}</h1>
        <p className="mt-4 text-base leading-7 text-secondary">{project.description}</p>
        <Image
          src={project.src}
          alt={project.imageAlt || project.title}
          width={1200}
          height={750}
          priority
          sizes="(max-width: 715px) 100vw, 667px"
          className="mt-8 aspect-[8/5] w-full rounded-lg border border-neutral-200 object-cover dark:border-neutral-800"
        />
        <section className="mt-8" aria-labelledby="research-question">
          <h2 id="research-question" className="text-lg font-semibold text-primary">
            The research question
          </h2>
          <p className="mt-3 text-base leading-7 text-secondary">{project.question}</p>
        </section>
        <section className="mt-8" aria-labelledby="implementation">
          <h2 id="implementation" className="text-lg font-semibold text-primary">
            Implementation & experiments
          </h2>
          <div className="mt-4 space-y-4">
            {project.details?.map((detail) => (
              <p key={detail} className="text-sm leading-7 text-secondary">
                {detail}
              </p>
            ))}
          </div>
        </section>
        <section className="mt-8" aria-labelledby="current-scope">
          <h2 id="current-scope" className="text-lg font-semibold text-primary">
            Current scope
          </h2>
          <p className="mt-3 text-sm leading-7 text-secondary">{project.scope}</p>
        </section>
        <p className="mt-6 text-xs leading-6 text-secondary">{project.stack.join(' · ')}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4"
            >
              <Github className="size-4" aria-hidden /> Source code
            </a>
          )}
          {project.sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-secondary underline underline-offset-4 hover:text-primary"
            >
              {source.label}
              <ArrowUpRight className="size-3" aria-hidden />
            </a>
          ))}
        </div>
      </article>
    </Container>
  )
}
