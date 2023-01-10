import { FunctionalComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";

interface LinkProps extends JSXInternal.HTMLAttributes<HTMLElement> {
  title: string;
  to: string;
  Icon?: any;
}

export const Link: FunctionalComponent<LinkProps> = ({
  id,
  title,
  icon,
  ...props
}) => {
  return (
    <a className="" id={id} {...props}>
      {title}
    </a>
  );
};

interface ArrowLinkProps extends LinkProps {
  direction: "up" | "down" | "left" | "right";
  animate?: boolean;
}

const arrows = {
  up: null,
  down: null,
  left: null,
  right: null,
};

export const ArrowLink: FunctionalComponent<ArrowLinkProps> = ({
  id,
  title,
  icon,
  direction,
  ...props
}) => {
  const Arrow = arrows[direction];
  return (
    <a className="" id={id} {...props}>
      {Arrow}
      {title}
    </a>
  );
};
