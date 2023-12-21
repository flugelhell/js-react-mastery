import { useState } from "react";
import { useList, useListDispatch } from "../contexts/DataContext";

const Form = () => {
  const [listInput, setListInput] = useState("");
  const listSelector = useList();
  const dispatch = useListDispatch();
  const handleOnchange = (val) => {
    setListInput(val);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (listInput === "") {
      return;
    }
    // console.log(listSelector);
    // using reduce -> initial value = 0 max adalah hasil return sebelum nya
    const new_id = listSelector.reduce((max, current) => (current.id > max ? current.id : max), 0) + 1;
    dispatch({
      type: "addList",
      id: new_id,
      title: listInput,
    });
    setListInput("");
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="type here ..." value={listInput} onChange={(e) => handleOnchange(e.target.value)} required />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
