import { useEffect, useState } from "react";
import "../App.css";
import Header from "../components/header";
import ListItem from "../components/list-item";
import Button from "../components/button";
import { useStoreContext } from "../contexts/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "../components/skeleton";

const Home = () => {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentDataIndex, setCurrentDataIndex] = useState(null);
    const [currentDataId, setCurrentDataId] = useState(null);
    const [currentDataTitle, setCurrentDataTitle] = useState("");
    const { store, dispatch } = useStoreContext();
    const [isLoading, setIsLoading] = useState(true);
    const navigateTo = useNavigate();
    const base_url = "http://localhost:5000/api/v1";
    const token = sessionStorage.getItem("token");

    const notify = (type = "info", message = "") => {
        let option = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            style: { backgroundColor: type === "success" ? "#4caf50" : type === "error" ? "#f44336" : type === "info" ? "#2196f3" : type === "warning" ? "#ffc436" : "#4d4d4d" },
        };
        if (type == "info") {
            toast.info(message, option);
        } else if (type == "success") {
            toast.success(message, option);
        } else if (type == "warning") {
            toast.warning(message, option);
        } else if (type == "error") {
            toast.error(message, option);
        } else {
            toast(message, option);
        }
    };
    // console.log(store.isAuth);

    useEffect(() => {
        return () => {
            axios
                .get(`${base_url}/todos`, { headers: { Authorization: token } })
                .then((res) => {
                    console.log(res);
                    setTimeout(() => {
                        setData(res.data.data);
                        setIsLoading(false);
                    }, 2000);
                })
                .catch((err) => {
                    notify("error", err);
                });
        };
    }, []);

    const delData = (index, id) => {
        const new_data = [...data.slice(0, index), ...data.slice(index + 1)];
        axios
            .delete(`${base_url}/todos/${id}`, {
                headers: { Authorization: token },
            })
            .then((res) => {
                setData(new_data);
                notify("success", "Data berhasil dihapus");
            })
            .catch((err) => {
                console.log(err);
                notify("error", err.message + ". " + err.response.data.msg);
            });
    };
    const addData = (val) => {
        const axiosConfig = {
            method: "post", // HTTP method (e.g., 'get', 'post', 'put', 'delete')
            url: `${base_url}/todos`,
            headers: {
                Authorization: token,
                "Content-Type": "application/json", // Adjust content type based on your API requirements
            },
            data: {
                // Your request payload if needed (for POST, PUT, etc.)
                // Example: { key1: 'value1', key2: 'value2' }
                title: val,
            },
            params: {
                // URL parameters if needed
                // Example: { param1: 'value1', param2: 'value2' }
            },
        };
        axios(axiosConfig)
            .then((res) => {
                const result = res.data.data;
                setData([...data, { title: result.title, _id: result._id }]);
                notify("success", "Data berhasil disimpan");
            })
            .catch((err) => {
                console.log(err);
                notify("error", err.message + ". " + err?.response?.data?.msg);
            });
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

    const editData = (val, id) => {
        setIsEdit(true);
        setCurrentDataIndex(val);
        setCurrentDataId(id);
        setCurrentDataTitle(data[val].title);

        let current_data = data[val];
        console.log(current_data);
    };
    const editDataValue = (event) => {
        console.log(event.target.value);
        let newdata = [...data];
        newdata[currentDataIndex].title = event.target.value;
        setCurrentDataTitle(event.target.value);
        // console.log(newdata);
        setData(newdata);
    };
    const editClose = () => {
        if (data[currentDataIndex] == "") {
            alert("data tidak boleh kosong");
            return;
        }
        axios
            .put(`${base_url}/todos/${currentDataId}`, { title: currentDataTitle }, { headers: { Authorization: token } })
            .then((res) => {
                notify("success", "Data berhasil diubah");

                setIsEdit(false);
                setCurrentDataIndex(null);
                setCurrentDataId(null);
                setCurrentDataTitle("");
            })
            .catch((err) => {
                console.log(err);
                notify("error", err.message + ". " + err?.response?.data?.msg);
            });
    };
    const logout = () => {
        dispatch({ type: "auth/logout" });
        navigateTo("/");
    };
    return (
        <>
            <ToastContainer newestOnTop />
            <div className="">
                <Header />
                <div className="text-center m-2">
                    <Button text={`Logout`} onClick={() => logout()} />
                </div>
                <div className="list">
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        data.map((value, index) => (
                            <ListItem text_list={value.title} key={index}>
                                <Button text="Edit" color="green" onClick={() => editData(index, value._id)} />
                                <Button
                                    text="Delete"
                                    color="red"
                                    onClick={() => {
                                        setCurrentDataIndex(index);
                                        setCurrentDataId(value._id);
                                        document.getElementById("my_modal_5").showModal();
                                    }}
                                />
                            </ListItem>
                        ))
                    )}

                    <ListItem text_list={<input type="text" className="text-slate-600 p-2" placeholder="Add Item" id="new_item" onKeyUp={keyUp} />}>
                        <Button
                            text="Save"
                            color="blue"
                            onClick={() => {
                                let val = document.querySelector("#new_item");
                                if (!val.value) {
                                    alert("please fill the data");
                                    return;
                                }
                                addData(val.value);
                                val.value = "";
                            }}
                        />
                    </ListItem>
                </div>
            </div>
            <hr className="mt-2 h-1" />
            <div className="mt-2">
                <button onClick={() => setCount((count) => count + 1)} className="p-2 mx-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded">
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
            {/* modal for edit */}
            <div className={`absolute top-0 flex justify-center w-full h-full bg-slate-800 bg-opacity-60 backdrop-blur-sm z-50 transition-all duration-1000 ${isEdit ? "visible opacity-100" : "invisible opacity-0"}`}>
                <div className="absolute top-28 border p-2 shadow bg-slate-50 mx-auto transi  ">
                    <div className="modalTitle font-bold">Edit Data Index ke {(currentDataIndex || currentDataIndex == 0) && currentDataIndex}</div>
                    <hr />
                    <div className="modalBody mt-1">
                        <input type="text" className="border p-1 outline-none focus:ring-2" onChange={editDataValue} value={currentDataTitle} />
                        <button className="p-2 mx-2 shadow rounded text-slate-100 bg-sky-500  hover:bg-sky-600 active:bg-sky-700" onClick={editClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
            {/* modal for delete */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Warning!</h3>
                    <p className="py-4">Yakin mau didelete?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <span
                                className="btn btn-error mr-2"
                                onClick={() => {
                                    delData(currentDataIndex, currentDataId);
                                    setCurrentDataIndex(null);
                                    setCurrentDataId(null);
                                    setCurrentDataTitle("");
                                    document.getElementById("my_modal_5").close();
                                }}
                            >
                                Delete
                            </span>
                            <button className="btn btn-info" onClick={() => setCurrentDataIndex(null)}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Home;
