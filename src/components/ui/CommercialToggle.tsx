import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Code } from 'lucide-react'

interface CommercialToggleProps {
  isCommercial: boolean
  onToggle: () => void
}

export const CommercialToggle: React.FC<CommercialToggleProps> = ({
  isCommercial,
  onToggle,
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="group relative flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-all hover:shadow-md dark:border-gray-600 dark:bg-gray-800"
        aria-label="Alternar modo de visualização"
      >
        <div className="relative flex items-center gap-2">
          {/* Toggle Switch */}
          <div className="relative h-5 w-10 rounded-full bg-gray-200 transition-colors dark:bg-gray-700">
            <motion.div
              className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-md"
              animate={{
                x: isCommercial ? 22 : 2,
                backgroundColor: isCommercial ? '#3B82F6' : '#6B7280',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>

          {/* Labels */}
          <div className="flex items-center gap-1">
            {isCommercial ? (
              <>
                <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="hidden text-gray-700 sm:inline dark:text-gray-300">
                  Comercial
                </span>
              </>
            ) : (
              <>
                <Code className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="hidden text-gray-700 sm:inline dark:text-gray-300">
                  Portfolio
                </span>
              </>
            )}
          </div>
        </div>

        {/* Tooltip */}
        <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-700">
          {isCommercial ? 'Mudar para Portfolio' : 'Mudar para Comercial'}
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-gray-900 dark:bg-gray-700"></div>
        </div>
      </button>
    </div>
  )
}

export default CommercialToggle
