import { useContext, useRef } from "react"
import "./login.css"
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"
import CircularProgress from "@mui/material/CircularProgress"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const email = useRef()
  const password = useRef()
  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const handleClick = async (e) => {
    e.preventDefault()
    console.log("cliked")
    await loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    )

    navigate("/")
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialMedia</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social.
          </span>
        </div>
        <form className="loginRight" onSubmit={handleClick}>
          <div className="loginBox">
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              minLength={6}
              required
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="inherit" />
              ) : (
                " Create a New Acoount"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
