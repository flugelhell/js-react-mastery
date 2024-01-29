import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Auth from "../pages/auth";
import Landing from "../pages/landing";
import Home from "../pages/home";
import axios from "axios";

const ProtectedRoutes = () => {
  const sessionStorageIsAuth = sessionStorage.getItem("isAuth");
  const sessionStorageToken = sessionStorage.getItem("token");

  // console.log("protected router sessionStorageIsAuth: ", sessionStorageIsAuth);
  // console.log("protected router sessionStorageToken: ", sessionStorageToken);

  if (!sessionStorageIsAuth) {
    return <Navigate to="/auth" replace />;
  } else {
    // disini harus cek token yang disimpan di session storage valid atw tidak
    // jika tidak valid, maka reset isAuth dan Token di session Storage
    return sessionStorageToken ? <Outlet /> : <Navigate to="/auth" replace />;
  }
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      // {
      //   path: "/route2",
      //   element: <Screen2 />,
      // },
      // {
      //   path: "/route3",
      //   element: <Screen3 />,
      // },
    ],
  },
]);

export default routes;
