#!/usr/bin/env node
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const conversions = [
  {
    input: 'src/assets/green-goods/gpdg-graphic-green-goods-impact-value-cycle.png',
    output: 'src/assets/green-goods/gpdg-graphic-green-goods-impact-value-cycle.webp',
    width: 1120,
    quality: 84,
  },
  {
    input: 'src/assets/green-goods/green-goods-action-selection-pwa.png',
    output: 'src/assets/green-goods/green-goods-action-selection-pwa.webp',
    width: 560,
    quality: 82,
  },
  {
    input: 'src/assets/green-goods/green-goods-gardens-pwa.png',
    output: 'src/assets/green-goods/green-goods-gardens-pwa.webp',
    width: 560,
    quality: 82,
  },
  {
    input: 'src/assets/green-goods/green-goods-media-section-pwa.png',
    output: 'src/assets/green-goods/green-goods-media-section-pwa.webp',
    width: 560,
    quality: 82,
  },
  {
    input: 'src/assets/green-goods/green-goods-review-section-pwa.png',
    output: 'src/assets/green-goods/green-goods-review-section-pwa.webp',
    width: 560,
    quality: 82,
  },
  {
    input: 'src/assets/coop/coop-mark-glow.png',
    output: 'src/assets/coop/coop-mark-glow.webp',
    width: 1024,
    quality: 86,
  },
  {
    input: 'src/assets/wefa/wefa-elemental-characters.png',
    output: 'src/assets/wefa/wefa-elemental-characters.webp',
    width: 1400,
    quality: 84,
  },
  {
    input: 'src/assets/greenpill/greenpill-map.png',
    output: 'src/assets/greenpill/greenpill-map.webp',
    width: 1516,
    quality: 84,
  },
  {
    input: 'src/assets/profile.jpeg',
    output: 'src/assets/profile-2x.webp',
    width: 800,
    quality: 88,
    sharpen: true,
  },
]

