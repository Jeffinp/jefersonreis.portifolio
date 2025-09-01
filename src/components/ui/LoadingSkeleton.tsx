import React from 'react'

interface SkeletonProps {
  variant:
    | 'skills'
    | 'services'
    | 'projects'
    | 'timeline'
    | 'testimonials'
    | 'contact'
  className?: string
}

const LoadingSkeleton: React.FC<SkeletonProps> = ({
  variant,
  className = '',
}) => {
  const baseClasses = `animate-pulse ${className}`

  const skeletons = {
    skills: (
      <div className={`${baseClasses} py-16 md:py-20 lg:py-24`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          {/* Skills Cloud */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-gray-200 dark:bg-gray-700"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),

    services: (
      <div className={`${baseClasses} py-16 md:py-20 lg:py-24`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          {/* Service Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-700"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),

    projects: (
      <div className={`${baseClasses} py-16 md:py-20 lg:py-24`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          {/* Filter Buttons */}
          <div className="mb-8 flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-full bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
          {/* Project Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl bg-gray-200 p-4 dark:bg-gray-700"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-48 rounded-lg bg-gray-300 dark:bg-gray-600" />
                <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600" />
                <div className="h-3 w-full rounded bg-gray-300 dark:bg-gray-600" />
                <div className="h-3 w-2/3 rounded bg-gray-300 dark:bg-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    timeline: (
      <div className={`${baseClasses} py-16 md:py-20 lg:py-24`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          {/* Timeline Items */}
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gray-200 dark:bg-gray-700" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`relative flex ${
                  i % 2 === 0 ? 'justify-end' : 'justify-start'
                } mb-8`}
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div
                  className={`w-5/12 ${
                    i % 2 === 0 ? 'mr-12' : 'ml-12'
                  } space-y-3 rounded-xl bg-gray-200 p-6 dark:bg-gray-700`}
                >
                  <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600" />
                  <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-gray-600" />
                  <div className="h-3 w-full rounded bg-gray-300 dark:bg-gray-600" />
                  <div className="h-3 w-2/3 rounded bg-gray-300 dark:bg-gray-600" />
                </div>
                <div className="absolute left-1/2 h-8 w-8 -translate-x-1/2 transform rounded-full bg-gray-300 dark:bg-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    testimonials: (
      <div className={`${baseClasses} py-16 md:py-20 lg:py-24`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          {/* Testimonial Card */}
          <div className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-gray-200 p-8 dark:bg-gray-700">
            <div className="h-6 w-full rounded bg-gray-300 dark:bg-gray-600" />
            <div className="h-6 w-4/5 rounded bg-gray-300 dark:bg-gray-600" />
            <div className="h-6 w-3/5 rounded bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-600" />
                <div className="h-3 w-24 rounded bg-gray-300 dark:bg-gray-600" />
              </div>
            </div>
          </div>
          {/* Pagination dots */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-2 w-8 rounded-full bg-gray-300 dark:bg-gray-600"
              />
            ))}
          </div>
        </div>
      </div>
    ),

    contact: (
      <div className={`${baseClasses} py-16 md:py-20 lg:py-24`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto h-4 w-96 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-xl bg-gray-200 p-6 dark:bg-gray-700"
                >
                  <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="h-3 w-48 rounded bg-gray-300 dark:bg-gray-600" />
                  </div>
                </div>
              ))}
            </div>
            {/* Contact Form */}
            <div className="space-y-4 rounded-2xl bg-gray-200 p-8 dark:bg-gray-700">
              <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="h-12 w-full rounded-lg bg-gray-300 dark:bg-gray-600" />
              <div className="h-12 w-full rounded-lg bg-gray-300 dark:bg-gray-600" />
              <div className="h-32 w-full rounded-lg bg-gray-300 dark:bg-gray-600" />
              <div className="h-12 w-full rounded-lg bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        </div>
      </div>
    ),
  }

  return skeletons[variant] || null
}

export default LoadingSkeleton
