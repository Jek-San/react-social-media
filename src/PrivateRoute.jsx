// PrivateRoute.jsx

import React, { useContext } from "react"
import { Route, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"

function PrivateRoute({ element }) {
  const { user } = useContext(AuthContext)

  // Check if the user is authenticated; if not, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />
  }

  // If the user is authenticated, allow access to the route
  return element
}

export default PrivateRoute
