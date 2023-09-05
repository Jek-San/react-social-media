import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  user: {
    _id: "64ee6e0f9a027f2a264a6616",
    username: "jack",
    email: "jack@gmail.com",
    password: "$2b$10$FVmxqRJip6WQPPEhQHaphuPKU7/qKbFg92/DAqsXpi8Q/ffbxgucG",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
    createdAt: "2023-08-29T22:15:43.888+00:00",
    updatedAt: "2023-08-30T01:55:32.045+00:00",
    __v: 0,
    city: "New York",
    desc: "Welcome my friend",
    from: "Berlin",
    relationships: 2,
  },
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)


  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}