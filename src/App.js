import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import React from "react";

function App() {
  
  let condition=false
  function getToggle(value)
  {
    condition=value
  }

  return (
      <div className="flex flex-col w-full justify-center items-center ">
        <Navbar func={getToggle}></Navbar>
        {condition&&<Login/>}
      </div>
  );
}

export default App;
