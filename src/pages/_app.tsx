import React from "react"
import { AppProps } from "next/app"
import { Provider } from "next-auth/client"
import { CacheProvider } from "@emotion/react"
import { cache } from "@emotion/css"
import "../styles/global.css"
import { ProjectProvider } from "../contexts/ProjectContext"
import { TodoProvider } from "../contexts/TodoContext"
import { UserProvider } from "../contexts/UserContext"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <UserProvider>
        <ProjectProvider>
          <TodoProvider>
            <CacheProvider value={cache}>
              <Component {...pageProps} />
            </CacheProvider>
          </TodoProvider>
        </ProjectProvider>
      </UserProvider>
    </Provider>
  )
}

export default MyApp
