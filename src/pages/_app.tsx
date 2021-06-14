import React from "react"
import { AppProps } from "next/app"
import { CacheProvider } from "@emotion/react"
import { cache } from "@emotion/css"
import "../styles/global.css"
import { ProjectProvider } from "../contexts/ProjectContext"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ProjectProvider>
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </ProjectProvider>
  )
}

export default MyApp
