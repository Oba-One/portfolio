import { Fragment } from 'react'

import {
  // ConnectBackgroundImg,
  // ConnectBackgroundPlaceholderImg,
  ConnectCallAnnotationsImg,
  ConnectCallGuestsImg,
  ConnectCallLobbyImg,
  ConnectCallHistoryImg,
  ConnectCallReportP1Img,
  ConnectCallReportP2Img,
  ConnectCallMessagesImg,
  ConnectCallAnnotationsPlaceholderImg,
  ConnectCallGuestsPlaceholderImg,
  ConnectCallLobbyPlaceholderImg,
  ConnectCallHistoryPlaceholderImg,
  ConnectCallReportP1PlaceholderImg,
  ConnectCallReportP2PlaceholderImg,
  ConnectCallMessagesPlaceholderImg,
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
          placeholder={ConnectCallMessagesPlaceholderImg}
          // blur="LSHe2o-nPA~p%MM{WCRjEgE2m-V@"
          // blur="LPHBPU?FTx~p-:WBRkaz5QE3icRQ"
          alt="Mira Connect call messages on desktop."
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
              placeholder={ConnectCallLobbyPlaceholderImg}
              // blur="LPQJfm~q%g9E9FWAaxof?b4.Mx.8"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Mira Connect pre call lobby on desktop."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[ConnectCallGuestsImg, ConnectCallGuestsImg]}
              placeholder={ConnectCallGuestsPlaceholderImg}
              // blur="LPGI4M?G%g~pR-Rks-M{9uIoR6RP"
              sizes="100vw"
              alt="Mira Connect call guest requests list on desktop."
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
              placeholder={ConnectCallAnnotationsPlaceholderImg}
              // blur="LSIg$H%M.m-W-poKj[WB0~M|m,S1"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
              alt="Mira Connect call annotations viewer on desktop."
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
              placeholder={ConnectCallHistoryPlaceholderImg}
              // blur="L6Ryvo0K%g~q00-;RkIA00xZxuxu"
              sizes="100vw"
              alt="Mira Connect call History viewer on desktop."
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
                placeholder={ConnectCallReportP1PlaceholderImg}
                // blur="LGRfh300%M~q_4?boeD%?c-;aeIU"
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
                alt="Page 1 of Mira Connect call report"
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[ConnectCallReportP2Img, ConnectCallReportP2Img]}
                placeholder={ConnectCallReportP2PlaceholderImg}
                // blur="LpQ,8pR*t8oLRifkfkay_NayRjj]"
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
                alt="Page 2 of Mira Connect call report"
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
