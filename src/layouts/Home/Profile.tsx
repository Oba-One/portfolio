// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
// import profileKatakana from 'assets/katakana-profile.svg?url'
import profileImg from 'assets/profile.jpeg'
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
      I’m Afo, a builder based in Loma Linda. My work spans front and back end, smart
      contracts, local-first systems, and product architecture. Right now I’m building{' '}
      <Link href="https://coop.town">Coop</Link>, a browser-first tool for capture,
      review, and shared group memory; building{' '}
      <Link href="https://greengoods.app">Green Goods</Link>, an offline-first PWA that
      brings ecological and community work on-chain; and stewarding{' '}
      <Link href="https://greenpill.network">Greenpill</Link>, where I help shape
      GreenWill and the wider coordination layer for regenerative communities.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Outside of code I’m into comic and fantasy lore like{' '}
      <Link href="https://www.youtube.com/@NewRockstars">Marvel</Link> and{' '}
      <Link href="https://www.youtube.com/@StarWarsTheory">Star Wars</Link>, playing and
      watching sports, making{' '}
      <Link href="https://soundcloud.com/oba_one/sets/hyperloop-to-la">music</Link>, and
      reading. Currently in{' '}
      <Link href="https://www.amazon.com/Rust-Programming-Language-Steve-Klabnik/dp/1593278284">
        The Rust Programming Book
      </Link>
      . Always open to chat about ideas or projects, so feel free to reach out.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      If you want a softer look at who I am, check the Nostalgia link below.
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
                  // blurDataURL={'LGMGV2^^u5HZ-@01?]V=?0?HXlY2'}
                  srcSet={[profileImg]}
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
