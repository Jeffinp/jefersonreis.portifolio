'use client'

import type { Skill } from '@/types'

interface SkillCardProps {
  skill: Skill
}

export function SkillCard({ skill }: SkillCardProps) {
  const iconSrc = skill.icon
    ? skill.icon.startsWith('/')
      ? skill.icon
      : `/${skill.icon}`
    : undefined

  return (
    <div
      className="group relative inline-flex w-20 flex-col items-center gap-2 outline-none"
      tabIndex={0}
      aria-label={skill.name}
    >
      {iconSrc && (
        <div className="liquid-card bg-card/80 border-border/60 shadow-background/40 group-hover:border-primary/40 group-hover:shadow-primary/30 group-focus-visible:border-primary/50 group-focus-visible:ring-primary/40 flex h-14 w-14 items-center justify-center rounded-xl border shadow-[0_10px_24px_-16px] transition-all duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:ring-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            alt={skill.name}
            width={48}
            height={48}
            className="h-9 w-9 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            loading="lazy"
          />
        </div>
      )}

      <div className="text-muted-foreground text-center text-[11px] leading-none">
        {skill.name}
      </div>

      <div className="bg-popover text-popover-foreground pointer-events-none absolute -top-14 left-1/2 z-20 -translate-x-1/2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="font-semibold">{skill.name}</span>
        {skill.yearsOfExperience && (
          <span className="text-muted-foreground ml-1">
            ({skill.yearsOfExperience}+ anos)
          </span>
        )}
        <div className="bg-popover absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" />
      </div>
    </div>
  )
}
