import Layout from "./Layout";
import Home from "./Home";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Product = () => {
  const param = useParams();
  const product = Home.dataProduct.filter((x) => x.id == param.itemId);

  return (
    <Layout>
      {product.map((prod) => (
        <div key={prod.id} className="flex">
          <div className={`w-64 h-64 p-4 float-left m-4`}>
            <img src={prod.image} alt={prod.name} />
          </div>
          <div className="my-8 mx-2 ">
            <h1 className="font-bold text-xl">{prod.name}</h1>
            <p>{prod.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum animi ad officiis atque? Eligendi ex pariatur veniam nihil dolor consequatur id, exercitationem, recusandae, aliquid nostrum accusantium necessitatibus itaque libero maxime?</p>

            <NavLink to={`/`} className={`btn btn-primary mt-10`}>
              Back to Home
            </NavLink>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Product;
