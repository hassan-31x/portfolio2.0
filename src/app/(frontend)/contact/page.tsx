import { pageMetadata } from '@/utilities/pageMetadata'
import React from 'react'
import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading'
import { Subheading } from '@/components/custom/subheading'
import ContactForm from '@/components/custom/contact-form-minimal'

export const metadata = pageMetadata(
  'Contact | Muhammad Hassan',
  'Get in touch with Muhammad Hassan for freelancing opportunities and project discussions.',
  '/contact',
)

export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen pt-6 pb-10 md:pt-6 md:pb-10">
        <Heading>Contact Me</Heading>
        <Subheading>
          I&apos;m open to freelancing offers. Reach out to me to inquire more about my work.
        </Subheading>

        <ContactForm />
      </Container>
    </div>
  )
}
