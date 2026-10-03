import { pageMetadata } from '@/utilities/pageMetadata'
import React from 'react'
import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading'
import { Subheading } from '@/components/custom/subheading'
import ContactForm from '@/components/custom/contact-form-minimal'

export const metadata = pageMetadata(
  'Contact | Muhammad Hassan',
  'Contact Muhammad Hassan to discuss AI Product Engineering opportunities, agentic systems, and product collaborations.',
  '/contact',
)

export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen pt-6 pb-10 md:pt-6 md:pb-10">
        <Heading>Contact Me</Heading>
        <Subheading>
          Let&apos;s talk about AI Product Engineering, agent workflows, or your next product.
          Share what you&apos;re building and where I can help.
        </Subheading>

        <ContactForm />
      </Container>
    </div>
  )
}
