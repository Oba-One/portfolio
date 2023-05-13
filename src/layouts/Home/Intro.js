import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { Fragment, useEffect, useState } from 'react'

import { cssProps } from 'utils/style'
import { Heading } from 'components/Heading'
import { Section } from 'components/Section'
import { Transition } from 'components/Transition'
import { useTheme } from 'components/ThemeProvider'
// import { DecoderText } from 'components/DecoderText'
import { tokens } from 'components/ThemeProvider/theme'
import { VisuallyHidden } from 'components/VisuallyHidden'
import { useInterval, usePrevious, useScrollToHash } from 'hooks'

import styles from './Intro.module.scss'

const DisplacementSphere = dynamic(() =>
  import('layouts/Home/DisplacementSphere').then(mod => mod.DisplacementSphere)
)

export function Intro({ id, sectionRef, disciplines, ...rest }) {
  const theme = useTheme()
  const [disciplineIndex, setDisciplineIndex] = useState(0)
  const prevTheme = usePrevious(theme)
  const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
    ', and '
  )
  const currentDiscipline = disciplines.find((item, index) => index === disciplineIndex)
  const titleId = `${id}-title`
  const scrollToHash = useScrollToHash()

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length
      setDisciplineIndex(index)
    },
    5000,
    theme.themeId
  )

  useEffect(() => {
    if (prevTheme && prevTheme.themeId !== theme.themeId) {
      setDisciplineIndex(0)
    }
  }, [theme.themeId, prevTheme])

  // const handleScrollClick = event => {
  //   event.preventDefault()
  //   scrollToHash(event.currentTarget.href)
  // }

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme.themeId} timeout={3000}>
        {(visible, status) => (
          <Fragment>
            <DisplacementSphere />
            <header className={styles.text}>
              <h1 className={styles.name} data-visible={visible} id={titleId}>
                {/* <DecoderText text="Afolabi Aiyeloja" delay={300} /> */}
              </h1>
              <Heading level={0} as="h2" className={styles.title}>
                <VisuallyHidden className={styles.label}>
                  {`Developer + ${introLabel}`}
                </VisuallyHidden>
                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                    Developer
                  </span>
                  <span className={styles.line} data-status={status} />
                </span>
                <div className={styles.row} component="span">
                  <AnimatePresence>
                    {disciplines.map(item => (
                      <Transition
                        unmount
                        in={item === currentDiscipline}
                        timeout={{ enter: 3000, exit: 2000 }}
                        key={item}
                      >
                        {(visible, status) => (
                          <span
                            aria-hidden
                            className={styles.word}
                            data-plus={true}
                            data-status={status}
                            style={cssProps({ delay: tokens.base.durationL })}
                          >
                            {item}
                          </span>
                        )}
                      </Transition>
                    ))}
                  </AnimatePresence>
                </div>
              </Heading>
            </header>
          </Fragment>
        )}
      </Transition>
    </Section>
  )
}
