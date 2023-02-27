import { Fragment } from 'react'

import {
  GMBackgroundImg,
  GMProblemImg,
  GMArchitectureImg,
  GMDevelopment2Img,
  GMLearningsImg,
  GMBackgroundPlaceholderImg,
  GMProblemPlaceholderImg,
  GMArchitecturePlaceholderImg,
  GMDevelopment2PlaceholderImg,
  GMLearningsPlaceholderImg,
  // GMDevelopment22Img
  // GMDevelopment22PlaceholderImg
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
          placeholder={GMBackgroundPlaceholderImg.src}
          alt="Gentle Monster updated landing page with new UI design."
          // blur="LqL|u[oftlRkD%f6bbay_4aye.j["
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
              placeholder={GMProblemPlaceholderImg.src}
              // blur="LpG[=;RjWBxa4nWVa|oL~qt7j[Rj"
              sizes="100vw"
              alt="Gentle Monster 2018 landing page with old UI design."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[GMArchitectureImg, GMArchitectureImg]}
              placeholder={GMArchitecturePlaceholderImg.src}
              // blur="LKPP=d00yD?v^+xCofWU?^.9n}Vs"
              sizes="100vw"
              alt="Gentle Monster glasses collections page with the different styles of glasses."
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
              srcSet={[GMDevelopment2Img, GMDevelopment2Img]}
              placeholder={GMDevelopment2PlaceholderImg.src}
              // blur="L8RfkB00?bxuj[WBWBWB~q%NRPM{"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
              alt="Gentle Monster product detail page with different views of the product."
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
              placeholder={GMLearningsPlaceholderImg.src}
              // blur="LPQvtKWAjYWs~qj]WBWAt7Rjogxt"
              alt="Gentle Monster product carousel with model wearing different glasses."
              sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
