import { useEffect, useRef, useState } from 'react'
import { useInViewport } from 'hooks'
import { media } from 'utils/style'

import { Meta } from 'components/Meta'
import { Footer } from 'components/Footer'
import { Intro } from 'layouts/Home/Intro'
import { Profile } from 'layouts/Home/Profile'
import { ProjectSummary } from 'layouts/Home/ProjectSummary'

import {
  GreenGoodsActionSelectionPwaSources,
  GreenGoodsActionSelectionPwaPlaceholderImg,
  GreenGoodsMediaSectionPwaSources,
  GreenGoodsMediaSectionPwaPlaceholderImg,
} from 'assets/green-goods'
import {
  GreenpillNetworkMapSources,
  GreenpillNetworkMapPlaceholderImg,
} from 'assets/greenpill'
import {
  WefaSplashImg,
  WefaSplashPlaceholderImg,
  WefaOnboardSelectElementImg,
  WefaOnboardSelectElementPlaceholderImg,
} from 'assets/wefa'
import { SynLearningsSources, SynLearningsPlaceholderImg } from 'assets/syn'
import {
  FreeportBackgroundSources,
  FreeportBackgroundPlaceholderImg,
} from 'assets/freeport'
import {
  ConnectCallMessagesSources,
  ConnectCallMessagesPlaceholderImg,
} from 'assets/mira-connect'
import {
  FlowTabletCollectionsSources,
  FlowTabletCollectionsPlaceholderImg,
  FlowTabletReferencePhotoSources,
  FlowTabletReferencePhotoPlaceholderImg,
} from 'assets/mira-flow'
import { GMBackgroundSources, GMBackgroundPlaceholderImg } from 'assets/gm'

import styles from './Home.module.css'
import { featuredProjectSlugs, projects } from '../../constants'
import type { ModelConfig } from 'components/Model'

const disciplines = ['Steward', 'Engineer', 'Storyteller', 'Artist']

type ProjectMedia = {
  alt: string
  textures: ModelConfig['texture'][]
}

const projectMedia = {
  green_goods: {
    alt: 'Green Goods work selection and media capture screens.',
    textures: [
      {
        srcSet: GreenGoodsActionSelectionPwaSources,
        placeholder: GreenGoodsActionSelectionPwaPlaceholderImg,
      },
      {
        srcSet: GreenGoodsMediaSectionPwaSources,
        placeholder: GreenGoodsMediaSectionPwaPlaceholderImg,
      },
    ],
  },
  greenpill: {
    alt: 'Greenpill Network homepage map hero.',
    textures: [
      {
        srcSet: GreenpillNetworkMapSources,
        placeholder: GreenpillNetworkMapPlaceholderImg,
      },
    ],
  },
  wefa: {
    alt: 'WEFA onboarding artwork.',
    textures: [
      {
        srcSet: [WefaSplashImg],
        placeholder: WefaSplashPlaceholderImg,
      },
      {
        srcSet: [WefaOnboardSelectElementImg],
        placeholder: WefaOnboardSelectElementPlaceholderImg,
      },
    ],
  },
  syn: {
    alt: 'Synesthesia colorful blog page.',
    textures: [
      {
        srcSet: SynLearningsSources,
        placeholder: SynLearningsPlaceholderImg,
      },
    ],
  },
  freeport: {
    alt: 'Freeport launch artwork.',
    textures: [
      {
        srcSet: FreeportBackgroundSources,
        placeholder: FreeportBackgroundPlaceholderImg,
      },
    ],
  },
  mira_connect: {
    alt: 'Mira Connect call interface.',
    textures: [
      {
        srcSet: ConnectCallMessagesSources,
        placeholder: ConnectCallMessagesPlaceholderImg,
      },
    ],
  },
  mira_flow: {
    alt: 'Mira Flow workflow screens.',
    textures: [
      {
        srcSet: FlowTabletCollectionsSources,
        placeholder: FlowTabletCollectionsPlaceholderImg,
      },
      {
        srcSet: FlowTabletReferencePhotoSources,
        placeholder: FlowTabletReferencePhotoPlaceholderImg,
      },
    ],
  },
  gentle_monster: {
    alt: 'Gentle Monster landing page.',
    textures: [
      {
        srcSet: GMBackgroundSources,
        placeholder: GMBackgroundPlaceholderImg,
      },
    ],
  },
} satisfies Record<(typeof featuredProjectSlugs)[number], ProjectMedia>

export const Home = () => {
  const details = useRef<HTMLElement | null>(null)
  const detailsVisible = useInViewport(details, true)
  const [enhance, setEnhance] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(
      `(min-width: ${
        media.tablet + 1
      }px) and (pointer: fine) and (prefers-reduced-motion: no-preference)`
    )
    const update = () => setEnhance(query.matches)

    if (document.readyState === 'complete') update()
    else window.addEventListener('load', update, { once: true })
    query.addEventListener('change', update)

    return () => {
      window.removeEventListener('load', update)
      query.removeEventListener('change', update)
    }
  }, [])

  return (
    <div className={styles.home}>
      <Meta
        route="/"
        title="Architect + Steward"
        description="Portfolio of Afolabi Aiyeloja, an ecosystem architect and systems builder working across regenerative technology, cultural community, public goods infrastructure, and expressive web experiences."
      />
      <Intro id="intro" disciplines={disciplines} enhance={enhance} />
      {featuredProjectSlugs.map((slug, index) => {
        const project = projects[slug]
        const media = projectMedia[slug]
        const projectNumber = index + 1

        return (
          <ProjectSummary
            key={slug}
            id={`project-${projectNumber}`}
            alternate={index % 2 === 1}
            enhance={enhance}
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
      <Profile sectionRef={details} visible={detailsVisible} id="details" />
      <Footer />
    </div>
  )
}
