import { FunctionalComponent } from "preact";
import { JSXInternal } from 'preact/src/jsx';

interface FocusProps extends JSXInternal.HTMLAttributes<HTMLElement> {}

export const Focus: FunctionalComponent<FocusProps> = ({ ...props }) => {
  return <main {...props}></main>;
};
