export default function Button({ text, onClick, color = "blue" }) {
  let style = "";
  if (color == "blue") style = "p-2 shadow rounded text-slate-100 bg-sky-500  hover:bg-sky-600 active:bg-sky-700";
  if (color == "green") style = "p-2 shadow rounded text-slate-100 bg-green-500  hover:bg-green-600 active:bg-green-700";
  if (color == "red") style = "p-2 shadow rounded text-slate-100 bg-red-500 hover:bg-red-600 active:bg-red-700";

  return (
    <button type="button" className={style} onClick={onClick}>
      {text}
    </button>
  );
}
