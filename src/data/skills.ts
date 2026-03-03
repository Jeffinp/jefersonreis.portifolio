import type { Skill, SkillCategory, SkillGroup } from '@/types'

/**
 * Lista completa de skills/habilidades
 */
export const skills: Skill[] = [
  // ==================== 6 Years ====================
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    level: 'expert',
    icon: '/assets/images/skills/html5.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    level: 'expert',
    icon: '/assets/images/skills/css3.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    level: 'expert',
    icon: '/assets/images/skills/javascript.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    level: 'expert',
    icon: '/assets/images/skills/typescript.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    level: 'expert',
    icon: '/assets/images/skills/react.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    level: 'expert',
    icon: '/assets/images/skills/nextjs.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'vuejs',
    name: 'Vue.js',
    category: 'frontend',
    level: 'advanced',
    icon: '/assets/images/skills/vuejs.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'frontend',
    level: 'advanced',
    icon: '/assets/images/skills/angular.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 'expert',
    icon: '/assets/images/skills/tailwind.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'sass',
    name: 'SASS',
    category: 'frontend',
    level: 'advanced',
    icon: '/assets/images/skills/sass.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    level: 'expert',
    icon: '/assets/images/skills/nodejs.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    level: 'expert',
    icon: '/assets/images/skills/python.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'csharp',
    name: 'C#',
    category: 'backend',
    level: 'advanced',
    icon: '/assets/images/skills/csharp.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'django',
    name: 'Django',
    category: 'backend',
    level: 'advanced',
    icon: '/assets/images/skills/django.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'backend',
    level: 'advanced',
    icon: '/assets/images/skills/flask.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    level: 'advanced',
    icon: '/assets/images/skills/fastapi.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'dotnet',
    name: '.NET',
    category: 'backend',
    level: 'advanced',
    icon: '/assets/images/skills/dotnet.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    level: 'expert',
    icon: '/assets/images/skills/postgresql.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    level: 'expert',
    icon: '/assets/images/skills/mysql.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'mariadb',
    name: 'MariaDB',
    category: 'database',
    level: 'advanced',
    icon: '/assets/images/skills/mariadb.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    level: 'advanced',
    icon: '/assets/images/skills/redis.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'database',
    level: 'expert',
    icon: '/assets/images/skills/firebase.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    level: 'advanced',
    icon: '/assets/images/skills/supabase.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'database',
    level: 'advanced',
    icon: '/assets/images/skills/docker.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    category: 'database',
    level: 'intermediate',
    icon: '/assets/images/skills/gcp.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'database',
    level: 'expert',
    icon: '/assets/images/skills/vercel.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    level: 'expert',
    icon: '/assets/images/skills/figma.svg',
    yearsOfExperience: 6,
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    level: 'expert',
    icon: '/assets/images/skills/git.svg',
    yearsOfExperience: 6,
  },

  // ==================== 5 Years ====================
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'backend',
    level: 'advanced',
    icon: '/assets/images/skills/nestjs.svg',
    yearsOfExperience: 5,
  },
  {
    id: 'go',
    name: 'Go',
    category: 'backend',
    level: 'intermediate',
    icon: '/assets/images/skills/go.svg',
    yearsOfExperience: 5,
  },
  {
    id: 'rust',
    name: 'Rust',
    category: 'backend',
    level: 'intermediate',
    icon: '/assets/images/skills/rust.svg',
    yearsOfExperience: 5,
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'backend',
    level: 'intermediate',
    icon: '/assets/images/skills/cpp.svg',
    yearsOfExperience: 5,
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    level: 'advanced',
    icon: '/assets/images/skills/flutter.svg',
    yearsOfExperience: 5,
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'mobile',
    level: 'advanced',
    icon: '/assets/images/skills/dart.svg',
    yearsOfExperience: 5,
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'mobile',
    level: 'intermediate',
    icon: '/assets/images/skills/kotlin.svg',
    yearsOfExperience: 5,
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'mobile',
    level: 'advanced',
    icon: '/assets/images/skills/react.svg',
    yearsOfExperience: 5,
  },

  // ==================== 4 Years ====================
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    level: 'advanced',
    icon: '/assets/images/skills/php.svg',
    yearsOfExperience: 4,
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'backend',
    level: 'advanced',
    icon: '/assets/images/skills/laravel.svg',
    yearsOfExperience: 4,
  },
]

/**
 * Grupos de skills por categoria
 */
export const skillGroups: SkillGroup[] = [
  {
    category: 'frontend',
    label: 'Frontend Development',
    icon: 'Code2', // Lucide icon name
    skills: skills.filter((s) => s.category === 'frontend'),
  },
  {
    category: 'backend',
    label: 'Backend Development',
    icon: 'Server', // Lucide icon name
    skills: skills.filter((s) => s.category === 'backend'),
  },
  {
    category: 'mobile',
    label: 'Mobile Development',
    icon: 'Smartphone', // Lucide icon name
    skills: skills.filter((s) => s.category === 'mobile'),
  },
  {
    category: 'database',
    label: 'Database & Cloud',
    icon: 'Cloud', // Lucide icon name
    skills: skills.filter((s) => s.category === 'database'),
  },
  {
    category: 'tools',
    label: 'Tools',
    icon: 'Wrench', // Lucide icon name
    skills: skills.filter((s) => s.category === 'tools'),
  },
]

/**
 * Helper: Obter skills por categoria
 */
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((skill) => skill.category === category)
}

/**
 * Helper: Obter skills por nível
 */
export function getSkillsByLevel(level: Skill['level']): Skill[] {
  return skills.filter((skill) => skill.level === level)
}

/**
 * Helper: Obter top skills (expert level primeiro)
 */
export function getTopSkills(limit = 6): Skill[] {
  const levelOrder = { expert: 4, advanced: 3, intermediate: 2, beginner: 1 }
  return [...skills]
    .sort((a, b) => levelOrder[b.level] - levelOrder[a.level])
    .slice(0, limit)
}
