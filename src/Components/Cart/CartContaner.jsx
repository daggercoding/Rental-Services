import React,{useContext,useEffect,useState} from "react";
import Cart from "./Cart";
import { RandomContext } from "../Utils/Context";
import { DNA} from "react-loader-spinner";

const CartContaner = () => {

    let{login}=useContext(RandomContext)
    let[checkList,setCheckList]=useState([])
    let [total,setTotal]=useState(0)
    let [loading,setLoading]=useState(true)

    useEffect(()=>{
        let calculatedTotal = 0;
        fetch("http://localhost:8000/cartItems")
        .then(resp=>resp.json())
        .then(data=>{
          setCheckList(data.data)
          setTimeout(() =>{
            setLoading(false)
          }, 500);
        })
        checkList.forEach((product) => {
            calculatedTotal += product.charges;
        });
        setTotal(calculatedTotal);
    },[])


    if(!login){
        // return
        return <div className="flex gap-4  justify-center items-center h-[95vh]">
          <DNA/>
         <h1 className="text-3xl font-bold">Your Cart Is Empty</h1>
         <DNA/>
        </div>
    }
    return (
    <>
      <h1 className="text-2xl w-full  text-center p-4 border-gray-700 border-y-2">
        Shopping Cart
      </h1>
      {loading?<div className="flex justify-center items-center h-[95vh]"><DNA/></div>:(<div className=" md: flex min-w-24 w-[100%] ">
        <div className="w-[55%]  p-10 m-1">
          {checkList.map((product,index)=>{
          return <Cart key={index} product={product}/>
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
            <span>Order Total: </span> <span>{total+199}$</span>
          </h1>
          <hr />
        </div>
      </div>)}
    </>
  );
};

export default CartContaner;
