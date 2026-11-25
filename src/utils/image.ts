type SrcSetItem = {
  src: string
  width: number
}

type SrcSetInput = string | SrcSetItem[]

type LoadImageOptions = {
  src: string
  srcSet?: SrcSetInput
  sizes?: string
}

/** Load the same responsive image the browser would choose for an img element. */
export function loadImageFromSrcSet({ src, srcSet, sizes }: LoadImageOptions) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () =>
      reject(new Error(`Could not load image: ${image.currentSrc || src}`))
    if (sizes) image.sizes = sizes
    if (srcSet) image.srcset = srcSetToString(srcSet)
    image.src = src
  })
}

export function srcSetToString(srcSet: SrcSetInput = []) {
  if (typeof srcSet === 'string') return srcSet

  const sourcesByWidth = new Map(srcSet.map(({ src, width }) => [width, src]))
  return [...sourcesByWidth].map(([width, src]) => `${src} ${width}w`).join(', ')
}
