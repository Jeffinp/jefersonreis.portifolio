import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { 
  Bot, 
  Sparkles, 
  Heart, 
  AlertCircle, 
  HelpCircle,
  Zap,
  Code,
  Rocket,
  MessageCircle,
  X,
  ChevronRight,
  Trophy,
  Star
} from 'lucide-react'

interface AICompanionProps {
  enabled?: boolean
}

interface Message {
  id: number
  text: string
  type: 'greeting' | 'tip' | 'celebration' | 'help' | 'easter-egg'
}

interface EasterEgg {
  id: string
  unlocked: boolean
  title: string
  description: string
}

type MoodState = 'happy' | 'curious' | 'excited' | 'sleepy' | 'thinking'
type AnimationState = 'idle' | 'floating' | 'spinning' | 'bouncing' | 'celebrating'

export const AICompanion: React.FC<AICompanionProps> = ({ enabled = true }) => {
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 150 })
  const [mood, setMood] = useState<MoodState>('happy')
  const [animationState, setAnimationState] = useState<AnimationState>('floating')
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null)
  const [clickCount, setClickCount] = useState(0)
  const [easterEggs, setEasterEggs] = useState<EasterEgg[]>([
    { id: 'first-click', unlocked: false, title: 'Curious Explorer', description: 'You clicked on me!' },
    { id: 'ten-clicks', unlocked: false, title: 'Persistent Friend', description: '10 clicks! We\'re best friends now!' },
    { id: 'konami', unlocked: false, title: 'Code Master', description: 'You found the secret code!' },
    { id: 'scroll-master', unlocked: false, title: 'Scroll Master', description: 'You\'ve explored everything!' }
  ])
  const [showMiniGame, setShowMiniGame] = useState(false)
  const companionRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const scrollPositionRef = useRef(0)
  
  // Context-aware messages
  const contextMessages = {
    greeting: [
      "🚀 Welcome to the cosmos! I'm ARIA, your AI companion!",
      "✨ Ready to explore the universe of projects?",
      "🌟 Hi there! Need help navigating?",
    ],
    projectsArea: [
      "💡 Click on any planet to explore a project!",
      "🔍 Each planet represents a unique creation",
      "⭐ The bigger planets are featured projects!",
    ],
    skillsArea: [
      "🎯 These are all the technologies mastered!",
      "💪 Hover over skills to see related projects",
      "🌈 The nebula shows skill connections!",
    ],
    contactArea: [
      "📧 Ready to start a conversation?",
      "🤝 Let's connect and build something amazing!",
      "💬 Drop a message through the quantum channel!",
    ],
    idle: [
      "🤔 Did you know? This portfolio is 100% custom-built!",
      "💫 Try clicking on different elements for surprises!",
      "🎮 Psst... I have some mini-games if you're interested!",
      "🌙 The stars are aligned for great projects today!",
    ]
  }

  // Personality reactions based on user actions
  useEffect(() => {
    if (!enabled) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollDirection = scrollY > scrollPositionRef.current ? 'down' : 'up'
      scrollPositionRef.current = scrollY

      // Update position to follow scroll smoothly
      setPosition(prev => ({
        ...prev,
        y: window.innerHeight - 150 + scrollY * 0.1
      }))

      // Change mood based on scroll position
      const scrollPercentage = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      
      if (scrollPercentage > 90) {
        setMood('excited')
        if (!easterEggs.find(e => e.id === 'scroll-master')?.unlocked) {
          unlockEasterEgg('scroll-master')
        }
      } else if (scrollPercentage > 50) {
        setMood('curious')
      } else {
        setMood('happy')
      }

      // Show contextual tips based on section
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          const sectionId = section.id
          if (sectionId === 'projects' && Math.random() > 0.98) {
            showMessage('projectsArea')
          } else if (sectionId === 'skills' && Math.random() > 0.98) {
            showMessage('skillsArea')
          } else if (sectionId === 'contact' && Math.random() > 0.98) {
            showMessage('contactArea')
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabled, easterEggs])

  // Idle animations
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExpanded) {
        const animations: AnimationState[] = ['floating', 'spinning', 'bouncing']
        setAnimationState(animations[Math.floor(Math.random() * animations.length)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isExpanded])

  // Show random tips periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExpanded && Math.random() > 0.7) {
        showMessage('idle')
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isExpanded])

  // Konami code detection
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          unlockEasterEgg('konami')
          setMood('excited')
          setAnimationState('celebrating')
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const showMessage = (category: keyof typeof contextMessages) => {
    const messages = contextMessages[category]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setCurrentMessage({
      id: Date.now(),
      text: randomMessage,
      type: category === 'greeting' ? 'greeting' : 'tip'
    })
    setTimeout(() => setCurrentMessage(null), 5000)
  }

  const unlockEasterEgg = (eggId: string) => {
    setEasterEggs(prev => prev.map(egg => 
      egg.id === eggId ? { ...egg, unlocked: true } : egg
    ))
    setCurrentMessage({
      id: Date.now(),
      text: `🎉 Achievement Unlocked: ${easterEggs.find(e => e.id === eggId)?.title}!`,
      type: 'celebration'
    })
    setAnimationState('celebrating')
    setTimeout(() => setAnimationState('floating'), 3000)
  }

  const handleCompanionClick = () => {
    setClickCount(prev => prev + 1)
    
    if (clickCount === 0) {
      unlockEasterEgg('first-click')
    } else if (clickCount === 9) {
      unlockEasterEgg('ten-clicks')
    } else if (clickCount === 20) {
      setShowMiniGame(true)
    }

    // Random reactions
    const reactions = ['bouncing', 'spinning', 'celebrating'] as AnimationState[]
    setAnimationState(reactions[Math.floor(Math.random() * reactions.length)])
    setTimeout(() => setAnimationState('floating'), 2000)
  }

  // Mini-game component
  const MiniGame = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-cosmic-black/90 backdrop-blur-lg"
    >
      <div className="holographic max-w-md rounded-2xl p-8">
        <h3 className="mb-4 text-2xl font-bold text-white">🎮 Space Invaders Mini-Game</h3>
        <p className="mb-6 text-gray-400">Coming soon! For now, enjoy this achievement!</p>
        <div className="mb-6 grid grid-cols-2 gap-4">
          {easterEggs.map(egg => (
            <div 
              key={egg.id}
              className={`rounded-lg border p-3 ${
                egg.unlocked 
                  ? 'border-stellar-blue bg-stellar-blue/10' 
                  : 'border-gray-600 bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                {egg.unlocked ? (
                  <Trophy className="h-4 w-4 text-yellow-400" />
                ) : (
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                )}
                <span className="text-sm font-bold text-white">
                  {egg.unlocked ? egg.title : '???'}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                {egg.unlocked ? egg.description : 'Keep exploring!'}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowMiniGame(false)}
          className="w-full rounded-lg bg-stellar-blue px-4 py-2 font-bold text-white transition-colors hover:bg-stellar-blue/80"
        >
          Close
        </button>
      </div>
    </motion.div>
  )

  if (!enabled) return null

  // Show greeting on mount
  useEffect(() => {
    setTimeout(() => showMessage('greeting'), 1000)
  }, [])

  return (
    <>
      {/* Main Companion */}
      <motion.div
        ref={companionRef}
        className="fixed z-[35]"
        style={{ left: position.x, top: position.y }}
        animate={controls}
        drag
        dragMomentum={false}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          setPosition({ x: info.point.x, y: info.point.y })
        }}
      >
        {/* Robot Body */}
        <motion.div
          className="relative cursor-pointer"
          onClick={handleCompanionClick}
          animate={{
            y: animationState === 'floating' ? [0, -10, 0] : 0,
            rotate: animationState === 'spinning' ? 360 : 0,
            scale: animationState === 'bouncing' ? [1, 1.2, 1] : 1
          }}
          transition={{
            duration: animationState === 'floating' ? 3 : 1,
            repeat: animationState === 'celebrating' ? 3 : Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 rounded-full bg-stellar-blue/20 blur-xl" />
          
          {/* Main Body */}
          <div className="relative h-16 w-16 rounded-2xl border-2 border-stellar-blue bg-cosmic-black/90 backdrop-blur-sm">
            {/* Face */}
            <div className="absolute inset-2 flex items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-2">
                <motion.div
                  className="h-2 w-2 rounded-full bg-stellar-blue"
                  animate={{
                    scaleY: mood === 'sleepy' ? 0.3 : 1,
                  }}
                />
                <motion.div
                  className="h-2 w-2 rounded-full bg-stellar-blue"
                  animate={{
                    scaleY: mood === 'sleepy' ? 0.3 : 1,
                  }}
                />
              </div>
              
              {/* Mouth/Expression */}
              <div className="absolute bottom-2">
                {mood === 'happy' && (
                  <div className="h-1 w-4 rounded-full bg-stellar-blue" />
                )}
                {mood === 'excited' && (
                  <Heart className="h-3 w-3 text-nova-pink" />
                )}
                {mood === 'curious' && (
                  <HelpCircle className="h-3 w-3 text-yellow-400" />
                )}
                {mood === 'thinking' && (
                  <div className="flex gap-0.5">
                    <div className="h-1 w-1 rounded-full bg-stellar-blue opacity-50" />
                    <div className="h-1 w-1 rounded-full bg-stellar-blue opacity-70" />
                    <div className="h-1 w-1 rounded-full bg-stellar-blue" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Antenna */}
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="h-3 w-0.5 bg-stellar-blue" />
              <motion.div
                className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-stellar-blue"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Activity Indicator */}
            {animationState === 'celebrating' && (
              <motion.div
                className="absolute -right-2 -top-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Message Bubble */}
        <AnimatePresence>
          {currentMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute -top-20 left-0 w-64"
            >
              <div className="holographic rounded-xl p-3">
                <p className="text-sm text-white">{currentMessage.text}</p>
              </div>
              <div className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 border-b border-r border-stellar-blue/30 bg-cosmic-black/80" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Expanded Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-20 left-0 w-80"
            >
              <div className="holographic rounded-xl p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">ARIA Assistant</h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="rounded-lg p-1 transition-colors hover:bg-white/10"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <button className="flex w-full items-center gap-2 rounded-lg bg-stellar-blue/10 p-2 text-left transition-colors hover:bg-stellar-blue/20">
                    <Rocket className="h-4 w-4 text-stellar-blue" />
                    <span className="text-sm text-white">Quick Tour</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg bg-stellar-blue/10 p-2 text-left transition-colors hover:bg-stellar-blue/20">
                    <Code className="h-4 w-4 text-stellar-blue" />
                    <span className="text-sm text-white">View Source Code</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setShowMiniGame(true)}
                    className="flex w-full items-center gap-2 rounded-lg bg-stellar-blue/10 p-2 text-left transition-colors hover:bg-stellar-blue/20"
                  >
                    <Trophy className="h-4 w-4 text-stellar-blue" />
                    <span className="text-sm text-white">Achievements</span>
                    <span className="ml-auto text-xs text-gray-400">
                      {easterEggs.filter(e => e.unlocked).length}/{easterEggs.length}
                    </span>
                  </button>
                </div>
                
                <div className="mt-4 rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-gray-400">
                    💡 Tip: Try the Konami code for a surprise!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Floating Action Button to Toggle */}
      <motion.button
        className="fixed bottom-8 left-8 z-[34] rounded-full bg-stellar-blue/20 p-3 backdrop-blur-sm transition-colors hover:bg-stellar-blue/30"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot className="h-5 w-5 text-stellar-blue" />
      </motion.button>
      
      {/* Mini-game Modal */}
      <AnimatePresence>
        {showMiniGame && <MiniGame />}
      </AnimatePresence>
    </>
  )
}

export default AICompanion