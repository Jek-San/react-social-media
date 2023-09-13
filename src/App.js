import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute"; // Import your custom PrivateRoute component
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import PublicRoute from "./PublicRoute";
import Messenger from "./pages/messenger/Messenger";
import { Topbar } from "./components/topbar/Topbar";

// const Layout = () => {
//   return (
//     <>
//       <Outlet />
//     </>
//   )
// }

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <PrivateRoute element={<Home />} />,
//       },
//       {
//         path: "/messenger",
//         element: <PrivateRoute element={<Messenger />} />,
//       },
//       {
//         path: "/profile/:username",
//         element: <PrivateRoute element={<Profile />} />,
//       },
//       {
//         path: "/login",
//         element: <PublicRoute element={<Login />} />,
//       },
//       {
//         path: "/register",
//         element: <Register />,
//       },

//       {
//         path: "*",
//         element: <PrivateRoute element={<NotFound />} />,
//       },
//     ],
//   },
//   {
//     path: "/"
//   }
// ])

// function App() {
//   const { user } = useContext(AuthContext)
//   console.log(user)
//   return (
//     <div className="app">
//       <div className="container">
//         <AuthContextProvider>
//           <RouterProvider router={router} />
//         </AuthContextProvider>
//       </div>
//     </div>
//   )
// }
function App() {
  const { user, isFetching } = useContext(AuthContext)
  if (isFetching) {
    // You can render a loading indicator here, or just return null.
    return null;
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/messenger" element={<Messenger />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


