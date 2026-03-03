'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Github, Info, ImageOff } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onClick?: () => void
  onDetails?: (project: Project, trigger: HTMLButtonElement) => void
}

export function ProjectCard({ project, onClick, onDetails }: ProjectCardProps) {
  const t = useTranslations('projects')
  const tc = useTranslations('common')
  const [imageFailed, setImageFailed] = useState(false)
  const hasThumbnail = Boolean(project.thumbnail?.url) && !imageFailed

  useEffect(() => {
    setImageFailed(false)
  }, [project.id, project.thumbnail?.url])

  return (
    <div className="h-full transform-gpu will-change-transform transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none">
      <Card
        className="group border-border/70 bg-card/95 hover:border-primary/40 h-full cursor-pointer overflow-hidden transition-colors duration-300 hover:shadow-[0_14px_34px_-24px_rgba(59,130,246,0.45)]"
        onClick={onClick}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {hasThumbnail ? (
            <>
              <Image
                src={project.thumbnail!.url}
                alt={project.thumbnail!.alt}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                onError={() => setImageFailed(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            </>
          ) : (
            <div className="from-muted/80 to-muted/40 flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br">
              <ImageOff className="text-muted-foreground/45 h-10 w-10" />
              <span className="text-muted-foreground/60 text-xs font-medium">
                {t('noImage')}
              </span>
            </div>
          )}
          <Badge
            className={`absolute top-4 right-4 ${
              project.category === 'web'
                ? 'bg-blue-600/95 hover:bg-blue-600'
                : project.category === 'mobile'
                  ? 'bg-emerald-600/95 hover:bg-emerald-600'
                  : 'bg-orange-600/95 hover:bg-orange-600'
            }`}
          >
            {project.category === 'web'
              ? 'Web'
              : project.category === 'mobile'
                ? 'Mobile'
                : 'System'}
          </Badge>
        </div>

        <CardContent className="flex-1 p-6 pb-4">
          <h3 className="mb-2 line-clamp-2 min-h-[3.4rem] text-xl font-bold">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="bg-secondary/70">
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex-wrap gap-2 p-6 pt-0">
          {onDetails && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDetails(project, e.currentTarget as HTMLButtonElement)
              }}
            >
              <Info className="mr-2 h-4 w-4" />
              {tc('details')}
            </Button>
          )}

          {project.liveUrl && (
            <Button
              size="sm"
              variant="outline"
              asChild
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {tc('demo')}
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              size="sm"
              variant="outline"
              asChild
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                {tc('code')}
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
