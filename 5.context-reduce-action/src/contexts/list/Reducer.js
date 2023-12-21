const listReducer = (list, action) => {
  switch (action.type) {
    case "addList": {
      return [
        ...list,
        {
          id: action.id,
          title: action.title,
        },
      ];
    }
    case "deleteList": {
      return list.filter((line) => line.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default listReducer;
