import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/HomePage/Home";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ListItem from "./Components/ListItem";
import SignUP from "./Components/SignUp";
import AboutPage from "./Components/About";

function App() {

  return (
       <div className="flex flex-col w-full min-h-[100vh]  items-center bg-black text-gray-400 ">
        <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUP/>}/>
        <Route path="/createList" element={<ListItem/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        </Routes>
        </BrowserRouter>
       </div>
  );
}

export default App;
