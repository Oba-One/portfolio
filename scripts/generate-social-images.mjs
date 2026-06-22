#!/usr/bin/env node
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputRoot = path.join(repoRoot, 'public', 'social')
const projectOutputRoot = path.join(outputRoot, 'projects')
const legacyOutput = path.join(repoRoot, 'public', 'social-image.png')

const width = 1200
const height = 630

const palette = {
  background: '#1b1e1b',
  backgroundLight: '#2a3128',
  primary: '#b8c7a3',
  text: '#dbe0d6',
  muted: '#aab3a3',
}

const cards = [
  {
    slug: 'home',
    title: 'Afolabi Aiyeloja',
    kicker: 'Portfolio',
    description: 'Systems architect, ecosystem steward, and builder',
    source: 'public/site-preview.webp',
    output: '../social-image.png',
  },
  {
    slug: 'coop',
    title: 'Coop',
    kicker: 'Project',
    description: 'Local-first group memory and agentic review workflows',
    source: 'src/assets/coop/coop-mark-glow.png',
  },
  {
    slug: 'green-goods',
    title: 'Green Goods',
    kicker: 'Project',
    description: 'Evidence, funding, and reporting for regenerative communities',
    source: 'src/assets/green-goods/green-goods-hero-website.webp',
  },
  {
    slug: 'greenpill',
    title: 'Greenpill',
    kicker: 'Project',
    description: 'Community strategy, public learning, and regenerative coordination',
    source: 'src/assets/greenpill/greenpill-network-map.webp',
  },
  {
    slug: 'waves',
    title: 'Waves',
    kicker: 'Project',
    description: 'Generative art and culture for live events',
    source: 'src/assets/waves/waves-background.webp',
  },
  {
    slug: 'wefa',
    title: 'WEFA',
    kicker: 'Project',
    description: 'Nature, community, storytelling, and plant care',
    source: 'src/assets/wefa/wefa-ola-red-fruit.jpg',
  },
  {
    slug: 'synesthesia',
    title: 'Synesthesia',
    kicker: 'Project',
    description: 'Mapping music taste into a personal visual signature',
    source: 'src/assets/syn/syn-background.webp',
  },
  {
    slug: 'freeport',
    title: 'Freeport',
    kicker: 'Project',
    description: 'Fine art ownership, DeFi liquidity, and NFT infrastructure',
    source: 'src/assets/freeport/freeport-development.webp',
  },
  {
    slug: 'mira-connect',
    title: 'Mira Connect',
    kicker: 'Project',
    description: 'Field support, expert calls, and industrial collaboration',
    source: 'src/assets/mira-connect/connect-call-messages.webp',
  },
  {
    slug: 'mira-flow',
    title: 'Mira Flow',
    kicker: 'Project',
    description: 'Tablet workflows for field observation, forms, and review',
    source: 'src/assets/mira-flow/flow-tablet-login.webp',
  },
  {
    slug: 'gentle-monster',
    title: 'Gentle Monster',
    kicker: 'Project',
    description: 'E-commerce for a bold, visual eyewear brand',
    source: 'src/assets/gm/gm-background.webp',
  },
]

const glyphs = {
  ' ': ['000', '000', '000', '000', '000', '000', '000'],
  '-': ['00000', '00000', '00000', '11110', '00000', '00000', '00000'],
  '+': ['00000', '00100', '00100', '11111', '00100', '00100', '00000'],
  ',': ['000', '000', '000', '000', '000', '010', '100'],
  '.': ['000', '000', '000', '000', '000', '110', '110'],
  '/': ['00001', '00010', '00010', '00100', '01000', '01000', '10000'],
  '&': ['01100', '10010', '10100', '01000', '10101', '10010', '01101'],
  0: ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  1: ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  2: ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  3: ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  4: ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  5: ['11111', '10000', '10000', '11110', '00001', '00001', '11110'],
  6: ['01110', '10000', '10000', '11110', '10001', '10001', '01110'],
  7: ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  8: ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  9: ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10011', '10001', '10001', '01110'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '00010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '?': ['01110', '10001', '00001', '00010', '00100', '00000', '00100'],
}

function normalizeText(value) {
  return value
    .normalize('NFKD')
    .replace(/[^\x20-\x7E]/g, '')
    .toUpperCase()
}

