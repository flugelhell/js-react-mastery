import { createContext, useContext, useReducer } from "react";

// create a context
const StoreContext = createContext(null);

// create initial state
const initialState = {
  isAuth: false,
};

// create reducer
const contextReducer = (state, action) => {
  switch (action.type) {
    case "auth/login": {
      localStorage.setItem("token", action.token);
      return {
        ...state,
        isAuth: true,
      };
    }
    case "auth/logout": {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
      };
    }
    default: {
      return state;
    }
  }
};

// create provider
export const ContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(contextReducer, initialState);
  return <StoreContext.Provider value={{ store, dispatch }}>{children}</StoreContext.Provider>;
};

// export the context
export function useStoreContext() {
  return useContext(StoreContext);
}
