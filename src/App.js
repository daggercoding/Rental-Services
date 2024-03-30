import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/HomePage/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListItem from "./Components/ListItem";
import SignUP from "./Components/SignUp";
import AboutPage from "./Components/About";
import PageNotFound from "./Components/PageNotFound";
import CartContaner from "./Components/Cart/CartContaner";
import UpdateProduct from "./Components/UpdateProduct"; 


function App() {
  return (
    <div className="flex flex-col w-full min-h-[100vh]  items-center bg-black text-gray-400 ">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/createList" element={<ListItem />} />
          <Route path="/cart" element={<CartContaner/>}/>
          <Route path="/updateProduct/:id" element={<UpdateProduct/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
