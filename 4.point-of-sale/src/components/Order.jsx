import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../redux/orderSlice";
import { useEffect, useState } from "react";

const Order = ({ formatLanguage }) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [totalAmount, setTotalAmount] = useState(order.order_lines.reduce((sumTotal, line) => sumTotal + line.total, 0));

  // watch order and calculate totalAmount
  useEffect(() => {
    setTotalAmount(order.order_lines.reduce((sumTotal, line) => sumTotal + line.total, 0));
    document.getElementById("order-panel").scrollTo(0, document.getElementById("order-panel").scrollHeight);
  }, [order]);

  // decrement quantity
  const subQty = (product_id) => {
    let new_order = {
      ...order, // copy state
      order_lines: order.order_lines
        .map((line) => {
          // ubah order line
          return line.product_id == product_id ? { ...line, qty: line.qty - 1, total: (line.qty - 1) * line.price } : line;
        })
        .filter((line) => line.qty > 0), // return yg qty > 0 saja setelah di map
    };
    dispatch(setOrder(new_order));
  };

  // increment quantity
  const addQty = (product_id) => {
    let new_order = {
      ...order, // copy state
      order_lines: order.order_lines.map((line) => {
        // ubah order line
        return line.product_id == product_id ? { ...line, qty: line.qty + 1, total: (line.qty + 1) * line.price } : line;
      }),
    };
    dispatch(setOrder(new_order));
  };

  // remove order line
  const removeOrderLine = (product_id) => {
    let new_order = {
      ...order,
      order_lines: order.order_lines.filter((line) => {
        return line.product_id != product_id;
      }),
    };
    dispatch(setOrder(new_order));
  };

  // clear order line
  const clearOrder = () => {
    let new_order = {
      ...order,
      order_lines: [],
    };
    dispatch(setOrder(new_order));
  };

  return (
    <>
      {order.order_id && (
        <div role="tablist" className="relative tabs tabs-lifted">
          <span className="btn btn-sm btn-error text-base-100 absolute top-0 right-0" onClick={() => clearOrder()}>
            Clear
          </span>
          <input type="radio" name="my_tabs_2" role="tab" className="tab mt-1" aria-label="Order" defaultChecked />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-1 border-x-0 border-b-0">
            {order.order_lines.map((line, index) => (
              <div className="flex shadow-md p-3 mt-1 overflow-y-auto" key={index}>
                <div className="grow w-3/5">
                  <span className="inline-block align-middle text-x">{line.product_name}</span>
                </div>
                <div className="grow-0 whitespace-nowrap w-1/5 my-auto">
                  <button className="btn btn-xs btn-circle mx-2" onClick={() => subQty(line.product_id)}>
                    ➖
                  </button>
                  <span>{line.qty}</span>
                  <button className="btn btn-xs btn-circle mx-2" onClick={() => addQty(line.product_id)}>
                    ➕
                  </button>
                </div>
                <div className="grow-0 text-right w-1/5 my-auto">{line.total.toLocaleString(formatLanguage)}</div>
                <div className="btn btn-xs btn-circle text-xs my-auto ml-1" onClick={() => removeOrderLine(line.product_id)}>
                  ❌
                </div>
              </div>
            ))}

            {order.order_lines.length > 0 && (
              <div className="mt-4 flex">
                <div className="text-xl font-bold">Total:</div>
                <div className="text-xl font-bold absolute right-2">{totalAmount.toLocaleString(formatLanguage)}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Order;
