import React from 'react'
import { useTranslation } from 'next-i18next'
import SectionWrapper from '@/components/SectionWrapper'
import SectionHeader from '@/components/SectionHeader'
import SkillsCloud from '@/components/SkillsCloud'

/**
 * Componente principal Skills
 * Utiliza o SkillsCloud para uma apresentação moderna e interativa
 */
const Skills: React.FC = () => {
  const { t } = useTranslation('main')

  return (
    <SectionWrapper
      backgroundVariant="skills"
      paddingY="large"
      intensity="subtle"
      ariaLabel={t('skills.title')}
    >
      <SectionHeader
        subtitle={t('skills.subtitle')}
        title={t('skills.title')}
        description={t('skills.description')}
        delay={0.1}
      />

      <SkillsCloud />
    </SectionWrapper>
  )
}

export default Skills
