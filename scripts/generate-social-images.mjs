#!/usr/bin/env node
import { mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fontkitBundle from 'next/dist/compiled/@next/font/dist/fontkit/index.js'
import sharp from 'sharp'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputRoot = path.join(repoRoot, 'public', 'social')
const projectOutputRoot = path.join(outputRoot, 'projects')
const legacyOutput = path.join(repoRoot, 'public', 'social-image.png')
const fontRoot = path.join(repoRoot, 'src', 'assets', 'fonts')
const createFont = fontkitBundle.default ?? fontkitBundle
const gothamMedium = createFont(readFileSync(path.join(fontRoot, 'gotham-medium.woff2')))
const gothamBold = createFont(readFileSync(path.join(fontRoot, 'gotham-bold.woff2')))

const width = 1200
const height = 630
const homeScreenshotCrop = {
  left: 0,
  top: 0,
}

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
    source: 'public/site-preview.webp',
    output: '../social-image.png',
  },
  {
    slug: 'coop',
    title: 'Coop',
    kicker: 'Project',
    source: 'src/assets/coop/coop-mark-glow.png',
  },
  {
    slug: 'green-goods',
    title: 'Green Goods',
    kicker: 'Project',
    source: 'src/assets/green-goods/green-goods-hero-website.webp',
  },
  {
    slug: 'greenpill',
    title: 'Greenpill',
    kicker: 'Project',
    source: 'src/assets/greenpill/greenpill-network-map.webp',
  },
  {
    slug: 'waves',
    title: 'Waves',
    kicker: 'Project',
    source: 'src/assets/waves/waves-story.webp',
  },
  {
    slug: 'wefa',
    title: 'WEFA',
    kicker: 'Project',
    source: 'src/assets/wefa/wefa-ola-red-fruit.jpg',
  },
  {
    slug: 'synesthesia',
    title: 'Synesthesia',
    kicker: 'Project',
    source: 'src/assets/syn/syn-learnings.webp',
  },
  {
    slug: 'freeport',
    title: 'Freeport',
    kicker: 'Project',
    source: 'src/assets/freeport/freeport-development.webp',
  },
  {
    slug: 'mira-connect',
    title: 'Mira Connect',
    kicker: 'Project',
    source: 'src/assets/mira-connect/connect-call-messages.webp',
  },
  {
    slug: 'mira-flow',
    title: 'Mira Flow',
    kicker: 'Project',
    source: 'src/assets/mira-flow/flow-tablet-login.webp',
  },
  {
    slug: 'gentle-monster',
    title: 'Gentle Monster',
    kicker: 'Project',
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

function titleSize(title, base = 108) {
  if (title.length > 18) return 88
  if (title.length > 13) return 96
  return base
}

function formatNumber(value) {
  return Number(value.toFixed(3))
}

function renderFontLine(value, { font, x, y, size, fill, opacity = 1 }) {
  const run = font.layout(value)
  const scale = size / font.unitsPerEm
  let cursorX = 0

  return run.glyphs
    .map((glyph, index) => {
      const position = run.positions[index]
      const pathData = glyph.path.toSVG()
      const translateX = x + (cursorX + position.xOffset) * scale
      const translateY = y - position.yOffset * scale

      cursorX += position.xAdvance

      if (!pathData) {
        return ''
      }

      return `<path d="${pathData}" fill="${fill}" opacity="${opacity}" transform="translate(${formatNumber(
        translateX
      )} ${formatNumber(translateY)}) scale(${formatNumber(scale)} ${formatNumber(
        -scale
      )})" />`
    })
    .join('')
}

function renderTitle(title, { x, y, size, fill = palette.text, opacity = 0.94 }) {
  return renderFontLine(title, { font: gothamBold, x, y, size, fill, opacity })
}

function renderKicker(kicker, { x, y, size = 28 }) {
  return renderFontLine(kicker.toUpperCase(), {
    font: gothamMedium,
    x,
    y,
    size,
    fill: palette.primary,
    opacity: 0.88,
  })
}

function renderMonogram({ x, y, width = 72, stroke = palette.primary, opacity = 0.9 }) {
  const scale = width / 48

  return `
    <g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${stroke}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}">
      <path stroke-width="1.45" d="M24 1.2L46.2 49.4H37.5L33.7 40.7H14.3L10.5 49.4H1.8L24 1.2ZM18.2 32.7H29.8L24 19.5L18.2 32.7Z" />
      <path stroke-width="1.35" opacity="0.72" d="M24 6.5L41.3 46.1H35.7L32 37.2H16L12.3 46.1H6.7L24 6.5ZM19.7 29.6H28.3L24 19.7L19.7 29.6Z" />
      <path stroke-width="1.25" opacity="0.52" d="M24 12L36.3 43H32.6L29.5 34.6H18.5L15.4 43H11.7L24 12ZM21.1 27H26.9L24 19.9L21.1 27Z" />
    </g>
  `
}

function titleOverlaySvg({ title, kicker }) {
  const size = titleSize(title)

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
      ${renderMonogram({ x: 64, y: 64 })}
      ${kicker ? renderKicker(kicker, { x: 64, y: 270, size: 38 }) : ''}
      ${renderTitle(title, { x: 64, y: 384, size })}
    </svg>
  `)
}

function getLeftAlignedSocialCrop({ sourceWidth, sourceHeight }) {
  const targetRatio = width / height
  let cropWidth = sourceWidth
  let cropHeight = Math.round(sourceWidth / targetRatio)

  if (cropHeight > sourceHeight) {
    cropHeight = sourceHeight
    cropWidth = Math.round(sourceHeight * targetRatio)
  }

  const maxLeft = Math.max(0, sourceWidth - cropWidth)
  const maxTop = Math.max(0, sourceHeight - cropHeight)

  return {
    left: Math.min(homeScreenshotCrop.left, maxLeft),
    top: Math.min(homeScreenshotCrop.top, maxTop),
    width: cropWidth,
    height: cropHeight,
  }
}

async function makeCard(card) {
  const sourcePath = path.join(repoRoot, card.source)
  const outputPath = card.output
    ? path.join(outputRoot, card.output)
    : path.join(projectOutputRoot, `${card.slug}.png`)

  if (card.slug === 'home') {
    const metadata = await sharp(sourcePath).metadata()
    const sourceWidth = metadata.width ?? width
    const sourceHeight = metadata.height ?? height
    const crop = getLeftAlignedSocialCrop({ sourceWidth, sourceHeight })

    await sharp(sourcePath)
      .rotate()
      .extract(crop)
      .resize(width, height, { fit: 'fill' })
      .png({ compressionLevel: 9, adaptiveFiltering: true, quality: 90 })
      .toFile(outputPath)

    console.log(`generated ${path.relative(repoRoot, outputPath)}`)
    return
  }

  const backgroundPipeline = sharp(sourcePath)
    .rotate()
    .resize(width, height, { fit: 'cover', position: 'center' })
    .modulate({ saturation: 0.86, brightness: 0.82 })

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
      { input: titleOverlaySvg(card), left: 0, top: 0 },
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
