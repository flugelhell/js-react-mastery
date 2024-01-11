import Input from "../components/input";
import Button from "../components/button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Auth = () => {
  const [isloginForm, setIsLoginForm] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notify = (type = "info", message = "") => {
    console.log(type);
    let option = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: { backgroundColor: type === "success" ? "#4caf50" : type === "error" ? "#f44336" : type === "info" ? "#2196f3" : "#4d4d4d" },
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

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    notify("info", "form submited");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <ToastContainer newestOnTop />
      <div className="p-4 border-2 w-96">
        <h1 className="text-center pb-2 text-xl font-bold">{isloginForm ? "LOGIN" : "REGISTER"}</h1>
        <form className="flex flex-col" onSubmit={(e) => onSubmit(e)}>
          {!isloginForm && <Input type="text" placeholder="Nama" value={name} onChange={(e) => onChangeName(e)} required />}
          <Input type="email" placeholder="Email" value={email} onChange={(e) => onChangeEmail(e)} required />
          <div className="relative">
            <Input type={isPasswordVisible ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => onChangePassword(e)} className="pr-20" required />
            <i className={`bx ${isPasswordVisible ? "bx-low-vision" : "bx-show"} btn text-xl absolute right-0 bg-transparent border-0 shadow-none ring-0`} onClick={() => setIsPasswordVisible(!isPasswordVisible)}></i>
          </div>
          <div className="mx-auto m-2">
            <Button type="submit" text="Submit" color="blue" />
          </div>
          <p className="mt-2 italic text-slate-500">
            {isloginForm ? (
              <>
                Belum punya akun? Silahkan&nbsp;
                <span className="cursor-pointer text-blue-400" onClick={() => setIsLoginForm(!isloginForm)}>
                  Register
                </span>
              </>
            ) : (
              <>
                Sudah punya akun? Silahkan&nbsp;
                <span className="cursor-pointer text-blue-400" onClick={() => setIsLoginForm(!isloginForm)}>
                  Login
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Auth;
