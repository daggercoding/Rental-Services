import React, { useEffect, useState, useId } from "react";

export default function Cartcard({ product, handleClick, setTotal }) {
  const [add, setAdd] = useState(1);
  const id = useId();
  console.log("idddddddd", id);

  // useEffect(() => {
  //   setAdd(product.Qnt);
  // },[]);
  // vishal changes for netlify
  useEffect(() => {
    setAdd(product.Qnt);
  },[]);

  function increment(price, id) {
    if (add >= product.id.quantity) {
      alert("This Item is Out Of Stock");
    } else {
      setAdd((val) => val + 1);
      const latest = add + 1;
      const data = {
        id: JSON.parse(localStorage.getItem("token")),
        prodId: id,
        qnt: latest,
      };
       fetch("http://localhost:8000/updateCartQuantity", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
        setTotal((prev) => prev + price);
    }
  }


  function decrement(price,id) {
    if (add === 1) {
      setAdd(1);
    } else {
      setAdd((prev) => prev - 1);
      const latest = add-1;
      const data = {
        id: JSON.parse(localStorage.getItem("token")),
        prodId: id,
        qnt: latest,
      };
      fetch("http://localhost:8000/updateCartQuantity",{
        method:"POST",
        headers:{"Content-Type":"Application/json"},
        body:JSON.stringify(data)
      }).then(resp=>resp.json())
      .then(data=>console.log(data))
      .catch(err=>console.log(err.message))
      setTotal((prev) => prev - price);
    }
  }

  return (
    <div className="w-[100%] h-36 flex border-white border-[0.5px] mb-2 rounded-md bg-neutral-800 text-white p-1">
      <div className="w-[30%]  border-[1px] border-white ">
        <img
          className="h-full w-full p-2 bg-black"
          src={product.id.link}
          alt=""
        />
      </div>
      <div className="w-full">
        <p className="flex justify-between w-[100%] p-2">
          <span>{product.id.product}</span>
          <span>{product.id.charges * add} $</span>
        </p>
        <p className="flex justify-between w-[100%] p-2">
          <span className="text-green-300">
           InStock
          </span>
          <button
            onClick={() => handleClick(product.id._id)}
            className="text-white border-white border-[0.5px] p-1 rounded-s transition-all cursor-pointer"
          >
            {" "}
            Delete
          </button>
        </p>
        <p className="ml-2 flex">
          <button
            onClick={() => decrement(product.id.charges,product.id._id)}
            className=" w-8 h-8 mr-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          >
            -
          </button>
          <p className="mx-2 w-4">{add} </p>
          <button
            onClick={() => increment(product.id.charges, product.id._id)}
            className=" w-8 h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          >
            +
          </button>
        </p>
      </div>
    </div>
  );
}
