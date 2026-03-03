'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Info } from 'lucide-react'
import Image from 'next/image'
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group h-full cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.thumbnail.url}
            alt={project.thumbnail.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {project.featured && (
            <Badge className="absolute top-4 right-4">Destaque</Badge>
          )}
        </div>

        <CardContent className="p-6">
          <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex-wrap gap-2 p-6 pt-0">
          {/* Detalhes — primary action */}
          {onDetails && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDetails(project, e.currentTarget as HTMLButtonElement)
              }}
            >
              <Info className="mr-2 h-4 w-4" />
              Detalhes
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
                Demo
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
                Code
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
