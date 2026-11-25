import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from 'react'
import type { StaticImageData } from 'next/image'
import Head from 'next/head'

import { srcSetToString } from 'utils/image'
import { classes } from 'utils/style'
import styles from './Image.module.scss'

export type ImageSource =
  | StaticImageData
  | {
      src: string
      width: number
      height: number
    }

export type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'onLoad' | 'placeholder'
> & {
  style?: CSSProperties
  raised?: boolean
  src?: ImageSource
  srcSet?: ImageSource[] | string
  placeholder?: ImageSource
}

export const Image = ({
  className,
  style,
  raised,
  src: baseSrc,
  srcSet,
  placeholder,
  loading = 'lazy',
  sizes,
  alt = '',
  ...rest
}: ImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [loadedSrc, setLoadedSrc] = useState<string>()
  const src = baseSrc || (Array.isArray(srcSet) ? srcSet[0] : undefined) || placeholder

  useEffect(() => {
    const image = imageRef.current
    if (image?.complete && image.naturalWidth > 0) setLoadedSrc(src?.src)
  }, [src?.src])

  if (!src) return null

  const candidates = srcSetToString(srcSet) || undefined
  const eager = loading === 'eager'
  const imageSizes = !eager && candidates && sizes ? `auto, ${sizes}` : sizes

  return (
    <div className={classes(styles.image, className)} data-raised={raised} style={style}>
      {eager && (
        <Head>
          <link
            rel="preload"
            as="image"
            href={candidates ? undefined : src.src}
            imageSrcSet={candidates}
            imageSizes={candidates ? sizes : undefined}
            {...{ fetchpriority: 'high' }}
          />
        </Head>
      )}
      <img
        ref={imageRef}
        className={styles.element}
        src={src.src}
        srcSet={candidates}
        sizes={imageSizes}
        width={src.width}
        height={src.height}
        loading={loading}
        alt={alt}
        decoding="async"
        {...{ fetchpriority: eager ? 'high' : 'low' }}
        {...rest}
        onLoad={() => setLoadedSrc(src.src)}
      />
      {placeholder && placeholder.src !== src.src && loadedSrc !== src.src && (
        <img
          className={styles.placeholder}
          src={placeholder.src}
          width={src.width}
          height={src.height}
          loading={loading}
          {...{ fetchpriority: 'low' }}
          decoding="async"
          alt=""
          aria-hidden="true"
        />
      )}
    </div>
  )
}
