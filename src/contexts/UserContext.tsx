import { ReactNode, createContext, useContext, useState } from "react"
import { IUser } from "../types/User"

type UserContextType = {
  user: IUser
  setUserState: (user: IUser) => void
}

const userContextDefaultValues: UserContextType = {
  user: null,
  setUserState: () => [],
}

const UserContext = createContext<UserContextType>(userContextDefaultValues)

export const useUserContext = () => {
  return useContext(UserContext)
}

type Props = {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>()

  const setUserState = (user: IUser): void => {
    setUser(user)
  }

  const value = {
    user,
    setUserState,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
