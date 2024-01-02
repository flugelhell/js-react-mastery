import { createContext, useContext, useReducer } from "react";

// create a context
const StoreContext = createContext(null);

// create initial state
const initialList = {
  tasks: [
    {
      id: 1,
      name: "Membuat POS",
    },
    {
      id: 2,
      name: "Menanam Pohon",
    },
  ],
  taskItems: [
    {
      id: 1,
      name: "Perancangan",
      taskId: 1,
    },
    {
      id: 2,
      name: "Development",
      taskId: 1,
    },
  ],
};

// const Generate new id
const getNewId = (arrList) => {
  return arrList.reduce((max, current) => (current.id > max ? current.id : max), 0) + 1;
};

// create reducer
const contextReducer = (state, action) => {
  switch (action.type) {
    case "task/setTask": {
      return {
        ...state,
        tasks: action.tasks, // replace tasks
      };
    }
    case "task/addTask": {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: getNewId(state.tasks),
            name: action.name,
          },
        ],
      };
    }
    case "task/updateTask": {
      console.log(action);
      return {
        ...state,
        tasks: state.tasks.map((line) => {
          if (line.id == action.taskId) {
            line.name = action.name;
            return line;
          }
          return line;
        }),
      };
    }
    case "taskItem/setTaskItem": {
      return {
        ...state,
        taskItems: action.taskItems,
      };
    }
    case "taskItem/addTaskItem": {
      return {
        ...state,
        taskItems: [
          ...state.taskItems,
          {
            id: getNewId(state.taskItems),
            name: action.name,
            taskId: action.taskId,
          },
        ],
      };
    }
    case "taskItem/updateTaskItem": {
      return {
        ...state,
        taskItems: state.taskItems.map((line) => {
          if (line.id == action.taskItemId) {
            line.name = action.name;
            return line;
          }
          return line;
        }),
      };
    }
    case "taskItem/deleteTaskItem": {
      return {
        ...state,
        taskItems: state.taskItems.filter((line) => line.id !== action.taskItemId),
      };
    }
    default: {
      return state;
    }
  }
};

// create provider
export const ContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(contextReducer, initialList);
  return <StoreContext.Provider value={{ store, dispatch }}>{children}</StoreContext.Provider>;
};

// export the context
export function useStoreContext() {
  return useContext(StoreContext);
}
