// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { useEffect, useRef, useState } from 'react'

import { Meta } from 'components/Meta'
import { Footer } from 'components/Footer'
import { Intro } from 'layouts/Home/Intro'
import { Profile } from 'layouts/Home/Profile'
import { ProjectSummary } from 'layouts/Home/ProjectSummary'

import { CoopWordmarkFlatImg } from 'assets/coop'
import { GreenGoodsLogoImg, GreenGoodsSocialCardImg } from 'assets/green-goods'
import { GreenpillMapImg } from 'assets/greenpill'
import { WavesDeckPlantsImg, WavesSplashImg } from 'assets/waves'
import { WefaSplashImg, WefaOnboardSelectElementImg } from 'assets/wefa'

import styles from './Home.module.css'
import { projects } from '../../constants'

const disciplines = ['Architect', 'Steward', 'Engineer', 'Storyteller']

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([])
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false)
  const intro = useRef()
  const projectOne = useRef()
  const projectTwo = useRef()
  const projectThree = useRef()
  const projectFour = useRef()
  const projectFive = useRef()

  const details = useRef()

  useEffect(() => {
    const sections = [
      intro,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive,
      details,
    ]

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
      sectionObserver.observe(section.current)
    })

    indicatorObserver.observe(intro.current)

    return () => {
      sectionObserver.disconnect()
      indicatorObserver.disconnect()
    }
  }, [visibleSections])

  return (
    <div className={styles.home}>
      <Meta
        title="Builder & Steward"
        description="Portfolio of Afolabi Aiyeloja, a builder and steward shaping regenerative web3 infrastructure with a background in augmented reality, blockchains, and AI."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title={projects['coop'].title}
        description={projects['coop'].description}
        buttonText={projects['coop'].cta.label}
        buttonLink={projects['coop'].cta.link}
        model={{
          type: projects['coop'].platform,
          alt: 'Coop wordmark inside a laptop frame.',
          textures: [
            {
              srcSet: [CoopWordmarkFlatImg, CoopWordmarkFlatImg],
              placeholder: CoopWordmarkFlatImg,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title={projects['green_goods'].title}
        description={projects['green_goods'].description}
        buttonText={projects['green_goods'].cta.label}
        buttonLink={projects['green_goods'].cta.link}
        model={{
          type: projects['green_goods'].platform,
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
        }}
      />
      <ProjectSummary
        id="project-3"
        alternate
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title={projects['greenpill'].title}
        description={projects['greenpill'].description}
        buttonText={projects['greenpill'].cta.label}
        buttonLink={projects['greenpill'].cta.link}
        model={{
          type: projects['greenpill'].platform,
          alt: 'Greenpill map inside a laptop frame.',
          textures: [
            {
              srcSet: [GreenpillMapImg, GreenpillMapImg],
              placeholder: GreenpillMapImg,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title={projects['waves'].title}
        description={projects['waves'].description}
        buttonText={projects['waves'].cta.label}
        buttonLink={projects['waves'].cta.link}
        model={{
          type: projects['waves'].platform,
          alt: 'Waves project artwork inside mobile frames.',
          textures: [
            {
              srcSet: [WavesSplashImg, WavesSplashImg],
              placeholder: WavesSplashImg,
            },
            {
              srcSet: [WavesDeckPlantsImg, WavesDeckPlantsImg],
              placeholder: WavesDeckPlantsImg,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-5"
        alternate
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
        title={projects['wefa'].title}
        description={projects['wefa'].description}
        buttonText={projects['wefa'].cta.label}
        buttonLink={projects['wefa'].cta.link}
        model={{
          type: projects['wefa'].platform,
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
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  )
}
