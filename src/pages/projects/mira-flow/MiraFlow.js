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
  FlowProblemPlaceholderImg,
  FlowTabletRecentPlaceholderImg,
  FlowTabletHistoryPlaceholderImg,
  FlowTabletLoginPlaceholderImg,
  FlowTabletCollectionsPlaceholderImg,
  FlowTabletLoginTeamPlaceholderImg,
  FlowTabletReferencePhotoPlaceholderImg,
  FlowTabletStepNumberPlaceholderImg,
  FlowTabletStepSelectPlaceholderImg,
  FlowTabletStepYesNoPlaceholderImg,
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
          placeholder={FlowTabletLoginPlaceholderImg}
          alt="The Mira Flow app login screen on a tablet."
          // blur="LCM@.p0000~U00%0s.WB00R?RoxB"
        />
        <ProjectHeader
          title={title}
          description={description}
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
              placeholder={FlowProblemPlaceholderImg}
              // blur="L6Ryvo0K%g~q00-;RkIA00xZxuxu"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="A headset operator doing a workflow handsfree."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletLoginTeamImg, FlowTabletLoginTeamImg]}
                placeholder={FlowTabletLoginTeamPlaceholderImg}
                // blur="L7RpF3R.~T?F00WBNgof00xWt6E5"
                alt="The Mira Flow team login screen with list of teams to choose on a tablet."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletCollectionsImg, FlowTabletCollectionsImg]}
                placeholder={FlowTabletCollectionsPlaceholderImg}
                // blur="L0SPIcT3~W~q00RNx^Iu009a-Twa"
                alt="The Mira Flow collections screen a file and folder directory for workflows."
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
                placeholder={FlowTabletReferencePhotoPlaceholderImg}
                // blur="L]O3|SV@t6oKsmofayjt~pj]WCfk"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
                alt="The Mira Flow reference photo screen with a photo of a utility to be inspected."
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletStepYesNoImg, FlowTabletStepYesNoImg]}
                placeholder={FlowTabletStepYesNoPlaceholderImg}
                // blur="L6Ryvo0K%g~q00-;RkIA00xZxuxu"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
                alt="The Mira Flow step screen with a yes/no input for the user to select."
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
                placeholder={FlowTabletStepNumberPlaceholderImg}
                // blur="L9Q]mBxW4p%K?_bd~poh4TjX9GoJ"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
                alt="The Mira Flow step screen with a number input for the user to enter a number."
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[FlowTabletStepSelectImg, FlowTabletStepSelectImg]}
                placeholder={FlowTabletStepSelectPlaceholderImg}
                // blur="LNQvd#fSxu%MqZRja}of}BRjRiRi"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
                alt="The Mira Flow step screen with a select input for the user to choose from a list of options."
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
              placeholder={FlowTabletRecentPlaceholderImg}
              // blur="L5S63[?EJE%1y@$xNMad_ONL$xV@"
              sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              alt="The Mira Flow recent screen showing a list of workflows that have been recently done."
            />
            <Image
              className={styles.sidebarImage}
              srcSet={[FlowTabletHistoryImg, FlowTabletHistoryImg]}
              placeholder={FlowTabletHistoryPlaceholderImg}
              // blur="L4S63?-?-?4,?_R+WXr?_OwHs*XT"
              sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              alt="The Mira Flow history screen showing a list of flows that have been completed."
            />
          </div>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
