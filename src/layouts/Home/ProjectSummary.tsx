import { Button } from 'components/Button'
import { Divider } from 'components/Divider'
import { Heading } from 'components/Heading'
import { Image } from 'components/Image'
import { deviceModels } from 'components/Model/deviceModels'
import { Section } from 'components/Section'
import { Text } from 'components/Text'
import { useInViewport } from 'hooks'
import dynamic from 'next/dynamic'
import { useRef, useState, type HTMLAttributes } from 'react'
import { media } from 'utils/style'
import styles from './ProjectSummary.module.scss'
import type { ModelConfig, ModelProps } from 'components/Model'
import type { ProjectPlatform } from '../../constants'

const Model = dynamic<ModelProps>(
  () => import('components/Model').then(mod => mod.Model),
  {
    ssr: false,
  }
)
const previewViewport = { threshold: 0.25 }

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
  const previewRef = useRef<HTMLDivElement>(null)
  const [modelReady, setModelReady] = useState(false)
  const previewInViewport = useInViewport(previewRef, false, previewViewport, enhance)
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
      <div className={styles.content}>
        <div className={styles.details}>
          <div aria-hidden="true" className={styles.index}>
            <Divider notchWidth="64px" notchHeight="8px" />
            <span className={styles.indexNumber}>{String(index).padStart(2, '0')}</span>
          </div>
          <Heading level={3} as="h2" className={styles.title} id={titleId}>
            {title}
          </Heading>
          <Text className={styles.description} as="p">
            {description}
          </Text>
          <Button iconHoverShift href={buttonLink} iconEnd="arrowRight">
            {buttonText}
          </Button>
        </div>
        <div
          className={styles.preview}
          ref={previewRef}
          role="img"
          aria-label={model.alt}
        >
          <div className={styles.model} data-device={model.type}>
            <div
              className={styles.poster}
              data-model-ready={showModel && modelReady}
              aria-hidden="true"
            >
              {model.textures.map(texture => (
                <Image
                  key={texture.placeholder.src}
                  srcSet={texture.srcSet}
                  placeholder={texture.placeholder}
                  sizes={sizes}
                  alt=""
                />
              ))}
            </div>
            {showModel && (
              <Model
                aria-hidden="true"
                alt={model.alt}
                cameraPosition={{ x: 0, y: 0, z: isPhone ? 11.5 : 8 }}
                animateIn={false}
                fallback={false}
                onReadyChange={setModelReady}
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
          </div>
        </div>
      </div>
    </Section>
  )
}
