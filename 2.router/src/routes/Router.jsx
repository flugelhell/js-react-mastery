import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Product from "../pages/Product.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to={`/home`} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home.Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/detail/:itemId",
    element: <Product />,
  },
]);

export default routes;
