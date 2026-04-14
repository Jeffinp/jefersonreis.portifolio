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
        'mb-14 space-y-4',
        align === 'center' && 'text-center',
        className
      )}
    >
      {subtitle && (
        <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
        {title}
        <span className="bg-primary ml-1.5 inline-block h-2 w-2 rounded-full align-super" />
      </h2>
      {description && (
        <p
          className={cn(
            'text-muted-foreground text-base leading-relaxed md:text-lg',
            align === 'center' && 'mx-auto max-w-2xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
