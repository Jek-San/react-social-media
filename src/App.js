import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom"
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute"; // Import your custom PrivateRoute component
import NotFound from "./pages/NotFound";
import { useContext } from "react";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <PrivateRoute element={<Home />} />,
      },
      {
        path: "/profile/:username",
        element: <PrivateRoute element={<Profile />} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <PrivateRoute element={<NotFound />} />,
      },
    ],
  },
  {
    path: "/"
  }
])

function App() {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div className="app">
      <div className="container">
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </div>
    </div>
  )
}

export default App;
