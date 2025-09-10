import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

// Dynamic imports for better performance
const ExitIntentPopup = dynamic(() => import('./ExitIntentPopup'), {
  ssr: false,
})
const ReadingProgressBar = dynamic(() => import('./ReadingProgressBar'), {
  ssr: false,
})
const InteractiveQuiz = dynamic(() => import('./InteractiveQuiz'), {
  ssr: false,
})
const ROICalculator = dynamic(() => import('./ROICalculator'), {
  ssr: false,
})
const FloatingButtonsOrganizer = dynamic(() => import('./FloatingButtonsOrganizer'), {
  ssr: false,
})

interface ConversionSystemProps {
  enabled?: boolean
  features?: {
    exitIntent?: boolean
    readingProgress?: boolean
    quiz?: boolean
    roiCalculator?: boolean
  }
  exitIntentVariant?: 'discount' | 'consultation' | 'ebook' | 'quiz'
  onConversion?: (data: any) => void
}

export const ConversionSystem: React.FC<ConversionSystemProps> = ({
  enabled = true,
  features = {
    exitIntent: true,
    readingProgress: true,
    quiz: true,
    roiCalculator: true,
  },
  exitIntentVariant = 'discount',
  onConversion,
}) => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isCommercialMode, setIsCommercialMode] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Check if commercial mode
    const commercialMode = localStorage.getItem('commercialMode')
    setIsCommercialMode(commercialMode !== 'false')

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Don't render if not enabled or not in commercial mode
  if (!enabled || !isCommercialMode) {
    return null
  }

  const handleConversion = (data: any) => {
    console.log('Conversion detected:', data)
    
    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        event_category: 'engagement',
        event_label: data.type || 'unknown',
        value: data.value || 0,
      })
    }

    // Call parent callback
    onConversion?.(data)
  }

  return (
    <>
      {/* Reading Progress Bar - Show on all devices */}
      {features.readingProgress && (
        <ReadingProgressBar
          showMilestones={!isMobile}
          showPercentage={true}
          position="top"
          height={isMobile ? 4 : 6}
          onMilestone={(percentage) => {
            handleConversion({
              type: 'reading_milestone',
              value: percentage,
            })
          }}
        />
      )}

      {/* Exit Intent Popup - Desktop only */}
      {features.exitIntent && !isMobile && (
        <ExitIntentPopup
          variant={exitIntentVariant}
          onConvert={(data) => {
            handleConversion({
              type: 'exit_intent',
              ...data,
            })
          }}
        />
      )}

      {/* Floating Buttons - Organized on mobile */}
      {isMobile ? (
        <FloatingButtonsOrganizer position="right" mobileCollapsible={true}>
          {features.quiz && <InteractiveQuiz />}
          {features.roiCalculator && <ROICalculator />}
        </FloatingButtonsOrganizer>
      ) : (
        <>
          {/* Desktop - Show normally */}
          {features.quiz && <InteractiveQuiz />}
          {features.roiCalculator && <ROICalculator />}
        </>
      )}
    </>
  )
}

export default ConversionSystem