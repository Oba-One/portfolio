import { Fragment } from 'react';

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
} from 'assets/nostalgia';
import notFoundPoster from 'assets/nostalgia/ang-floating.gif';

import { Meta } from 'components/Meta';
import { Text } from 'components/Text';
import { Button } from 'components/Button';
import { Heading } from 'components/Heading';
import { Transition } from 'components/Transition';
import { DecoderText } from 'components/DecoderText';

import styles from './404.module.scss';

const videos = [
  {
    src: ArthurVid,
    alt: 'Arthur Intro Song - By Damien Marley',
    title: 'Arthur',
  },
  {
    src: AvatarVid,
    alt: 'Avatar the Last Airbender Intro',
    title: 'Avatar: The Last Airbender',
  },
  {
    src: CaillouVid,
    alt: 'Caillou Intro Song',
    title: 'Caillou',
  },
  {
    src: CliffordVid,
    alt: 'Clifford the Big Red Dog Intro',
    title: 'Clifford the Big Red Dog',
  },
  {
    src: CyberchaseVid,
    alt: 'Cyberchase Intro',
    title: 'Cyberchase',
  },
  {
    src: DragonBallVideo,
    alt: 'Dragon Ball Intro (1995)',
    title: 'Dragon Ball',
  },
  {
    src: FreshPrinceVid,
    alt: 'Fresh Prince of Bel-Air Intro, Song By DJ Jazzy Jeff & The Fresh Prince',
    title: 'Fresh Prince of Bel-Air',
  },
  {
    src: JusticeLeagueVid,
    alt: 'Justice League Intro',
    title: 'Justice League',
  },
  {
    src: KorraVid,
    alt: 'Korra Ending Theme with Zhonghu instrument',
    title: 'Korra',
  },
  {
    src: LucyVid,
    alt: 'I love Lucy Intro Song',
    title: 'I Love Lucy',
  },
  {
    src: MalcolmVid,
    alt: 'Malcolm in the Middle Intro',
    title: 'Malcolm in the Middle',
  },
  {
    src: MarriedWithChildrenVid,
    alt: 'Married with Children Intro',
    title: 'Married with Children',
  },
  {
    src: MisterRogersVid,
    alt: 'Mister Rogers Intro, Song By Fred Rogers',
    title: 'Mister Rogers',
  },
  {
    src: PokemonVid,
    alt: 'Pokemon Intro Song',
    title: 'Pokemon',
  },
  {
    src: ReadingRainbowVid,
    alt: 'Reading Rainbow Intro, Song By Tina Fabrique',
    title: 'Reading Rainbow',
  },
  {
    src: XMenEvolutionVid,
    alt: 'Intro for 2000s show X Men Evolution',
    title: 'X Men Evolution',
  },
  {
    src: XMenVid,
    alt: 'Classic X Men Into Song from 90s',
    title: 'X Men',
  },
  {
    src: YuGiOhVid,
    alt: 'Yu-Gi-Oh Intro',
    title: 'Yu-Gi-Oh',
  },
  {
    src: ZaboomafooVid,
    alt: 'Zaboomafoo Intro Song',
    title: 'Zaboomafoo',
  },
];

export function Page404() {
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
                {/* <Heading
                  aria-hidden
                  className={styles.subheading}
                  data-visible={visible}
                  as="h4"
                  level={5}
                >
                  <DecoderText text={randomVideo?.title} start={visible} delay={300} />
                </Heading> */}
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

            <div className={styles.videoContainer} data-visible={visible}>
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
                <source
                  src={videos[Math.floor(Math.random() * videos.length)].src}
                  type="video/mp4"
                />
              </video>
              {/* <a
                className={styles.credit}
                data-visible={visible}
                href="https://www.imdb.com/title/tt0113568/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"Chilhood Memories"}
              </a> */}
            </div>
          </Fragment>
        )}
      </Transition>
    </section>
  );
}
