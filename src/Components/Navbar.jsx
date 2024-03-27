import { Link} from "react-router-dom";
import { useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { RandomContext } from "./Utils/Context";

const Navbar = () => {
  let{login,setLogin}=useContext(RandomContext)
  function handleLogin(){
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  setLogin(false)
  }

  return (
    <>
      <div className="flex flex-col justify-between p-2 bg-gray-900 text-white w-[100%]">
        <div className="flex justify-between">
        <span className="flex">
          <img className="h-6" src="favicon.ico" alt="websitelogo"/>
          Rental-Servives
        </span>
        <nav className="flex justify-between w-[20%] navBar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/createList">List_Item</Link>
          <Link to="/login" onClick={handleLogin} >{login ? "Logout" : "LogIn"}</Link>
          <Link to="/cart"> <CiShoppingCart/></Link>
        </nav>
        </div>
      </div>
    </>
  );
};
export default Navbar;
