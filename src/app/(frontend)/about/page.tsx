import { pageMetadata } from '@/utilities/pageMetadata'
import React from 'react'
import { Container } from '@/components/custom/container'
import { Collage } from '@/components/custom/collage'
import { Timeline } from '@/components/custom/timeline'
import { Heading } from '@/components/custom/heading'
import { Subheading } from '@/components/custom/subheading'
import SectionHeading from '@/components/custom/section-heading'

const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-start justify-start">
      <Container className="min-h-screen pt-6 pb-10 md:pt-6 md:pb-10">
        <Heading>About Me</Heading>
        <Subheading className="text-secondary max-w-lg text-sm md:text-sm">
          I&apos;m a software engineer with a passion for building scalable and efficient systems. I
          enjoy building products that help people live better lives.
        </Subheading>

        <p className="text-secondary max-w-lg text-sm md:text-sm px-4">
          I like to travel and explore new places. I also like to play cricket and badminton.
        </p>

        <Collage />

        <div className="px-4">
          <SectionHeading>I have worked at a lot of places</SectionHeading>
        </div>
        <Timeline />
      </Container>
    </div>
  )
}

export default AboutPage

export const metadata = pageMetadata(
  'About | Muhammad Hassan',
  'Meet Muhammad Hassan, a software engineer building scalable products. Explore his background, work experience, and interests.',
  '/about',
)
