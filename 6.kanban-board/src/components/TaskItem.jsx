import { useState } from "react";
import { useStoreContext } from "../context/store";
import { Draggable } from "react-beautiful-dnd";

const TaskItem = ({ taskItem, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputText, setInputText] = useState(taskItem.name);
  const { store, dispatch } = useStoreContext();
  const handleChange = (e) => {
    setInputText(e.target.value);
    dispatch({
      type: "taskItem/updateTaskItem",
      taskItemId: taskItem.id,
      name: e.target.value,
    });
  };
  const handleDelete = (taskItemId) => {
    dispatch({
      type: "taskItem/deleteTaskItem",
      taskItemId: taskItemId,
    });
  };
  return (
    <Draggable draggableId={taskItem.id.toString()} index={index}>
      {(provided) => (
        <div className="flex" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {isEdit ? (
            <div>
              <input type="text" value={inputText} onChange={(e) => handleChange(e)} onBlur={() => setIsEdit(false)} className="m-1 mr-1 p-1  text-slate-800 font-bold grow" autoFocus={true} />
            </div>
          ) : (
            <div className="bg-slate-600 text-slate-200 m-1 mr-1 p-1 grow" onClick={() => setIsEdit(true)}>
              {inputText}
            </div>
          )}
          <a href="#" className="grow-0 w-max h-max p-1 m-2 ml-1 bg-slate-700" onClick={() => handleDelete(taskItem.id)}>
            <i className="bx bxs-trash-alt"></i>
          </a>
        </div>
      )}
    </Draggable>
  );
};
export default TaskItem;
