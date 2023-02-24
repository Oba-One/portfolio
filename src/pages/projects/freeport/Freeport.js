import { Fragment } from 'react'

import {
  FreeportBackgroundImg,
  FreeportArchitectureImg,
  FreeportDevelopmentImg,
  FreeportLearningsImg,
  FreeportProblem2Img,
} from 'assets/freeport'
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
          src={FreeportDevelopmentImg}
          srcSet={`${FreeportDevelopmentImg.src} 1080w, ${FreeportDevelopmentImg.src} 2160w`}
          placeholder={FreeportDevelopmentImg}
          blurDataURL={'LEPskuo|~qrs4TX7x^s8o~oID*od'}
        />
        <ProjectHeader
          title={title}
          description={description}
          links={project.links}
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionColumns centered>
            <div>
              <ProjectSectionHeading>Problem</ProjectSectionHeading>
              <ProjectSectionText>{project.problem}</ProjectSectionText>
            </div>
            <Image
              raised
              key={themeId}
              srcSet={[FreeportProblem2Img, FreeportProblem2Img]}
              placeholder={FreeportProblem2Img}
              alt="A drag and drop storyboard style editor for creating an adaptive lesson."
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[FreeportBackgroundImg, FreeportBackgroundImg]}
              placeholder={FreeportBackgroundImg}
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
              srcSet={[FreeportLearningsImg, FreeportLearningsImg]}
              placeholder={FreeportLearningsImg}
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
          <ProjectSectionContent>
            <Image
              srcSet={[FreeportArchitectureImg, FreeportArchitectureImg]}
              placeholder={FreeportArchitectureImg}
              alt="Configuration options for a component."
              sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
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
