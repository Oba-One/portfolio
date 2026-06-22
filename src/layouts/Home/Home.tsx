// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { createRef, useEffect, useRef, useState } from 'react'

import { Meta } from 'components/Meta'
import { Footer } from 'components/Footer'
import { Intro } from 'layouts/Home/Intro'
import { Profile } from 'layouts/Home/Profile'
import { ProjectSummary } from 'layouts/Home/ProjectSummary'

import { GreenGoodsLogoImg, GreenGoodsSocialCardImg } from 'assets/green-goods'
import { GreenpillMapImg } from 'assets/greenpill'
import { WefaSplashImg, WefaOnboardSelectElementImg } from 'assets/wefa'
import { SynBackgroundImg } from 'assets/syn'
import { FreeportBackgroundImg } from 'assets/freeport'
import { ConnectCallMessagesImg } from 'assets/mira-connect'
import { FlowTabletCollectionsImg, FlowTabletReferencePhotoImg } from 'assets/mira-flow'
import { GMBackgroundImg } from 'assets/gm'

import styles from './Home.module.css'
import { featuredProjectSlugs, projects } from '../../constants'

const disciplines = ['Steward', 'Engineer', 'Storyteller', 'Artist']

const projectMedia = {
  green_goods: {
    alt: 'Green Goods project artwork inside mobile frames.',
    textures: [
      {
        srcSet: [GreenGoodsSocialCardImg, GreenGoodsSocialCardImg],
        placeholder: GreenGoodsSocialCardImg,
      },
      {
        srcSet: [GreenGoodsLogoImg, GreenGoodsLogoImg],
        placeholder: GreenGoodsLogoImg,
      },
    ],
  },
  greenpill: {
    alt: 'Greenpill map inside a laptop frame.',
    textures: [
      {
        srcSet: [GreenpillMapImg, GreenpillMapImg],
        placeholder: GreenpillMapImg,
      },
    ],
  },
  wefa: {
    alt: 'WEFA onboarding artwork inside mobile frames.',
    textures: [
      {
        srcSet: [WefaSplashImg, WefaSplashImg],
        placeholder: WefaSplashImg,
      },
      {
        srcSet: [WefaOnboardSelectElementImg, WefaOnboardSelectElementImg],
        placeholder: WefaOnboardSelectElementImg,
      },
    ],
  },
  syn: {
    alt: 'Synesthesia launch artwork inside a laptop frame.',
    textures: [
      {
        srcSet: [SynBackgroundImg, SynBackgroundImg],
        placeholder: SynBackgroundImg,
      },
    ],
  },
  freeport: {
    alt: 'Freeport launch artwork inside a laptop frame.',
    textures: [
      {
        srcSet: [FreeportBackgroundImg, FreeportBackgroundImg],
        placeholder: FreeportBackgroundImg,
      },
    ],
  },
  mira_connect: {
    alt: 'Mira Connect call interface inside a laptop frame.',
    textures: [
      {
        srcSet: [ConnectCallMessagesImg, ConnectCallMessagesImg],
        placeholder: ConnectCallMessagesImg,
      },
    ],
  },
  mira_flow: {
    alt: 'Mira Flow workflow screens inside mobile frames.',
    textures: [
      {
        srcSet: [FlowTabletCollectionsImg, FlowTabletCollectionsImg],
        placeholder: FlowTabletCollectionsImg,
      },
      {
        srcSet: [FlowTabletReferencePhotoImg, FlowTabletReferencePhotoImg],
        placeholder: FlowTabletReferencePhotoImg,
      },
    ],
  },
  gentle_monster: {
    alt: 'Gentle Monster landing page inside a laptop frame.',
    textures: [
      {
        srcSet: [GMBackgroundImg, GMBackgroundImg],
        placeholder: GMBackgroundImg,
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
