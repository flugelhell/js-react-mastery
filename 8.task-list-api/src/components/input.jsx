export default function Input({ type, placeholder, onChange }) {
  return <input type={type} placeholder={placeholder} className="w-full mx-auto p-2 m-2 border-0 border-b-2 border-slate-400 rounded-none focus:border-0 focus:border-b-2 focus:border-blue-400 focus:outline-none" onChange={onChange} />;
}
