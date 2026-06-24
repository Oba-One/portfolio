#!/usr/bin/env bun
import { existsSync, readFileSync } from 'node:fs'
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
const siteUrl = 'https://afolabi.info'
const expectedSocialImage = {
  width: 1200,
  height: 630,
  type: 'image/png',
}

function routeToPagePath(route) {
  if (route === '/') return path.join(repoRoot, 'src/pages/index.page.ts')
  return path.join(repoRoot, `src/pages${route}/index.page.ts`)
}

function publicPathFromUrl(value) {
  const url = new URL(value, siteUrl)

  if (url.origin !== siteUrl) {
    return null
  }

  return {
    pathname: url.pathname,
    hasVersion: url.searchParams.has('v'),
  }
}

function inspectPng(filePath) {
  const bytes = readFileSync(filePath)
  const signature = bytes.subarray(0, 8).toString('hex')

  return {
    isPng: signature === '89504e470d0a1a0a',
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  }
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

  const { socialImage } = projects[slug]

  assert(socialImage, `Project ${slug} is missing a social image`)

  if (socialImage) {
    const publicImage = publicPathFromUrl(socialImage.src)
    const socialImagePath = publicImage
      ? path.join(repoRoot, 'public', publicImage.pathname.replace(/^\/+/, ''))
      : null

    assert(
      publicImage,
      `Project ${slug} social image must be a public ${siteUrl} URL or root path`
    )
    assert(
      publicImage?.pathname.startsWith('/social/projects/'),
      `Project ${slug} social image should live under /social/projects`
    )
    assert(
      publicImage?.hasVersion,
      `Project ${slug} social image should include a version query`
    )
    assert(
      socialImage.type === expectedSocialImage.type,
      `Project ${slug} social image type should be ${expectedSocialImage.type}`
    )
    assert(
      socialImage.width === expectedSocialImage.width,
      `Project ${slug} social image width should be ${expectedSocialImage.width}`
    )
    assert(
      socialImage.height === expectedSocialImage.height,
      `Project ${slug} social image height should be ${expectedSocialImage.height}`
    )
    assert(
      socialImagePath && existsSync(socialImagePath),
      `Project ${slug} social image file is missing at ${publicImage?.pathname}`
    )

    if (socialImagePath && existsSync(socialImagePath)) {
      const png = inspectPng(socialImagePath)

      assert(png.isPng, `Project ${slug} social image file must be a PNG`)
      assert(
        png.width === socialImage.width,
        `Project ${slug} social image file width is ${png.width}, expected ${socialImage.width}`
      )
      assert(
        png.height === socialImage.height,
        `Project ${slug} social image file height is ${png.height}, expected ${socialImage.height}`
      )
    }
  }
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
