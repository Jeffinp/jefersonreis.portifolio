import { useCallback } from 'react'
import { track } from '@vercel/analytics'

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

export const useAnalytics = () => {
  // Track portfolio-specific events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (typeof window !== 'undefined') {
      track(event.name, event.properties)
    }
  }, [])

  // Pre-defined tracking functions for common portfolio actions
  const trackProjectView = useCallback(
    (projectId: string, projectTitle: string) => {
      trackEvent({
        name: 'project_viewed',
        properties: {
          project_id: projectId,
          project_title: projectTitle,
          section: 'portfolio',
        },
      })
    },
    [trackEvent],
  )

  const trackCaseStudyOpen = useCallback(
    (projectId: string, projectTitle: string) => {
      trackEvent({
        name: 'case_study_opened',
        properties: {
          project_id: projectId,
          project_title: projectTitle,
          interaction_type: 'modal',
        },
      })
    },
    [trackEvent],
  )

  const trackContactFormSubmit = useCallback(
    (formType: 'contact' | 'newsletter' = 'contact') => {
      trackEvent({
        name: 'contact_form_submitted',
        properties: {
          form_type: formType,
          section: 'contact',
        },
      })
    },
    [trackEvent],
  )

  const trackDownloadCV = useCallback(() => {
    trackEvent({
      name: 'cv_downloaded',
      properties: {
        file_type: 'pdf',
        section: 'about',
      },
    })
  }, [trackEvent])

  const trackSocialClick = useCallback(
    (platform: string, location: string) => {
      trackEvent({
        name: 'social_link_clicked',
        properties: {
          platform: platform,
          location: location,
        },
      })
    },
    [trackEvent],
  )

  const trackSkillsInteraction = useCallback(
    (skillName: string, interactionType: 'hover' | 'click') => {
      trackEvent({
        name: 'skills_interaction',
        properties: {
          skill_name: skillName,
          interaction_type: interactionType,
          section: 'skills',
        },
      })
    },
    [trackEvent],
  )

  const trackServiceInquiry = useCallback(
    (serviceName: string) => {
      trackEvent({
        name: 'service_inquiry',
        properties: {
          service_name: serviceName,
          section: 'services',
        },
      })
    },
    [trackEvent],
  )

  const trackNavigationClick = useCallback(
    (sectionName: string, navigationMethod: 'header' | 'footer' | 'cta') => {
      trackEvent({
        name: 'navigation_click',
        properties: {
          section_name: sectionName,
          navigation_method: navigationMethod,
        },
      })
    },
    [trackEvent],
  )

  const trackThemeChange = useCallback(
    (theme: 'light' | 'dark' | 'system') => {
      trackEvent({
        name: 'theme_changed',
        properties: {
          theme: theme,
          location: 'header',
        },
      })
    },
    [trackEvent],
  )

  const trackLanguageChange = useCallback(
    (language: 'pt' | 'en', previousLanguage: 'pt' | 'en') => {
      trackEvent({
        name: 'language_changed',
        properties: {
          new_language: language,
          previous_language: previousLanguage,
          location: 'header',
        },
      })
    },
    [trackEvent],
  )

  const trackScrollDepth = useCallback(
    (depth: number, section: string) => {
      trackEvent({
        name: 'scroll_depth',
        properties: {
          depth_percentage: depth,
          section: section,
        },
      })
    },
    [trackEvent],
  )

  const trackTimeOnPage = useCallback(
    (timeInSeconds: number, pageName: string) => {
      trackEvent({
        name: 'time_on_page',
        properties: {
          time_seconds: timeInSeconds,
          page_name: pageName,
        },
      })
    },
    [trackEvent],
  )

  const trackExternalLinkClick = useCallback(
    (url: string, linkText: string, location: string) => {
      trackEvent({
        name: 'external_link_clicked',
        properties: {
          url: url,
          link_text: linkText,
          location: location,
        },
      })
    },
    [trackEvent],
  )

  const trackSearchQuery = useCallback(
    (query: string, section: 'projects', resultsCount: number) => {
      trackEvent({
        name: 'search_performed',
        properties: {
          search_query: query,
          section: section,
          results_count: resultsCount,
        },
      })
    },
    [trackEvent],
  )

  const trackFilterUsage = useCallback(
    (filterType: string, filterValue: string, section: string) => {
      trackEvent({
        name: 'filter_used',
        properties: {
          filter_type: filterType,
          filter_value: filterValue,
          section: section,
        },
      })
    },
    [trackEvent],
  )

  const trackPerformanceMetric = useCallback(
    (metricName: string, value: number, unit: string) => {
      trackEvent({
        name: 'performance_metric',
        properties: {
          metric_name: metricName,
          value: value,
          unit: unit,
        },
      })
    },
    [trackEvent],
  )

  return {
    trackEvent,
    trackProjectView,
    trackCaseStudyOpen,
    trackContactFormSubmit,
    trackDownloadCV,
    trackSocialClick,
    trackSkillsInteraction,
    trackServiceInquiry,
    trackNavigationClick,
    trackThemeChange,
    trackLanguageChange,
    trackScrollDepth,
    trackTimeOnPage,
    trackExternalLinkClick,
    trackSearchQuery,
    trackFilterUsage,
    trackPerformanceMetric,
  }
}

export default useAnalytics
