import { Fragment } from 'react'

import {
  sliceSidebarAnnotationsLarge,
  sliceSidebarAnnotationsPlaceholder,
  sliceSidebarAnnotations,
  sliceSidebarLayersLarge,
  sliceSidebarLayersPlaceholder,
  sliceSidebarLayers,
  sliceSlidesLarge,
  sliceSlidesPlaceholder,
  sliceSlides,
  WefaBackgroundImg,
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
          placeholder={WefaBackgroundImg}
          opacity={isDark ? 0.5 : 0.6}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.best.edu.au/s/q2yjjvl7?data=8%404!9%4020303!10%40-15087&version=1"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Why WEFA?</ProjectSectionHeading>
              <ProjectSectionText>{project.problem}</ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[sliceSidebarLayers, sliceSidebarLayersLarge]}
                placeholder={sliceSidebarLayersPlaceholder}
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[sliceSidebarAnnotations, sliceSidebarAnnotationsLarge]}
                placeholder={sliceSidebarAnnotationsPlaceholder}
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Current Architecture</ProjectSectionHeading>
              <ProjectSectionText>{project.architecture}</ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={[sliceSlides, sliceSlidesLarge]}
              placeholder={sliceSlidesPlaceholder}
              alt="The new My Slides tab in slice, showing annotated and favorited slides."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Goals and Learning</ProjectSectionHeading>
              <ProjectSectionText>
                Real-time collaborative annotation facilitated better collaboration
                between learners, and was much easier to run group exercises with the new
                shared layers feature. Learners gave feedback that is was enjoyable to
                work together and see what others were doing, and liked how interactive
                and easy to use the application was.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
