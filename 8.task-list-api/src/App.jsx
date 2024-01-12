import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ContextProvider } from "./contexts/store";
const App = () => {
  return (
    <ContextProvider>
      <RouterProvider router={router} />;
    </ContextProvider>
  );
};
export default App;
