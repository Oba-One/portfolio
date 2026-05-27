type SrcSetItem = {
  src: string
  width: number | string
}

type SrcSetInput = string | SrcSetItem[]

type LoadImageOptions = {
  src?: string
  srcSet?: SrcSetInput
  sizes?: string
}

/**
 * Use the browser's image loading to load an image and
 * grab the `src` it chooses from a `srcSet`
 */
export async function loadImageFromSrcSet({ src, srcSet, sizes }: LoadImageOptions) {
  return new Promise<string>((resolve, reject) => {
    const srcSetString = srcSetToString(srcSet)

    try {
      if (!src && !srcSet) {
        throw new Error('No image src or srcSet provided')
      }

      const tempImage = new Image()

      if (src) {
        tempImage.src = src
      }

      if (srcSetString) {
        tempImage.srcset = srcSetString
      }

      if (sizes) {
        tempImage.sizes = sizes
      }

      const onLoad = () => {
        tempImage.removeEventListener('load', onLoad)
        const source = tempImage.currentSrc
        resolve(source)
      }

      tempImage.addEventListener('load', onLoad)
    } catch (error) {
      reject(`Error loading ${srcSetString}: ${error}`)
    }
  })
}

/**
 * Convert a `srcSet` array to a plain old `srcSet` string
 */
export function srcSetToString(srcSet: SrcSetInput = []) {
  if (typeof srcSet === 'string') {
    return srcSet
  }

  return srcSet.map(item => `${item.src} ${item.width}w`).join(', ')
}

/**
 * Generates a transparent png of a given width and height
 */
export async function generateImage(width = 1, height = 1) {
  return new Promise<string>(resolve => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Canvas 2D context is unavailable')
    }

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, width, height)

    canvas.toBlob(async blob => {
      if (!blob) throw new Error('Video thumbnail failed to load')
      const image = URL.createObjectURL(blob)
      canvas.remove()
      resolve(image)
    })
  })
}

/**
 * Use native html image `srcSet` resolution for non-html images
 */
export async function resolveSrcFromSrcSet({
  srcSet,
  sizes,
}: Pick<LoadImageOptions, 'srcSet' | 'sizes'>) {
  const stringSrcSet = srcSetToString(srcSet)

  const sources = await Promise.all(
    stringSrcSet.split(', ').map(async srcString => {
      const [src, width] = srcString.split(' ')
      const size = Number(width.replace('w', ''))
      const image = await generateImage(size)
      return { src, image, width }
    })
  )

  const fakeSrcSet = sources.map(({ image, width }) => `${image} ${width}`).join(', ')
  const fakeSrc = await loadImageFromSrcSet({ srcSet: fakeSrcSet, sizes })

  const output = sources.find(src => src.image === fakeSrc)
  if (!output) {
    throw new Error('Unable to resolve image from srcSet')
  }

  return output.src
}
