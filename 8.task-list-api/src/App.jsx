import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

const App = () => {
  console.log("tes");
  return <RouterProvider router={router} />;
};
export default App;
