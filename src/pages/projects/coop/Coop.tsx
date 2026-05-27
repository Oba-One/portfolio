// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { Fragment } from 'react'

import { CoopMarkGlowImg, CoopWordmarkFlatImg } from 'assets/coop'
import { Footer } from 'components/Footer'
import { Image } from 'components/Image'
import { Meta } from 'components/Meta'
import { useTheme } from 'components/ThemeProvider'
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

import styles from '../CaseStudy.module.scss'
import { projects } from '../../../constants'

const project = projects['coop']

const title = project.title
const description = project.description
const roles = project.skills

export const Coop = () => {
  const { themeId } = useTheme()
  const isDark = themeId === 'dark'

  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer>
        <ProjectBackground
          src={CoopMarkGlowImg}
          srcSet={`${CoopMarkGlowImg.src} 1024w, ${CoopMarkGlowImg.src} 2048w`}
          placeholder={CoopMarkGlowImg}
          alt=""
          opacity={isDark ? 0.48 : 0.72}
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
              <ProjectSectionHeading>Problem</ProjectSectionHeading>
              <ProjectSectionText>{project.problem}</ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                src={CoopMarkGlowImg}
                srcSet={[CoopMarkGlowImg, CoopMarkGlowImg]}
                placeholder={CoopMarkGlowImg}
                alt="Coop glowing mark."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={CoopWordmarkFlatImg}
                srcSet={[CoopWordmarkFlatImg, CoopWordmarkFlatImg]}
                placeholder={CoopWordmarkFlatImg}
                alt="Coop wordmark."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <Image
              raised
              srcSet={[CoopWordmarkFlatImg, CoopWordmarkFlatImg]}
              placeholder={CoopWordmarkFlatImg}
              alt="Coop wordmark used as temporary project artwork."
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Architecture</ProjectSectionHeading>
              <ProjectSectionText>{project.architecture}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText>{project.development}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
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
