import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Auth from "../pages/auth";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default routes;
