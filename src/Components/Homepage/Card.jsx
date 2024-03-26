import React,{useContext}from 'react'
import { RandomContext } from '../Utils/Context'
import { Link } from 'react-router-dom'


const Card = ({user}) => {
  let {datac,setFilterData,setCheckList}=useContext(RandomContext)
  
  function handleClick(event){
    let filterData=datac.find((el)=>el._id===event.target.value)
    setFilterData(filterData)

    fetch("http://localhost:8000/cartItem",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(filterData)
    }).then(resp=>console.log(resp))
    .catch(err=>console.log(err.message))

    setCheckList((prev)=>[filterData,...prev])
  }

  return (
    <div className='flex flex-col items-center min-w-24 w-72  border-2 p-2 m-2 rounded-md  shadow-2xl shadow-zinc-900'>
      <img className='w-full h-[150px]'src={user.link} alt="" />
      <p className=' w-full'><span className='text-green-600'>Product : </span>{(user.product).toUpperCase()}</p>
      <p className='my-2 text-sm h-20'>Description: {`${(user.description).substring(0,100)}...ReadMore`}</p>
      <div className='flex justify-evenly items-center w-full p-1 text-white text-sm rounded-sm'>
        <p className='p-1 w-full'><span className='text-green-600'>Quan:</span>{user.quantity}Pcs</p>
        <p className='p-1 '><span className='text-green-600'>Available:</span>{user.duration}Days</p>
      </div>
      <div className='flex  bg-black justify-between w-full p-1 text-white rounded-sm'>
        <p className='p-1'>Price : {user.charges}$</p>
       <Link to="/rentPage"><button onClick={handleClick} id='rentBtn' value={user._id} className="text-white border-white border-[0.5px] p-1 rounded-s transition-all ">Rent Now</button></Link>
      </div>
    </div>
  )
}

export default Card
