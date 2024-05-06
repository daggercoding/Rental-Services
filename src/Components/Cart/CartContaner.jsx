import React, { useContext, useEffect, useState } from "react";
import { RandomContext } from "../Utils/Context";
import { DNA } from "react-loader-spinner";
import Cartcard from "./Cartcard";
import OrderConfirm from "./OrderConfirm";
import { useNavigate } from "react-router-dom";

const CartContaner = () => {
  let { login, setCount, count } = useContext(RandomContext);
  let [checkList, setCheckList] = useState([]);
  let [total, setTotal] = useState(0);
  let [user, setUser] = useState([]);
  let [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(false);
  const [res, setRes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("token"));
    const data = { id: id };
    fetch("http://localhost:8000/singleUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setCheckList(data.data.cart);
        setUser(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [count]);

  const calculateTotal = () => {
    let sum = 0;
    checkList.forEach((item) => {
      sum += item.charges;
    });
    return sum;
  };

  useEffect(() => {
    setTotal(calculateTotal());
    setCount(checkList.length);
  }, [checkList]);

  function handleClick(id) {
    const ids = JSON.parse(localStorage.getItem("token"));
    const data = { userId: ids, productId: id };
    fetch("http://localhost:8000/deleteCart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCheckList(data);
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

  async function handleBuy(e) {
    try {
      const response = await fetch("http://localhost:8000/order", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          amount: (total + 199) * 100,
          currency: "INR",
        }),
      });
      const order = await response.json();
      var options = {
        key: "rzp_test_KoYNBUxkvY7IJf", // Enter the Key ID generated from the Dashboard
        amount: total,
        currency: "INR",
        name: "Rental Services", //your business name
        description: "Test Transaction",
        image:
          "https://th.bing.com/th/id/R.56837024cfaa83bb6e2b6b21b23f5456?rik=rJtq97Mq2d5yiw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fshopping-transparent%2fshopping-transparent-3.png&ehk=N4Q3nXgWCNs43l5ZsEGWcX3uTa53hw5B5OrkRXW3uvI%3d&risl=&pid=ImgRaw&r=0",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const body = { ...response };
          const validatResponse = await fetch(
            "http://localhost:8000/validatePayment",
            {
              method: "POST",
              headers: { "Content-Type": "Application/json" },
              body: JSON.stringify(body),
            }
          );
          const jsonRes = await validatResponse.json();
          setRes(jsonRes);
          if (jsonRes.status === "Sucess") {
            setOrder(true);
            const ids = JSON.parse(localStorage.getItem("token"));
            fetch(
              "http://localhost:8000/emptyCart",
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ids}),
              }
            ).then((res)=>{
              if(res.status===200){
                setTimeout(()=>{
                  navigate("/"); 
                },5000)  
              }
              return res.json()
            })
            .then((data)=>console.log(data))
            .catch((err)=> console.log(err));
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="text-xl sm:text-2xl w-full  text-center p-4 border-gray-700 border-y-2">
        Shopping Cart
      </h1>
      {loading && (
        <div className="flex justify-center items-center h-[95vh]">
          <DNA />
        </div>
      )}

      {order ? (
        <OrderConfirm res={res} />
      ) : (
        <div className="sm:flex   w-[100%] h-full">
          <div className="sm:w-[55%]  sm:p-10 m-2">
            {checkList.map((product, index) => {
              return <Cartcard product={product} handleClick={handleClick} />;
            })}
          </div>
          <div className="sm:w-[45%] align-middle p-10 m-1">
            <div className=" sticky -top-1">
              <h1 className="text-2xl mb-8 ">Order Summary</h1>
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
              <button
                onClick={handleBuy}
                id="rzp-button1"
                className="w-[100%] bg-green-400 text-black from-stone-950 font-bold rounded-md p-1 mt-2"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {loading ? (
        <div className="flex justify-center items-center h-[95vh]">
          <DNA />
        </div>
      ) : (
        <div className="sm:flex   w-[100%] h-full">
          <div className="sm:w-[55%]  sm:p-10 m-2">
            {checkList.map((product, index) => {
              return (
                <Cartcard product={product} handleClick={handleClick} />
              );
            })}
          </div>
          <div className="sm:w-[45%] align-middle p-10 m-1" >
          <div className=" sticky -top-1">
            <h1 className="text-2xl mb-8 ">Order Summary</h1>
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
            <button onClick={handleBuy} id="rzp-button1" className="w-[100%] bg-green-400 text-black from-stone-950 font-bold rounded-md p-1 mt-2">Buy Now</button>
          </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CartContaner;
