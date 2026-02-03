'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/types'
import { scaleIn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group h-full cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        {/* Image */}
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
          {/* Title */}
          <h3 className="mb-2 text-xl font-bold">{project.title}</h3>

          {/* Description */}
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="gap-2 p-6 pt-0">
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
