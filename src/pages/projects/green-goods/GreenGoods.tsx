import { Fragment } from 'react'

import {
  GreenGoodsActionSelectionPwaImg,
  GreenGoodsActionSelectionPwaPlaceholderImg,
  GreenGoodsHeroWebsiteImg,
  GreenGoodsHeroWebsitePlaceholderImg,
  GreenGoodsImpactValueCycleImg,
  GreenGoodsImpactValueCyclePlaceholderImg,
  GreenGoodsMediaSectionPwaImg,
  GreenGoodsMediaSectionPwaPlaceholderImg,
  RefiSiciliaAgroforestryImg,
  RefiSiciliaAgroforestryPlaceholderImg,
  TasSolarHubSessionImg,
  TasSolarHubSessionPlaceholderImg,
} from 'assets/green-goods'
import { Footer } from 'components/Footer'
import { Image } from 'components/Image'
import { Link } from 'components/Link'
import { Meta } from 'components/Meta'
import { useTheme } from 'components/ThemeProvider'
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project'
import { classes, media } from 'utils/style'

import { projects } from '../../../constants'
import styles from './GreenGoods.module.scss'

const project = projects['green_goods']

const title = project.title
const description = project.description
const roles = project.skills

export const GreenGoods = () => {
  const { themeId } = useTheme()
  const isDark = themeId === 'dark'

  return (
    <Fragment>
      <Meta
        title={title}
        prefix="Projects"
        description={description}
        route={project.cta.link}
        socialImage={project.socialImage}
      />
      <ProjectContainer className={styles.greenGoods}>
        <ProjectBackground
          className={styles.heroBackground}
          src={GreenGoodsHeroWebsiteImg}
          srcSet={`${GreenGoodsHeroWebsiteImg.src} 1672w, ${GreenGoodsHeroWebsiteImg.src} 3344w`}
          placeholder={GreenGoodsHeroWebsitePlaceholderImg}
          alt=""
          opacity={isDark ? 0.56 : 0.72}
        />
        <ProjectHeader
          title={title}
          description={description}
          links={project.links}
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent className={styles.problemContent}>
            <Image
              raised
              className={styles.fieldPhoto}
              src={TasSolarHubSessionImg}
              srcSet={[TasSolarHubSessionImg, TasSolarHubSessionImg]}
              placeholder={TasSolarHubSessionPlaceholderImg}
              alt="TAS solar hub team standing in front of a solar powered community hub in Awka, Nigeria."
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Problem</ProjectSectionHeading>
              <ProjectSectionText>{project.problem}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.appScreens}>
              <Image
                className={styles.appScreen}
                src={GreenGoodsActionSelectionPwaImg}
                srcSet={[
                  GreenGoodsActionSelectionPwaImg,
                  GreenGoodsActionSelectionPwaImg,
                ]}
                placeholder={GreenGoodsActionSelectionPwaPlaceholderImg}
                alt="Green Goods mobile app action selection screen with solar, agroforestry, education, and waste domains."
                sizes={`(max-width: ${media.mobile}px) 58vw, 300px`}
              />
              <Image
                className={styles.appScreen}
                src={GreenGoodsMediaSectionPwaImg}
                srcSet={[GreenGoodsMediaSectionPwaImg, GreenGoodsMediaSectionPwaImg]}
                placeholder={GreenGoodsMediaSectionPwaPlaceholderImg}
                alt="Green Goods mobile app media step for capturing planting photos and optional audio evidence."
                sizes={`(max-width: ${media.mobile}px) 58vw, 300px`}
              />
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Architecture</ProjectSectionHeading>
              <ProjectSectionText>{project.architecture}</ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <Image
              className={styles.impactCycle}
              src={GreenGoodsImpactValueCycleImg}
              srcSet={[GreenGoodsImpactValueCycleImg, GreenGoodsImpactValueCycleImg]}
              placeholder={GreenGoodsImpactValueCyclePlaceholderImg}
              alt="Green Goods impact value cycle showing work, tokenization, evaluation, and funding as a circular flow."
              sizes={`(max-width: ${media.mobile}px) 100vw, 520px`}
            />
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText>{project.development}</ProjectSectionText>
              <ProjectSectionText>
                Green Goods is one of the main products I steward through the{' '}
                <Link href="/projects/greenpill">Greenpill</Link> ecosystem, so the
                technical work and community work feed into each other.
              </ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns centered className={styles.columns}>
            <Image
              raised
              className={classes(styles.fieldPhoto, styles.agroforestryPhoto)}
              src={RefiSiciliaAgroforestryImg}
              srcSet={[RefiSiciliaAgroforestryImg, RefiSiciliaAgroforestryImg]}
              placeholder={RefiSiciliaAgroforestryPlaceholderImg}
              alt="ReFi Sicilia agroforestry work with a participant pruning trees near the coastline."
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
            />
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Learnings</ProjectSectionHeading>
              <ProjectSectionText>{project.learnings}</ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
