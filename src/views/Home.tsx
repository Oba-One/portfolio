import { FunctionalComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
// import { useParallax } from "react-scroll-parallax";
import { Parallax, ParallaxLayer,  } from "@react-spring/parallax";

import { Focus } from "../components/Focus";
import { LeafArticle, LeafArticleProps } from "../components/Articles/Leaf";
import { RootArticle, RootArticleProps } from "../components/Articles/Root";

export interface HomeProps extends JSXInternal.HTMLAttributes<HTMLElement> {
  leafs: LeafArticleProps[];
  roots: RootArticleProps[];
}

export const Home: FunctionalComponent<HomeProps> = ({ leafs, roots }) => {
  return (
    <Parallax page={5}>
      <ParallaxLayer>
        <Focus />
      </ParallaxLayer>
      <ParallaxLayer>
        <section id="leafs" role="list">
          {leafs.map((leaf) => (
            <LeafArticle {...leaf} key={leaf.id} />
          ))}
        </section>
      </ParallaxLayer>
      <ParallaxLayer>
        <section id="seed">
          <a id="nav-leafs" href="#leafs">
            <svg class="arrow-up" viewBox="0 0 24 24">
              <path
                d="M12 4.5L5.5 11H9V17H15V11H18.5L12 4.5Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a id="nav-roots" href="#roots">
            <svg class="arrow-up" viewBox="0 0 24 24">
              <path
                d="M12 4.5L5.5 11H9V17H15V11H18.5L12 4.5Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </section>
      </ParallaxLayer>
      <section id="roots" role="list">
        {roots.map((root) => (
          <RootArticle {...root} key={root.id} />
        ))}
      </section>
    </Parallax>
  );
};
