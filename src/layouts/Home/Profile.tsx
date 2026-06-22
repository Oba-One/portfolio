// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
// import profileKatakana from 'assets/katakana-profile.svg?url'
import profileImg from 'assets/profile.jpeg'
import profileLargeImg from 'assets/profile-2x.webp'
import profilePlaceholderImg from 'assets/profile-ph.webp'
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
      I’m Afo, an ecosystem architect and systems builder working across regenerative
      technology, cultural community, and public goods infrastructure. My work blends
      software architecture and product strategy with partnerships, grants, events, and
      community stewardship. Right now that centers on{' '}
      <Link href="/projects/green-goods">Green Goods</Link>,{' '}
      <Link href="/projects/greenpill">Greenpill</Link>,{' '}
      <Link href="https://techandsun.com">Tech & Sun</Link>, and{' '}
      <Link href="https://www.omoyoruba.org/">Omo Yoruba</Link>: helping communities
      document their work, coordinate resources, support students at Nigerian universities
      through solar powered hubs, and organize cultural festivals including Yoruba New
      Year celebrations in Los Angeles.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      The personal thread underneath that work is a lifelong pull toward culture and
      imagination: comics, fantasy worlds,{' '}
      <Link href="https://soundcloud.com/oba_one/sets/hyperloop-to-la">music</Link>, and
      stories like Toy Story, X-Men, and Lord of the Rings. Those worlds shaped how I
      think about belonging, teams, and the communities people build around shared
      meaning.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      If you want a softer look at the shows and stories that grounded me growing up,
      check the Nostalgia link below.
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
                  placeholder={profilePlaceholderImg}
                  srcSet={[profileImg, profileLargeImg]}
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
                  {/* <use href={`${profileKatakana}#katakana-profile`} /> */}
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  )
}
