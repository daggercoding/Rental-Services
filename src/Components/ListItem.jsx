import React from 'react'
import { useContext } from 'react'
import { RandomContext } from './Utils/Context'

const ListItem = () => {
  let {login} = useContext(RandomContext)
  return (
    <form action="http://localhost:8000/addItem" method="POST" className="  flex  flex-col sm:w-[50vw] mt-8 border-2 p-10 rounded items-center">
         <h1 className="text-2xl sm:text-3xl antialiased font-bold">Post Your Product</h1>
         <input type="text" name="pname" placeholder="Please Enter Product Name"/>
         <input type="text" name="link" placeholder="Please Provide Image Link"/>
         <input type='text' name="description" placeholder="Product Desctiption"/>
         <input type="text" name="price" placeholder="Please Enter Charges Per Day"/>
         <input type="number" name="duration" placeholder="Availablity Duration in Days"/>
         <input type="number" name="quantity" placeholder="Please Provide Quantity"/>
         {login?<button className="bg-black text-white w-[78%]  sm:w-[50%] p-2 rounded mt-4 border-gray-500 border-[0.5px]" type="submit ">POST</button>:<button disabled className="bg-red-500 cursor-not-allowed  text-black font-bold w-[78%]  sm:w-[50%] p-2 rounded mt-4 border-gray-900 border-[0.5px]" type="submit ">Please Login First</button>}
         
         
    </form>
  )
} 

export default ListItem
