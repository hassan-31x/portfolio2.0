import Link from 'next/link'
import { profile } from '@/constants/profile'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 px-4 py-16 dark:border-neutral-800">
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-sm text-secondary">
          Designed &amp; developed by{' '}
          <Link href="/" className="font-bold text-primary hover:underline">
            {profile.name}
          </Link>
          <br />
          &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
