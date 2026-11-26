import { Button } from 'components/Button'
import { Divider } from 'components/Divider'
import { Heading } from 'components/Heading'
import { deviceModels } from 'components/Model/deviceModels'
import { Section } from 'components/Section'
import { Text } from 'components/Text'
import { useInViewport } from 'hooks'
import dynamic from 'next/dynamic'
import { useRef, type HTMLAttributes } from 'react'
import { media } from 'utils/style'
import styles from './ProjectSummary.module.scss'
import type { ModelConfig, ModelProps } from 'components/Model'
import type { ProjectPlatform } from '../../constants'

const Model = dynamic<ModelProps>(
  () => import('components/Model').then(mod => mod.Model),
  {
    ssr: false,
    loading: () => (
      <span className={styles.loading} role="status">
        Loading 3D preview…
      </span>
    ),
  }
)
const previewViewport = { rootMargin: '100% 0px', threshold: 0 }
const entranceViewport = { threshold: 0.15 }

type ProjectSummaryModel = {
  type: ProjectPlatform
  alt: string
  textures: ModelConfig['texture'][]
}

type ProjectSummaryProps = HTMLAttributes<HTMLElement> & {
  id: string
  enhance: boolean
  index: number
  title: string
  description: string
  model: ProjectSummaryModel
  buttonText: string
  buttonLink: string
  alternate?: boolean
}

export const ProjectSummary = ({
  id,
  enhance,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}: ProjectSummaryProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const hasEntered = useInViewport(contentRef, true, entranceViewport)
  const previewInViewport = useInViewport(previewRef, true, previewViewport, enhance)
  const showModel = enhance && previewInViewport
  const titleId = `${id}-title`
  const isPhone = model.type === 'phone'
  const sizes = isPhone
    ? `(max-width: ${media.tablet}px) 28vw, 18vw`
    : `(max-width: ${media.tablet}px) 84vw, 46vw`

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      as="section"
      aria-labelledby={titleId}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content} ref={contentRef} data-entered={hasEntered}>
        <div className={styles.details}>
          <div aria-hidden="true" className={styles.index}>
            <Divider
              notchWidth="64px"
              notchHeight="8px"
              collapsed={!hasEntered}
              collapseDelay={1000}
            />
            <span className={styles.indexNumber}>{String(index).padStart(2, '0')}</span>
          </div>
          <Heading level={3} as="h2" className={styles.title} id={titleId}>
            {title}
          </Heading>
          <Text className={styles.description} as="p">
            {description}
          </Text>
          <div className={styles.button}>
            <Button iconHoverShift href={buttonLink} iconEnd="arrowRight">
              {buttonText}
            </Button>
          </div>
        </div>
        <div className={styles.preview} ref={previewRef}>
          <div className={styles.model} data-device={model.type}>
            {showModel && (
              <Model
                alt={model.alt}
                cameraPosition={{ x: 0, y: 0, z: isPhone ? 11.5 : 8 }}
                preload
                show={hasEntered}
                showDelay={isPhone ? 300 : 700}
                loadTextureBeforeAnimation
                fallback={false}
                models={model.textures.map((texture, index) => ({
                  ...deviceModels[model.type],
                  ...(isPhone && {
                    position:
                      index === 0
                        ? { x: -0.6, y: 1.1, z: 0 }
                        : { x: 0.6, y: -0.5, z: 0.3 },
                  }),
                  texture: { ...texture, sizes },
                }))}
              />
            )}
            {!showModel && (
              <span className={styles.loading} role="status">
                Loading 3D preview…
              </span>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
