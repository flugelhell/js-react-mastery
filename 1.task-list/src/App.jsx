// Bisa pake preline atau daisy UI untuk tailwind component libarary

import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import ListItem from "./components/list-item";
import Button from "./components/button";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(["ini budi", "ini ani"]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentDataIndex, setCurrentDataIndex] = useState(null);

  const delData = (index) => {
    const new_data = [...data.slice(0, index), ...data.slice(index + 1)];
    setData(new_data);
  };
  const addData = (val) => {
    const new_data = [...data, val];
    setData(new_data);
  };
  const keyUp = (event) => {
    if (event.keyCode == 13) {
      let val = document.querySelector("#new_item");
      if (!val.value) {
        alert("please fill the data");
        return;
      }
      addData(val.value);
      val.value = "";
    }
  };

  const editData = (val) => {
    setIsEdit(true);
    setCurrentDataIndex(val);

    let current_data = data[val];
    console.log(current_data);
  };
  const editDataValue = (event) => {
    console.log(event.target.value);
    let newdata = [...data];
    newdata[currentDataIndex] = event.target.value;
    setData(newdata);
  };
  const editClose = () => {
    if (data[currentDataIndex] == "") {
      alert("data tidak boleh kosong");
      return;
    }
    setIsEdit(false);
    setCurrentDataIndex(null);
  };
  return (
    <>
      <div className="">
        <Header />

        <div className="list">
          {data.map((value, index) => (
            <ListItem text_list={value} key={index}>
              <Button
                attr={{
                  text: "Edit",
                  className:
                    "p-2 mx-2 shadow rounded text-slate-100 bg-green-500  hover:bg-green-600 active:bg-green-700",
                  onClick: () => editData(index),
                }}
              />
              <Button
                attr={{
                  text: "Delete",
                  className:
                    "p-2 mx-2 shadow rounded text-slate-100 bg-red-500 hover:bg-red-600 active:bg-red-700",
                  onClick: () => {
                    setCurrentDataIndex(index);
                    document.getElementById("my_modal_5").showModal();
                  },
                }}
              />
            </ListItem>
          ))}

          <ListItem
            text_list={
              <input
                type="text"
                className="text-slate-600 p-2"
                placeholder="Add Item"
                id="new_item"
                onKeyUp={keyUp}
              />
            }
          >
            <Button
              attr={{
                text: "Save",
                className:
                  "p-2 mx-2 shadow rounded text-slate-100 bg-sky-500  hover:bg-sky-600 active:bg-sky-700",
                onClick: () => {
                  let val = document.querySelector("#new_item");
                  if (!val.value) {
                    alert("please fill the data");
                    return;
                  }
                  addData(val.value);
                  val.value = "";
                },
              }}
            />
          </ListItem>
        </div>
      </div>
      <hr className="mt-2 h-1" />
      <div className="mt-2">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="p-2 mx-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded"
        >
          count is {count}
        </button>{" "}
        <button
          onClick={() => setCount(0)}
          className="p-2 mx-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded"
        >
          reset
        </button>
        <Button
          attr={{
            text: "tes",
            className:
              "p-2 mx-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded",
            onClick: () => console.log("testing "),
          }}
        />
      </div>
      {/* modal for edit */}
      <div
        className={`absolute top-0 flex justify-center w-full h-full bg-slate-800 bg-opacity-60 backdrop-blur-sm z-50 transition-all duration-1000 ${
          isEdit ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute top-28 border p-2 shadow bg-slate-50 mx-auto transi  ">
          <div className="modalTitle font-bold">
            Edit Data Index ke{" "}
            {(currentDataIndex || currentDataIndex == 0) && currentDataIndex}
          </div>
          <hr />
          <div className="modalBody mt-1">
            <input
              type="text"
              className="border p-1 outline-none focus:ring-2"
              onChange={editDataValue}
              value={
                currentDataIndex || currentDataIndex == 0
                  ? data[currentDataIndex]
                  : ""
              }
            />
            <button
              className="p-2 mx-2 shadow rounded text-slate-100 bg-sky-500  hover:bg-sky-600 active:bg-sky-700"
              onClick={editClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {/* modal for delete */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">Yakin mau didelete?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <span
                className="btn btn-error mr-2"
                onClick={() => {
                  delData(currentDataIndex);
                  setCurrentDataIndex(null);
                  document.getElementById("my_modal_5").close();
                }}
              >
                Delete
              </span>
              <button
                className="btn btn-info"
                onClick={() => setCurrentDataIndex(null)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;
