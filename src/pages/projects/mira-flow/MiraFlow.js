import { Fragment } from 'react'

import {
  FlowProblemImg,
  FlowArchitectureImg,
  FlowArchitecture2Img,
  FlowDevelopmentImg,
  FlowTabletHistoryImg,
  FlowTabletLoginImg,
  // FlowDevelopment2Img
} from 'assets/mira-flow'
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

import { projects } from '../../../constants'
import styles from './MiraFlow.module.scss'

const project = projects['mira_flow']

const title = project.title
const description = project.description
const roles = project.skills

export const MiraFlow = () => {
  const { themeId } = useTheme()

  const isDark = themeId === 'dark'

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Meta title={title} prefix="Projects" description={description} />
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={FlowTabletLoginImg}
          srcSet={`${FlowTabletLoginImg.src} 1080w, ${FlowTabletLoginImg.src} 2160w`}
          placeholder={FlowTabletLoginImg}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.smartsparrow.com/"
          links={project.links}
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent></ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>The problem</ProjectSectionHeading>
              <ProjectSectionText>{project.problem}</ProjectSectionText>
            </ProjectTextRow>
            <Image
              raised
              key={themeId}
              srcSet={[FlowProblemImg, FlowProblemImg]}
              placeholder={FlowProblemImg}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Architecture</ProjectSectionHeading>
                <ProjectSectionText>{project.architecture}</ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowArchitectureImg, FlowArchitectureImg]}
                placeholder={FlowArchitectureImg}
                alt="Configuration options for a component."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowArchitecture2Img, FlowArchitecture2Img]}
                placeholder={FlowArchitecture2Img}
                alt="Configuration options for text."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[FlowDevelopmentImg, FlowDevelopmentImg]}
              placeholder={FlowDevelopmentImg}
              alt="The homepage of the aero design system docs website linking to principles and components."
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText>{project.development}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[FlowTabletHistoryImg, FlowTabletHistoryImg]}
              placeholder={FlowTabletHistoryImg}
              alt="A drag and drop storyboard style editor for creating an adaptive lesson."
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Learnings</ProjectSectionHeading>
              <ProjectSectionText>{project.learnings}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
