import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, createContext, useEffect, useReducer } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

import { msToNum } from 'utils/style';
import { useFoucFix, useLocalStorage } from 'hooks';
import { Navbar } from 'components/Navbar';
import { tokens } from 'components/ThemeProvider/theme';
import { ThemeProvider } from 'components/ThemeProvider';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { ScrollRestore } from 'layouts/App/ScrollRestore';
import { initialState, reducer } from 'layouts/App/reducer';

import styles from 'layouts/App/App.module.scss';
import 'layouts/App/reset.css';
import 'layouts/App/global.scss';

export const AppContext = createContext({});

const App = ({ Component, pageProps }) => {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { route, asPath } = useRouter();
  const canonicalRoute = route === '/' ? '' : `${asPath}`;
  useFoucFix();

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme || 'dark' });
  }, [storedTheme]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <LazyMotion features={domAnimation}>
          <Fragment>
            <Head>
              <link
                rel="canonical"
                href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${canonicalRoute}`}
              />
            </Head>
            <VisuallyHidden
              showOnFocus
              as="a"
              className={styles.skip}
              href="#MainContent"
            >
              Skip to main content
            </VisuallyHidden>
            <Navbar />
            <main className={styles.app} tabIndex={-1} id="MainContent">
              <AnimatePresence exitBeforeEnter>
                <m.div
                  key={route}
                  className={styles.page}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'tween',
                    ease: 'linear',
                    duration: msToNum(tokens.base.durationS) / 1000,
                    delay: 0.1,
                  }}
                >
                  <ScrollRestore />
                  <Component {...pageProps} />
                </m.div>
              </AnimatePresence>
            </main>
          </Fragment>
        </LazyMotion>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
