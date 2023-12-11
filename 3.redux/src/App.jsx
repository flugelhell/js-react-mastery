import { incrementCounter, decrementCounter, resetCounter } from "./redux/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch(); // untuk update state
  const counter = useSelector((state) => state.counter); // untuk watch
  return (
    <>
      <div className="flex">
        <img src={`/react.svg`} className="block mx-auto h-24 m-4" alt="React logo" />
      </div>
      <div className="flex-1">
        <h1 className="text-center text-2xl font-extrabold m-4">React Redux</h1>
        <div className="flex ">
          <div className="mx-auto flex">
            <button className="bg-slate-500 p-2 text-slate-200 hover:bg-slate-600 active:bg-slate-800 rounded" onClick={() => dispatch(decrementCounter())}>
              -
            </button>
            <div className="p-2 text-slate-800">{counter}</div>
            <button className="bg-slate-500 p-2 text-slate-200 hover:bg-slate-600 active:bg-slate-800 rounded" onClick={() => dispatch(incrementCounter())}>
              +
            </button>
            <button className="bg-slate-500 ml-1 p-2 text-slate-200 hover:bg-slate-600 active:bg-slate-800 rounded" onClick={() => dispatch(resetCounter())}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
