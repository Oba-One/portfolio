import { useEffect, useRef, useState } from 'react';

import { Meta } from 'components/Meta';
import { Footer } from 'components/Footer';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';

import gamestackTexture from 'assets/gamestack-login.jpg';
import gamestackTexture2 from 'assets/gamestack-list.jpg';
import gamestackTexture2Large from 'assets/gamestack-list-large.jpg';
import gamestackTextureLarge from 'assets/gamestack-login-large.jpg';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';

import { GMBackgroundImg } from 'assets/gm';
// import { WefaBackgroundImg } from 'assets/wefa';
// import { FlowBackgroundImg } from 'assets/mira-flow';
import { FreeportBackgroundImg } from 'assets/freeport';
import { ConnectBackgroundImg } from 'assets/mira-connect';

import styles from './Home.module.css';
import { projects } from '../../constants';

const disciplines = ['Engineer', 'Producer', 'Architect'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  // const projectSix = useRef();

  const details = useRef();

  useEffect(() => {
    const sections = [
      intro,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive,
      details,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Developer & Architect"
        description="Developer portfolio of Afolabi Aiyeloja — a developer working on web & mobile
          apps with a focus on Augmented Reality, Blockchains, & Artificial Intelligence."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      {/* <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title={projects['dao_squad'].title}
        description={projects['dao_squad'].description}
        buttonText={projects['dao_squad'].cta.label}
        buttonLink={projects['dao_squad'].cta.link}
        model={{
          type: projects['dao_squad'].platform,
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: [sprTexture, sprTextureLarge],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      /> */}
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title={projects['wefa'].title}
        description={projects['wefa'].description}
        buttonText={projects['wefa'].cta.label}
        buttonLink={projects['wefa'].cta.link}
        model={{
          type: projects['wefa'].platform,
          alt: 'App login screen',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title={projects['freeport'].title}
        description={projects['freeport'].description}
        buttonText={projects['freeport'].cta.label}
        buttonLink={projects['freeport'].cta.link}
        model={{
          type: projects['freeport'].platform,
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [FreeportBackgroundImg, FreeportBackgroundImg],
              placeholder: FreeportBackgroundImg,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title={projects['mira_connect'].title}
        description={projects['mira_connect'].description}
        buttonText={projects['mira_connect'].cta.label}
        buttonLink={projects['mira_connect'].cta.link}
        model={{
          type: projects['mira_connect'].platform,
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [ConnectBackgroundImg, ConnectBackgroundImg],
              placeholder: ConnectBackgroundImg,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title={projects['mira_flow'].title}
        description={projects['mira_flow'].description}
        buttonText={projects['mira_flow'].cta.label}
        buttonLink={projects['mira_flow'].cta.link}
        model={{
          type: projects['mira_flow'].platform,
          alt: 'App login screen',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
        title={projects['gentle_monster'].title}
        description={projects['gentle_monster'].description}
        buttonText={projects['gentle_monster'].cta.label}
        buttonLink={projects['gentle_monster'].cta.link}
        model={{
          type: projects['gentle_monster'].platform,
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [GMBackgroundImg, GMBackgroundImg],
              placeholder: GMBackgroundImg,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
