import {
  a,
  useTrail,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "@react-spring/web";
import { useState } from "preact/hooks";
import { FunctionalComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";

interface PetalProps {
  id: string;
  title: string;
  description: string;
  image: Image;
  links: Link[];
}

export interface LeafArticleProps
  extends JSXInternal.HTMLAttributes<HTMLElement> {
  id: string;
  title: string;
  description: string;
  image: Image;
  startedAt: Date;
  endedAt?: Date;
  petals: PetalProps[];
  tags: string[];
  direction: "left" | "right";
  platform: "web" | "mobile";
}

export const Petal: FunctionalComponent<PetalProps> = ({
  id,
  image,
  title,
  description,
  links,
  ...props
}) => {
  const transRef = useSpringRef();
  const trailRef = useSpringRef();

  const transitions = useTransition(null, {
    ref: transRef,
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });
  const linksTrail = useTrail(links.length, {
    ref: trailRef,
    opacity: 1,
    transform: "scale(1)",
  });

  useChain([transRef, trailRef]);

  return transitions((spring) => (
    <a.article
      id={id}
      role="listitem"
      className="flex flex-col gap-3 max-w-md"
      style={spring}
      {...props}
    >
      <picture className="">
        <source srcset={image.sizes[1]} media="(min-width: 40em)" />
        <img
          src={image.sizes[0]}
          alt={image.alt}
          width={300}
          height={300}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <h4 className="">{title}</h4>
      <p className="">{description}</p>
      <ul className="">
        {linksTrail.map((linkStyle, index) => (
          <a.li></a.li>
        ))}
      </ul>
    </a.article>
  ));
};

export const LeafArticle: FunctionalComponent<LeafArticleProps> = ({
  id,
  image,
  title,
  description,
  petals,
  direction,
  platform,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);

  const spring = useSpring({
    from: {
      transform: `translateX(${direction === "left" ? "-100%" : "100%"})`,
    },
    to: {
      transform: "translateX(0)",
    },
  });
  const petalsSpring = useSpring({
    opacity: expanded ? 1 : 0,
    transform: expanded ? "scale(0)" : "scale(100%)",
  });

  function togglePetals() {
    setExpanded(!expanded);
  }

  return (
    <a.article
      id={id}
      role="listitem"
      className="flex flex-col gap-3 max-w-md"
      style={spring}
      {...props}
    >
      <picture className="">
        <source srcset={image.sizes[1]} media="(min-width: 40em)" />
        <img
          src={image.sizes[0]}
          alt={image.alt}
          width={platform === "web" ? 330 : 220}
          height={platform === "web" ? 220 : 330}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <h4 className="">{title}</h4>
      <p className="">{description}</p>
      <button
        type="button"
        onClick={togglePetals}
        className="bg-blue-500 text-white"
      >
        Petals
      </button>
      <a.ul className="" style={petalsSpring}>
        {petals.map((root) => null)}
      </a.ul>
    </a.article>
  );
};
