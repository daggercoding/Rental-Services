import React,{useEffect,useState,useContext} from 'react'
import { RandomContext } from '../Utils/Context'
import Card from "./Card"
import { useNavigate } from 'react-router-dom'

const Cards = () => {
  let [data,setData]=useState([])
  let{datac,loading} = useContext(RandomContext)

  const Navigate = useNavigate()
  
  useEffect(()=>{
    if(document.cookie.includes("token")){
        setData(datac)
    }else
    {
      Navigate("/login")
    }
    
  },[datac,Navigate])
  

  return (
    <>
    
    {loading?(<h1 className='w-[100vw] h-[100vh] bg-white'>loading</h1>):(<div className='flex flex-wrap justify-evenly w-[100%] mt-4'>
    {data.map((user, index)=><Card key={index} user={user}></Card>)}
    </div>)}
    </>   
  )
}

export default Cards
