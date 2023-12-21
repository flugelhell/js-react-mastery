import { useList, useListDispatch } from "../contexts/DataContext";

const List = () => {
  const list = useList();
  const dispatch = useListDispatch();
  const handleDelete = (id) => {
    dispatch({
      type: "deleteList",
      id: id,
    });
  };

  return (
    <ul>
      {list.map((line) => (
        <li key={line.id}>
          {line.title} <button onClick={() => handleDelete(line.id)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
