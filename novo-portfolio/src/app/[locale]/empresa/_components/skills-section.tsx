'use client'

import { SectionWrapper, SectionHeader, SkillCard } from '@/components/common'
import { skillGroups } from '@/data'
import * as LucideIcons from 'lucide-react'

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionHeader
        subtitle="Minhas Habilidades"
        title="Tecnologias & Ferramentas"
        description="Stack de tecnologias que domino"
      />

      <div className="space-y-10">
        {skillGroups.map((group) => {
          // Dynamically get the Lucide icon component
          const IconComponent = LucideIcons[
            group.icon as keyof typeof LucideIcons
          ] as React.ComponentType<{ className?: string }>

          return (
            <div key={group.category}>
              {/* Category Header */}
              <div className="mb-6 flex items-center gap-3">
                {IconComponent && (
                  <IconComponent className="text-primary h-6 w-6" />
                )}
                <h3 className="text-lg font-semibold">{group.label}</h3>
                <div className="bg-border h-px flex-1" />
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap items-center gap-8">
                {group.skills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
