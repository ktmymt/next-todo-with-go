import React from "react"
import { AppProps } from "next/app"
import { CacheProvider } from "@emotion/react"
import { cache } from "@emotion/css"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  )
}

export default MyApp
