import { Fragment } from 'react'

import {
  FreeportBackgroundImg,
  FreeportProblemImg,
  FreeportArchitectureImg,
  FreeportDevelopmentImg,
  FreeportLearningsImg,
} from 'assets/freeport'
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
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

const project = projects['freeport']

const title = project.title
const description = project.description
const roles = project.skills

export const Freeport = () => {
  const { themeId } = useTheme()

  const isDark = themeId === 'dark'

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Meta title={title} prefix="Projects" description={description} />
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={FreeportBackgroundImg}
          srcSet={`${FreeportBackgroundImg.src} 1080w, ${FreeportBackgroundImg.src} 2160w`}
          placeholder={FreeportBackgroundImg}
        />
        <ProjectHeader
          title={title}
          description={description}
          links={project.links}
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={themeId}
              srcSet={[FreeportProblemImg, FreeportProblemImg]}
              placeholder={FreeportProblemImg}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>{project.problem}</ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[FreeportArchitectureImg, FreeportArchitectureImg]}
              placeholder={FreeportArchitectureImg}
              alt="The homepage of the aero design system docs website linking to principles and components."
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Architecture</ProjectSectionHeading>
              <ProjectSectionText>{project.architecture}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[FreeportDevelopmentImg, FreeportDevelopmentImg]}
              placeholder={FreeportDevelopmentImg}
              alt="A drag and drop storyboard style editor for creating an adaptive lesson."
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText>{project.development}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Learnings</ProjectSectionHeading>
                <ProjectSectionText>{project.learnings}</ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <Image
              srcSet={[FreeportLearningsImg, FreeportLearningsImg]}
              placeholder={FreeportLearningsImg}
              alt="Configuration options for a component."
              sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
