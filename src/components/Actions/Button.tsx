import { FunctionalComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";

interface ButtonProps extends JSXInternal.HTMLAttributes<HTMLElement> {
  id: string;
  title: string;
  icon: string;
}

export const Button: FunctionalComponent<ButtonProps> = ({
  id,
  title,
  icon,
  ...props
}) => {
  return (
    <button className="" id={id} {...props}>
      {title}
    </button>
  );
};
