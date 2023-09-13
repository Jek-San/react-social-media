import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  user: null,
  isFetching: true,
  error: false
}



export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const getUserFromLocalStorage = () => {
    try {
      // Retrieve the user data from localStorage
      const userDataString = localStorage.getItem("user");

      // If the user data exists in localStorage, parse and return it
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        return userData;
      }
    } catch (error) {
      console.error("Error retrieving user data from localStorage:", error);
    }

    // Return null if no user data is found in localStorage or an error occurs
    return null;
  };

  useEffect(() => {
    // Check for user data in localStorage when the component mounts
    const user = getUserFromLocalStorage();

    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    }


    // Listen for the beforeunload event to save user data before a page unload (e.g., refresh)
    // const handleBeforeUnload = () => {
    //   const { user } = state;
    //   if (user) {
    //     // Save user data to localStorage
    //     localStorage.setItem("user", JSON.stringify(user));
    //   }
    // };

    // window.addEventListener("beforeunload", handleBeforeUnload);

    // // Cleanup the event listener when the component unmounts
    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, []);

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