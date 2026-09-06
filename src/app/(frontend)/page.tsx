import Projects from '@/components/custom/projects';
import type { Metadata } from 'next';

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading';
import { Subheading } from '@/components/custom/subheading';
import WorkExperience from '@/components/custom/work-experience';

import { projects } from '@/constants/project';
import Contact from '@/components/custom/contact-form';
import Blogs from '@/components/custom/blogs';

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
        <Heading>
          Muhammad Hassan
        </Heading>
        <Subheading>
          I&apos;m a software engineer with a passion for building scalable and efficient systems. I&apos;m currently working as a Full Stack Engineer at a US Startup.
        </Subheading>

        <Projects projects={projects.slice(0, 3)} />

        <Blogs blogs={posts?.docs} />

        <WorkExperience />

        <Contact />
      </Container>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Muhammad Hassan · Full Stack Engineer',
  description: 'Full Stack Engineer building scalable web products and AI-powered systems. Explore selected projects, experience, writing, skills, and GitHub activity.',
  alternates: { canonical: '/' },
}
