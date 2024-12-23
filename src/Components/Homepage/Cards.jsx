import React,{useEffect,useState,useContext} from 'react'
import { RandomContext } from '../Utils/Context'
import Card from "./Card"
import { useNavigate } from 'react-router-dom'

const Cards = () => {
  
  let [data,setData]=useState([])
  let{loading,login,setCount,setName} = useContext(RandomContext)

  const Navigate = useNavigate()
  
   useEffect(()=>{
  
    if(login){
      fetch("http://localhost:8000/getitems")
      .then((resp)=>{
        return resp.json()})
      .then((item)=>{
        setData([...item.data.reverse()])
      })
      .catch((err)=>console.log(err.message))
      let id =JSON.parse(localStorage.getItem("token"))
      const data = {id}
      
      fetch("http://localhost:8000/singleUser",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      }).then(res=>res.json())
      .then(data=>{
        let name = data.data.name.toUpperCase()
        setName(name)
        setCount(data.data.cart.length)
      })
      .catch(err=>err)

    }else
    {
      Navigate("/login")
    }
    
  },[Navigate])
  
  return (
    <>
    <div className='mt-2 w-full'>
        <h1 className='text-2xl font-bold text-center '>Buy & Sell at Same Place</h1>
    </div>
    {loading?(<h1 className='w-[100vw] h-[100vh] bg-white'>loading</h1>):(<div className='flex flex-wrap justify-evenly w-[100%] mt-4'>
    {data.map((user, index)=><Card key={index} user={user}></Card>)}
    </div>)}
    </>   
  )
}

export default Cards
