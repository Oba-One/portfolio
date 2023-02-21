import { Fragment } from 'react';

import {
  gmBackgroundImg,
  gmBackgroundImgLarge,
  gmBackgroundImgPlaceholder,
  gmProblemImg,
  gmProblemImgLarge,
  gmProblemImgPlaceholder,
  gmArchitectureImg,
  gmArchitectureImgLarge,
  gmArchitectureImgPlaceholder,
  gmDevelopmentImgLight,
  gmDevelopmentImgLightLarge,
  gmDevelopmentImgLightPlaceholder,
  gmLearningsImg,
  gmLearningsImgLarge,
  gmLearningsImgPlaceholder,
  gmLearnings2Img,
  gmLearnings2ImgLarge,
  gmLearnings2ImgPlaceholder,
} from 'assets/gm';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { media } from 'utils/style';
import { Meta } from 'components/Meta';
import { Image } from 'components/Image';
import { Footer } from 'components/Footer';
import { useTheme } from 'components/ThemeProvider';

import { projects } from '../../../constants';
import styles from './MiraConnect.module.scss';

const project = projects['mira_connect'];

const title = project.title;
const description = project.description;
const roles = project.skills;

export const MiraConnect = () => {
  const { themeId } = useTheme();

  const isDark = themeId === 'dark';

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Meta title={title} prefix="Projects" description={description} />
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={gmBackgroundImg}
          srcSet={`${gmBackgroundImg.src} 1080w, ${gmBackgroundImgLarge.src} 2160w`}
          placeholder={gmBackgroundImgPlaceholder}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.smartsparrow.com/"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={themeId}
              srcSet={[gmProblemImg, gmProblemImgLarge]}
              placeholder={gmProblemImgPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>{project.problem}</ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={[gmArchitectureImg, gmArchitectureImgLarge]}
              placeholder={gmArchitectureImgPlaceholder}
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
              srcSet={[gmDevelopmentImgLight, gmDevelopmentImgLightLarge]}
              placeholder={gmDevelopmentImgLightPlaceholder}
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
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Learnings</ProjectSectionHeading>
                <ProjectSectionText>{project.learnings}</ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[gmLearnings2Img, gmLearnings2ImgLarge]}
                placeholder={gmLearnings2ImgPlaceholder}
                alt="Configuration options for a component."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[gmLearningsImg, gmLearningsImgLarge]}
                placeholder={gmLearningsImgPlaceholder}
                alt="Configuration options for text."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
