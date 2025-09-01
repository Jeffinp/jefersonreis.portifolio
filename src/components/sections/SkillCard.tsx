import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
interface SkillItem {
  name: string
  icon: string
  imagePath?: string
  description?: string
}

interface SkillCardProps {
  category: string
  title: string
  skills: SkillItem[]
  color: string
  iconName: React.ElementType
}

const SkillCard: React.FC<SkillCardProps> = ({
  category,
  title,
  skills,
  color,
  iconName: Icon,
}) => {
  // Função para obter a cor específica da habilidade ou usar a cor padrão da categoria
  const getSkillColor = (skillName: string): string => {
    const skillColors: Record<string, string> = {
      React: 'from-blue-400 to-blue-600',
      TypeScript: 'from-blue-500 to-blue-700',
      'Next.js': 'from-gray-700 to-black',
      'Node.js': 'from-green-500 to-green-700',
      Python: 'from-blue-500 to-yellow-500',
      'Tailwind CSS': 'from-cyan-400 to-blue-500',
    }

    return skillColors[skillName] || color
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-100/30 bg-white shadow-lg dark:border-gray-700/30 dark:bg-gray-800">
      {/* Header */}
      <div className={`w-full bg-gradient-to-r px-5 py-4 ${color} text-white`}>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/10 p-2">
            {Icon &&
              React.createElement(Icon, { size: 24, className: 'text-white' })}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="p-4">
        <div className="skills-grid grid grid-cols-2 gap-4 sm:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="skill-item-card flex flex-col items-center rounded-lg border border-gray-100 bg-gray-50 p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-700/40"
            >
              <div className="mb-3 flex h-[80px] w-full items-center justify-center overflow-hidden rounded-lg">
                <div className="relative h-full w-full">
                  <Image
                    src={
                      skill.icon ||
                      skill.imagePath ||
                      '/assets/images/skills/placeholder.webp'
                    }
                    alt={`${skill.name} icon`}
                    fill
                    className="object-contain p-1"
                    sizes="(max-width: 640px) 40vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    loading="lazy" // Lazy load all skill icons since they're below the fold
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
                    quality={80}
                  />
                </div>
              </div>
              <div className="w-full">
                <span
                  className={`rounded-full bg-gradient-to-r px-2 py-1 text-xs font-semibold text-white ${getSkillColor(
                    skill.name,
                  )} block text-center`}
                >
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillCard
