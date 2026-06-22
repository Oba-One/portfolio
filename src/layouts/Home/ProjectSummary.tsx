// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
// import projectKatakana from  'assets/katakana-project.svg?url'
import { Button } from 'components/Button'
import { Divider } from 'components/Divider'
import { Heading } from 'components/Heading'
import { deviceModels } from 'components/Model/deviceModels'
import { Section } from 'components/Section'
import { Text } from 'components/Text'
import { useTheme } from 'components/ThemeProvider'
import { Transition } from 'components/Transition'
import { useWindowSize } from 'hooks'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { media } from 'utils/style'
import styles from './ProjectSummary.module.scss'

const Model = dynamic(() => import('components/Model').then(mod => mod.Model))

export const ProjectSummary = ({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}) => {
  const [focused, setFocused] = useState(false)
  const [locallyVisible, setLocallyVisible] = useState(false)
  const theme = useTheme()
  const { width } = useWindowSize()
  const titleId = `${id}-title`
  const isMobile = width <= media.tablet
  const svgOpacity = theme.themeId === 'light' ? 0.7 : 1
  const indexText = index < 10 ? `0${index}` : index
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`
  const visible = sectionVisible || focused || locallyVisible

  useEffect(() => {
    if (locallyVisible) return

    const element = sectionRef?.current
    if (!element) return

    const checkVisibility = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const isVisible = rect.top < viewportHeight && rect.bottom > 0

      if (isVisible) {
        setLocallyVisible(true)
      }
    }

    const frame = window.requestAnimationFrame(checkVisibility)
    window.addEventListener('scroll', checkVisibility, { passive: true })
    window.addEventListener('resize', checkVisibility)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
    }
  }, [locallyVisible, sectionRef])

  // const renderKatakana = (device, visible) => (
  //   <svg
  //     aria-hidden="true"
  //     width="750"
  //     height="137"
  //     viewBox="0 0 750 137"
  //     data-visible={visible}
  //     data-light={theme.themeId === 'light'}
  //     style={cssProps({ opacity: svgOpacity })}
  //     className={styles.svg}
  //     data-device={device}
  //   >
  //     <use href={`${projectKatakana}#katakana-project`} />
  //   </svg>
  // )

  const renderDetails = visible => (
    <div className={styles.details}>
      <div aria-hidden className={styles.index}>
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={!visible}
          collapseDelay={1000}
        />
        <span className={styles.indexNumber} data-visible={visible}>
          {indexText}
        </span>
      </div>
      <Heading
        level={3}
        as="h2"
        className={styles.title}
        data-visible={visible}
        id={titleId}
      >
        {title}
      </Heading>
      <Text className={styles.description} data-visible={visible} as="p">
        {description}
      </Text>
      <div className={styles.button} data-visible={visible}>
        <Button iconHoverShift href={buttonLink} iconEnd="arrowRight">
          {buttonText}
        </Button>
      </div>
    </div>
  )

  const renderPreview = visible => (
    <div className={styles.preview}>
      {model.type === 'laptop' && (
        <>
          {/* {renderKatakana('laptop', visible)} */}
          <div className={styles.model} data-device="laptop">
            <Model
              alt={model.alt}
              cameraPosition={{ x: 0, y: 0, z: 8 }}
              showDelay={700}
              show={visible}
              models={[
                {
                  ...deviceModels.laptop,
                  texture: {
                    ...model.textures[0],
                    sizes: laptopSizes,
                  },
                },
              ]}
            />
          </div>
        </>
      )}
      {model.type === 'phone' && (
        <>
          {/* {renderKatakana('phone', visible)} */}
          <div className={styles.model} data-device="phone">
            <Model
              alt={model.alt}
              cameraPosition={{ x: 0, y: 0, z: 11.5 }}
              showDelay={300}
              show={visible}
              models={[
                {
                  ...deviceModels.phone,
                  position: { x: -0.6, y: 1.1, z: 0 },
                  texture: {
                    ...model.textures[0],
                    sizes: phoneSizes,
                  },
                },
                {
                  ...deviceModels.phone,
                  position: { x: 0.6, y: -0.5, z: 0.3 },
                  texture: {
                    ...model.textures[1],
                    sizes: phoneSizes,
                  },
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  )

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={visible}>
          {transitionVisible => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(transitionVisible)}
                  {renderPreview(transitionVisible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(transitionVisible)}
                  {renderDetails(transitionVisible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  )
}