function measureLine(value, scale) {
  const chars = normalizeText(value).split('')

  return chars.reduce((total, char, index) => {
    const glyph = glyphs[char] ?? glyphs['?']
    const gap = index === chars.length - 1 ? 0 : scale

    return total + glyph[0].length * scale + gap
  }, 0)
}

function wrapText(value, scale, maxWidth) {
  const words = normalizeText(value).split(/\s+/)
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word

    if (currentLine && measureLine(nextLine, scale) > maxWidth) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = nextLine
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

function renderPixelLine(value, { x, y, scale, fill, opacity = 1 }) {
  let cursorX = x

  return normalizeText(value)
    .split('')
    .map(char => {
      const glyph = glyphs[char] ?? glyphs['?']
      const rects = glyph
        .flatMap((row, rowIndex) =>
          row.split('').map((cell, columnIndex) => {
            if (cell !== '1') {
              return ''
            }

            return `<rect x="${cursorX + columnIndex * scale}" y="${
              y + rowIndex * scale
            }" width="${scale}" height="${scale}" rx="${Math.min(
              scale * 0.3,
              2
            )}" fill="${fill}" opacity="${opacity}" />`
          })
        )
        .join('')

      cursorX += glyph[0].length * scale + scale

      return rects
    })
    .join('')
}

function renderPixelBlock(value, { x, y, scale, fill, opacity, maxWidth }) {
  return wrapText(value, scale, maxWidth)
    .slice(0, 3)
    .map((line, index) =>
      renderPixelLine(line, {
        x,
        y: y + index * scale * 9,
        scale,
        fill,
        opacity,
      })
    )
    .join('')
}

function textSvg({ title, kicker, description }) {
  const titleScale = measureLine(title, 8) > 720 ? 7 : 8

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrim" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="${palette.background}" stop-opacity="0.96" />
          <stop offset="48%" stop-color="${palette.background}" stop-opacity="0.74" />
          <stop offset="100%" stop-color="${palette.background}" stop-opacity="0.26" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#scrim)" />
      <rect x="64" y="64" width="72" height="72" rx="36" fill="none" stroke="${
        palette.primary
      }" stroke-width="3" opacity="0.9" />
      <rect x="79" y="79" width="42" height="42" rx="21" fill="none" stroke="${
        palette.primary
      }" stroke-width="2" opacity="0.6" />
      ${renderPixelLine(kicker, {
        x: 64,
        y: 212,
        scale: 4,
        fill: palette.primary,
        opacity: 0.92,
      })}
      ${renderPixelBlock(title, {
        x: 64,
        y: 280,
        scale: titleScale,
        fill: palette.text,
        opacity: 0.92,
        maxWidth: 720,
      })}
      ${renderPixelBlock(description, {
        x: 68,
        y: 392,
        scale: 3,
        fill: palette.muted,
        opacity: 0.86,
        maxWidth: 620,
      })}
      ${renderPixelLine('afolabi.info', {
        x: 64,
        y: 536,
        scale: 3,
        fill: palette.primary,
        opacity: 0.94,
      })}
    </svg>
  `)
}

async function makeCard(card) {
  const sourcePath = path.join(repoRoot, card.source)
  const outputPath = card.output
    ? path.join(outputRoot, card.output)
    : path.join(projectOutputRoot, `${card.slug}.png`)

  let backgroundPipeline = sharp(sourcePath)
    .rotate()
    .resize(width, height, { fit: 'cover', position: 'center' })
    .modulate({ saturation: 0.86, brightness: 0.82 })

  if (card.slug === 'home') {
    backgroundPipeline = backgroundPipeline.blur(0.4)
  }

  const background = await backgroundPipeline.png().toBuffer()

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: palette.backgroundLight,
    },
  })
    .composite([
      { input: background, left: 0, top: 0 },
      { input: textSvg(card), left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true, quality: 90 })
    .toFile(outputPath)

  console.log(`generated ${path.relative(repoRoot, outputPath)}`)
}

mkdirSync(projectOutputRoot, { recursive: true })

for (const card of cards) {
  await makeCard(card)
}

await sharp(legacyOutput)
  .resize(width, height, { fit: 'cover' })
  .png({ compressionLevel: 9, adaptiveFiltering: true, quality: 90 })
  .toFile(path.join(outputRoot, 'home.png'))

console.log('generated public/social/home.png')
