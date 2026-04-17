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
      className="group relative inline-flex w-20 flex-col items-center gap-2"
      title={`${skill.name}${skill.yearsOfExperience ? ` — ${skill.yearsOfExperience}+ anos` : ''}`}
    >
      {iconSrc && (
        <div className="liquid-card bg-card/80 border-border/60 shadow-background/40 group-hover:border-primary/40 group-hover:shadow-primary/20 flex h-14 w-14 items-center justify-center rounded-xl border shadow-[0_10px_24px_-16px] transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            alt=""
            width={48}
            height={48}
            className="h-9 w-9 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            loading="lazy"
          />
        </div>
      )}

      <div className="text-muted-foreground group-hover:text-foreground text-center text-[11px] leading-tight font-medium transition-colors">
        {skill.name}
        {skill.yearsOfExperience ? (
          <span className="sr-only"> — {skill.yearsOfExperience}+ anos</span>
        ) : null}
      </div>
    </div>
  )
}
