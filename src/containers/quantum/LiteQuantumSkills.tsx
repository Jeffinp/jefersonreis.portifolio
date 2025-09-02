import React, { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import {
  Code,
  Palette,
  Server,
  Wrench,
  Rocket,
  Database,
  Cloud,
} from 'lucide-react'
import { skills } from '@/data/skills'
import type { SkillItem } from '@/types'

// Simplified skill card without heavy animations
const LiteSkillCard = memo(
  ({ skill, index }: { skill: SkillItem; index: number }) => (
    <motion.div
      className="group flex items-center gap-3 rounded-lg border border-blue-500/20 bg-gray-900/50 p-3 backdrop-blur-sm transition-all hover:border-blue-500/40 hover:bg-gray-900/70"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ scale: 1.05 }}
    >
      {skill.icon && (
        <div className="relative h-10 w-10 flex-shrink-0">
          <Image
            src={skill.icon}
            alt={skill.name}
            width={40}
            height={40}
            className="object-contain"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-white">{skill.name}</h3>
        {skill.level && (
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-700">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + index * 0.02 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  ),
)

LiteSkillCard.displayName = 'LiteSkillCard'

// Main skills component with categorized view
const LiteQuantumSkills: React.FC = memo(() => {
  const { t } = useTranslation('main')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'Todos', icon: <Rocket className="h-4 w-4" /> },
    { id: 'frontend', label: 'Frontend', icon: <Code className="h-4 w-4" /> },
    { id: 'backend', label: 'Backend', icon: <Server className="h-4 w-4" /> },
    {
      id: 'database',
      label: 'Database',
      icon: <Database className="h-4 w-4" />,
    },
    { id: 'devops', label: 'DevOps', icon: <Cloud className="h-4 w-4" /> },
    { id: 'tools', label: 'Tools', icon: <Wrench className="h-4 w-4" /> },
    { id: 'design', label: 'Design', icon: <Palette className="h-4 w-4" /> },
  ]

  const getFilteredSkills = () => {
    if (selectedCategory === 'all') {
      return skills
    }
    return skills.filter((skill) => skill.category === selectedCategory)
  }

  const filteredSkills = getFilteredSkills()

  return (
    <section id="skills" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h2
            className="mb-4 text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t('expertise.title')}
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('expertise.subtitle')}
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap gap-2 rounded-lg border border-blue-500/20 bg-gray-900/50 p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredSkills.map((skill, index) => (
            <LiteSkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            {
              label: 'Technologies',
              value: '30+',
              color: 'from-blue-400 to-cyan-400',
            },
            {
              label: 'Projects',
              value: '50+',
              color: 'from-purple-400 to-pink-400',
            },
            {
              label: 'Years Experience',
              value: '5+',
              color: 'from-green-400 to-emerald-400',
            },
            {
              label: 'Happy Clients',
              value: '100%',
              color: 'from-yellow-400 to-orange-400',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-center backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              <div
                className={`mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-3xl font-bold text-transparent`}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})

LiteQuantumSkills.displayName = 'LiteQuantumSkills'

export default LiteQuantumSkills
