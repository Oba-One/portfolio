import { useState } from "preact/hooks";
import { useSyncExternalStore } from "preact/compat";
import { FunctionalComponent } from "preact";
import { useSpring, a } from "@react-spring/web";

import { ContactToggle } from "./Actions/Contact";
import { MediaActions } from "./Media/Actions";

interface ThemeToggleProps {
  theme?: "light" | "dark";
}

interface NavigationProps {
  status: "loading" | "error" | "done";
}

const themes = {
  light: {
    r: 9,
    transform: "rotate(40deg)",
    cx: 12,
    cy: 4,
    opacity: 0,
  },
  dark: {
    r: 5,
    transform: "rotate(90deg)",
    cx: 30,
    cy: 0,
    opacity: 1,
  },
};

const springConfig = { mass: 4, tension: 250, friction: 35 };

const themeEvent = new Event("theme");

const ThemeToggle: FunctionalComponent<ThemeToggleProps> = (props) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot);

  const { r, transform, cx, cy, opacity } = themes[theme];

  const svgContainerProps = useSpring({ transform, config: springConfig });
  const centerCircleProps = useSpring({ r, config: springConfig });
  const maskedCircleProps = useSpring({ cx, cy, config: springConfig });
  const linesProps = useSpring({ opacity, config: springConfig });

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    window.dispatchEvent(themeEvent);
  };

  return (
    <a.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style={{
        cursor: "pointer",
        ...svgContainerProps,
      }}
      onClick={toggleTheme}
    >
      <mask id="myMask2">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <a.circle style={maskedCircleProps} r="9" fill="black" />
      </mask>
      <a.circle
        cx="12"
        cy="12"
        style={centerCircleProps}
        fill="black"
        mask="url(#myMask2)"
      />
      <a.g stroke="currentColor" style={linesProps}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </a.g>
    </a.svg>
  );
};

export const Navigation: FunctionalComponent<NavigationProps> = () => {
  return (
    <nav class="fixed top-0 left-0 w-full px-4 flex items-center justify-between bg-slate-300 z-50">
      <ul id="nav-links" class="flex items-center gap-2">
        <li>
          <a className="h-8 w-8" href="#seed">
            <img src="/vite.svg" alt="logo" className="h-8 w-8" />
          </a>
        </li>
        <li>
          <a class="text-xl tracking-wide" href="#roots">
            Roots
          </a>
        </li>
        <li>
          <a class="text-xl tracking-wide" href="#leafs">
            Leafs
          </a>
        </li>
      </ul>
      <ul id="nav-actions" class="flex items-center justify-end">
        <li>
          <ThemeToggle />
        </li>
        {/* <ContactToggle />
      <MediaActions /> */}
      </ul>
    </nav>
  );
};

function getSnapshot(): "light" | "dark" {
  const theme = localStorage.getItem("theme");
  return theme === "dark" ? "dark" : "light";
}

function subscribe(callback: any) {
  window.addEventListener("storage", callback);
  window.addEventListener("theme", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("theme", callback);
  };
}
