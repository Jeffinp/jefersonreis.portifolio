'use client'

import { useTranslations } from 'next-intl'
import { SectionWrapper, SectionHeader, SkillCard } from '@/components/common'
import { skillGroups } from '@/data'
import * as LucideIcons from 'lucide-react'

export function SkillsSection() {
  const t = useTranslations('skills')

  return (
    <SectionWrapper id="skills">
      <SectionHeader
        subtitle={t('subtitle')}
        title={t('title')}
        description={t('description')}
      />

      <div className="space-y-10">
        {skillGroups.map((group) => {
          const IconComponent = LucideIcons[
            group.icon as keyof typeof LucideIcons
          ] as React.ComponentType<{ className?: string }>

          return (
            <div key={group.category}>
              <div className="mb-6 flex items-center gap-3">
                {IconComponent && (
                  <IconComponent className="text-primary h-6 w-6" />
                )}
                <h3 className="text-lg font-semibold">{group.label}</h3>
                <div className="bg-border h-px flex-1" />
              </div>

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
