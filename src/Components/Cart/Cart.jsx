const Cart = ({product}) => {

  function handleClick(e){
    console.log(e.target.id)
  }

  return (
   <>
   <div className='w-[100%] h-36 flex border-white border-[0.5px] mb-2 rounded-md bg-neutral-800 text-white p-1 '>
    <div className='w-[30%]  border-[1px] border-white '>
      <img className='h-full w-full p-2 bg-black' src={product.link} alt="" />
    </div>
    <div className='w-full'>
      <p className='flex justify-between w-[100%] p-4'><span>{product.product}</span><span>{product.charges} $</span></p>
      <p className='flex justify-between w-[100%] p-4'><span className='text-green-300'>InStock</span><span onClick={handleClick} id={product._id} className='text-white border-white border-[0.5px] p-1 rounded-s transition-all cursor-pointer '>Delete</span></p>
      
      </div>
   </div>
   
   </>
  )
}

export default Cart
