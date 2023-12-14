import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
const Header = () => {
  const kasir = useSelector((state) => state.posConfig.kasir);
  const pos_id = useSelector((state) => state.posConfig.pos_id);

  // run after rendered
  useEffect(() => {
    startTime();
  }, []);

  return (
    <div className="navbar bg-blue-600 text-slate-100">
      <div className="navbar-start">{kasir}</div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">{pos_id}</a>
      </div>
      <div className="navbar-end">
        <span id="clock">jam</span>
      </div>
    </div>
  );
};
export default Header;
