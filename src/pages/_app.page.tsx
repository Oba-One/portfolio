import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Fragment, createContext, useEffect, useReducer, type Dispatch } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'

import { msToNum } from 'utils/style'
import { Navbar } from 'components/Navbar'
import { tokens } from 'components/ThemeProvider/theme'
import { ThemeProvider } from 'components/ThemeProvider'
import { VisuallyHidden } from 'components/VisuallyHidden'
import { useFoucFix, useLocalStorage } from 'hooks'
import { ScrollRestore } from 'layouts/App/ScrollRestore'
import { initialState, reducer, type AppAction, type AppState } from 'layouts/App/reducer'
import { registerPortfolioWebMcpTools } from 'utils/webmcp'

import styles from 'layouts/App/App.module.scss'
import 'layouts/App/global.scss'
import 'layouts/App/reset.css'

export type AppContextValue = AppState & {
  dispatch: Dispatch<AppAction>
}

export const AppContext = createContext<AppContextValue>({
  ...initialState,
  dispatch: () => undefined,
})

const App = ({ Component, pageProps }: AppProps) => {
  const [storedTheme] = useLocalStorage('theme', 'dark')
  const [state, dispatch] = useReducer(reducer, initialState)
  const { route, asPath } = useRouter()
  useFoucFix()

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme === 'light' ? 'light' : 'dark' })
  }, [storedTheme])

  useEffect(() => registerPortfolioWebMcpTools(), [asPath])

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <LazyMotion features={domAnimation}>
          <Fragment>
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
              <AnimatePresence mode="wait">
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
                  <Analytics />
                </m.div>
              </AnimatePresence>
            </main>
          </Fragment>
        </LazyMotion>
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export default App
