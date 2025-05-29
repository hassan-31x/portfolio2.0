import React from 'react'
import { Container } from '@/components/custom/container'
import { Collage } from '@/components/custom/collage'
import { Timeline } from '@/components/custom/timeline'

const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-start justify-start">
      <Container className="min-h-screen md:pt-2 md:pb-10">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
          About Me
        </h1>
        <p className='text-secondary max-w-lg mt-4 text-sm md:text-sm'>
          I&apos;m a software engineer with a passion for building scalable and efficient systems. I&apos;m currently working as a software engineer at Google. I enjoy building products that help people live better lives.
        </p>

        <p className='text-secondary max-w-lg mt-4 text-sm md:text-sm'>
          I like to travel and explore new places. I also like to play cricket and badminton.
        </p>
        <Collage />

        <p className='text-secondary max-w-lg mt-4 text-sm md:text-sm'>
          I have worked at a lot of places 
        </p>
        <Timeline />
      </Container>
    </div>
  )
}

export default AboutPage
