import { Fragment } from 'react'

import {
  FreeportBackgroundImg,
  FreeportArchitectureImg,
  FreeportDevelopmentImg,
  FreeportLearningsImg,
  FreeportProblemImg,
  FreeportBackgroundPlaceholderImg,
  FreeportArchitecturePlaceholderImg,
  FreeportDevelopmentPlaceholderImg,
  FreeportLearningsPlaceholderImg,
  FreeportProblemPlaceholderImg,
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
          placeholder={FreeportDevelopmentPlaceholderImg}
          alt="Freeport gallery page showing 3D gallery built with threejs."
          // blur="L6LD#]0LS6rX0r~WD*R%Kk~WM{In"
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
              srcSet={[FreeportProblemImg, FreeportProblemImg]}
              placeholder={FreeportProblemPlaceholderImg}
              // blur="LHM%.jMxDi~q_3jYV@t8~qM{axof"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
              alt="Pieces of fine art hanging on the wall in a gallery."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[FreeportBackgroundImg, FreeportBackgroundImg]}
              placeholder={FreeportBackgroundPlaceholderImg}
              // blur="LEPskuo|~qrs4TX7x^s8o~oID*kA"
              alt="Freeport landing page with a call to action to sign up for the launch list."
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
              placeholder={FreeportLearningsPlaceholderImg}
              // blur="LCRC[7-;?a9FIB~qt70000IUxuxu"
              alt="Freeport landing page showcasing Double Mickey and Mick Jagger pieces of art."
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
              placeholder={FreeportArchitecturePlaceholderImg}
              // blur="LgPjJkae%MkC_3j[R*jZ~qbHM{ae"
              alt="Freeport blog page on desktop."
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
