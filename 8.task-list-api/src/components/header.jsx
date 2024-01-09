import reactLogo from "../assets/react.svg";

export default function Header() {
  return (
    <>
      <div className="header my-6">
        <img src={reactLogo} alt="react-logo" className="mx-auto" />
        <div className="mt-4 text-center font-sans text-blue-500 font-bold text-3xl ">
          React Todo App
        </div>
      </div>
    </>
  );
}
