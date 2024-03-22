import { Link } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
  let[loginForm,setloginForm]=useState(false)
  function handleClick(){
    setloginForm(prev=>!prev)
  }
  return (
    <>
    <div className="flex justify-between p-2 bg-gray-900 text-white w-[100%]">
    <span className="flex"><img className="h-6"  src="favicon.ico"/>Rental-Servives</span>
    <nav className="flex justify-between w-[30vw]">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/createList">List_Item</Link>
        <Link to='/login' onClick={handleClick}>{loginForm?"LogOut":"Login"}</Link>
    </nav>
    </div>
    </>
  )
}
export default Navbar
