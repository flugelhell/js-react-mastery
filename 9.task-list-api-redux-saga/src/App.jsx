import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ContextProvider } from "./contexts/store";
import { Provider } from "react-redux";
import store from "./redux";
const App = () => {
    return (
        <ContextProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ContextProvider>
    );
};
export default App;
