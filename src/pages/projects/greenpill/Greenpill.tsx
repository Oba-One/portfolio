// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { Fragment } from 'react'

import { GreenpillMapImg, GreenpillTwitterCardImg } from 'assets/greenpill'
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

const project = projects['greenpill']

const title = project.title
const description = project.description
const roles = project.skills

export const Greenpill = () => {
  const { themeId } = useTheme()
  const isDark = themeId === 'dark'

  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer>
        <ProjectBackground
          src={GreenpillTwitterCardImg}
          srcSet={`${GreenpillTwitterCardImg.src} 1920w, ${GreenpillTwitterCardImg.src} 3840w`}
          placeholder={GreenpillTwitterCardImg}
          alt=""
          opacity={isDark ? 0.48 : 0.74}
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
                src={GreenpillTwitterCardImg}
                srcSet={[GreenpillTwitterCardImg, GreenpillTwitterCardImg]}
                placeholder={GreenpillTwitterCardImg}
                alt="Greenpill social card artwork."
                sizes={`(max-width: ${media.mobile}px) 260px, 420px`}
              />
              <Image
                className={styles.sidebarImage}
                src={GreenpillMapImg}
                srcSet={[GreenpillMapImg, GreenpillMapImg]}
                placeholder={GreenpillMapImg}
                alt="Greenpill map artwork."
                sizes={`(max-width: ${media.mobile}px) 260px, 420px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <Image
              raised
              srcSet={[GreenpillMapImg, GreenpillMapImg]}
              placeholder={GreenpillMapImg}
              alt="Greenpill map used as temporary project artwork."
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
