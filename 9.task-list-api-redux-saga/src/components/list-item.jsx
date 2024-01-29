import Skeleton from "./skeleton";

export default function ListItem({ text_list, children }) {
    return (
        <div className="mb-1 p-3 max-w-sm bg-blue-500 text-slate-100 mx-auto flex justify-between items-center">
            <span className="font-bold ">{text_list}</span>
            <div className="space-x-2">{children}</div>
        </div>
    );
}
