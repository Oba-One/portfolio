import { Fragment, useState, useEffect } from 'react'

import { Meta } from 'components/Meta'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Heading } from 'components/Heading'
import { Transition } from 'components/Transition'
import { DecoderText } from 'components/DecoderText'
import notFoundPoster from 'assets/nostalgia/ang-floating.gif'

import {
  ArthurVid,
  AvatarVid,
  CaillouVid,
  CliffordVid,
  CyberchaseVid,
  DragonBallVideo,
  FreshPrinceVid,
  JusticeLeagueVid,
  KorraVid,
  LucyVid,
  MalcolmVid,
  MarriedWithChildrenVid,
  MisterRogersVid,
  PokemonVid,
  ReadingRainbowVid,
  XMenEvolutionVid,
  XMenVid,
  YuGiOhVid,
  ZaboomafooVid,
} from 'assets/nostalgia'

import styles from './404.module.scss'

const videos = [
  {
    src: ArthurVid,
    alt: 'Arthur Intro Song - By Damien Marley',
    title: 'Arthur',
    imdb: 'https://www.imdb.com/title/tt0169414',
  },
  {
    src: AvatarVid,
    alt: 'Avatar the Last Airbender Intro',
    title: 'Avatar: The Last Airbender',
    imdb: 'https://www.imdb.com/title/tt0417299',
  },
  {
    src: CaillouVid,
    alt: 'Caillou Intro Song',
    title: 'Caillou',
    imdb: 'https://www.imdb.com/title/tt0262153',
  },
  {
    src: CliffordVid,
    alt: 'Clifford the Big Red Dog Intro',
    title: 'Clifford the Big Red Dog',
    imdb: 'https://www.imdb.com/title/tt0233041',
  },
  {
    src: CyberchaseVid,
    alt: 'Cyberchase Intro',
    title: 'Cyberchase',
    imdb: 'https://www.imdb.com/title/tt0309141',
  },
  {
    src: DragonBallVideo,
    alt: 'Dragon Ball Intro (1995)',
    title: 'Dragon Ball',
    imdb: 'https://www.imdb.com/title/tt0280249',
  },
  {
    src: FreshPrinceVid,
    alt: 'Fresh Prince of Bel-Air Intro, Song By DJ Jazzy Jeff & The Fresh Prince',
    title: 'Fresh Prince of Bel-Air',
    imdb: 'https://www.imdb.com/title/tt0098800',
  },
  {
    src: JusticeLeagueVid,
    alt: 'Justice League Intro',
    title: 'Justice League',
    imdb: 'https://www.imdb.com/title/tt6025022',
  },
  {
    src: KorraVid,
    alt: 'Korra Ending Theme with Zhonghu instrument',
    title: 'Legend of Korra',
    imdb: 'https://www.imdb.com/title/tt3830016',
  },
  {
    src: LucyVid,
    alt: 'I love Lucy Intro Song',
    title: 'I Love Lucy',
    imdb: 'https://www.imdb.com/title/tt0043208',
  },
  {
    src: MalcolmVid,
    alt: 'Malcolm in the Middle Intro',
    title: 'Malcolm in the Middle',
    imdb: 'https://www.imdb.com/title/tt0212671',
  },
  {
    src: MarriedWithChildrenVid,
    alt: 'Married with Children Intro',
    title: 'Married with Children',
    imdb: 'https://www.imdb.com/title/tt0092400',
  },
  {
    src: MisterRogersVid,
    alt: 'Mister Rogers Intro, Song By Fred Rogers',
    title: 'Mister Rogers',
    imdb: 'https://www.imdb.com/title/tt0062588',
  },
  {
    src: PokemonVid,
    alt: 'Pokemon Intro Song',
    title: 'Pokemon',
    imdb: 'https://www.imdb.com/title/tt0168366',
  },
  {
    src: ReadingRainbowVid,
    alt: 'Reading Rainbow Intro, Song By Tina Fabrique',
    title: 'Reading Rainbow',
    imdb: 'https://www.imdb.com/title/tt0085075',
  },
  {
    src: XMenEvolutionVid,
    alt: 'Intro for 2000s show X Men Evolution',
    title: 'X Men Evolution',
    imdb: 'https://www.imdb.com/title/tt0247827',
  },
  {
    src: XMenVid,
    alt: 'Classic X Men Into Song from 90s',
    title: 'X Men',
    imdb: 'https://www.imdb.com/title/tt0103584',
  },
  {
    src: YuGiOhVid,
    alt: 'Yu-Gi-Oh Intro',
    title: 'Yu-Gi-Oh',
    imdb: 'https://www.imdb.com/title/tt0249327',
  },
  {
    src: ZaboomafooVid,
    alt: 'Zaboomafoo Intro Song',
    title: 'Zaboomafoo',
    imdb: 'https://www.imdb.com/title/tt0190211',
  },
]

let mount = false
export function Page404() {
  const [randomVideo, setRandomVideo] = useState({
    title: '',
    src: '',
    alt: '',
    imdb: '',
  })

  useEffect(() => {
    if (!mount) {
      const video = videos[Math.floor(Math.random() * videos.length)]
      console.log('video', video)
      setRandomVideo(video)
      mount = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className={styles.page}>
      <Meta title="404 Not Found" description="Page not found. This page doesn't exist" />
      <Transition in>
        {visible => (
          <Fragment>
            <div className={styles.details}>
              <div className={styles.text}>
                <Heading
                  className={styles.title}
                  data-visible={visible}
                  level={0}
                  weight="bold"
                >
                  404
                </Heading>
                <Heading
                  aria-hidden
                  className={styles.subheading}
                  data-visible={visible}
                  as="h3"
                  level={4}
                >
                  <DecoderText text="Error: Nostalgia Pit" start={visible} delay={300} />
                </Heading>
                <Heading
                  aria-hidden
                  className={styles.subheading}
                  data-visible={visible}
                  as="h4"
                  level={5}
                >
                  {randomVideo.title && (
                    <DecoderText text={randomVideo.title} start={visible} delay={300} />
                  )}
                </Heading>
                <Text className={styles.description} data-visible={visible} as="p">
                  This page either doesn’t exist or was deleted. Refresh for a random
                  nostalgia trip.
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={styles.button}
                  data-visible={visible}
                  href="/"
                  icon="chevronRight"
                >
                  Back to homepage
                </Button>
              </div>
            </div>

            <div
              className={styles.videoContainer}
              data-visible={visible && randomVideo.src}
            >
              {randomVideo.src && (
                <>
                  <video
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                    className={styles.video}
                    data-visible={visible}
                    poster={notFoundPoster.src}
                  >
                    <source src={randomVideo.src} type="video/mp4" />
                  </video>
                  <a
                    className={styles.credit}
                    data-visible={visible}
                    href={randomVideo.imdb}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {randomVideo.alt}
                  </a>
                </>
              )}
            </div>
          </Fragment>
        )}
      </Transition>
    </section>
  )
}
