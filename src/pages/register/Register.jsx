import { useRef } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password don't match")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post("auth/register", user)
        navigate("/login")
      } catch (err) {
        console.log(err)
      }
    }
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
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              type="text"
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              type="email"
              ref={email}
              className="loginInput"
            />
            <input
              type="password"
              required
              ref={password}
              placeholder="Password"
              className="loginInput"
              minLength={6}
            />
            <input
              type="password"
              required
              ref={passwordAgain}
              placeholder="Password Again"
              className="loginInput"
              minLength={6}
            />
            <button className="loginButton" type="sumbit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
