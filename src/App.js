import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import { useContext, useState } from "react"
import { RandomContext } from "./Components/Utils/Context";
import Home from "./Components/HomePage/Home";

function App() {
  let {loginForm}=useContext(RandomContext)
  let {togle,settogle}=useState(false)

  return (
       <div className="flex flex-col w-full justify-center items-center ">
        <Navbar></Navbar>
        {loginForm&&<Login/>}
        <Home/>
       </div>
  );
}

export default App;
