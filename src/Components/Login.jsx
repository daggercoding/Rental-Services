import React from "react";
import { useState,useContext} from "react"
import { userContext } from "../App";

function Login(){

    const [toggle, setToggle] = useState(false);
    
    function handleSign(){
        setToggle(!toggle);
    }

    return(
        <>
        {!toggle?(<form className="flex flex-col w-[50vw] mt-4 border-2 p-10 rounded items-center " action="/login" method="POST">
         <h1 className="text-3xl antialiased font-bold  ">LOGIN</h1>
         <input type="text" name="name" placeholder="UserName"/>
         <input type="password" name="passowrd" placeholder="Password"/>
         <button className="bg-black text-white w-[80%] p-2 rounded mt-4" type="submit">Login</button>
         <p className="mt-2">Dont't Have Account? <a className="text-blue-400" href="#"  onClick={handleSign}> Please SignUp</a></p>
        </form>):(<form className="flex flex-col w-[50vw] mt-4 border-2 p-10 rounded items-center " action="/login" method="POST">
         <h1 className="text-3xl antialiased font-bold  ">SignUp</h1>
         <input type="text" name="name" placeholder="Please Enter UserName"/>
         <input type="text" name="mail" placeholder="Please Enter Mail"/>
         <input type="password" name="passowrd" placeholder="Please Enter Password"/>
         <button className="bg-black text-white w-[80%] p-2 rounded mt-4" type="submit ">SignUP</button>
         <p className="mt-2">Have Account? <a className="text-blue-400" href="#" onClick={handleSign}> Please Login</a></p>
        </form>)};
        </>
    )
}
export default Login