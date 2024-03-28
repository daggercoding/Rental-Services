import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const navigate = useNavigate()
    const param = useParams()
    const id = param.id
    
    let[product,setProduct]=useState("")
    let[link,setLink]=useState("")
    let[description,setdescription]=useState("")
    let[price,setPrice]=useState("")
    
    useEffect(()=>{
      fetch(`http://localhost:8000/getItemById/${id}`)
      .then(resp=>resp.json())
      .then(data=>{
        setProduct(data.product)
        setLink(data.link)
        setdescription(data.description)
        setPrice(data.charges)
      })
      .catch(err=>console.log(err.message))
    },[])

    function handleClick(event){
    event.preventDefault()
    const obj={
      id:id,
      product:product,
      link:link,
      description:description,
      charges:price,
    }
  
    fetch("http://localhost:8000/updateProduct",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(obj)
    })
    .then(resp=>{
      console.log(resp)
      navigate("/")
    })
    .catch(err=>console.log(err))
    }

  return (
    <form className="flex flex-col w-[50vw] mt-8 border-2 p-10 rounded items-center bg-neutral-800 updateConatner">
    <h1 className="text-3xl antialiased font-bold">Update Your Product</h1>
    <label htmlFor="product">Product :</label>
    <input type="text" name="product" placeholder="Please Enter Product Name" value={product} onChange={(e)=>setProduct(e.target.value)}/>

    <label htmlFor="link">Link :</label>
    <input type="text" name="link" placeholder="Please Provide Image Link" value={link} onChange={(e)=>setLink(e.target.value)}/>

    <label htmlFor="description">Description :</label>
    <textarea rows="4" className='w-[80%] rounded '  type='text' name="description" placeholder="Product Desctiption" value={description} onChange={e=>setdescription(e.target.value)}/>

    <label htmlFor="price">Price :</label>
    <input type="text" name="price" placeholder="Please Enter Charges Per Day" value={price} onChange={e=>setPrice(e.target.value)}/>
    <button onClick={handleClick} className="bg-black text-white  w-[50%] p-2 rounded mt-4 border-gray-500 border-[0.5px]" type="submit ">POST</button>
</form>
  )
}

export default UpdateProduct
