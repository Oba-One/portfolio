import { Fragment } from 'react'

import {
  WavesStoryImg,
  WavesDeckPlantsImg,
  WavesBackgroundImg,
  WavesOnboardSelectPlantImg,
  WavesOnboardSelectElementImg,
  WavesOnboardGeneratedCreaturesImg,
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
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={WavesBackgroundImg}
          srcSet={`${WavesBackgroundImg.src} 1280w, ${WavesBackgroundImg.src} 2560w`}
          alt="Waves landing page background image, showing an animated person gardening."
          placeholder={WavesBackgroundImg}
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
                src={WavesDeckPlantsImg}
                srcSet={[WavesDeckPlantsImg.src, WavesDeckPlantsImg.src]}
                placeholder={WavesDeckPlantsImg.src}
                alt="Waves app splash screen with logo centered."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={WavesOnboardGeneratedCreaturesImg}
                srcSet={[
                  WavesOnboardGeneratedCreaturesImg.src,
                  WavesOnboardGeneratedCreaturesImg.src,
                ]}
                placeholder={WavesOnboardGeneratedCreaturesImg.src}
                alt="Waves plant selection screen showcasing a strawberry as an example."
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
                srcSet={[
                  WavesOnboardSelectElementImg.src,
                  WavesOnboardSelectElementImg.src,
                ]}
                placeholder={WavesOnboardSelectElementImg.src}
                alt="Waves app spices/herbs vs flowers selection screen."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={WavesOnboardSelectPlantImg}
                srcSet={[WavesOnboardSelectPlantImg.src, WavesOnboardSelectPlantImg.src]}
                placeholder={WavesOnboardSelectPlantImg.src}
                alt="Waves app fruits vs vegetables selection screen."
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
              src={WavesStoryImg}
              srcSet={[WavesStoryImg.src, WavesStoryImg.src]}
              placeholder={WavesStoryImg.src}
              alt="Waves comic story cover art. Detailing the protagonists walking out of a cave."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Story & Release</ProjectSectionHeading>
              <ProjectSectionText>{project.development}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
