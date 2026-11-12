import { projects } from '../data/projects'

// One source of truth for URLs. Every path ends in a slash because the site is
// pre-rendered to <path>/index.html and served as static files.
const staticPaths = {
  home: '/',
  experience: '/work/',
  projects: '/projects/',
  education: '/education/',
  coursework: '/coursework/',
  certifications: '/certifications/',
  contact: '/contact/',
}

export function hrefFor(page, projectId) {
  if (page === 'project') return `/projects/${projectId}/`
  return staticPaths[page] ?? '/'
}

// "/projects/finrag" and "/projects/finrag/" both resolve; unknown paths are 'notfound'.
export function matchRoute(pathname) {
  const clean = `/${pathname.split('/').filter(Boolean).join('/')}`
  const withSlash = clean === '/' ? '/' : `${clean}/`

  const page = Object.keys(staticPaths).find((key) => staticPaths[key] === withSlash)
  if (page) return { page, path: withSlash }

  const projectMatch = withSlash.match(/^\/projects\/([^/]+)\/$/)
  const project = projectMatch && projects.find((item) => item.id === projectMatch[1])
  if (project) return { page: 'project', projectId: project.id, path: withSlash }

  return { page: 'notfound', path: withSlash }
}

// Every URL the build pre-renders.
export const allPaths = [...Object.values(staticPaths), ...projects.map((project) => hrefFor('project', project.id))]

// Old links used hash routes ("#experience", "#projects/finrag"). index.html
// redirects them before the app starts; this map is the shared lookup.
export const legacyHashPaths = Object.fromEntries([
  ...Object.entries(staticPaths).map(([key, path]) => [key, path]),
  ...projects.map((project) => [`projects/${project.id}`, hrefFor('project', project.id)]),
])
