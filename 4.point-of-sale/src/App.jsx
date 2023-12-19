import { useEffect, useState } from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Product from "./components/Products";
import Order from "./components/Order";
import Payment from "./components/Payment";
import { setProduct } from "./redux/productSlice";
import { setCategory } from "./redux/CategorySlice";
import { useDispatch, useSelector } from "react-redux";

const category_list = [
  {
    id: 1,
    name: "Sepatu",
  },
  {
    id: 2,
    name: "Baju",
  },
];
const product_db = [
  {
    id: 1,
    sku: "FW001",
    name: "Sepatu Nike 45",
    price: 1000,
    categ_id: 1,
    image: "/images/1.jpg",
  },
  {
    id: 2,
    sku: "FW002",
    name: "Sepatu Adidas Merdeka",
    price: 1500000,
    categ_id: 1,
    image: "/images/2.jpg",
  },
  {
    id: 3,
    sku: "FW003",
    name: "Sepatu Airwalk Jordan",
    price: 1200,
    categ_id: 1,
    image: "/images/3.jpg",
  },
  {
    id: 4,
    sku: "TS001",
    name: "Jersey Manchester United sdfsdf sdf",
    price: 2000,
    categ_id: 2,
    image: "/images/4.jpg",
  },
  {
    id: 5,
    sku: "TS002",
    name: "Jersey Liverpool",
    price: 2100,
    categ_id: 2,
    image: "/images/5.jpg",
  },
];

const product_list = {
  product_db: [...product_db], // harus disimpan di idb
  product_show: [...product_db],
};
function App() {
  console.log("App Component Rendered");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products); // triggered re-render
  const categories = useSelector((state) => state.categories); // triggered re-render
  useEffect(() => {
    // will fire when componentDidMount
    return () => {
      // will fire when componentWillMount
      dispatch(setCategory(category_list));
      dispatch(setProduct(product_list));
    };
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex grow">
          <div className="w-2/12 p-2">
            <Categories categories={categories} />
          </div>
          <div className="divider divider-horizontal mx-0"></div>
          <div className="flex grow flex-wrap">
            <Product products={products} />
          </div>
          <div className="divider divider-horizontal mx-0"></div>
          <div className="w-3/12 p-2">
            <div className="h-4/6 overflow-scroll overflow-x-hidden" id="order-panel">
              <Order />
            </div>
            <div className="divider"></div>
            <div className="bottom-0">
              <Payment />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
