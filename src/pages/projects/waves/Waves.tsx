// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { Fragment } from 'react'

import {
  WavesStoryImg,
  WavesStoryPlaceholderImg,
  WavesSplashImg,
  WavesSplashPlaceholderImg,
  WavesBackgroundImg,
  WavesBackgroundPlaceholderImg,
  WavesDeckPlantsImg,
  WavesDeckPlantsPlaceholderImg,
  WavesOnboardSelectElementImg,
  WavesOnboardSelectElementPlaceholderImg,
  WavesOnboardSelectPlantImg,
  WavesOnboardSelectPlantPlaceholderImg,
} from 'assets/waves'
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
import { Footer } from 'components/Footer'
import { useTheme } from 'components/ThemeProvider'

import styles from './Waves.module.scss'
import { projects } from '../../../constants'

const project = projects['waves']

const title = project.title
const description = project.description
const roles = project.skills

export const Waves = () => {
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
          src={WavesBackgroundImg}
          srcSet={`${WavesBackgroundImg.src} 1280w, ${WavesBackgroundImg.src} 2560w`}
          alt=""
          placeholder={WavesBackgroundPlaceholderImg}
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
              <ProjectSectionHeading>Why Waves</ProjectSectionHeading>
              <ProjectSectionText>{project.problem}</ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                src={WavesSplashImg}
                srcSet={[WavesSplashImg, WavesSplashImg]}
                placeholder={WavesSplashPlaceholderImg}
                alt=""
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={WavesDeckPlantsImg}
                srcSet={[WavesDeckPlantsImg, WavesDeckPlantsImg]}
                placeholder={WavesDeckPlantsPlaceholderImg}
                alt=""
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
                src={WavesOnboardSelectElementImg}
                srcSet={[WavesOnboardSelectElementImg, WavesOnboardSelectElementImg]}
                placeholder={WavesOnboardSelectElementPlaceholderImg}
                alt=""
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={WavesOnboardSelectPlantImg}
                srcSet={[WavesOnboardSelectPlantImg, WavesOnboardSelectPlantImg]}
                placeholder={WavesOnboardSelectPlantPlaceholderImg}
                alt=""
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>The three Cs</ProjectSectionHeading>
              <ProjectSectionText>{project.architecture}</ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              src={WavesStoryImg}
              srcSet={[WavesStoryImg, WavesStoryImg]}
              placeholder={WavesStoryPlaceholderImg}
              alt=""
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>The platform</ProjectSectionHeading>
              <ProjectSectionText>{project.development}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>What is next</ProjectSectionHeading>
              <ProjectSectionText>{project.learnings}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
