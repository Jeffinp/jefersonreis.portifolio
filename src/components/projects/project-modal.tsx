'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectGallery } from './project-gallery'
import { ExpandableDescription } from './expandable-description'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  triggerRef?: React.RefObject<HTMLButtonElement | null>
}

export function ProjectModal({
  project,
  onClose,
  triggerRef,
}: ProjectModalProps) {
  const [mounted, setMounted] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const isOpen = project !== null

  useEffect(() => setMounted(true), [])

  // Lock body scroll without page jump (compensate scrollbar width)
  useEffect(() => {
    if (!isOpen) return
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  // Focus close button on open
  useEffect(() => {
    if (!isOpen) return
    const id = requestAnimationFrame(() => closeBtnRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  // Return focus to trigger on close
  useEffect(() => {
    if (isOpen) return
    triggerRef?.current?.focus()
  }, [isOpen, triggerRef])

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Focus trap: cycle Tab through focusable elements
  useEffect(() => {
    if (!isOpen || !panelRef.current) return
    const panel = panelRef.current

    const FOCUSABLE =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      )
      if (focusable.length === 0) return
      const first = focusable.at(0)
      const last = focusable.at(-1)

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', trapFocus)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [isOpen])

  if (!mounted) return null

  const images = project?.images?.length
    ? project.images
    : project?.thumbnail
      ? [project.thumbnail]
      : []

  const description = project?.longDescription ?? project?.description ?? ''

  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Centering container */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="presentation"
          >
            {/* Modal panel */}
            <motion.div
              key="modal-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              className="liquid-card bg-card border-border relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar modal"
                className="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring absolute top-4 right-4 z-10 rounded-full p-1.5 transition-colors focus:outline-none focus-visible:ring-2"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Scrollable content */}
              <div className="overflow-y-auto">
                {/* Gallery */}
                <ProjectGallery images={images} title={project.title} />

                <div className="space-y-5 p-6">
                  {/* Title + meta */}
                  <div>
                    <h2
                      id="modal-project-title"
                      className="pr-8 text-2xl font-bold"
                    >
                      {project.title}
                    </h2>
                    {(project.role || project.client) && (
                      <p className="text-muted-foreground mt-1 text-sm">
                        {[project.role, project.client]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                  </div>

                  {/* Technologies */}
                  {project.technologies?.length > 0 && (
                    <div>
                      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                        Tecnologias
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description with expandable */}
                  {description && (
                    <div>
                      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                        Sobre o Projeto
                      </p>
                      <ExpandableDescription text={description} maxLines={4} />
                    </div>
                  )}

                  {/* Links */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex flex-wrap gap-3 border-t pt-4">
                      {project.liveUrl && (
                        <Button size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Ver Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Ver Código
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
