import NextDocument, { Html, Head, Main, NextScript } from "next/document"

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@500&family=Viga&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