const placeholders = [
  ['src/assets/coop/coop-mark-glow.webp', 'src/assets/coop/coop-mark-glow-ph.webp'],
  [
    'src/assets/coop/coop-wordmark-flat.png',
    'src/assets/coop/coop-wordmark-flat-ph.webp',
  ],
  [
    'src/assets/green-goods/green-goods-hero-website.webp',
    'src/assets/green-goods/green-goods-hero-website-ph.webp',
  ],
  [
    'src/assets/green-goods/green-goods-action-selection-pwa.webp',
    'src/assets/green-goods/green-goods-action-selection-pwa-ph.webp',
  ],
  [
    'src/assets/green-goods/green-goods-gardens-pwa.webp',
    'src/assets/green-goods/green-goods-gardens-pwa-ph.webp',
  ],
  [
    'src/assets/green-goods/green-goods-media-section-pwa.webp',
    'src/assets/green-goods/green-goods-media-section-pwa-ph.webp',
  ],
  [
    'src/assets/green-goods/green-goods-review-section-pwa.webp',
    'src/assets/green-goods/green-goods-review-section-pwa-ph.webp',
  ],
  [
    'src/assets/green-goods/gpdg-graphic-green-goods-impact-value-cycle.webp',
    'src/assets/green-goods/gpdg-graphic-green-goods-impact-value-cycle-ph.webp',
  ],
  [
    'src/assets/green-goods/refi-sicilia-agroforestry.jpeg',
    'src/assets/green-goods/refi-sicilia-agroforestry-ph.webp',
  ],
  [
    'src/assets/green-goods/tas-solar-hub-session.jpeg',
    'src/assets/green-goods/tas-solar-hub-session-ph.webp',
  ],
  [
    'src/assets/greenpill/greenpill-books.webp',
    'src/assets/greenpill/greenpill-books-ph.webp',
  ],
  [
    'src/assets/greenpill/greenpill-garden-entry.webp',
    'src/assets/greenpill/greenpill-garden-entry-ph.webp',
  ],
  [
    'src/assets/greenpill/greenpill-map.webp',
    'src/assets/greenpill/greenpill-map-ph.webp',
  ],
  [
    'src/assets/greenpill/greenpill-monthly-call.webp',
    'src/assets/greenpill/greenpill-monthly-call-ph.webp',
  ],
  [
    'src/assets/greenpill/greenpill-network-map.webp',
    'src/assets/greenpill/greenpill-network-map-ph.webp',
  ],
  [
    'src/assets/greenpill/greenpill-tech-and-sun.webp',
    'src/assets/greenpill/greenpill-tech-and-sun-ph.webp',
  ],
  ['src/assets/profile.jpeg', 'src/assets/profile-ph.webp'],
  ['src/assets/waves/waves-background.webp', 'src/assets/waves/waves-background-ph.webp'],
  [
    'src/assets/waves/waves-deck-nurture-complete.webp',
    'src/assets/waves/waves-deck-nurture-complete-ph.webp',
  ],
  [
    'src/assets/waves/waves-deck-nurture.webp',
    'src/assets/waves/waves-deck-nurture-ph.webp',
  ],
  [
    'src/assets/waves/waves-deck-plants.webp',
    'src/assets/waves/waves-deck-plants-ph.webp',
  ],
  [
    'src/assets/waves/waves-onboard-generated-creatures.webp',
    'src/assets/waves/waves-onboard-generated-creatures-ph.webp',
  ],
  [
    'src/assets/waves/waves-onboard-select-element.webp',
    'src/assets/waves/waves-onboard-select-element-ph.webp',
  ],
  [
    'src/assets/waves/waves-onboard-select-plant.webp',
    'src/assets/waves/waves-onboard-select-plant-ph.webp',
  ],
  ['src/assets/waves/waves-splash.webp', 'src/assets/waves/waves-splash-ph.webp'],
  ['src/assets/waves/waves-story.webp', 'src/assets/waves/waves-story-ph.webp'],
  [
    'src/assets/wefa/wefa-deck-nurture-complete.webp',
    'src/assets/wefa/wefa-deck-nurture-complete-ph.webp',
  ],
  ['src/assets/wefa/wefa-deck-nurture.webp', 'src/assets/wefa/wefa-deck-nurture-ph.webp'],
  ['src/assets/wefa/wefa-deck-plants.webp', 'src/assets/wefa/wefa-deck-plants-ph.webp'],
  [
    'src/assets/wefa/wefa-elemental-characters.webp',
    'src/assets/wefa/wefa-elemental-characters-ph.webp',
  ],
  [
    'src/assets/wefa/wefa-ola-red-fruit.jpg',
    'src/assets/wefa/wefa-ola-red-fruit-ph.webp',
  ],
  [
    'src/assets/wefa/wefa-onboard-generated-creatures.webp',
    'src/assets/wefa/wefa-onboard-generated-creatures-ph.webp',
  ],
  [
    'src/assets/wefa/wefa-onboard-select-element.webp',
    'src/assets/wefa/wefa-onboard-select-element-ph.webp',
  ],
  [
    'src/assets/wefa/wefa-onboard-select-plant.webp',
    'src/assets/wefa/wefa-onboard-select-plant-ph.webp',
  ],
  ['src/assets/wefa/wefa-splash.webp', 'src/assets/wefa/wefa-splash-ph.webp'],
  ['src/assets/wefa/wefa-story.webp', 'src/assets/wefa/wefa-story-ph.webp'],
]

async function convertAsset({
  input,
  output,
  width,
  height,
  quality = 84,
  format = 'webp',
  sharpen = false,
}) {
  const inputPath = path.join(repoRoot, input)
  const outputPath = path.join(repoRoot, output)
  mkdirSync(path.dirname(outputPath), { recursive: true })

  let pipeline = sharp(inputPath).rotate()

  if (width || height) {
    pipeline = pipeline.resize(width, height, {
      fit: width && height ? 'cover' : 'inside',
      withoutEnlargement: false,
    })
  }

  if (sharpen) {
    pipeline = pipeline.sharpen({ sigma: 0.7, m1: 0.8, m2: 1.8 })
  }

  if (format === 'png') {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true })
  } else {
    pipeline = pipeline.webp({ quality, effort: 6 })
  }

  await pipeline.toFile(outputPath)
  console.log(`optimized ${output}`)
}

async function makePlaceholder(input, output) {
  const inputPath = path.join(repoRoot, input)
  const outputPath = path.join(repoRoot, output)
  mkdirSync(path.dirname(outputPath), { recursive: true })

  await sharp(inputPath)
    .rotate()
    .resize(32, 32, { fit: 'cover' })
    .blur(3)
    .webp({ quality: 38, effort: 6 })
    .toFile(outputPath)

  console.log(`placeholder ${output}`)
}

for (const conversion of conversions) {
  await convertAsset(conversion)
}

for (const [input, output] of placeholders) {
  await makePlaceholder(input, output)
}
