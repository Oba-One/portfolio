// import Img from 'next/image'
import { useCallback, useRef, useState } from 'react'

import { useTheme } from 'components/ThemeProvider'
import { useInViewport } from 'hooks'
import { srcSetToString } from 'utils/image'
import { classes, cssProps, numToMs } from 'utils/style'
import styles from './Image.module.scss'

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
}) => {
  const [loaded, setLoaded] = useState(false)
  const { themeId } = useTheme()
  const containerRef = useRef()
  const src = baseSrc || srcSet?.[0]
  const inViewport = useInViewport(containerRef, true)

  const onLoad = useCallback(() => {
    setLoaded(true)
  }, [])

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
}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const placeholderRef = useRef()
  const showFullRes = inViewport
  const srcSetString = srcSetToString(srcSet)

  return (
    <div
      className={styles.elementWrapper}
      data-reveal={reveal}
      data-visible={inViewport || loaded}
      style={cssProps({ delay: numToMs(delay + 1000) })}
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

      {showPlaceholder && (
        <img
          aria-hidden
          className={styles.placeholder}
          data-loaded={loaded}
          style={cssProps({ delay: numToMs(delay) })}
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
