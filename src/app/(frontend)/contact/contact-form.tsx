"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ContactFormMinimal() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      // Reset form after success
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <div className="my-4 border-y border-neutral-100 px-4 py-6 shadow-[0px_1px_4px_0px_var(--color-neutral-100)_inset,0px_-1px_4px_0px_var(--color-neutral-100)_inset]">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: "easeInOut",
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
              placeholder="Tyler Durden"
              required
              className="mt-1 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.2,
              ease: "easeInOut",
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
              placeholder="tyler@projectmayhem.com"
              required
              className="mt-1 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.3,
              ease: "easeInOut",
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
              placeholder="You're crazy good, never change."
              required
              rows={5}
              className="mt-1 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-500 resize-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.4,
              ease: "easeInOut",
            }}
          >
            <Button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="w-full h-12 bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-200 dark:hover:bg-neutral-300 text-white dark:text-neutral-900 font-medium transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : submitStatus === 'success' ? (
                'Message sent!'
              ) : (
                'Send message'
              )}
            </Button>
          </motion.div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-sm text-green-600 dark:text-green-400"
            >
              Thanks for reaching out! I&apos;ll get back to you soon.
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  )
}
