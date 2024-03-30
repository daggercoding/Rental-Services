import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LiaCartPlusSolid } from "react-icons/lia";
import { RandomContext } from "../Utils/Context";


const Card = ({ user}) => {
  let{setCount} = useContext(RandomContext)
  const Navigate=useNavigate()
  function handleCart(id){
    const productId=id
    const userId = JSON.parse(localStorage.getItem("token"))
    const data={
      userId,
      productId
    }
    axios.post("http://localhost:8000/addToCart",data)
    .then(resp=>setCount(resp.data))
    .catch(err=>console.loglog(err))
  }
  
  return (
    
    <div className="flex flex-col items-center min-w-24 w-72  border-2 p-2 m-2 rounded-md shadow-md  shadow-indigo-900">
      <img className="w-full h-[150px]" src={user.link} alt="" />
      <p className=" w-full">
        <span className="text-green-600">Product : </span>
        {user.product.toUpperCase()}
      </p>
      <p className="my-2 text-sm h-20">
        Description: {`${user.description.substring(0, 100)}...ReadMore`}
      </p>
        <div className="flex justify-evenly items-center w-full p-1 text-white text-sm rounded-sm">
        <p className="p-1 w-full">
          <span className="text-green-600">Quan:</span>
          {user.quantity}Pcs
        </p>
        <p className="p-1 ">
          <span className="text-green-600">Available:</span>
          {user.duration}Days
        </p>
      </div>
      <div className="flex  bg-black justify-between w-full text-white rounded-sm">
        <p className="p-1">Price : {user.charges}$</p>
         <button onClick={()=>{Navigate(`/updateProduct/${user._id}`)}} className="text-white min-w-12 border-white border-[0.5px] p-1 rounded-s transition-all " id="rentBtn">
          Edit
        </button>
          <button onClick={()=>handleCart(user._id)} className="flex text-white border-white border-[0.5px] p-1 rounded-s transition-all " id="rentBtn">
          Add to <LiaCartPlusSolid/>
        </button>
      </div>
          
    </div>
  );
};

export default Card;
