export default function Button({ attr }) {
  const { ["text"]: remove, ...attributes } = attr;
  return <button {...attributes}>{attr?.text}</button>;
}
