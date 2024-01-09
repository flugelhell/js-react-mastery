import Input from "../components/input";
import Button from "../components/button";
import { useState } from "react";
const Auth = () => {
  const [login, setLogin] = useState();
  return (
    <div className="flex m-4">
      <div className="mx-auto p-2 m-2 border-2 w-96">
        <h1 className="text-center pb-2 text-xl font-bold">{login ? "LOGIN" : "REGISTER"}</h1>
        <form className="flex flex-col">
          {!login && <Input type="text" placeholder="Nama" onChange={() => console.log(onclick)} />}
          <Input type="email" placeholder="Email" onChange={() => console.log(onclick)} />
          <div className="relative">
            <Input type="password" placeholder="Password" onChange={() => console.log(onclick)} />
            <i className="bx bx-show text-xl border-red-400 border-2 absolute right-0"></i>
          </div>
          <div className="mx-auto m-2">
            <Button text="Submit" color="blue" />
          </div>
          <p className="mt-2 italic text-slate-500">
            {login ? (
              <>
                Belum punya akun? Silahkan&nbsp;
                <span className="cursor-pointer text-blue-400" onClick={() => setLogin(!login)}>
                  Register
                </span>
              </>
            ) : (
              <>
                Sudah punya akun? Silahkan&nbsp;
                <span className="cursor-pointer text-blue-400" onClick={() => setLogin(!login)}>
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
