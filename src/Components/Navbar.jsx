import { Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { RandomContext } from "./Utils/Context";

const Navbar = () => {
  let navigate =useNavigate()
  let{login,setLogin,count,name,setCount}=useContext(RandomContext)
  function handleLogin(){
  // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.removeItem("token")
  setLogin(false)
  setCount(0)
  }

  return (
    <>
        {/* <div className="p-3 bg-gray-900 text-white w-[100%]  ">
        <div className="flex justify-between">
        <span className="flex md:ml-6">
          <img className="h-6" src="favicon.ico" alt=""/>
         Rental-Servives
         </span>
         {login&&(<p className="text-green-400">Welcome : <span>{name}</span></p>)}
        <nav className="hidden gap-[20%] sm:flex sm:justify-between w-[20%] navBar sm:block">
    
        <Link to="/">Home</Link>
      
         <Link to="/about">About</Link>
      
         <Link to="/createList">List_Item</Link>
    
        <Link to="/login" onClick={handleLogin} >{login ? "Logout" : "LogIn"}</Link>
    
        <Link to="/cart"><CiShoppingCart /><sup className="absolute top-2 right-8 cart ">{count}</sup></Link>
      </nav>
      </div>
     </div> */}


      <div className="grid grid-cols-12 black w-full place-content-center p-1 bg-gray-900">
        <div className="grid col-span-3 p-2 justify-items-center">
         <span onClick={()=>navigate("/")} className="flex gap-1">
         <img className="h-6"  src="https://th.bing.com/th/id/R.56837024cfaa83bb6e2b6b21b23f5456?rik=rJtq97Mq2d5yiw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fshopping-transparent%2fshopping-transparent-3.png&ehk=N4Q3nXgWCNs43l5ZsEGWcX3uTa53hw5B5OrkRXW3uvI%3d&risl=&pid=ImgRaw&r=0" alt=""/>
          Rental-Servives
         </span>
        </div>
        <div className="grid col-span-7 grid-cols-4 p-2 justify-items-center">
         <Link className="hover:underline hover:text-blue-500 transition-all duration-500" to="/">Home</Link>
         <Link className="hover:underline hover:text-blue-500 transition-all duration-500" to="/about">About</Link>
         <Link className="hover:underline hover:text-blue-500 transition-all duration-500" to="/createList">List_Item</Link>
         <Link className="hover:underline hover:text-blue-500 transition-all duration-500" to="/login" onClick={handleLogin} >{login ? "Logout" : "LogIn"}</Link>
        </div>
        <div className="grid col-span-2  grid-cols-12 p-2 justify-items-start">
        {login?(<p className="text-green-400 col-span-10 text-sm">Welcome : <span>{name}</span></p>):(<p className=" text-green-400 col-span-10 text-sm">Always Smile :)</p>)}
        <div className="relative col-span-2">
        <Link to="/cart"><CiShoppingCart  /><span className="absolute text-sm text-green-400 -top-[12px] right-0">{count}</span></Link>
        </div>
        </div>
      </div>
      </>
    
 
  );
};
export default Navbar;
