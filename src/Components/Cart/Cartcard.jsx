import React, { useState } from "react";
export default function Cartcard({product, handleClick}) {
    console.log(product.quantity)
    const [add, setAdd] = useState(1);
    const [available,setAvailable]= useState(true)
    console.log("rerendered")
    function increment(){ 

        if(add>=product.quantity)
        {
          setAvailable(false)
          setAdd(prev => prev+1)
          setTimeout(()=>{
            setAvailable(true)
            setAdd(prev => prev-1)
          },2000)
         
        }else{
          setAdd(prev => prev+1)
        } 
      }
      function decrement(){
        if(add>=1){
          setAvailable(true)
        }

        if(add==1){
          setAdd(1);
        }else{
          setAdd(prev => prev -1)
        }
        
      }
    
   
    
  return (
    <div className="w-[100%] h-36 flex border-white border-[0.5px] mb-2 rounded-md bg-neutral-800 text-white p-1">
      <div className="w-[30%]  border-[1px] border-white ">
        <img className="h-full w-full p-2 bg-black" src={product.link} alt="" />
      </div>
      <div className="w-full">
        <p className="flex justify-between w-[100%] p-2">
          <span>{product.product}</span>
          <span>{product.charges * add} $</span>
        </p>
        <p className="flex justify-between w-[100%] p-2">
          <span className="text-green-300">{available?"InStock":"OutOfStock"}</span>
          <button
          onClick={()=>handleClick(product._id)}
            className="text-white border-white border-[0.5px] p-1 rounded-s transition-all cursor-pointer"
          >
            {" "}
            Delete
          </button>
        </p>
        <p className="ml-2 flex">
          <button
            onClick={decrement}
            className=" w-8 h-8 mr-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          >
            -
          </button>
          <p className="mx-2 w-4">{add} </p>
          <button
            onClick={increment}
            className=" w-8 h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          >
            +
          </button>
        </p>
      </div>
    </div>
  );
}
