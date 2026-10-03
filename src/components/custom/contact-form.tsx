import Link from 'next/link'
import { profile } from '@/constants/profile'

export default function Contact() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="my-4 w-full rounded border border-blue-200 bg-blue-50 p-4 dark:border-gray-800 dark:bg-blue-opaque"
    >
      <h2
        id="contact-heading"
        className="text-sm font-semibold text-gray-900 md:text-base dark:text-gray-100"
      >
        Building something with AI? Let&apos;s talk.
      </h2>
      <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
        From RAG pipelines to voice agents, tell me about your project or AI Product Engineering opportunity.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
        >
          Get in touch
        </Link>
        <a
          href="https://wa.me/923132508277?text=I%20want%20to%20work%20on%20a%20project%20with%20you"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded bg-green-400 px-3 py-1.5 text-xs font-medium text-gray-900"
        >
          Chat on WhatsApp
        </a>
      </div>
      <div className="my-3 border-t border-blue-200 dark:border-gray-700" />
      <p className="break-words text-xs text-gray-800 dark:text-gray-200">
        Prefer email?{' '}
        <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
          {profile.email}
        </a>
      </p>
    </section>
  )
}
