import type { ProjectSlug } from '../constants'
import siteRoutes from './siteRoutes.json'

export type ProjectRoute = {
  slug: ProjectSlug
  route: `/projects/${string}`
}

export type NavLink = {
  label: string
  pathname: string
}

export const publicRoutes = siteRoutes.publicRoutes as readonly string[]
export const homepageAnchorRoutes = siteRoutes.homepageAnchorRoutes as readonly string[]
export const browserProofRoutes = siteRoutes.browserProofRoutes as readonly string[]
export const projectRoutes = siteRoutes.projectRoutes as readonly ProjectRoute[]
export const navLinks = siteRoutes.navLinks as readonly NavLink[]

export function getProjectRoute(slug: ProjectSlug) {
  const projectRoute = projectRoutes.find(route => route.slug === slug)

  if (!projectRoute) {
    throw new Error(`Missing project route for ${slug}`)
  }

  return projectRoute.route
}
