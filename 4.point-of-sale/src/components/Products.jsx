import { useSelector } from "react-redux";

const Product = () => {
  const products = useSelector((state) => state.products);
  return (
    <>
      {products.map((product) => (
        <div className="btn relative w-32 h-32 m-2 shadow-md p-0 overflow-hidden group" key={product.id}>
          <img className="opacity-80 group-hover:opacity-100" src={product.image} alt={product.name} />
          <p className="absolute inset-x-0 bottom-0 text-center text-xs bg-base-200 h-8 bg-opacity-90 whitespace-pre-line">
            {product.sku} {product.name.length > 27 ? product.name.substring(0, 20) + "..." : product.name.substring(0, 25)}
          </p>
        </div>
      ))}
    </>
  );
};
export default Product;
