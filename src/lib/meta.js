import { pageMeta, siteUrl } from '../data/site'
import { projects } from '../data/projects'

// Title, description, and preview image for a route. Used by the build to write
// each page's <head>, and by the app to keep the tab title in sync while navigating.
export function metaFor(route) {
  if (route.page === 'project') {
    const project = projects.find((item) => item.id === route.projectId)
    return {
      title: `${project.title} | Sriram Naidu Thota`,
      description: `${project.title}: ${project.tagline}.`,
      image: `${siteUrl}${project.ogImage ?? '/og-image.png'}`,
      url: `${siteUrl}${route.path}`,
    }
  }
  const meta = pageMeta[route.page] ?? pageMeta.notfound
  return { ...meta, image: `${siteUrl}/og-image.png`, url: `${siteUrl}${route.path}` }
}
