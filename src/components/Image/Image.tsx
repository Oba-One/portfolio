// import Img from 'next/image'
import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from 'react'
import type { StaticImageData } from 'next/image'

import { useTheme } from 'components/ThemeProvider'
import { useInViewport } from 'hooks'
import { srcSetToString } from 'utils/image'
import { classes, cssProps, numToMs } from 'utils/style'
import styles from './Image.module.scss'

export type ImageSource = StaticImageData | {
  src: string
  width: number
  height: number
}

export type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'onLoad' | 'placeholder'
> & {
  className?: string
  style?: CSSProperties
  reveal?: boolean
  delay?: number
  raised?: boolean
  src?: ImageSource
  srcSet?: ImageSource[] | string
  placeholder?: ImageSource
}

export const Image = ({
  className,
  style,
  reveal,
  delay = 0,
  raised,
  src: baseSrc,
  srcSet,
  placeholder,
  ...rest
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false)
  const { themeId } = useTheme()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const src = baseSrc || (Array.isArray(srcSet) ? srcSet[0] : undefined) || placeholder
  const inViewport = useInViewport(containerRef, true)

  const onLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  if (!src) return null

  return (
    <div
      className={classes(styles.image, className)}
      data-visible={inViewport || loaded}
      data-reveal={reveal}
      data-raised={raised}
      data-theme={themeId}
      style={cssProps({ delay: numToMs(delay) }, style)}
      ref={containerRef}
    >
      <ImageElements
        delay={delay}
        onLoad={onLoad}
        loaded={loaded}
        inViewport={inViewport}
        reveal={reveal}
        src={src}
        srcSet={srcSet}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}

const ImageElements = ({
  onLoad,
  loaded,
  inViewport,
  srcSet,
  placeholder,
  delay,
  src,
  alt,
  reveal,
  sizes,
  ...rest
}: Omit<ImageProps, 'onLoad'> & {
  onLoad: () => void
  loaded: boolean
  inViewport: boolean
  src: ImageSource
}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const placeholderRef = useRef<HTMLImageElement | null>(null)
  const showFullRes = inViewport
  const srcSetString = srcSetToString(srcSet)

  return (
    <div
      className={styles.elementWrapper}
      data-reveal={reveal}
      data-visible={inViewport || loaded}
      style={cssProps({ delay: numToMs((delay ?? 0) + 1000) })}
    >
      <img
        className={styles.element}
        data-loaded={loaded}
        onLoad={onLoad}
        decoding="async"
        src={showFullRes ? src.src : undefined}
        srcSet={showFullRes ? srcSetString : undefined}
        width={src.width}
        height={src.height}
        alt={alt}
        sizes={sizes}
        {...rest}
      />

      {showPlaceholder && placeholder && (
        <img
          aria-hidden
          className={styles.placeholder}
          data-loaded={loaded}
          style={cssProps({ delay: numToMs(delay ?? 0) })}
          ref={placeholderRef}
          src={placeholder.src}
          width={placeholder.width}
          height={placeholder.height}
          onTransitionEnd={() => setShowPlaceholder(false)}
          decoding="async"
          alt=""
          role="presentation"
        />
      )}
    </div>
  )
}
