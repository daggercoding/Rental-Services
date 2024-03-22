import React from 'react'

const Card = ({user}) => {
  return (
    <div className='flex flex-col items-center w-[19vw]  border-2 p-2 m-2 rounded-md  shadow-2xl shadow-zinc-900 bg-white'>
      <img className='w-full h-[150px] ' src={user.thumbnail} alt="" />
      <p className='flex justify-between w-full'><span className='text-green-600'>Category :</span>{user.category}</p>
      <p className='my-2 text-sm h-20'>Description: {user.description.substring(0,100)}</p>
      <div className='flex  bg-black justify-between w-full p-1 text-white rounded-sm'>
        <p className='p-1'>Price : {user.price}$</p>
        <button id='rentBtn' className="text-white border-white border-[0.5px] p-1 rounded-s transition-all ">Rent Now</button>
    
      </div>
    </div>
  )
}

export default Card
