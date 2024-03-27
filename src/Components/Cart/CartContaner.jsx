import React, { useContext, useEffect, useState } from "react";
import { RandomContext } from "../Utils/Context";
import { DNA } from "react-loader-spinner";

const CartContaner = () => {
  let { login } = useContext(RandomContext);
  let [checkList, setCheckList] = useState([]);
  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect executed");
    fetch("http://localhost:8000/cartItems")
      .then((resp) => resp.json())
      .then((data) => {
        setCheckList(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to calculate total for each item in the cart
  const calculateTotal = () => {
    let sum = 0;
    checkList.forEach((item) => {
      sum += item.charges;
    });
    return sum;
  };

  useEffect(() => {
    // Update total whenever checkList changes
    console.log("check")
    setTotal(calculateTotal());
  }, [checkList]);

  function handleClick(id) {
    fetch("http://localhost:8000/deleteCart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTotal((prev) => prev - data.data.charges);
        setCheckList((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  }

  if (!login) {
    return (
      <div className="flex gap-4  justify-center items-center h-[95vh]">
        <DNA />
        <h1 className="text-3xl font-bold">Your Cart Is Empty</h1>
        <DNA />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl w-full  text-center p-4 border-gray-700 border-y-2">
        Shopping Cart
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[95vh]">
          <DNA />
        </div>
      ) : (
        <div className="md:flex min-w-24 w-[100%]">
          <div className="w-[55%]  p-10 m-1">
            {checkList.map((product, index) => {
              return (
                <div
                  key={index}
                  className="w-[100%] h-36 flex border-white border-[0.5px] mb-2 rounded-md bg-neutral-800 text-white p-1"
                >
                  <div className="w-[30%]  border-[1px] border-white ">
                    <img
                      className="h-full w-full p-2 bg-black"
                      src={product.link}
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <p className="flex justify-between w-[100%] p-4">
                      <span>{product.product}</span>
                      <span>{product.charges} $</span>
                    </p>
                    <p className="flex justify-between w-[100%] p-4">
                      <span className="text-green-300">InStock</span>
                      <button
                        onClick={() => handleClick(product?._id)}
                        className="text-white border-white border-[0.5px] p-1 rounded-s transition-all cursor-pointer"
                      >
                        {" "}
                        Delete
                      </button>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-[45%] align-middle max-h-[60vh]  p-10 m-1">
            <h1 className="text-2xl mb-8">Order Summary</h1>
            <p className="flex justify-between w-[80%] mb-3">
              <span>SubTotal : </span> <span>{total} $</span>
            </p>
            <hr />
            <p className="flex justify-between w-[80%] mb-3">
              <span>Shipping Charge : </span> <span>99 $</span>
            </p>
            <hr />
            <p className="flex justify-between w-[80%] mb-3">
              <span>Tax Estimate: </span> <span>100 $</span>
            </p>
            <hr />
            <h1 className="flex justify-between w-[80%] mb-3 text-xl text-gray-300">
              <span>Order Total: </span> <span>{total + 199}$</span>
            </h1>
            <hr />
          </div>
        </div>
      )}
    </>
  );
};

export default CartContaner;
