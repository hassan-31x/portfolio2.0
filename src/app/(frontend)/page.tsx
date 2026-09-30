import { pageMetadata } from '@/utilities/pageMetadata'
import Projects from '@/components/custom/projects'
import { Suspense } from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Container } from '@/components/custom/container'
import Hero from '@/components/custom/hero'
import GitHubActivity from '@/components/custom/github-activity'
import WorkExperience from '@/components/custom/work-experience'

import { projects } from '@/constants/project'
import Contact from '@/components/custom/contact-form'
import Blogs from '@/components/custom/blogs'

export default async function Home() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 5,
    overrideAccess: false,
  })
  return (
    <div className="min-h-screen flex items-start justify-start">
      <Container className="min-h-screen md:pt-2 md:pb-10">
        <Hero />

        <Projects projects={projects} showAllLink />

        <Blogs blogs={posts?.docs} />

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
  'Muhammad Hassan · Full Stack Engineer',
  'Full Stack Engineer building scalable web products and AI-powered systems. Explore selected projects, experience, writing, skills, and GitHub activity.',
  '/',
)
