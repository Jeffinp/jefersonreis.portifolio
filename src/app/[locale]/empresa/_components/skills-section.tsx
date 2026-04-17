'use client'

import { useTranslations } from 'next-intl'
import { SectionWrapper, SectionHeader, SkillCard } from '@/components/common'
import { skillGroups } from '@/data'
import * as LucideIcons from 'lucide-react'

export function SkillsSection() {
  const t = useTranslations('skills')

  return (
    <SectionWrapper
      id="skills"
      className="bg-background dark:dot-grid relative"
    >
      <SectionHeader
        subtitle={t('subtitle')}
        title={t('title')}
        description={t('description')}
      />

      <div className="space-y-12">
        {skillGroups.map((group) => {
          const IconComponent = LucideIcons[
            group.icon as keyof typeof LucideIcons
          ] as React.ComponentType<{ className?: string }>

          return (
            <div key={group.category}>
              <div className="mb-6 flex items-center gap-3">
                {IconComponent && (
                  <div
                    aria-hidden="true"
                    className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg"
                  >
                    <IconComponent className="text-primary h-4 w-4" />
                  </div>
                )}
                <h3 className="text-base font-bold">{group.label}</h3>
                <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px] font-medium">
                  {group.skills.length}
                </span>
                <div className="bg-border/40 h-px flex-1" />
              </div>

              <div className="flex flex-wrap items-start gap-x-4 gap-y-6">
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
