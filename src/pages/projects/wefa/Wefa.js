import { Fragment } from 'react'

import {
  WefaStoryImg,
  WefaDeckPlantsImg,
  WefaBackgroundImg,
  WefaOnboardSelectPlantImg,
  WefaOnboardSelectElementImg,
  WefaOnboardGeneratedCreaturesImg,
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
import { Footer } from 'components/Footer'
import { useTheme } from 'components/ThemeProvider'

import styles from './Wefa.module.scss'
import { projects } from '../../../constants'

const project = projects['wefa']

const title = project.title
const description = project.description
const roles = project.skills

export const Wefa = () => {
  const { themeId } = useTheme()

  const isDark = themeId === 'dark'

  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={WefaBackgroundImg}
          srcSet={`${WefaBackgroundImg.src} 1280w, ${WefaBackgroundImg.src} 2560w`}
          alt="WEFA landing page background image, showing an animated person gardening."
          placeholder={WefaBackgroundImg}
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
                srcSet={[WefaDeckPlantsImg.src, WefaDeckPlantsImg.src]}
                placeholder={WefaDeckPlantsImg.src}
                alt="WEFA app splash screen with logo centered."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={WefaOnboardGeneratedCreaturesImg}
                srcSet={[
                  WefaOnboardGeneratedCreaturesImg.src,
                  WefaOnboardGeneratedCreaturesImg.src,
                ]}
                placeholder={WefaOnboardGeneratedCreaturesImg.src}
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
                srcSet={[
                  WefaOnboardSelectElementImg.src,
                  WefaOnboardSelectElementImg.src,
                ]}
                placeholder={WefaOnboardSelectElementImg.src}
                alt="WEFA app spices/herbs vs flowers selection screen."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={WefaOnboardSelectPlantImg}
                srcSet={[WefaOnboardSelectPlantImg.src, WefaOnboardSelectPlantImg.src]}
                placeholder={WefaOnboardSelectPlantImg.src}
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
              src={WefaStoryImg}
              srcSet={[WefaStoryImg.src, WefaStoryImg.src]}
              placeholder={WefaStoryImg.src}
              alt="WEFA comic story cover art. Detailing the protagonists walking out of a cave."
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
