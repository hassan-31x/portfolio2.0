import React from 'react'
import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading'
import { Subheading } from '@/components/custom/subheading'
import ContactForm from '@/components/custom/contact-form-minimal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Get in touch for freelancing opportunities and project discussions.',
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen px-10 md:pt-2 md:pb-10">
        <Heading>Contact Me</Heading>
        <Subheading>
          I&apos;m open to freelancing offers. Reach out to me to inquire more
          about my work.
        </Subheading>

        <ContactForm />
      </Container>
    </div>
  )
}
