import { Fragment } from 'react'

import {
  FlowProblemImg,
  FlowTabletRecentImg,
  FlowTabletHistoryImg,
  FlowTabletLoginImg,
  FlowTabletCollectionsImg,
  FlowTabletLoginTeamImg,
  FlowTabletReferencePhotoImg,
  FlowTabletStepNumberImg,
  FlowTabletStepSelectImg,
  FlowTabletStepYesNoImg,
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
          blur="LCM@.p0000~U00%0s.WB00R?RoxB"
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
              blur="L6Ryvo0K%g~q00-;RkIA00xZxuxu"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletLoginTeamImg, FlowTabletLoginTeamImg]}
                placeholder={FlowTabletLoginTeamImg}
                blur="L7RpF3R.~T?F00WBNgof00xWt6E5"
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletCollectionsImg, FlowTabletCollectionsImg]}
                placeholder={FlowTabletCollectionsImg}
                blur="L0SPIcT3~W~q00RNx^Iu009a-Twa"
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Architecture</ProjectSectionHeading>
              <ProjectSectionText>{project.architecture}</ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText>{project.development}</ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletReferencePhotoImg, FlowTabletReferencePhotoImg]}
                placeholder={FlowTabletReferencePhotoImg}
                blur="L]O3|SV@t6oKsmofayjt~pj]WCfk"
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletStepYesNoImg, FlowTabletStepYesNoImg]}
                placeholder={FlowTabletStepYesNoImg}
                blur="L6Ryvo0K%g~q00-;RkIA00xZxuxu"
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletStepNumberImg, FlowTabletStepNumberImg]}
                placeholder={FlowTabletStepNumberImg}
                blur="L9Q]mBxW4p%K?_bd~poh4TjX9GoJ"
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletStepSelectImg, FlowTabletStepSelectImg]}
                placeholder={FlowTabletStepSelectImg}
                blur="LNQvd#fSxu%MqZRja}of}BRjRiRi"
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Learnings</ProjectSectionHeading>
              <ProjectSectionText>{project.learnings}</ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <div className={styles.sidebarImages}>
            <Image
              className={styles.sidebarImage}
              srcSet={[FlowTabletRecentImg, FlowTabletRecentImg]}
              placeholder={FlowTabletRecentImg}
              blur="L5S63[?EJE%1y@$xNMad_ONL$xV@"
              alt="Multiple user annotations on a shared layer."
              sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
            />
            <Image
              className={styles.sidebarImage}
              srcSet={[FlowTabletHistoryImg, FlowTabletHistoryImg]}
              placeholder={FlowTabletHistoryImg}
              blur="L4S63?-?-?4,?_R+WXr?_OwHs*XT"
              alt="The layers sidebar design, now with user profiles."
              sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
            />
          </div>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
