// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
const isProduction = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: Boolean(SENTRY_DSN),
  tracesSampleRate: isProduction ? 0.1 : 1.0,
  replaysSessionSampleRate: isProduction ? 0.05 : 0,
  replaysOnErrorSampleRate: isProduction ? 1.0 : 0,
})

if (isProduction && SENTRY_DSN) {
  const loadReplay = () => {
    void import('@sentry/browser')
      .then(({ replayIntegration }) => {
        Sentry.addIntegration(
          replayIntegration({
            maskAllText: true,
            maskAllInputs: true,
            blockAllMedia: true,
          })
        )
      })
      .catch(error => Sentry.captureException(error))
  }

  if (document.readyState === 'complete') loadReplay()
  else window.addEventListener('load', loadReplay, { once: true })
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
