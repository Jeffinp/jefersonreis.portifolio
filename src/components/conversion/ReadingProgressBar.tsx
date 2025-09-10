import React, { useState, useEffect, useCallback } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { Zap, Trophy, Star, Target, Flame } from 'lucide-react'

interface ReadingProgressBarProps {
  showMilestones?: boolean
  color?: string
  height?: number
  position?: 'top' | 'bottom'
  showPercentage?: boolean
  onMilestone?: (percentage: number) => void
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  showMilestones = true,
  color = 'bg-gradient-to-r from-blue-500 to-purple-500',
  height = 6, // Aumentado para melhor visibilidade
  position = 'top',
  showPercentage = true,
  onMilestone,
}) => {
  const [progress, setProgress] = useState(0)
  const [milestone, setMilestone] = useState<number | null>(null)
  const [totalHeight, setTotalHeight] = useState(0)
  const [shownMilestones, setShownMilestones] = useState<Set<number>>(new Set())

  // Spring animation for smooth progress
  const springProgress = useSpring(0, { stiffness: 400, damping: 40 })
  const width = useTransform(springProgress, [0, 100], ['0%', '100%'])

  // Reset milestones when page reloads (new session)
  useEffect(() => {
    // Clear shown milestones on component mount (new page load)
    setShownMilestones(new Set())
  }, [])

  // Milestones configuration
  const milestones = [
    { percentage: 25, icon: Zap, message: '🔥 Continue assim!' },
    { percentage: 50, icon: Star, message: '⭐ Metade do caminho!' },
    { percentage: 75, icon: Target, message: '🎯 Quase lá!' },
    {
      percentage: 95,
      icon: Trophy,
      message: '🏆 Incrível! Finalize com o formulário!',
    },
  ]

  const showMilestoneNotification = useCallback(
    (milestone: any) => {
      // Create temporary notification element
      const notification = document.createElement('div')
      notification.className = 'milestone-notification'
      notification.innerHTML = `
      <div class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <span class="text-2xl">${milestone.message}</span>
      </div>
    `

      // Style the notification
      Object.assign(notification.style, {
        position: 'fixed',
        top: position === 'top' ? '60px' : 'auto',
        bottom: position === 'bottom' ? '60px' : 'auto',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '9999',
        animation: 'slideInBounce 0.5s ease-out',
      })

      document.body.appendChild(notification)

      // Remove after animation
      setTimeout(() => {
        notification.style.animation = 'slideOutFade 0.3s ease-out'
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, 2000)
    },
    [position],
  )

  const calculateProgress = useCallback(() => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY

    // Calculate total scrollable height
    const scrollableHeight = documentHeight - windowHeight

    if (scrollableHeight > 0) {
      const scrollPercentage = (scrollTop / scrollableHeight) * 100
      const clampedProgress = Math.min(Math.max(scrollPercentage, 0), 100)

      setProgress(clampedProgress)
      springProgress.set(clampedProgress)

      // Check for milestones
      if (showMilestones) {
        milestones.forEach((m) => {
          if (
            clampedProgress >= m.percentage &&
            clampedProgress < m.percentage + 2 &&
            milestone !== m.percentage &&
            !shownMilestones.has(m.percentage) // Only show if not already shown in this session
          ) {
            setMilestone(m.percentage)
            onMilestone?.(m.percentage)

            // Mark milestone as shown for this session
            setShownMilestones((prev) => new Set(prev).add(m.percentage))

            // Show milestone notification
            showMilestoneNotification(m)

            // Reset milestone after animation
            setTimeout(() => setMilestone(null), 3000)
          }
        })
      }
    }

    setTotalHeight(documentHeight)
  }, [
    springProgress,
    milestone,
    showMilestones,
    onMilestone,
    shownMilestones,
    milestones,
    showMilestoneNotification,
  ])

  useEffect(() => {
    // Initial calculation
    calculateProgress()

    // Add scroll listener with throttling
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', calculateProgress)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateProgress)
    }
  }, [calculateProgress])

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideInBounce {
        0% {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
        60% {
          opacity: 1;
          transform: translateX(-50%) translateY(5px);
        }
        100% {
          transform: translateX(-50%) translateY(0);
        }
      }
      
      @keyframes slideOutFade {
        0% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      {/* Progress Bar Container */}
      <div
        className={`fixed right-0 left-0 z-[99999] ${
          position === 'top' ? 'top-0' : 'bottom-0'
        }`}
        style={{ height: `${height}px` }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />

        {/* Progress Fill */}
        <motion.div
          className="absolute left-0 h-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"
          style={{ width }}
        >
          {/* Animated glow effect at the end */}
          <div className="absolute top-0 -right-2 h-full w-8">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/30 to-white/60" />
          </div>
          {/* Shadow for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>

        {/* Milestone markers */}
        {showMilestones &&
          milestones.map((m) => (
            <div
              key={m.percentage}
              className="absolute top-0 h-full"
              style={{ left: `${m.percentage}%` }}
            >
              <div
                className={`h-full w-px ${
                  progress >= m.percentage
                    ? 'bg-white/50'
                    : 'bg-gray-400 dark:bg-gray-600'
                }`}
              />
              {progress >= m.percentage && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2"
                >
                  <div className="rounded-full bg-white p-1 shadow-md dark:bg-gray-800">
                    <m.icon className="h-3 w-3 text-green-500" />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
      </div>

      {/* Percentage Display */}
      {showPercentage && progress > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed z-[100000] ${
            position === 'top' ? 'top-16' : 'bottom-12'
          } right-4`}
        >
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 shadow-xl">
            <Flame
              className={`h-4 w-4 text-white ${progress > 80 ? 'animate-pulse' : ''}`}
            />
            <span className="text-sm font-bold text-white">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default ReadingProgressBar
