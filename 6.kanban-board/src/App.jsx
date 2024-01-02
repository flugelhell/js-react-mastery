import { useState } from "react";
import Header from "./components/Header";
import Task from "./components/Task";
import { useStoreContext } from "./context/store";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
function App() {
  const { store, dispatch } = useStoreContext();
  const [isAdd, setIsAdd] = useState(false);
  const [textInput, setTextInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textInput == "") {
      setIsAdd(false);
      return;
    }
    dispatch({
      type: "task/addTask",
      name: textInput,
    });
    setTextInput("");
    setIsAdd(false);
  };
  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    // if (type == "list") return;

    const sourceTaskIndex = source.droppableId;
    const destTaskIndex = destination.droppableId;
    const sourceTaskItemIndex = source.index;
    const destTaskItemIndex = destination.index;

    // untuk drag and drop task board
    if (sourceTaskIndex == "app") {
      let moveTask = store.tasks[sourceTaskItemIndex];
      let newTask = [...store.tasks];
      // console.log(newTask);
      newTask.splice(sourceTaskItemIndex, 1);
      newTask.splice(destTaskItemIndex, 0, moveTask);
      // console.log(newTask);
      dispatch({
        type: "task/setTask",
        tasks: newTask,
      });
      return;
    }
    // untuk drag and drop task item
    // console.log(sourceTaskIndex, destTaskIndex);
    if (sourceTaskIndex == destTaskIndex) {
      // pindah task item dalam satu task
      let moveItem = store.taskItems[sourceTaskItemIndex];
      let newTaskItems = [...store.taskItems];
      // console.table(newTaskItems);
      newTaskItems.splice(sourceTaskItemIndex, 1); // delete array with index
      // console.table(newTaskItems);
      newTaskItems.splice(destTaskItemIndex, 0, moveItem);
      // console.table(newTaskItems);
      // console.log(store);
      dispatch({
        type: "taskItem/setTaskItem",
        taskItems: newTaskItems,
      });
    } else if (sourceTaskIndex != destTaskIndex) {
      // pindah task item dengan beda task
      let moveItem = store.taskItems[sourceTaskItemIndex];
      moveItem.taskId = parseInt(destTaskIndex);
      console.log(result);
      let newTaskItems = [...store.taskItems];
      newTaskItems.splice(sourceTaskItemIndex, 1); // delete array with index
      newTaskItems.splice(destTaskItemIndex, 0, moveItem); // add array

      dispatch({
        type: "taskItem/setTaskItem",
        taskItems: newTaskItems,
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-blue-500 h-svh text-slate-200">
        <Header />
        <Droppable droppableId={`app`} type="list" direction="horizontal">
          {(provided) => (
            <div className="flex items-start flex-wrap" ref={provided.innerRef} {...provided.droppableProps}>
              {store.tasks.map((line, index) => (
                <Task task={line} key={line.id} index={index} />
              ))}
              {/* untuk drag and drop */}
              {provided.placeholder}
              <div className="bg-slate-500 m-2 w-64 p-2">
                {isAdd ? (
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" className="mr-1 p-1 text-slate-800" value={textInput} onChange={(e) => setTextInput(e.target.value)} autoFocus={true} />
                    <button className="bg-slate-800 p-2 active:bg-slate-600 active:text-slate-900">add</button>
                  </form>
                ) : (
                  <a href="#" className="mt-2 block text-slate-400" onClick={() => setIsAdd(true)}>
                    <i className="bx bx-plus"></i> Add other task
                  </a>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
