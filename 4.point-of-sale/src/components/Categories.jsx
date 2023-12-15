import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/productSlice";

const Categories = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const clickCategory = (key) => {
    if (key == 0) {
      dispatch(setProduct({ product_db: [...products.product_db], product_show: [...products.product_db] }));
    } else {
      dispatch(
        setProduct({
          product_db: [...products.product_db],
          product_show: products.product_db.filter((prod) => prod.categ_id == key),
        })
      );
    }
  };

  return (
    <ul className="menu p-0  [&_li>*]:rounded-none [&_li>*]:shadow [&_li>*]:py-3">
      <li onClick={() => clickCategory(0)}>
        <a>Semua Product</a>
      </li>
      {props.categories.map((categ) => (
        <li key={categ.id} onClick={() => clickCategory(categ.id)}>
          <a>{categ.name}</a>
        </li>
      ))}
    </ul>
  );
};
export default Categories;
