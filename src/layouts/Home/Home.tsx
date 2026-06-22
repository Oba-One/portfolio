// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { createRef, useEffect, useRef, useState } from 'react'

import { Meta } from 'components/Meta'
import { Footer } from 'components/Footer'
import { Intro } from 'layouts/Home/Intro'
import { Profile } from 'layouts/Home/Profile'
import { ProjectSummary } from 'layouts/Home/ProjectSummary'

import {
  GreenGoodsActionSelectionPwaImg,
  GreenGoodsActionSelectionPwaPlaceholderImg,
  GreenGoodsMediaSectionPwaImg,
  GreenGoodsMediaSectionPwaPlaceholderImg,
} from 'assets/green-goods'
import {
  GreenpillNetworkMapImg,
  GreenpillNetworkMapPlaceholderImg,
} from 'assets/greenpill'
import {
  WefaSplashImg,
  WefaSplashPlaceholderImg,
  WefaOnboardSelectElementImg,
  WefaOnboardSelectElementPlaceholderImg,
} from 'assets/wefa'
import { SynLearningsImg, SynLearningsPlaceholderImg } from 'assets/syn'
import { FreeportBackgroundImg, FreeportBackgroundPlaceholderImg } from 'assets/freeport'
import {
  ConnectCallMessagesImg,
  ConnectCallMessagesPlaceholderImg,
} from 'assets/mira-connect'
import {
  FlowTabletCollectionsImg,
  FlowTabletCollectionsPlaceholderImg,
  FlowTabletReferencePhotoImg,
  FlowTabletReferencePhotoPlaceholderImg,
} from 'assets/mira-flow'
import { GMBackgroundImg, GMBackgroundPlaceholderImg } from 'assets/gm'

import styles from './Home.module.css'
import { featuredProjectSlugs, projects } from '../../constants'

const disciplines = ['Steward', 'Engineer', 'Storyteller', 'Artist']

const projectMedia = {
  green_goods: {
    alt: 'Green Goods work selection and media capture screens inside mobile frames.',
    textures: [
      {
        srcSet: [GreenGoodsActionSelectionPwaImg, GreenGoodsActionSelectionPwaImg],
        placeholder: GreenGoodsActionSelectionPwaPlaceholderImg,
      },
      {
        srcSet: [GreenGoodsMediaSectionPwaImg, GreenGoodsMediaSectionPwaImg],
        placeholder: GreenGoodsMediaSectionPwaPlaceholderImg,
      },
    ],
  },
  greenpill: {
    alt: 'Greenpill Network homepage map hero inside a laptop frame.',
    textures: [
      {
        srcSet: [GreenpillNetworkMapImg, GreenpillNetworkMapImg],
        placeholder: GreenpillNetworkMapPlaceholderImg,
      },
    ],
  },
  wefa: {
    alt: 'WEFA onboarding artwork inside mobile frames.',
    textures: [
      {
        srcSet: [WefaSplashImg, WefaSplashImg],
        placeholder: WefaSplashPlaceholderImg,
      },
      {
        srcSet: [WefaOnboardSelectElementImg, WefaOnboardSelectElementImg],
        placeholder: WefaOnboardSelectElementPlaceholderImg,
      },
    ],
  },
  syn: {
    alt: 'Synesthesia colorful blog page inside a laptop frame.',
    textures: [
      {
        srcSet: [SynLearningsImg, SynLearningsImg],
        placeholder: SynLearningsPlaceholderImg,
      },
    ],
  },
  freeport: {
    alt: 'Freeport launch artwork inside a laptop frame.',
    textures: [
      {
        srcSet: [FreeportBackgroundImg, FreeportBackgroundImg],
        placeholder: FreeportBackgroundPlaceholderImg,
      },
    ],
  },
  mira_connect: {
    alt: 'Mira Connect call interface inside a laptop frame.',
    textures: [
      {
        srcSet: [ConnectCallMessagesImg, ConnectCallMessagesImg],
        placeholder: ConnectCallMessagesPlaceholderImg,
      },
    ],
  },
  mira_flow: {
    alt: 'Mira Flow workflow screens inside mobile frames.',
    textures: [
      {
        srcSet: [FlowTabletCollectionsImg, FlowTabletCollectionsImg],
        placeholder: FlowTabletCollectionsPlaceholderImg,
      },
      {
        srcSet: [FlowTabletReferencePhotoImg, FlowTabletReferencePhotoImg],
        placeholder: FlowTabletReferencePhotoPlaceholderImg,
      },
    ],
  },
  gentle_monster: {
    alt: 'Gentle Monster landing page inside a laptop frame.',
    textures: [
      {
        srcSet: [GMBackgroundImg, GMBackgroundImg],
        placeholder: GMBackgroundPlaceholderImg,
      },
    ],
  },
}

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([])
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false)
  const intro = useRef()
  const projectRefs = useRef(featuredProjectSlugs.map(() => createRef()))

  const details = useRef()

  useEffect(() => {
    const sections = [intro, ...projectRefs.current, details]

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target
            observer.unobserve(section)
            if (visibleSections.includes(section)) return
            setVisibleSections(prevSections => [...prevSections, section])
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting)
      },
      { rootMargin: '-100% 0px 0px 0px' }
    )

    sections.forEach(section => {
      if (section.current) sectionObserver.observe(section.current)
    })

    if (intro.current) indicatorObserver.observe(intro.current)

    return () => {
      sectionObserver.disconnect()
      indicatorObserver.disconnect()
    }
  }, [visibleSections])

  return (
    <div className={styles.home}>
      <Meta
        route="/"
        title="Architect & Steward"
        description="Portfolio of Afolabi Aiyeloja, a systems architect and steward shaping regenerative web3 infrastructure with a background in augmented reality, blockchains, and AI."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      {featuredProjectSlugs.map((slug, index) => {
        const project = projects[slug]
        const sectionRef = projectRefs.current[index]
        const media = projectMedia[slug]
        const projectNumber = index + 1

        return (
          <ProjectSummary
            key={slug}
            id={`project-${projectNumber}`}
            alternate={index % 2 === 1}
            sectionRef={sectionRef}
            visible={visibleSections.includes(sectionRef.current)}
            index={projectNumber}
            title={project.title}
            description={project.description}
            buttonText={project.cta.label}
            buttonLink={project.cta.link}
            model={{
              type: project.platform,
              alt: media.alt,
              textures: media.textures,
            }}
          />
        )
      })}
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  )
}
