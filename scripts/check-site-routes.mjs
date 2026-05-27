#!/usr/bin/env bun
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { projectSlugs, projects } from '../src/constants.ts'
import {
  browserProofRoutes,
  getProjectRoute,
  homepageAnchorRoutes,
  navLinks,
  projectRoutes,
  publicRoutes,
} from '../src/utils/siteRoutes.ts'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []

function routeToPagePath(route) {
  if (route === '/') return path.join(repoRoot, 'src/pages/index.page.ts')
  return path.join(repoRoot, `src/pages${route}/index.page.ts`)
}

function assert(condition, message) {
  if (!condition) errors.push(message)
}

const projectSlugSet = new Set(projectSlugs)
const projectRouteSlugs = new Set(projectRoutes.map(route => route.slug))
const publicRouteSet = new Set(publicRoutes)
const homepageAnchorRouteSet = new Set(homepageAnchorRoutes)

for (const slug of projectSlugs) {
  assert(Object.hasOwn(projects, slug), `Missing project record for ${slug}`)
  assert(projectRouteSlugs.has(slug), `Missing project route for ${slug}`)

  const route = getProjectRoute(slug)
  assert(publicRouteSet.has(route), `Project route ${route} is missing from publicRoutes`)
  assert(projects[slug].cta.link === route, `Project ${slug} CTA link should be ${route}`)
  assert(existsSync(routeToPagePath(route)), `Missing page file for ${route}`)
}

for (const route of projectRoutes) {
  assert(projectSlugSet.has(route.slug), `Project route references unknown slug ${route.slug}`)
}

for (const route of publicRoutes) {
  assert(existsSync(routeToPagePath(route)), `Public route ${route} has no page file`)
}

for (const route of browserProofRoutes) {
  assert(publicRouteSet.has(route), `Browser proof route ${route} is not a public route`)
}

for (const { label, pathname } of navLinks) {
  const [baseRoute, hash] = pathname.split('#')
  const normalizedBase = baseRoute || '/'

  assert(
    publicRouteSet.has(normalizedBase),
    `Nav link ${label} points to unknown route ${normalizedBase}`
  )

  if (hash) {
    assert(
      homepageAnchorRouteSet.has(`${normalizedBase}#${hash}`),
      `Nav link ${label} points to unknown homepage anchor ${pathname}`
    )
  }
}

if (errors.length) {
  console.error('Portfolio route guard failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(
  `Portfolio route guard passed: ${publicRoutes.length} public route(s), ${projectRoutes.length} project route(s), ${browserProofRoutes.length} browser proof route(s).`
)
