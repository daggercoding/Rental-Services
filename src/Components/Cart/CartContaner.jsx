import React, { useContext, useEffect, useState } from "react";
import { RandomContext } from "../Utils/Context";
import { DNA } from "react-loader-spinner";
import Cartcard from "./Cartcard";
const CartContaner = () => {
  let { login ,setCount,count } = useContext(RandomContext);
  let [checkList, setCheckList] = useState([]);
  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(true);

     useEffect(() => {
     const id = JSON.parse(localStorage.getItem("token"))
     const data ={id:id}
     fetch("http://localhost:8000/singleUser",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
     })
    .then(resp=>resp.json())
    .then(data=>{
      setCheckList(data.data.cart)
      setLoading(false)
    })
    .catch(err=>console.log(err.message))
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
    setCount(checkList.length)
  }, [checkList]);


  function handleClick(id) {
    const ids = JSON.parse(localStorage.getItem("token"))
    const data={userId:ids,productId:id }
    fetch("http://localhost:8000/deleteCart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((resp) => resp.json())
      .then((data) => { 
        console.log(data)
        setCheckList(data)
      })
      .catch((err) => console.log(err));
  }
  if (!login) {
    return (
      <div className="flex gap-4  justify-center items-center h-[95vh]">
        <DNA/>
        <h1 className="text-3xl font-bold">Your Cart Is Empty</h1>
        <DNA />
      </div>
    );
  }
  
  
  return (
    <>
      <h1 className="text-xl sm:text-2xl w-full  text-center p-4 border-gray-700 border-y-2">
        Shopping Cart
      </h1>
      {loading ? (
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
            <button className="w-[100%] bg-green-400 text-black from-stone-950 font-bold rounded-md p-1 mt-2">Buy Now</button>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartContaner;
