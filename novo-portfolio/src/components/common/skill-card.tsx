'use client'

import { useState } from 'react'
import type { Skill } from '@/types'

interface SkillCardProps {
  skill: Skill
}

export function SkillCard({ skill }: SkillCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      className="group relative inline-flex flex-col items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Icon */}
      {skill.icon && (
        <div className="flex h-12 w-12 items-center justify-center transition-transform group-hover:scale-110">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.icon.startsWith('/') ? skill.icon : `/${skill.icon}`}
            alt={skill.name}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            loading="lazy"
          />
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-popover text-popover-foreground absolute -top-12 left-1/2 z-10 -translate-x-1/2 rounded-md px-3 py-2 text-sm whitespace-nowrap shadow-md">
          <div className="font-semibold">{skill.name}</div>
          {skill.yearsOfExperience && (
            <div className="text-muted-foreground text-xs">
              {skill.yearsOfExperience}+ anos
            </div>
          )}
          {/* Arrow */}
          <div className="bg-popover absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" />
        </div>
      )}
    </div>
  )
}
