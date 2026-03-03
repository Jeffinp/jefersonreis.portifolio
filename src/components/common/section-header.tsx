'use client'

import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 space-y-4',
        align === 'center' && 'text-center',
        className
      )}
    >
      {subtitle && (
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-muted-foreground text-lg',
            align === 'center' && 'mx-auto max-w-2xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
