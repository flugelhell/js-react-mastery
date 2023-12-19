import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../redux/orderSlice";

const Product = (props) => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    // if (order.order_lines.filter((line) => line.product_id == product.id)) {
    //   console.log("ada");
    // } else {
    //   console.log("tidaada");
    // }
    let new_order = {
      ...order,
      order_lines:
        order.order_lines.filter((line) => line.product_id == product.id).length > 0
          ? order.order_lines.map((line) => {
              // product id ada di current order
              return line.product_id == product.id ? { ...line, qty: line.qty + 1, total: (line.qty + 1) * line.price } : line;
            })
          : [
              //product id tidak ada di current order
              ...order.order_lines,
              {
                // tambah product baru ke order
                product_id: product.id,
                product_name: `[${product.sku}] ${product.name}`,
                price: product.price,
                qty: 1,
                disc: 0,
                total: product.price,
              },
            ],
    };
    console.log(new_order);
    dispatch(dispatch(setOrder(new_order)));
  };
  return (
    <>
      {props.products.product_show.map((product) => (
        <div className="btn relative w-32 h-32 m-2 shadow-md p-0 overflow-hidden group" key={product.id} onClick={() => addProduct(product)}>
          <img className="opacity-80 group-hover:opacity-100" src={product.image} alt={product.name} />
          <span className="absolute top-1 right-1 text-xs bg-base-200 bg-opacity-90">{product.price.toLocaleString()}</span>
          <p className="absolute inset-x-0 bottom-0 text-center text-xs bg-base-200 h-8 bg-opacity-90 whitespace-pre-line">
            {product.sku} {product.name.length > 27 ? product.name.substring(0, 20) + "..." : product.name.substring(0, 25)}
          </p>
        </div>
      ))}
    </>
  );
};
export default Product;
