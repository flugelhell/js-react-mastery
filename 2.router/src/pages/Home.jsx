import Layout from "./Layout";
import { NavLink } from "react-router-dom";

const dataProduct = [
  {
    id: 1,
    name: "JS",
    description: "Javascript",
    image: "/images/js.png",
  },
  {
    id: 2,
    name: "React",
    description: "React JS",
    image: "/images/react.png",
  },
  {
    id: 3,
    name: "Vue",
    description: "Vue JS",
    image: "/images/vue.png",
  },
  {
    id: 4,
    name: "Svelte",
    description: "Svelte JS",
    image: "/images/svelte.png",
  },
];

const Home = () => {
  return (
    <Layout>
      <div className="w-fit mx-auto">
        <h1 className="font-bold text-xl m-4">Home Page</h1>
        <div className="flex justify-center">
          {dataProduct.map((prod) => (
            <NavLink to={`/detail/${prod.id}`} className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")} key={prod.id}>
              <div className="group card card-compact w-60 bg-base-100 shadow-xl rounded-none m-4 pt-1 ">
                <figure className={`w-60 h-64 bg-[url('${prod.image}')] bg-cover bg-no-repeat bg-center bg-origin-content p-4 group-hover:animate-bounce`}></figure>
                <div className="card-body">
                  <h2 className="card-title">{prod.name}</h2>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default {
  Home,
  dataProduct,
};
