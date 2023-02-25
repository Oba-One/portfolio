import { Fragment } from 'react'

import {
  GMBackgroundImg,
  GMProblemImg,
  GMArchitectureImg,
  GMDevelopmentImg,
  GMLearningsImg,
  // GMDevelopment2Img
} from 'assets/gm'
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  // ProjectImage,
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

const project = projects['gentle_monster']

const title = project.title
const description = project.description
const roles = project.skills

export const GentleMonster = () => {
  const { themeId } = useTheme()

  const isDark = themeId === 'dark'

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Meta title={title} prefix="Projects" description={description} />
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={GMBackgroundImg}
          srcSet={`${GMBackgroundImg.src} 1080w, ${GMBackgroundImg.src} 2160w`}
          placeholder={GMBackgroundImg}
          blur="LqL|u[oftlRkD%f6bbay_4aye.j["
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
              <ProjectSectionHeading>The Problem</ProjectSectionHeading>
              <ProjectSectionText>{project.problem}</ProjectSectionText>
            </div>
            <Image
              raised
              key={themeId}
              srcSet={[GMProblemImg, GMProblemImg]}
              placeholder={GMProblemImg}
              blur="LpG[=;RjWBxa4nWVa|oL~qt7j[Rj"
              alt="The homepage of the aero design system docs website linking to principles and components."
              sizes="100vw"
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[GMArchitectureImg, GMArchitectureImg]}
              placeholder={GMArchitectureImg}
              blur="LKPP=d00yD?v^+xCofWU?^.9n}Vs"
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
              srcSet={[GMDevelopmentImg, GMDevelopmentImg]}
              placeholder={GMDevelopmentImg}
              blur="L8RfkB00?bxuj[WBWBWB~q%NRPM{"
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
              srcSet={[GMLearningsImg, GMLearningsImg]}
              placeholder={GMLearningsImg}
              blur="LPQvtKWAjYWs~qj]WBWAt7Rjogxt"
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
