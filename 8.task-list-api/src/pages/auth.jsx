import Input from "../components/input";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useStoreContext } from "../contexts/store";

const Auth = () => {
  const [isloginForm, setIsLoginForm] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const base_url = "http://localhost:5000/api/v1";
  const navigateTo = useNavigate();
  const { store, dispatch } = useStoreContext();
  // console.log("store: ", store);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    const token = sessionStorage.getItem("token");

    // jika sudah login maka redirect ke home
    if (isAuth && token) {
      return navigateTo("/home");
    }
  }, []);

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

  const onsubmit = async (e) => {
    e.preventDefault();
    if (isloginForm) {
      if (email == "" || password == "") {
        notify("warning", "Email or Password is Empty!");
        return;
      }
      const payload = { email, password };
      try {
        setIsLoading(true);
        const res = await axios.post(`${base_url}/user/signin`, payload);
        // console.log("response ", res.data);
        // localStorage.setItem("token", res.data.token); sudah di login
        // change store
        dispatch({ type: "auth/login", token: res.data.token });

        notify("info", "Login Success");
        navigateTo("/home");
        setIsLoading(false);
        setEmail("");
        setPassword("");
      } catch (err) {
        setIsLoading(false);
        // console.log(err);
        const err_message = err?.response?.data?.message;
        notify("error", `Login Failed. ${err_message ? err_message : err.message}`);
      }
    } else {
      if (email == "" || password == "" || name == "") {
        notify("warning", "Name, Email or Password is Empty!");
        return;
      }
      const payload = { name, email, password };
      try {
        setIsLoading(true);
        const res = await axios.post(`${base_url}/user/signup`, payload);
        // console.log("response ", res.data);
        // localStorage.setItem("token", res.data.token);

        // change store
        dispatch({ type: "auth/login", token: res.data.token });

        notify("info", "Register Success");
        navigateTo("/home");
        setIsLoading(false);
        setName("");
        setEmail("");
        setPassword("");
      } catch (err) {
        setIsLoading(false);
        // console.log(err);
        const err_message = err?.response?.data?.message;
        notify("error", `Login Failed. ${err_message ? err_message : err.message}`);
      }
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <ToastContainer newestOnTop />
      <div className="p-4 border-2 w-96">
        <h1 className="text-center pb-2 text-xl font-bold">{isloginForm ? "LOGIN" : "REGISTER"}</h1>
        <form className="flex flex-col" onSubmit={(e) => onsubmit(e)} id="form">
          {!isloginForm && <Input type="text" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} required />}
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="relative">
            <Input type={isPasswordVisible ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-20" required />
            <i className={`bx ${isPasswordVisible ? "bx-low-vision" : "bx-show"} btn text-xl absolute right-0 bg-transparent border-0 shadow-none ring-0`} onClick={() => setIsPasswordVisible(!isPasswordVisible)}></i>
          </div>
          <div className="mx-auto m-2">
            <Button type="submit" text="Submit" color="blue" loading={isLoading} />
          </div>
          <p className="mt-2 italic text-slate-500">
            {isloginForm ? (
              <>
                Belum punya akun? Silahkan&nbsp;
                <a href="#" className="text-blue-400 font-bold text-xl" onClick={() => setIsLoginForm(!isloginForm)}>
                  Register
                </a>
              </>
            ) : (
              <>
                Sudah punya akun? Silahkan&nbsp;
                <a href="#" className="text-blue-400 font-bold text-xl" onClick={() => setIsLoginForm(!isloginForm)}>
                  Login
                </a>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Auth;
