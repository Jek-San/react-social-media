import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom"
const user = true;
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
        element: (user ? <Home /> :
          <Login />),
      },

      {
        path: "/profile/:username",
        element: <Profile />,
      },

      {
        path: "/login",
        element: (
          user ? <Home /> :
            <Login />),
      },
      {
        path: "/register",
        element: (
          user ? <Home /> :
            <Register />

        ),
      },
    ],
  },


  {
    path: "/"
  }
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App;