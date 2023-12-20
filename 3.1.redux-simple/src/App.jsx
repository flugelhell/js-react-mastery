import { useSelector, useDispatch } from "react-redux";

function App() {
  const counter = useSelector((state) => state.counter);
  const username = useSelector((state) => state.username);
  const dispatch = useDispatch();

  const counterIncrement = () => {
    dispatch({ type: "counter/increment" });
  };
  const counterDecrement = () => {
    dispatch({ type: "counter/decrement" });
  };
  const counterReset = () => {
    dispatch({ type: "counter/reset" });
  };
  const usernameChange = (val) => {
    dispatch({ type: "username/setUsername", payload: val });
  };

  return (
    <>
      <h1>Contoh Redux Simple</h1>

      <div className="content">
        <span>
          Counter: <span className="text-red">{counter}</span>{" "}
        </span>
        <button onClick={() => counterIncrement()}>Increment</button>
        <button onClick={() => counterDecrement()}>Decrement</button>
        <button onClick={() => counterReset()}>Reset</button>

        <div>
          Username: <span className="text-red">{username}</span>{" "}
        </div>
        <div>
          <input type="text" onChange={(e) => usernameChange(e.target.value)} placeholder="Set Username" />
        </div>
      </div>
    </>
  );
}

export default App;
