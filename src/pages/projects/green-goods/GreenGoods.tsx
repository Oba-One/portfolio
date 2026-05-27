// @ts-nocheck -- legacy JS migration; remove after adding explicit types.
import { Fragment } from 'react'

import { GreenGoodsLogoImg, GreenGoodsSocialCardImg } from 'assets/green-goods'
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

const project = projects['green_goods']

const title = project.title
const description = project.description
const roles = project.skills

export const GreenGoods = () => {
  const { themeId } = useTheme()
  const isDark = themeId === 'dark'

  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer>
        <ProjectBackground
          src={GreenGoodsSocialCardImg}
          srcSet={`${GreenGoodsSocialCardImg.src} 1440w, ${GreenGoodsSocialCardImg.src} 2880w`}
          placeholder={GreenGoodsSocialCardImg}
          alt=""
          opacity={isDark ? 0.52 : 0.75}
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
                src={GreenGoodsLogoImg}
                srcSet={[GreenGoodsLogoImg, GreenGoodsLogoImg]}
                placeholder={GreenGoodsLogoImg}
                alt="Green Goods logo."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                src={GreenGoodsSocialCardImg}
                srcSet={[GreenGoodsSocialCardImg, GreenGoodsSocialCardImg]}
                placeholder={GreenGoodsSocialCardImg}
                alt="Green Goods social card placeholder artwork."
                sizes={`(max-width: ${media.mobile}px) 260px, 420px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <Image
              raised
              srcSet={[GreenGoodsSocialCardImg, GreenGoodsSocialCardImg]}
              placeholder={GreenGoodsSocialCardImg}
              alt="Green Goods temporary project artwork."
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
