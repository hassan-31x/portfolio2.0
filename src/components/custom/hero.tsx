import Image from 'next/image'
import Link from 'next/link'
import { Download, MessageCircle } from 'lucide-react'
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconMail } from '@tabler/icons-react'
import { profile } from '@/constants/profile'
import RoleCycle from './role-cycle'

const icons = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  x: IconBrandX,
  mail: IconMail,
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-name" className="px-4 py-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0 rounded-lg border border-neutral-200 p-0.5 dark:border-neutral-700">
          <Image
            src="/favicon.svg"
            alt="Muhammad Hassan monogram"
            width={80}
            height={80}
            priority
            className="size-14 rounded-md border border-neutral-200 sm:size-20 dark:border-neutral-700"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h1
            id="hero-name"
            className="text-xl font-medium tracking-tight text-primary md:text-2xl"
          >
            Muhammad Hassan
          </h1>
          <RoleCycle roles={profile.roles} />
          <div className="mt-2 flex flex-wrap gap-2">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              <Download className="size-3.5" aria-hidden />
              Resume / CV
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-neutral-50 transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              <MessageCircle className="size-3.5" aria-hidden />
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-6 text-secondary">
        I build scalable web products and AI-powered systems with{' '}
        <strong className="font-medium text-primary">Next.js, TypeScript, and Node.js.</strong>{' '}
        Currently a Full Stack Engineer at a US startup, turning ideas into products people use.
      </p>
      <div className="mt-3 flex items-center gap-2" aria-label="Social links">
        {profile.socials.map((link) => {
          const Icon = icons[link.icon]
          return (
            <a
              key={link.name}
              href={link.href}
              aria-label={link.name}
              title={link.name}
              target={link.icon === 'mail' ? undefined : '_blank'}
              rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
              className="flex size-7 items-center justify-center rounded-sm text-secondary transition-colors hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-900"
            >
              <Icon className="size-4" aria-hidden />
            </a>
          )
        })}
      </div>
    </section>
  )
}
