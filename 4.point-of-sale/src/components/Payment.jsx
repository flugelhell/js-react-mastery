import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../redux/orderSlice";
import Modal from "./Modal";

const Payment = ({ formatLanguage }) => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(order.order_lines.reduce((sumTotal, line) => sumTotal + line.total, 0));
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(payment - totalAmount);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const new_total_amount = order.order_lines.reduce((sumTotal, line) => sumTotal + line.total, 0);
    setTotalAmount(new_total_amount);
    setChange(payment - new_total_amount);
  }, [order]);

  const handlePayment = (val) => {
    const new_val = val.replace(/[^\d]/g, ""); // remove non digit value
    if (isNaN(new_val) && val !== "") {
      return;
    }

    setPayment(Number(new_val).toLocaleString(formatLanguage));
    setChange(new_val - totalAmount);
  };

  const handleDone = () => {
    if (change < 0) {
      setModalContent(`You have to pay the remaining payment of ${Math.abs(change).toLocaleString(formatLanguage)}`);
      document.getElementById("payment_modal").showModal();
    } else {
      const current_change = change;
      setModalContent(`Transaction Done, ${current_change > 0 && "Your Change is " + current_change.toLocaleString(formatLanguage)}\nThank You`);
      document.getElementById("payment_modal").showModal();
      setChange(0);
      setPayment(0);
      let new_order = {
        ...order,
        order_lines: [],
      };

      dispatch(setOrder(new_order));
    }
  };
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="text-xl font-bold flex-none ">Total Amount</div>
        <div className="text-right text-xl font-bold grow">{totalAmount.toLocaleString(formatLanguage)}</div>
      </div>
      <div className="flex flex-wrap my-2">
        <div className="text-xl font-bold flex-none">Payment</div>
        <div className="grow text-right">
          <input type="text" className="text-right text-xl font-bold outline-none border-b-2 focus:border-blue-500 focus:shadow-xl" value={payment} onChange={(e) => handlePayment(e.target.value)} />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className={`text-xl font-bold flex-none ${change < 0 ? "text-red-500" : "text-blue-500"}`}>{change < 0 ? "Due" : "Change"}</div>
        <div className={`text-right text-xl font-bold grow ${change < 0 ? "text-red-500" : "text-blue-500"}`}>{change.toLocaleString(formatLanguage)}</div>
      </div>
      <div className="mt-10 text-right">
        <button className=" bottom-2 right-2 btn btn-primary" onClick={() => handleDone()}>
          Done
        </button>
      </div>
      <Modal modal_name={"payment_modal"} title={"Payment"} content={modalContent} />
    </>
  );
};
export default Payment;
