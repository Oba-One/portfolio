import { Fragment } from 'react'

import {
  // ConnectBackgroundImg,
  ConnectCallAnnotationsImg,
  ConnectCallGuestsImg,
  ConnectCallLobbyImg,
  ConnectCallHistoryImg,
  ConnectCallReportP1Img,
  ConnectCallReportP2Img,
  ConnectCallMessagesImg,
  // ConnectBackground2Img
} from 'assets/mira-connect'
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

import styles from './MiraConnect.module.scss'
import { projects } from '../../../constants'

const project = projects['mira_connect']

const title = project.title
const description = project.description
const roles = project.skills

export const MiraConnect = () => {
  const { themeId } = useTheme()

  const isDark = themeId === 'dark'

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Meta title={title} prefix="Projects" description={description} />
        <ProjectBackground
          opacity={isDark ? 0.8 : 0.5}
          src={isDark ? ConnectCallMessagesImg : ConnectCallMessagesImg}
          srcSet={`${
            isDark ? ConnectCallMessagesImg.src : ConnectCallMessagesImg.src
          } 1080w, ${
            isDark ? ConnectCallMessagesImg.src : ConnectCallMessagesImg.src
          } 2160w`}
          placeholder={isDark ? ConnectCallMessagesImg : ConnectCallMessagesImg.src}
          // blur="LSHe2o-nPA~p%MM{WCRjEgE2m-V@"
          blur="LPHBPU?FTx~p-:WBRkaz5QE3icRQ"
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
              srcSet={[ConnectCallLobbyImg, ConnectCallLobbyImg]}
              placeholder={ConnectCallLobbyImg}
              blur="LPQJfm~q%g9E9FWAaxof?b4.Mx.8"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[ConnectCallGuestsImg, ConnectCallGuestsImg]}
              placeholder={ConnectCallGuestsImg}
              blur="LPGI4M?G%g~pR-Rks-M{9uIoR6RP"
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
              srcSet={[ConnectCallAnnotationsImg, ConnectCallAnnotationsImg]}
              placeholder={ConnectCallAnnotationsImg}
              blur="LSIg$H%M.m-W-poKj[WB0~M|m,S1"
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
              raised
              key={themeId}
              srcSet={[ConnectCallHistoryImg, ConnectCallHistoryImg]}
              placeholder={ConnectCallHistoryImg}
              blur="L6Ryvo0K%g~q00-;RkIA00xZxuxu"
              alt="The homepage of the aero design system docs website linking to principles and components."
              sizes="100vw"
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection></ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>Learnings</ProjectSectionHeading>
              <ProjectSectionText>{project.learnings}</ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[ConnectCallReportP1Img, ConnectCallReportP1Img]}
                placeholder={ConnectCallReportP1Img}
                blur="LGRfh300%M~q_4?boeD%?c-;aeIU"
                alt="Configuration options for a component."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[ConnectCallReportP2Img, ConnectCallReportP2Img]}
                placeholder={ConnectCallReportP2Img}
                blur="LpQ,8pR*t8oLRifkfkay_NayRjj]"
                alt="Configuration options for a component."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
