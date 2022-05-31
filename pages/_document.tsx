import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <>
        <Html lang='en'>
          <Head>
            <link
              href="/fonts/fontawesome-webfont.ttf"
            />
            <link
              href="/fonts/fontawesome-webfont.eot"
            />
            <link
              href="/fonts/fontawesome-webfont.svg"
            />
            <link
              href="/fonts/fontawesome-webfont.woff"
            />

            <link rel='shortcut icon' href='/favicon.ico' />
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='/favicon.svg'
            />

            <link rel='manifest' href='/manifest.json' />
          </Head>

          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    )
  }
}
