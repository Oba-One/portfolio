import GothamBook from 'assets/fonts/gotham-book.woff2'
import GothamMedium from 'assets/fonts/gotham-medium.woff2'
import { fontStyles, tokenStyles } from 'components/ThemeProvider'
import { Head, Html, Main, NextScript } from 'next/document'

const iconAssetVersion = 'monogram-a-2'
const manifestVersion = 'theme-chrome-1'
const initialThemeColor = '#1b1e1b'
const lightThemeColor = '#fafcf7'

const initialThemeScript = `
  (() => {
    const themeColors = { dark: '${initialThemeColor}', light: '${lightThemeColor}' };
    let initialTheme = 'dark';

    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && JSON.parse(savedTheme) === 'light') {
        initialTheme = 'light';
      }
    } catch {}

    document.documentElement.dataset.theme = initialTheme;
    const themeColor = themeColors[initialTheme];
    document
      .querySelectorAll('meta[name="theme-color"], meta[name="msapplication-TileColor"]')
      .forEach(meta => meta.setAttribute('content', themeColor));
  })();
`

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={initialThemeColor} />
        <meta name="msapplication-TileColor" content={initialThemeColor} />
        <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} />

        <link rel="manifest" href={`/manifest.json?v=${manifestVersion}`} />
        <link
          rel="icon"
          href={`/favicon.png?v=${iconAssetVersion}`}
          type="image/png"
          sizes="64x64"
        />
        <link
          rel="icon"
          href={`/favicon.svg?v=${iconAssetVersion}`}
          type="image/svg+xml"
        />
        <link
          rel="shortcut icon"
          href={`/favicon.ico?v=${iconAssetVersion}`}
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          href={`/icon-256.png?v=${iconAssetVersion}`}
          sizes="256x256"
        />
        <link type="text/plain" rel="author" href="/humans.txt" />
        <link
          rel="mask-icon"
          href={`/safari-pinned-tab.svg?v=${iconAssetVersion}`}
          color="#b8c7a3"
        />

        <link rel="preload" href={GothamMedium} as="font" crossOrigin="true" />
        <link rel="preload" href={GothamBook} as="font" crossOrigin="true" />
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
        <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
      </Head>
      <body tabIndex={-1}>
        <Main />
        <NextScript />
        <div id="portal-root" />
      </body>
    </Html>
  )
}
