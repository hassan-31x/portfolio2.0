import { pageMetadata } from '@/utilities/pageMetadata'
import Projects from '@/components/custom/projects'
import { Suspense } from 'react'

import { getArticles } from '@/utilities/getArticles'

import { Container } from '@/components/custom/container'
import Hero from '@/components/custom/hero'
import GitHubActivity from '@/components/custom/github-activity'
import WorkExperience from '@/components/custom/work-experience'

import { featuredProjects } from '@/constants/project'
import Contact from '@/components/custom/contact-form'
import Blogs from '@/components/custom/blogs'

export default async function Home() {
  const posts = await getArticles()
  return (
    <div className="min-h-screen flex items-start justify-start">
      <Container className="min-h-screen md:pt-2 md:pb-10">
        <Hero />

        <Projects projects={featuredProjects.slice(0, 4)} showAllLink />

        <Blogs blogs={posts.slice(0, 3)} showAllLink />

        <WorkExperience />

        <Suspense
          fallback={
            <section
              aria-label="Loading GitHub activity"
              className="portfolio-section px-4 py-10 sm:px-6"
            >
              <div className="h-36 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-900" />
            </section>
          }
        >
          <GitHubActivity />
        </Suspense>

        <div className="px-4 sm:px-6">
          <Contact />
        </div>
      </Container>
    </div>
  )
}

export const metadata = pageMetadata(
  'Muhammad Hassan · AI Product Engineer',
  'AI Product Engineer specializing in agentic and multimodal systems. Explore RAG pipelines, voice agents, AI products, work experience, and engineering projects.',
  '/',
)
