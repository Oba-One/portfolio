import { useEffect, useRef, useState } from 'react'

import { Meta } from 'components/Meta'
import { Footer } from 'components/Footer'
import { Intro } from 'layouts/Home/Intro'
import { Profile } from 'layouts/Home/Profile'
import { ProjectSummary } from 'layouts/Home/ProjectSummary'

import { GMBackgroundImg } from 'assets/gm'
import { SynLearningsImg } from 'assets/syn'
import { FreeportDevelopmentImg } from 'assets/freeport'
import { ConnectBackgroundImg } from 'assets/mira-connect'
import { FlowArchitectureImg, FlowArchitecture2Img } from 'assets/mira-flow'
import { WefaOnboardSelectElementImg, WefaOnboardSelectPlantImg } from 'assets/wefa'

import styles from './Home.module.css'
import { projects } from '../../constants'

const disciplines = ['Engineer', 'Creator', 'Architect']

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([])
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false)
  const intro = useRef()
  const projectOne = useRef()
  const projectTwo = useRef()
  const projectThree = useRef()
  const projectFour = useRef()
  const projectFive = useRef()
  const projectSix = useRef()

  const details = useRef()

  useEffect(() => {
    const sections = [
      intro,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive,
      projectSix,
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
        title="Developer & Engineer"
        description="Developer portfolio of Afolabi Aiyeloja — a developer working on web & mobile
          apps with a focus on Augmented Reality, Blockchains, & Artificial Intelligence."
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
        title={projects['syn'].title}
        description={projects['syn'].description}
        buttonText={projects['syn'].cta.label}
        buttonLink={projects['syn'].cta.link}
        model={{
          type: projects['syn'].platform,
          alt: 'Syn beta home page on desktop.',
          textures: [
            {
              srcSet: [SynLearningsImg, SynLearningsImg],
              placeholder: SynLearningsImg,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title={projects['wefa'].title}
        description={projects['wefa'].description}
        buttonText={projects['wefa'].cta.label}
        buttonLink={projects['wefa'].cta.link}
        model={{
          type: projects['wefa'].platform,
          alt: 'App login screen',
          textures: [
            {
              srcSet: [WefaOnboardSelectElementImg, WefaOnboardSelectElementImg],
              placeholder: WefaOnboardSelectElementImg,
            },
            {
              srcSet: [WefaOnboardSelectPlantImg, WefaOnboardSelectPlantImg],
              placeholder: WefaOnboardSelectPlantImg,
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
        title={projects['freeport'].title}
        description={projects['freeport'].description}
        buttonText={projects['freeport'].cta.label}
        buttonLink={projects['freeport'].cta.link}
        model={{
          type: projects['freeport'].platform,
          alt: 'Freeport gallery page',
          textures: [
            {
              srcSet: [FreeportDevelopmentImg, FreeportDevelopmentImg],
              placeholder: FreeportDevelopmentImg,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title={projects['mira_connect'].title}
        description={projects['mira_connect'].description}
        buttonText={projects['mira_connect'].cta.label}
        buttonLink={projects['mira_connect'].cta.link}
        model={{
          type: projects['mira_connect'].platform,
          alt: 'Mira connect call',
          textures: [
            {
              srcSet: [ConnectBackgroundImg, ConnectBackgroundImg],
              placeholder: ConnectBackgroundImg,
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
        title={projects['mira_flow'].title}
        description={projects['mira_flow'].description}
        buttonText={projects['mira_flow'].cta.label}
        buttonLink={projects['mira_flow'].cta.link}
        model={{
          type: projects['mira_flow'].platform,
          alt: 'App login screen',
          textures: [
            {
              srcSet: [FlowArchitectureImg, FlowArchitectureImg],
              placeholder: FlowArchitectureImg,
            },
            {
              srcSet: [FlowArchitecture2Img, FlowArchitecture2Img],
              placeholder: FlowArchitecture2Img,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-6"
        sectionRef={projectSix}
        visible={visibleSections.includes(projectSix.current)}
        index={6}
        title={projects['gentle_monster'].title}
        description={projects['gentle_monster'].description}
        buttonText={projects['gentle_monster'].cta.label}
        buttonLink={projects['gentle_monster'].cta.link}
        model={{
          type: projects['gentle_monster'].platform,
          alt: 'Gentel monster home page',
          textures: [
            {
              srcSet: [GMBackgroundImg, GMBackgroundImg],
              placeholder: GMBackgroundImg,
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
