const Order = () => {
  return (
    <>
      <div className="flex shadow-md p-3 mt-1">
        <div className="grow">
          <span className="inline-block align-middle text-xs">PRODUCT ABC DEF GHI</span>
        </div>
        <div className="grow-0">
          <button className="btn btn-xs btn-circle mx-2">-</button>
          <span>1</span>
          <button className="btn btn-xs btn-circle mx-2">+</button>
        </div>
        <div className="grow-0 w-28 text-right">27.000</div>
      </div>
    </>
  );
};
export default Order;
