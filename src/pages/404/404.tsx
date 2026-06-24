import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type MouseEvent,
} from 'react'

import { Meta } from 'components/Meta'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Heading } from 'components/Heading'
import { Transition } from 'components/Transition'
import { DecoderText } from 'components/DecoderText'
import { VisuallyHidden } from 'components/VisuallyHidden'
import notFoundPoster from 'assets/nostalgia/ang-floating.gif'
import ArthurVid from 'assets/nostalgia/arthur.mp4'
import AvatarVid from 'assets/nostalgia/avatar.mp4'
import CliffordVid from 'assets/nostalgia/clifford.mp4'
import CyberchaseVid from 'assets/nostalgia/cyberchase.mp4'
import DragonBallVideo from 'assets/nostalgia/dragon-ball.mp4'
import FreshPrinceVid from 'assets/nostalgia/fresh-prince.mp4'
import JusticeLeagueVid from 'assets/nostalgia/justice-league.mp4'
import KorraVid from 'assets/nostalgia/korra.mp4'
import LucyVid from 'assets/nostalgia/lucy.mp4'
import MalcolmVid from 'assets/nostalgia/malcolm.mp4'
import MarriedWithChildrenVid from 'assets/nostalgia/married-with-children.mp4'
import MisterRogersVid from 'assets/nostalgia/mister-rogers.mp4'
import PokemonVid from 'assets/nostalgia/pokemon.mp4'
import ReadingRainbowVid from 'assets/nostalgia/reading-rainbow.mp4'
import XMenEvolutionVid from 'assets/nostalgia/x-men-evolution.mp4'
import XMenVid from 'assets/nostalgia/x-men.mp4'
import YuGiOhVid from 'assets/nostalgia/yu-gi-oh.mp4'
import ZoboomafooVid from 'assets/nostalgia/zoboomafoo.mp4'

import styles from './404.module.scss'
import { Link } from 'components/Link'

type NostalgiaVideo = {
  src: string
  alt: string
  title: string
  imdb: string
}

const videos = [
  {
    src: ArthurVid,
    alt: 'Arthur Intro Song - By Damien Marley',
    title: 'Arthur',
    imdb: 'https://www.imdb.com/title/tt0169414',
  },
  {
    src: AvatarVid,
    alt: 'Avatar the Last Airbender Opening Theme',
    title: 'Avatar: The Last Airbender',
    imdb: 'https://www.imdb.com/title/tt0417299',
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
    alt: 'Fresh Prince of Bel-Air Intro By Jazzy Jeff & The Fresh Prince',
    title: 'Fresh Prince of Bel-Air',
    imdb: 'https://www.imdb.com/title/tt0098800',
  },
  {
    src: JusticeLeagueVid,
    alt: 'Justice League: Unlimited',
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
    alt: 'Malcolm in the Middle',
    title: 'Malcolm in the Middle',
    imdb: 'https://www.imdb.com/title/tt0212671',
  },
  {
    src: MarriedWithChildrenVid,
    alt: 'Married with Children',
    title: 'Married with Children',
    imdb: 'https://www.imdb.com/title/tt0092400',
  },
  {
    src: MisterRogersVid,
    alt: 'Mister Rogers Intro, By Fred Rogers',
    title: 'Mister Rogers',
    imdb: 'https://www.imdb.com/title/tt0062588',
  },
  {
    src: PokemonVid,
    alt: 'Damn right I wanna be the very best!',
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
    alt: '2000s X Men Evolution',
    title: 'X Men Evolution',
    imdb: 'https://www.imdb.com/title/tt0247827',
  },
  {
    src: XMenVid,
    alt: 'X Men 90s',
    title: 'X Men',
    imdb: 'https://www.imdb.com/title/tt0103584',
  },
  {
    src: YuGiOhVid,
    alt: 'Yu-Gi-Oh Original Intro',
    title: 'Yu-Gi-Oh',
    imdb: 'https://www.imdb.com/title/tt0249327',
  },
  {
    src: ZoboomafooVid,
    alt: 'Zoboomafoo Intro',
    title: 'Zoboomafoo',
    imdb: 'https://www.imdb.com/title/tt0190211',
  },
]

const emptyVideo: NostalgiaVideo = {
  title: '',
  src: '',
  alt: '',
  imdb: '',
}

const getRandomVideo = (currentTitle?: string) => {
  const availableVideos =
    currentTitle && videos.length > 1
      ? videos.filter(video => video.title !== currentTitle)
      : videos

  return availableVideos[Math.floor(Math.random() * availableVideos.length)]
}

const createDescriptionTrack = (video: NostalgiaVideo) => {
  if (!video?.title) return undefined

  const description = [
    'WEBVTT',
    '',
    '00:00.000 --> 00:05.000',
    `A short nostalgia clip from ${video.title} plays.`,
    '',
    '00:05.000 --> 00:20.000',
    video.alt,
  ].join('\n')

  return `data:text/vtt;charset=utf-8,${encodeURIComponent(description)}`
}

type NostalgiaZoneProps = {
  notFound?: boolean
}

export function NostalgiaZone({ notFound = false }: NostalgiaZoneProps) {
  const videoDescriptionId = useId()
  const [randomVideo, setRandomVideo] = useState<NostalgiaVideo>(emptyVideo)
  const descriptionTrack = useMemo(
    () => createDescriptionTrack(randomVideo),
    [randomVideo]
  )

  useEffect(() => {
    setRandomVideo(getRandomVideo())
  }, [])

  const handleRefresh = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setRandomVideo(video => getRandomVideo(video.title))
  }, [])

  const title = notFound ? '404 Not Found' : 'Nostalgia Zone'
  const description = notFound
    ? "Page not found. This page doesn't exist"
    : 'A random nostalgia trip through cartoons, shows, and intros.'

  return (
    <section className={styles.page}>
      <Meta
        title={title}
        description={description}
        route={notFound ? '/404' : '/nostalgia-zone'}
        noIndex={notFound}
      />
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
                  <DecoderText text="Error: Nostalgia Zone" start={visible} delay={300} />
                </Heading>
                <Heading
                  aria-hidden
                  className={styles.subheading}
                  data-visible={visible}
                  as="h4"
                  level={5}
                >
                  {randomVideo.title && (
                    <DecoderText
                      key={randomVideo.title}
                      text={randomVideo.title}
                      start={visible}
                      delay={300}
                    />
                  )}
                </Heading>
                <Text className={styles.description} data-visible={visible} as="p">
                  This page either doesn’t exist or was deleted.{' '}
                  <Link href="" onClick={handleRefresh}>
                    Refresh
                  </Link>{' '}
                  for a random nostalgia trip.
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
              data-visible={Boolean(visible && randomVideo.src)}
            >
              {randomVideo.src && (
                <>
                  <video
                    key={randomVideo.src}
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                    preload="metadata"
                    className={styles.video}
                    data-visible={visible}
                    poster={notFoundPoster.src}
                    aria-describedby={videoDescriptionId}
                  >
                    <source src={randomVideo.src} type="video/mp4" />
                    {descriptionTrack && (
                      <track
                        kind="descriptions"
                        src={descriptionTrack}
                        srcLang="en"
                        label="Clip description"
                      />
                    )}
                  </video>
                  <VisuallyHidden id={videoDescriptionId} as="p">
                    {randomVideo.title
                      ? `Selected nostalgia clip: ${randomVideo.title}. ${randomVideo.alt}.`
                      : 'Selected nostalgia clip.'}
                  </VisuallyHidden>
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

export function Page404() {
  return <NostalgiaZone notFound />
}
