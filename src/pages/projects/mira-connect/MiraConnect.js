import { Fragment } from 'react';

import {
  ConnectBackgroundImg,
  ConnectProblemImg,
  ConnectArchitectureImg,
  ConnectDevelopmentImg,
  ConnectLearningsImg,
  // ConnectBackground2Img
} from 'assets/mira-connect';
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
          src={ConnectBackgroundImg}
          srcSet={`${ConnectBackgroundImg.src} 1080w, ${ConnectBackgroundImg.src} 2160w`}
          placeholder={ConnectBackgroundImg}
        />
        <ProjectHeader
          title={title}
          description={description}
          links={project.links}
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={themeId}
              srcSet={[ConnectProblemImg, ConnectProblemImg]}
              placeholder={ConnectProblemImg}
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
              srcSet={[ConnectArchitectureImg, ConnectArchitectureImg]}
              placeholder={ConnectArchitectureImg}
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
              srcSet={[ConnectDevelopmentImg, ConnectDevelopmentImg]}
              placeholder={ConnectDevelopmentImg}
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
            <Image
              srcSet={[ConnectLearningsImg, ConnectLearningsImg]}
              placeholder={ConnectLearningsImg}
              alt="Configuration options for a component."
              sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
            />
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
