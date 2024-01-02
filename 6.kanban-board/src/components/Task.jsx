import { useState } from "react";
import { useStoreContext } from "../context/store";
import TaskItem from "./TaskItem";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [tempTitle, setTempTitle] = useState(task.name);
  const { store, dispatch } = useStoreContext();
  const [textInput, setTextInput] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const handleChange = (e) => {
    dispatch({
      type: "task/updateTask",
      taskId: task.id,
      name: e.target.value,
    });
    setTempTitle(e.target.value);
    console.log(store);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textInput == "") {
      setIsAdd(false);
      return;
    }
    dispatch({
      type: "taskItem/addTaskItem",
      name: textInput,
      taskId: task.id,
    });
    setTextInput("");
    setIsAdd(false);
  };
  return (
    <Draggable draggableId={task.id.toString() + "1"} index={index}>
      {(provided) => (
        <div className="bg-slate-500 m-2 p-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {/* title task */}
          <div className="flex w-64">
            {isEdit ? (
              <div>
                <input className="p-2 mb-2 text-slate-800 font-bold grow" autoFocus={true} value={tempTitle} onChange={(e) => handleChange(e)} onBlur={() => setIsEdit(false)} />
              </div>
            ) : (
              <div className="bg-slate-700 text-slate-300 mb-1 p-2 font-bold grow" onClick={() => setIsEdit(true)}>
                {tempTitle}
              </div>
            )}

            <a href="#" className="w-max h-max p-2 ml-1 bg-slate-600">
              <i className="bx bx-dots-vertical-rounded"></i>
            </a>
          </div>
          {/* untuk task item */}
          <Droppable droppableId={task.id.toString()}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {store.taskItems.map((line, index) => line.taskId == task.id && <TaskItem taskItem={line} key={line.id} index={index} />)}
                {/* untuk drag and drop */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* input dan button untuk menambah task item */}
          {isAdd ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" className="mr-1 p-1 text-slate-800" value={textInput} onChange={(e) => setTextInput(e.target.value)} autoFocus={true} />
              <button className="bg-slate-800 p-2 active:bg-slate-600 active:text-slate-900">add</button>
            </form>
          ) : (
            <div>
              <a href="#" className=" block mt-2 text-slate-400" onClick={() => setIsAdd(true)}>
                <i className="bx bx-plus"></i> Add other item
              </a>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
