import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import SkillCard from './SkillCard'
import { getSkillsByCategory, skillCategories } from '@/data/skills'
import {
  Code,
  Server,
  Database,
  GitBranch,
  Palette,
  Wrench,
} from 'lucide-react'

/**
 * Componente de nuvem de habilidades
 * Renderiza apenas o grid de cards, sem seção ou headers
 */
const SkillsCloud: React.FC = () => {
  const { t } = useTranslation('common')
  const skillsIcons = {
    frontend: Code,
    backend: Server,
    database: Database,
    devops: GitBranch,
    design: Palette,
    tools: Wrench,
  }

  const skillsColors = {
    frontend: 'from-blue-500 to-cyan-500',
    backend: 'from-green-500 to-teal-500',
    database: 'from-purple-500 to-indigo-500',
    devops: 'from-orange-500 to-red-500',
    design: 'from-pink-500 to-purple-500',
    tools: 'from-gray-500 to-slate-500',
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
      {skillCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex-1"
        >
          <SkillCard
            category={category.id}
            title={t(category.nameKey)}
            skills={getSkillsByCategory(category.id)}
            iconName={
              skillsIcons[
                category.id as keyof typeof skillsIcons
              ] as React.ElementType
            }
            color={skillsColors[category.id as keyof typeof skillsColors]}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default SkillsCloud
