import axios from "axios"


export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" })
  try {
    console.log("Attempting login with credentials:", userCredentials);
    const res = await axios.post("auth/login", userCredentials);
    const userData = res.data;
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    console.log("Login failed. Error:", error);
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
} 