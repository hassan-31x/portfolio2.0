'use client'

import { useState } from 'react'
import { profile } from '@/constants/profile'
import { motion } from 'motion/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function ContactFormMinimal() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [draftOpened, setDraftOpened] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('fullname') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name || !email || !message) return
    setIsSubmitting(true)
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setDraftOpened(true)
    setIsSubmitting(false)
  }

  return (
    <div className="my-4 border-y border-neutral-200 px-4 py-6 dark:border-neutral-800">
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="max-w-2xl"
      >
        <p className="mb-6 text-sm text-secondary">
          This form opens a draft in your email app. You can also{' '}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
            email me directly
          </a>
          .
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: 'easeInOut',
            }}
          >
            <Label
              htmlFor="fullname"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Full name
            </Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Your name"
              required
              className="mt-1 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.2,
              ease: 'easeInOut',
            }}
          >
            <Label
              htmlFor="email"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="mt-1 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.3,
              ease: 'easeInOut',
            }}
          >
            <Label
              htmlFor="message"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project."
              required
              rows={5}
              className="mt-1 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-500 resize-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.4,
              ease: 'easeInOut',
            }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-200 dark:hover:bg-neutral-300 text-white dark:text-neutral-900 font-medium transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                'Open email draft'
              )}
            </Button>
          </motion.div>

          {draftOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              role="status"
              className="text-center text-sm text-secondary"
            >
              Your email draft is ready in your email app. Review it and send it there.
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  )
}
