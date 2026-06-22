// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { Fragment } from 'react'

import {
  WefaElementalCharactersImg,
  WefaElementalCharactersPlaceholderImg,
  WefaOlaRedFruitImg,
  WefaOlaRedFruitPlaceholderImg,
  WefaDeckPlantsImg,
  WefaDeckPlantsPlaceholderImg,
  WefaOnboardSelectPlantImg,
  WefaOnboardSelectPlantPlaceholderImg,
  WefaOnboardSelectElementImg,
  WefaOnboardSelectElementPlaceholderImg,
  WefaOnboardGeneratedCreaturesImg,
  WefaOnboardGeneratedCreaturesPlaceholderImg,
} from 'assets/wefa'
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
import { media } from 'utils/style'
import { Meta } from 'components/Meta'
import { Image } from 'components/Image'
import { Link } from 'components/Link'
import { Footer } from 'components/Footer'
import { useTheme } from 'components/ThemeProvider'

import styles from './Wefa.module.scss'
import { projects } from '../../../constants'

const project = projects['wefa']

const title = project.title
const description = project.description
const roles = project.skills
const [learningsBeforeGreenpill, learningsAfterGreenpill] =
  project.learnings.split('Greenpill')

export const Wefa = () => {
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
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          className={styles.heroBackground}
          src={WefaOlaRedFruitImg}
          srcSet={`${WefaOlaRedFruitImg.src} 1280w, ${WefaOlaRedFruitImg.src} 2560w`}
          alt="Ola sitting in a tree holding red fruit beside a basket of fruit."
          placeholder={WefaOlaRedFruitPlaceholderImg}
          opacity={isDark ? 0.5 : 0.6}
        />
        <ProjectHeader
          title={title}
          description={description}
          links={project.links}
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Water Earth Fire Air</ProjectSectionHeading>
              <ProjectSectionText>{project.problem}</ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                src={WefaDeckPlantsImg}
                srcSet={[WefaDeckPlantsImg, WefaDeckPlantsImg]}
                placeholder={WefaDeckPlantsPlaceholderImg}
                alt="WEFA app splash screen with logo centered."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={WefaOnboardGeneratedCreaturesImg}
                srcSet={[
                  WefaOnboardGeneratedCreaturesImg,
                  WefaOnboardGeneratedCreaturesImg,
                ]}
                placeholder={WefaOnboardGeneratedCreaturesPlaceholderImg}
                alt="WEFA plant selection screen showcasing a strawberry as an example."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                src={WefaOnboardSelectElementImg}
                srcSet={[WefaOnboardSelectElementImg, WefaOnboardSelectElementImg]}
                placeholder={WefaOnboardSelectElementPlaceholderImg}
                alt="WEFA app spices/herbs vs flowers selection screen."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={WefaOnboardSelectPlantImg}
                srcSet={[WefaOnboardSelectPlantImg, WefaOnboardSelectPlantImg]}
                placeholder={WefaOnboardSelectPlantPlaceholderImg}
                alt="WEFA app fruits vs vegetables selection screen."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>What is it?</ProjectSectionHeading>
              <ProjectSectionText>{project.architecture}</ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              src={WefaElementalCharactersImg}
              srcSet={[WefaElementalCharactersImg, WefaElementalCharactersImg]}
              placeholder={WefaElementalCharactersPlaceholderImg}
              alt="Four WEFA elemental character concepts standing together."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Story</ProjectSectionHeading>
              <ProjectSectionText>{project.development}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Learnings</ProjectSectionHeading>
              <ProjectSectionText>
                {learningsBeforeGreenpill}
                <Link href="/projects/greenpill">Greenpill</Link>
                {learningsAfterGreenpill}
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
