import axios from "axios"


export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" })
  try {
    console.log("Attempting login with credentials:", userCredentials);
    const res = await axios.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    console.error("Login failed. Error:", error);
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
} 