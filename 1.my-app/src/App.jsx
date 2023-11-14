// Bisa pake preline untuk tailwind component libarary

import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import ListItem from "./components/list-item";
import Button from "./components/button";
import("preline");

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(["ini budi", "ini ani"]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);

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
    setCurrentDataIndex(0);
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
                  className: "p-2 mx-2 shadow rounded text-slate-100 bg-green-500  hover:bg-green-600 active:bg-green-700",
                  onClick: () => editData(index),
                }}
              />
              <Button
                attr={{
                  text: "Delete",
                  className: "p-2 mx-2 shadow rounded text-slate-100 bg-red-500 hover:bg-red-600 active:bg-red-700",
                  onClick: () => delData(index),
                }}
              />
            </ListItem>
          ))}

          <ListItem text_list={<input type="text" className="text-slate-600 p-2" placeholder="Add Item" id="new_item" onKeyUp={keyUp} />}>
            <Button
              attr={{
                text: "Save",
                className: "p-2 mx-2 shadow rounded text-slate-100 bg-sky-500  hover:bg-sky-600 active:bg-sky-700",
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
        <button onClick={() => setCount(0)} className="p-2 mx-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded">
          reset
        </button>
        <Button
          attr={{
            text: "tes",
            className: "p-2 mx-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded",
            onClick: () => console.log("testing "),
          }}
        />
      </div>
      <div
        className={`absolute top-0 flex justify-center w-full h-full bg-slate-800 bg-opacity-60 backdrop-blur-sm z-50 transition-all duration-1000 ${
          isEdit ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute top-28 border p-2 shadow bg-slate-50 mx-auto transi  ">
          <div className="modalTitle font-bold">Edit Data Index ke {currentDataIndex}</div>
          <hr />
          <div className="modalBody mt-1">
            <input type="text" className="border p-1 outline-none focus:ring-2" onChange={editDataValue} value={data[currentDataIndex]} />
            <button className="p-2 mx-2 shadow rounded text-slate-100 bg-sky-500  hover:bg-sky-600 active:bg-sky-700" onClick={editClose}>
              Close
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        data-hs-overlay="#hs-small-modal"
      >
        Small
      </button>

      <div
        id="hs-small-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">Modal title</h3>
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-small-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="mt-1 text-gray-800 dark:text-gray-400">
                This is a wider card with supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-small-modal"
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        data-hs-overlay="#hs-medium-modal"
      >
        Medium
      </button>

      <div
        id="hs-medium-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">Modal title</h3>
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-medium-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="mt-1 text-gray-800 dark:text-gray-400">
                This is a wider card with supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-medium-modal"
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* pake preline */}
      <button
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        data-hs-overlay="#hs-large-modal"
      >
        Large
      </button>

      <div
        id="hs-large-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">Modal title</h3>
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-large-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="mt-1 text-gray-800 dark:text-gray-400">
                This is a wider card with supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-large-modal"
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
