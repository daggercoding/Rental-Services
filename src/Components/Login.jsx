import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { RandomContext } from "./Utils/Context"

function Login(){
    const Navigate =useNavigate()
    let [name,setName]=useState("")
    let [password,setPassword]=useState("")
    let  {setLogin} = useContext(RandomContext)

    function handleClick(e){
        e.preventDefault()
        const user={
            name,
            password
        }
        fetch("http://localhost:8000/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        })
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data)
            if(data.length===1){
                localStorage.setItem("token",JSON.stringify(data[0].id))
                setLogin(true)
                Navigate("/")
            }
            })
        .catch(err=>err)
    }
  
    return(  
        <form className="flex flex-col w-[50vw] mt-20 border-2 p-10 rounded items-center " >
         <h1 className="text-2xl antialiased font-bold sm:text-3xl">LOGIN</h1>
         <input id="name"  type="text" name="name" placeholder="UserName" onChange={(e)=>setName(e.target.value)}/>
         <input id="passoword"  type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
         <button className="bg-black text-white w-[50%] p-2 rounded mt-4 border-gray-500 border-[0.5px] " onClick={handleClick} type="submit">Login</button>
         <p className="mt-2">Dont't Have Account? <Link to="/signup" className="text-blue-400"> Please SignUp</Link></p>
        </form>
    )
}
export default Login