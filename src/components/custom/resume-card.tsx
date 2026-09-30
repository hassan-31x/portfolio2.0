'use client'

import { LayoutGroup } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import StackItem from './stack-item'

interface ResumeCardProps {
  logoUrl: string
  altText: string
  title: string
  subtitle?: string
  href?: string
  badges?: readonly string[]
  period: string
  description?: string
  skills?: string[]
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  period,
  description,
  skills,
}: ResumeCardProps) => {
  return (
    <Link
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block cursor-pointer"
    >
      <div className="flex flex-col justify-between md:flex-row md:items-start">
        <div className="max-w-[80%]">
          <h3 className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          <div className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center">
            {subtitle && (
              <p className="text-sm text-neutral-800 dark:text-neutral-200">{subtitle}</p>
            )}
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{period}</p>
          </div>
          {description && (
            <p className="text-[13px] leading-5 text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          )}
          {/* {badges && (
            <div className="mt-4 flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-start justify-start rounded-full border border-neutral-200 bg-neutral-100 p-1 text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 -mr-3 hover:z-10"
                  tabIndex={0}
                >
                  <span className="overflow-hidden whitespace-nowrap text-neutral-500 dark:text-neutral-200">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          )} */}
          {skills && (
            <div className="mt-2 flex max-w-[14rem] flex-wrap gap-1">
              <LayoutGroup>
                {skills.map((stack: string) => (
                  <StackItem key={stack} technology={stack} className="mr-[-10px] hover:z-10" />
                ))}
              </LayoutGroup>
            </div>
          )}
        </div>
        <Image
          src={logoUrl}
          alt={altText}
          width={48}
          height={48}
          className="hidden size-12 shrink-0 rounded-md object-contain md:block"
        />
      </div>
    </Link>
  )
}
