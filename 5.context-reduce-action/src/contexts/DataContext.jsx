import { createContext, useContext, useReducer } from "react";
import listReducer from "./list/reducer";

const DataContext = createContext(null);
const DataDispatchContext = createContext(null);

const initialList = [{ id: 1, title: "A Book Of Lie" }];

export const DataProvider = ({ children }) => {
  const [list, dispatch] = useReducer(listReducer, initialList);
  return (
    <DataContext.Provider value={list}>
      <DataDispatchContext.Provider value={dispatch}>{children}</DataDispatchContext.Provider>
    </DataContext.Provider>
  );
};

export function useList() {
  return useContext(DataContext);
}

export function useListDispatch() {
  return useContext(DataDispatchContext);
}
