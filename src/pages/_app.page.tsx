import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import {
  Fragment,
  createContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
} from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'

import { msToNum } from 'utils/style'
import { Navbar } from 'components/Navbar'
import { theme, tokens } from 'components/ThemeProvider/theme'
import { ThemeProvider } from 'components/ThemeProvider'
import { VisuallyHidden } from 'components/VisuallyHidden'
import { useFoucFix } from 'hooks'
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
  const [state, dispatch] = useReducer(reducer, initialState)
  const [themeReady, setThemeReady] = useState(false)
  const [analyticsAvailable, setAnalyticsAvailable] = useState(false)
  const { route, asPath } = useRouter()
  useFoucFix()

  useEffect(() => {
    const initialTheme = document.documentElement.dataset.theme
    dispatch({ type: 'setTheme', value: initialTheme === 'light' ? 'light' : 'dark' })
    setThemeReady(true)
    const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(
      window.location.hostname
    )
    setAnalyticsAvailable(!loopback)
  }, [])

  useEffect(() => {
    if (!themeReady) return

    const themeId = state.theme
    const root = document.documentElement
    if (root.dataset.theme === themeId) return

    root.dataset.theme = themeId
    const color = `rgb(${theme[themeId].rgbBackground})`
    document
      .querySelectorAll('meta[name="theme-color"], meta[name="msapplication-TileColor"]')
      .forEach(meta => meta.setAttribute('content', color))

    try {
      localStorage.setItem('theme', JSON.stringify(themeId))
    } catch {
      // The toggle still applies when browser storage is unavailable.
    }
  }, [state.theme, themeReady])

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
              <AnimatePresence initial={false} mode="wait">
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
                  {analyticsAvailable && <Analytics />}
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
