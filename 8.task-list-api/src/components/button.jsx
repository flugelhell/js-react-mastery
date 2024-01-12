export default function Button({ type = "button", text, onClick, color = "blue", loading = false }) {
  let style = "";
  if (color == "blue") style = "p-2 shadow rounded text-slate-100 bg-sky-500  hover:bg-sky-600 active:bg-sky-700";
  if (color == "green") style = "p-2 shadow rounded text-slate-100 bg-green-500  hover:bg-green-600 active:bg-green-700";
  if (color == "red") style = "p-2 shadow rounded text-slate-100 bg-red-500 hover:bg-red-600 active:bg-red-700";

  return (
    <button type={type} className={style} onClick={onClick} disabled={loading}>
      {loading ? (
        <>
          <i className="bx bx-loader-alt animate-spin text-xl"></i> Loading ...
        </>
      ) : (
        text
      )}
    </button>
  );
}
