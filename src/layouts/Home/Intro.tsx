import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import { Heading } from 'components/Heading'
import { Section } from 'components/Section'
import { VisuallyHidden } from 'components/VisuallyHidden'
import { useInterval } from 'hooks'

import styles from './Intro.module.scss'

const DisplacementSphere = dynamic(
  () => import('layouts/Home/DisplacementSphere').then(mod => mod.DisplacementSphere),
  { ssr: false }
)

type IntroProps = {
  id: string
  disciplines: string[]
  enhance: boolean
}

export function Intro({ id, disciplines, enhance }: IntroProps) {
  const [disciplineIndex, setDisciplineIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
    ', and '
  )
  const titleId = `${id}-title`

  useInterval(
    () => setDisciplineIndex(index => (index + 1) % disciplines.length),
    reduceMotion ? null : 5000
  )

  return (
    <Section
      className={styles.intro}
      as="section"
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      {enhance && <DisplacementSphere />}
      <header className={styles.text}>
        <h1 className={styles.name} id={titleId}>
          Afolabi Aiyeloja
        </h1>
        <Heading level={0} as="h2" className={styles.title}>
          <VisuallyHidden>{`Architect + ${introLabel}`}</VisuallyHidden>
          <span aria-hidden="true" className={styles.row}>
            <span className={styles.word}>Architect</span>
            <span className={styles.line} />
          </span>
          <span aria-hidden="true" className={styles.row}>
            <span className={styles.word} data-plus="true" key={disciplineIndex}>
              {disciplines[disciplineIndex]}
            </span>
          </span>
        </Heading>
      </header>
    </Section>
  )
}
