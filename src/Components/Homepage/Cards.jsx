import React,{useEffect,useState} from 'react'
import Card from "./Card"
const Cards = () => {
  let [data,setData]=useState([])
  useEffect(()=>{
    fetch("https://dummyjson.com/products")
    .then((resp)=>resp.json())
    .then((data)=>setData(data.products))
    .catch((err)=>console.log(err.message))
  },[])
  console.log(data)
  return (
    <div className='flex flex-wrap justify-evenly w-[100%] mt-2'>
      {data.map((user)=><Card user={user}></Card>)}
      
    </div>
  )
}

export default Cards
