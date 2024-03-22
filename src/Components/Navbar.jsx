import { RandomContext } from "./Utils/Context"
import { useContext } from "react"

const Navbar = () => {
  let {setLoginForm,loginForm}=useContext(RandomContext)

  function handleClick(){
        setLoginForm(prev=>!prev)
  }


  return (
    <>
    <div className="flex justify-between p-2 bg-gray-900 text-white w-[100vw]">
    <span className="flex"><img className="h-6"  src="favicon.ico"/>Rental-Servives</span>
    <nav className="flex justify-between w-[30vw]">
        {/* <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link> */}
    

        <a href="http://localhost:3000/">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a onClick={handleClick} href="#">{loginForm?"LogOut":"Login"}</a>
    </nav>
    </div>
    </>
  )
}
export default Navbar
