// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { Fragment } from 'react'

import {
  GreenpillBooksImg,
  GreenpillBooksPlaceholderImg,
  GreenpillGardenEntryImg,
  GreenpillGardenEntryPlaceholderImg,
  GreenpillMonthlyCallImg,
  GreenpillMonthlyCallPlaceholderImg,
  GreenpillNetworkMapImg,
  GreenpillNetworkMapPlaceholderImg,
  GreenpillTechAndSunImg,
  GreenpillTechAndSunPlaceholderImg,
} from 'assets/greenpill'
import { Footer } from 'components/Footer'
import { Image } from 'components/Image'
import { Link } from 'components/Link'
import { Meta } from 'components/Meta'
import { useTheme } from 'components/ThemeProvider'
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project'
import { media } from 'utils/style'

import { projects } from '../../../constants'

const project = projects['greenpill']

const title = project.title
const description = project.description
const roles = project.skills

export const Greenpill = () => {
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
      <ProjectContainer>
        <ProjectBackground
          src={GreenpillNetworkMapImg}
          placeholder={GreenpillNetworkMapPlaceholderImg}
          alt=""
          opacity={isDark ? 0.58 : 0.78}
        />
        <ProjectHeader
          title={title}
          description={description}
          links={project.links}
          roles={roles}
        />
        <ProjectSection light>
          <ProjectSectionContent width="xl">
            <Image
              raised
              src={GreenpillBooksImg}
              placeholder={GreenpillBooksPlaceholderImg}
              alt="Greenpilled book spread describing regenerative cryptoeconomics, public goods funding, and coordination as the foundation for the network."
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Problem</ProjectSectionHeading>
              <ProjectSectionText>{project.problem}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              src={GreenpillGardenEntryImg}
              placeholder={GreenpillGardenEntryPlaceholderImg}
              alt="Greenpill Garden entry section with low pressure paths to subscribe, join the public conversation, take the Regen Assessment, or book a steward call."
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Architecture</ProjectSectionHeading>
              <ProjectSectionText>{project.architecture}</ProjectSectionText>
              <ProjectSectionText>
                That network architecture also feeds into{' '}
                <Link href="/projects/green-goods">Green Goods</Link>, where the field
                tools focus more directly on accessible impact reporting and funding while
                helping chapters and stewards make their work legible and verifiable.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <Image
              raised
              src={GreenpillMonthlyCallImg}
              placeholder={GreenpillMonthlyCallPlaceholderImg}
              alt="Greenpill Network monthly community call slide with Afolabi Aiyeloja visible beside the presentation."
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
              raised
              src={GreenpillTechAndSunImg}
              placeholder={GreenpillTechAndSunPlaceholderImg}
              alt="Afolabi Aiyeloja and Amio on a Greenpill Dev Guild call presenting Tech and Sun, a solar powered hub project for builders and communities."
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
