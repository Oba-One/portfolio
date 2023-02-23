import profileKatakana from 'assets/katakana-profile.svg?url'
import profileImgLarge from 'assets/profile-large.webp'
import profileImg from 'assets/profile.webp'
import { Button } from 'components/Button'
import { DecoderText } from 'components/DecoderText'
import { Divider } from 'components/Divider'
import { Heading } from 'components/Heading'
import { Image } from 'components/Image'
import { Link } from 'components/Link'
import { Section } from 'components/Section'
import { Text } from 'components/Text'
import { Transition } from 'components/Transition'
import { Fragment, useState } from 'react'
import { media } from 'utils/style'
import styles from './Profile.module.scss'

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hello there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Afo, currently I live in Califormia working as a fullstack developer. My
      projects include UX design, UI animations, and icon illustration. Being comfortable
      with code allows me to rapidly prototype and validate experiences. If you’re
      interested in the tools and software I use check out my
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Some of my hobbies are deep dives into comic and fantansy theories like Marvel and
      Star Wars, playing and watching sports, and reading, currently reading{' '}
      <Link href="/projects/volkihar-knight">The Rust Programming Book</Link>. I’m always
      down to discuss ideas or projects, so feel free to reach out.
    </Text>
  </Fragment>
)

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false)
  const titleId = `${id}-title`

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={'LGMGV2^^u5HZ-@01?]V=?0?HXlY2'}
                  blurDataURL={'LGMGV2^^u5HZ-@01?]V=?0?HXlY2'}
                  srcSet={[profileImg, profileImgLarge]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me standing in front of the Torii on Miyajima, an island off the coast of Hiroshima in Japan"
                />
                <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                >
                  <use href={`${profileKatakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  )
}
