'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { Download, Search } from 'lucide-react'
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button'
import { cn } from '@/utilities/ui'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Projects', href: '/projects' },
]

export function Navbar() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()
  const width = useTransform(scrollY, [0, 100], ['100%', '92%'])
  const y = useTransform(scrollY, [0, 100], [0, 10])
  const borderRadius = useTransform(scrollY, [0, 100], [0, 999])
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['0px 4px 16px rgba(0,0,0,0)', '0px 4px 16px rgba(0,0,0,0.12)'],
  )
  return (
    <header className="sticky top-0 z-40 mx-auto h-[50px] w-full max-w-[715px]">
      <motion.nav
        aria-label="Main navigation"
        style={reduceMotion ? undefined : { width, y, borderRadius, boxShadow }}
        className="mx-auto flex h-[50px] items-center justify-between gap-2 border border-neutral-200 bg-white/95 px-3 backdrop-blur-sm dark:border-neutral-800 dark:bg-black/95 sm:px-4"
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {links.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'py-1 text-xs font-normal underline-offset-4 transition-colors hover:text-primary hover:underline sm:text-sm',
                  active ? 'text-primary' : 'text-secondary',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Link
            href="/search"
            aria-label="Search portfolio"
            title="Search"
            className="flex size-8 items-center justify-center rounded-md text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            <Search className="size-3.5" aria-hidden />
          </Link>
          <a
            href="/resume.pdf"
            download
            aria-label="Download resume"
            title="Download resume"
            className="hidden size-8 items-center justify-center rounded-md text-secondary hover:bg-neutral-100 sm:flex dark:hover:bg-neutral-900"
          >
            <Download className="size-3.5" aria-hidden />
          </a>
          <ThemeToggleButton
            variant="circle"
            start="top-right"
            className="size-8 h-8 w-8 border-transparent bg-transparent shadow-none dark:border-transparent dark:bg-transparent [&_svg]:size-3.5"
          />
        </div>
      </motion.nav>
    </header>
  )
}
