import { pageMetadata } from '@/utilities/pageMetadata'
import React from 'react'
import { Container } from '@/components/custom/container'
import { Collage } from '@/components/custom/collage'
import { Timeline } from '@/components/custom/timeline'
import { Heading } from '@/components/custom/heading'
import { Subheading } from '@/components/custom/subheading'
import SectionHeading from '@/components/custom/section-heading'
import { profile } from '@/constants/profile'

const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-start justify-start">
      <Container className="min-h-screen pt-6 pb-10 md:pt-6 md:pb-10">
        <Heading>About Me</Heading>
        <Subheading className="text-secondary max-w-lg text-sm md:text-sm">
          I&apos;m an AI Engineer focused on agentic and multimodal systems. I build RAG pipelines,
          conversational agents, and AI applications that connect language models to useful workflows.
        </Subheading>

        <p className="text-secondary max-w-lg mt-3 text-sm md:text-sm px-4">
          At Useryze, I build AI content workflows from source ingestion through retrieval and draft
          generation to editing and export. My background in full-stack engineering helps me connect
          model capabilities to the interfaces, data, and infrastructure a product needs.
        </p>
        <p className="text-secondary max-w-lg mt-3 text-sm md:text-sm px-4">
          My projects include a real-time restaurant voice agent and Khaata360, a bilingual finance
          assistant with receipt understanding for WhatsApp and web.
        </p>
        <p className="text-secondary max-w-lg mt-3 text-sm md:text-sm px-4">
          Outside of engineering, I enjoy travel, cricket, and badminton.
        </p>

        <Collage />

        <div className="px-4">
          <SectionHeading>Experience &amp; milestones</SectionHeading>
        </div>
        <Timeline />

        <section className="px-4 py-6" aria-label="Technical skills">
          <SectionHeading>Technical skills</SectionHeading>
          <dl className="mt-4 space-y-4 text-sm">
            {profile.skills.map((skill) => (
              <div key={skill.label}>
                <dt className="font-medium text-primary">{skill.label}</dt>
                <dd className="mt-1 leading-6 text-secondary">{skill.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="px-4 py-6" aria-label="Education">
          <SectionHeading>Education</SectionHeading>
          <p className="mt-3 text-sm font-medium text-primary">Habib University</p>
          <p className="mt-1 text-sm text-secondary">BS Computer Science</p>
        </section>
      </Container>
    </div>
  )
}

export default AboutPage

export const metadata = pageMetadata(
  'About | Muhammad Hassan',
  'Meet Muhammad Hassan, an AI Engineer focused on agentic and multimodal systems. Explore his experience, technical skills, awards, and education at Habib University.',
  '/about',
)
