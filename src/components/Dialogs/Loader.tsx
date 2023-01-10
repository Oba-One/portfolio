import { useSpring, a, config } from "@react-spring/web";
import { FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";

import * as styles from "./styles.module.scss";

interface LoaderDialogProps extends JSXInternal.HTMLAttributes<HTMLElement> {
  status: "loading" | "done" | "error";
  mediaPlaying: boolean;
}

export const LoaderDialog: FunctionalComponent<LoaderDialogProps> = ({
  status,
  mediaPlaying,
  ...props
}) => {
  const ref = useRef(null);

  const contentSpring = useSpring({
    from: { opacity: 0, transform: "scale(0%)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: config.gentle,
  });
  const actionsSpring = useSpring({
    from: { opacity: 0, transform: "translateY(24px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 700,
    config: config.molasses,
  });

  const content = {
    loading: (
      <div id="loader-animation">
        <div className="stickman">
          <div className="head">
            <div className="eye"></div>
            <div className="mouth"></div>
            <div className="beard"></div>
          </div>
          <div className="torso">
            <div className="shirt"></div>
            <div className="left-arm">
              <div className="sleeve"></div>
              <div className="hand"></div>
            </div>
            <div className="right-arm">
              <div className="sleeve"></div>
              <div className="hand"></div>
            </div>
            <div className="left-leg">
              <div className="pants"></div>
              <div className="foot"></div>
              <div className="shoe"></div>
            </div>
            <div className="right-leg">
              <div className="pants"></div>
              <div className="foot"></div>
              <div className="shoe"></div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
      </div>
    ),
    done: mediaPlaying ? <p>Continue Playing Music</p> : <p>Ready!</p>,
    error: <p>Something went wrong</p>,
  };
  const actions = {
    loading: (
      <h2 className="text-2xl">
        If you want to find the secrets of the universe, think in terms of
        energy, frequency and vibration.
      </h2>
    ),
    done: mediaPlaying ? (
      <>
        <button type="button">Yes</button>
        <button type="button">No</button>
      </>
    ) : (
      <button type="button">Enter</button>
    ),
    error: <button type="button">Retry</button>,
  };

  return (
    <dialog
      {...props}
      ref={ref}
      id="loader"
      className="grid place-items-center fixed overflow-hidden transition-opacity h-full bg-indigo-400 w-full"
    >
      <div className="max-w-md text-center">
        <a.div style={contentSpring} className="opacity-0">
          {content[status]}
        </a.div>
        <a.div style={actionsSpring} className="opacity-0">
          {actions[status]}
        </a.div>
      </div>
    </dialog>
  );
};
