import { useState } from "react"

const Navbar = ({func}) => {
  let [toggle,setToggle]=useState(false)

  
  function handleClick(){
   setToggle(true)
   
   func(toggle)
  }
  

  return (
    <>
    <div className="flex justify-between p-2 bg-gray-900 text-white w-[100vw]">
    <span className="flex"><img className="h-6"  src="favicon.ico"/>Rental-Servives</span>
    <nav className="flex justify-between w-[30vw]">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a onClick={handleClick} href="#" >Login</a>
    </nav>
    </div>
    </>
  )
}

export default Navbar
