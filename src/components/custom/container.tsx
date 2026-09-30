import { cn } from '@/utilities/ui'
import React from 'react'

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('w-full max-w-[715px] mx-auto px-0 py-4 md:py-10', className)}>{children}</div>
  )
}
