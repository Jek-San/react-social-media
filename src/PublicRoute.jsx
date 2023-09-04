// PublicRoute.jsx

import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"

function PublicRoute({ element }) {
  const { user } = useContext(AuthContext)

  // Check if the user is already authenticated
  if (user) {
    return <Navigate to="/" />
  }

  // If the user is not authenticated, allow access to the route
  return element
}

export default PublicRoute
