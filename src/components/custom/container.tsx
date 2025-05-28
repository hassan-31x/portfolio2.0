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
    <div className={cn("w-full max-w-4xl mx-auto p-4 md:p-10", className)}>
      {children}
    </div>
  )
}
