// Re-export from modular structure for backward compatibility
export {
  projects,
  getProjectById,
  getProjectsByCategory,
  getProjectsByType,
  getFeaturedProjects,
  getProjectsByTechnology,
  getRecentProjects,
  getProjectStats,
} from './projects'

// Individual project exports
export {
  webProjects,
  mobileProjects,
  designProjects,
  threeDProjects,
} from './projects'
