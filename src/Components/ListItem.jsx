import React from 'react'

const ListItem = () => {
  return (
    <form action="http://localhost:8000/addItem" method="POST" className="flex flex-col w-[50vw] mt-20 border-2 p-10 rounded items-center">
         <h1 className="text-3xl antialiased font-bold">Post Your Product</h1>
         <input type="text" name="pname" placeholder="Please Enter Product Name"/>
         <input type="text" name="link" placeholder="Please Provide Image Link"/>
         <input type="text" name="price" placeholder="Please Enter Charges Per Day"/>
         <input type="number" name="duration" placeholder="Availablity Duration in Days"/>
         <input type="number" name="quantity" placeholder="Please Provide Quantity"/>
         <button className="bg-black text-white  w-[50%] p-2 rounded mt-4 border-gray-500 border-[0.5px]" type="submit ">POST</button>
    </form>
  )
} 

export default ListItem
