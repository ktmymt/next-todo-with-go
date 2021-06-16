import React from "react"
import { AppProps } from "next/app"
import { CacheProvider } from "@emotion/react"
import { cache } from "@emotion/css"
import "../styles/global.css"
import { ProjectProvider } from "../contexts/ProjectContext"
import { TodoProvider } from "../contexts/TodoContext"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ProjectProvider>
      <TodoProvider>
        <CacheProvider value={cache}>
          <Component {...pageProps} />
        </CacheProvider>
      </TodoProvider>
    </ProjectProvider>
  )
}

export default MyApp
