import React from "react"
import { AppProps } from "next/app"
import { Provider } from "next-auth/client"
import { CacheProvider } from "@emotion/react"
import { cache } from "@emotion/css"
import "../styles/global.css"
import { ProjectProvider } from "../contexts/ProjectContext"
import { TodoProvider } from "../contexts/TodoContext"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ProjectProvider>
        <TodoProvider>
          <CacheProvider value={cache}>
            <Component {...pageProps} />
          </CacheProvider>
        </TodoProvider>
      </ProjectProvider>
    </Provider>
  )
}

export default MyApp
